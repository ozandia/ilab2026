import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Config (override via env vars) ───────────────────────────────────────────
const PORT = Number(process.env.PORT) || 5000;
const MAX_VOTES = Number(process.env.MAX_VOTES) || 27;
const MAX_SELECTIONS = Number(process.env.MAX_SELECTIONS) || 8;
const RATE_LIMIT_MS = Number(process.env.RATE_LIMIT_MS) || 60_000;
const VOTE_FILE = process.env.VOTE_FILE
  ? path.resolve(process.env.VOTE_FILE)
  : path.resolve(__dirname, "votes.json");

// ── Company master list ───────────────────────────────────────────────────────
const COMPANIES: readonly string[] = [
  "Techbiz", "Teltronic", "Valid", "Flash", "Funcional", "Aeromot", "Axon",
  "Berkana", "BGS", "Condor", "Glagio", "Helper", "Inspect", "Iron Fence",
  "Magnet", "Raytec", "Revo", "Smart Power", "VMI", "Digitro", "ADTech",
  "Motorola", "Protecta", "Ford", "Airbus", "Byrna", "Ulbrichts", "Clarian",
  "Hex360", "Montreal", "Actatec",
];
const COMPANY_SET = new Set(COMPANIES);

// ── Vote store (in-memory + JSON file) ───────────────────────────────────────
type VoteStore = Record<string, number>;

function loadVotes(): VoteStore {
  try {
    if (fs.existsSync(VOTE_FILE)) {
      return JSON.parse(fs.readFileSync(VOTE_FILE, "utf-8")) as VoteStore;
    }
  } catch {
    // Corrupted file — reset to zero
  }
  const initial: VoteStore = {};
  for (const c of COMPANIES) initial[c] = 0;
  return initial;
}

function saveVotes(votes: VoteStore): void {
  fs.writeFileSync(VOTE_FILE, JSON.stringify(votes, null, 2), "utf-8");
}

let voteStore: VoteStore = loadVotes();

// ── Mutex: prevents race conditions during concurrent vote writes ─────────────
let writeLock = false;

async function withLock<T>(fn: () => T | Promise<T>): Promise<T> {
  while (writeLock) {
    await new Promise((r) => setTimeout(r, 5));
  }
  writeLock = true;
  try {
    return await fn();
  } finally {
    writeLock = false;
  }
}

// ── Rate limiter (in-memory, per IP) ─────────────────────────────────────────
const rateLimitMap = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const last = rateLimitMap.get(ip) ?? 0;
  if (Date.now() - last < RATE_LIMIT_MS) return true;
  rateLimitMap.set(ip, Date.now());
  return false;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function buildCompanyList(store: VoteStore) {
  return COMPANIES.map((name) => ({
    name,
    votes: store[name] ?? 0,
    disabled: (store[name] ?? 0) >= MAX_VOTES,
  }));
}

// ── Server ───────────────────────────────────────────────────────────────────
async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ── API: GET /api/poll ───────────────────────────────────────────────────
  app.get("/api/poll", (_req, res) => {
    res.json({ companies: buildCompanyList(voteStore) });
  });

  // ── API: POST /api/poll ──────────────────────────────────────────────────
  app.post("/api/poll", async (req, res) => {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] ?? req.ip ?? "unknown";

    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Você já votou recentemente. Aguarde alguns minutos." });
    }

    const { companies } = req.body as { companies?: unknown };

    if (!Array.isArray(companies) || companies.length !== MAX_SELECTIONS) {
      return res.status(400).json({ error: `Selecione exatamente ${MAX_SELECTIONS} empresas.` });
    }

    const names = companies as string[];

    const unknowns = names.filter((c) => !COMPANY_SET.has(c));
    if (unknowns.length > 0) {
      return res.status(400).json({ error: `Empresa(s) inválida(s): ${unknowns.join(", ")}` });
    }

    const hasDuplicates = new Set(names).size !== names.length;
    if (hasDuplicates) {
      return res.status(400).json({ error: "Seleções duplicadas não são permitidas." });
    }

    // Atomic write under mutex lock to prevent race conditions
    const result = await withLock(() => {
      const overCapacity = names.filter((c) => (voteStore[c] ?? 0) >= MAX_VOTES);
      if (overCapacity.length > 0) {
        return { error: `Vagas esgotadas: ${overCapacity.join(", ")}. Escolha outras empresas.` };
      }

      for (const c of names) {
        voteStore[c] = (voteStore[c] ?? 0) + 1;
      }
      saveVotes(voteStore);

      return { companies: buildCompanyList(voteStore) };
    });

    if ("error" in result) {
      return res.status(409).json(result);
    }

    return res.json({ ok: true, ...result });
  });

  // ── Static / Vite ────────────────────────────────────────────────────────
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error — vite is a devDependency; resolved at runtime only in dev mode
    const { createServer: createViteServer } = await import("vite");

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      configFile: path.resolve(__dirname, "..", "vite.config.ts"),
    });

    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, "..", "client", "index.html"),
          "utf-8",
        );
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const staticPath = path.resolve(__dirname, "public");
    app.use(express.static(staticPath, { maxAge: "1d" }));
    app.get("*", (_req, res) => {
      const indexPath = path.join(staticPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Build not found. Run 'npm run build' first.");
      }
    });
  }

  server.on("error", (e: any) => {
    if (e.code === "EADDRINUSE") {
      console.error(`[Server] Port ${PORT} is already in use.`);
      process.exit(1);
    }
  });

  server.listen(PORT, () => {
    console.log(`[Server] Running in ${isProduction ? "production" : "development"} mode on http://localhost:${PORT}/`);
  });
}

startServer().catch(console.error);
