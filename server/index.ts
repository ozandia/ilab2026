import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ÔöÇÔöÇ Config (override via env vars) ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
const PORT = Number(process.env.PORT) || 5000;
const MAX_VOTES = Number(process.env.MAX_VOTES) || 27;
const MAX_SELECTIONS = Number(process.env.MAX_SELECTIONS) || 8;
const RATE_LIMIT_MS = Number(process.env.RATE_LIMIT_MS) || 60_000;
const VOTE_FILE = process.env.VOTE_FILE
  ? path.resolve(process.env.VOTE_FILE)
  : path.resolve(__dirname, "votes.json");

// ÔöÇÔöÇ Company master list ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
interface CompanyInfo {
  name: string;
  description?: string;
}

const COMPANIES: readonly CompanyInfo[] = [
  { name: "Techbiz", description: "Solu├º├Áes tecnol├│gicas de ponta, com foco em per├¡cia forense digital." },
  { name: "Teltronic" },
  { name: "Valid" },
  { name: "Flash" },
  { name: "Funcional" },
  { name: "Aeromot" },
  { name: "Axon" },
  { name: "Berkana" },
  { name: "BGS" },
  { name: "Condor" },
  { name: "Glagio" },
  { name: "Helper" },
  { name: "Inspect" },
  { name: "Iron Fence" },
  { name: "Magnet" },
  { name: "Raytec" },
  { name: "Revo" },
  { name: "Smart Power" },
  { name: "VMI" },
  { name: "Digitro" },
  { name: "ADTech" },
  { name: "Motorola" },
  { name: "Protecta" },
  { name: "Ford" },
  { name: "Airbus" },
  { name: "Byrna" },
  { name: "Ulbrichts" },
  { name: "Clarian" },
  { name: "Hex360" },
  { name: "Montreal" },
  { name: "Actatec" },
];
const COMPANY_SET = new Set(COMPANIES.map(c => c.name));

// ÔöÇÔöÇ Vote store (in-memory + JSON file) ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
type VoteStore = Record<string, number>;

function loadVotes(): VoteStore {
  try {
    if (fs.existsSync(VOTE_FILE)) {
      return JSON.parse(fs.readFileSync(VOTE_FILE, "utf-8")) as VoteStore;
    }
  } catch {
    // Corrupted file ÔÇö reset to zero
  }
  const initial: VoteStore = {};
  for (const c of COMPANIES) initial[c.name] = 0;
  return initial;
}

function saveVotes(votes: VoteStore): void {
  fs.writeFileSync(VOTE_FILE, JSON.stringify(votes, null, 2), "utf-8");
}

let voteStore: VoteStore = loadVotes();

// ÔöÇÔöÇ Mutex: prevents race conditions during concurrent vote writes ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
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

// ÔöÇÔöÇ Rate limiter (in-memory, per IP) ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
const rateLimitMap = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const last = rateLimitMap.get(ip) ?? 0;
  if (Date.now() - last < RATE_LIMIT_MS) return true;
  rateLimitMap.set(ip, Date.now());
  return false;
}

// ÔöÇÔöÇ Helpers ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
function buildCompanyList(store: VoteStore) {
  return COMPANIES.map((c) => ({
    name: c.name,
    description: c.description,
    votes: store[c.name] ?? 0,
    disabled: (store[c.name] ?? 0) >= MAX_VOTES,
  }));
}

// ÔöÇÔöÇ Server ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ÔöÇÔöÇ API: GET /api/poll ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
  app.get("/api/poll", (_req, res) => {
    res.json({ companies: buildCompanyList(voteStore) });
  });

  // ÔöÇÔöÇ API: POST /api/poll ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
  app.post("/api/poll", async (req, res) => {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] ?? req.ip ?? "unknown";

    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Voc├¬ j├í votou recentemente. Aguarde alguns minutos." });
    }

    const { companies } = req.body as { companies?: unknown };

    if (!Array.isArray(companies) || companies.length !== MAX_SELECTIONS) {
      return res.status(400).json({ error: `Selecione exatamente ${MAX_SELECTIONS} empresas.` });
    }

    const names = companies as string[];

    const unknowns = names.filter((c) => !COMPANY_SET.has(c));
    if (unknowns.length > 0) {
      return res.status(400).json({ error: `Empresa(s) inv├ílida(s): ${unknowns.join(", ")}` });
    }

    const hasDuplicates = new Set(names).size !== names.length;
    if (hasDuplicates) {
      return res.status(400).json({ error: "Sele├º├Áes duplicadas n├úo s├úo permitidas." });
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

  // ÔöÇÔöÇ Static / Vite ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
