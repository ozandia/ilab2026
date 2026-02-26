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

  // ── Mode & Path Resolution (v2.5 - DevOps Audit) ────────────────────────
  const isProduction = process.env.NODE_ENV === "production";
  const rootDir = process.cwd();

  const candidatePaths = [
    path.resolve(rootDir, "dist", "public"),
    path.resolve(__dirname, "public"),
    path.resolve(rootDir, "public"),
  ];

  let staticPath = isProduction ? candidatePaths[0] : path.resolve(rootDir, "client");

  console.log(`[Server] v2.5 DevOps Audit:`);
  console.log(`  - CWD: ${rootDir}`);
  console.log(`  - Environment: ${process.env.NODE_ENV}`);

  if (isProduction) {
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        staticPath = p;
        console.log(`  - FOUND staticPath: ${p}`);
        break;
      }
    }

    // List interfaces for network debug
    import("os").then((os) => {
      const interfaces = os.networkInterfaces();
      console.log(`  - Network Interfaces:`, Object.keys(interfaces).map(k => `${k}: ${interfaces[k]?.map(i => i.address).join(", ")}`));
    }).catch(() => { });
  }

  app.use((req, _res, next) => {
    console.log(`[Request] ${new Date().toISOString()} - ${req.method} ${req.url} | IP: ${req.ip} | Host: ${req.headers.host}`);
    next();
  });

  // Diagnostic Endpoint
  app.get("/api/debug/system", (req, res) => {
    res.json({
      version: "2.5",
      env: process.env.NODE_ENV,
      cwd: process.cwd(),
      time: new Date(),
      staticPath,
      staticFiles: fs.existsSync(staticPath) ? fs.readdirSync(staticPath) : "NOT_FOUND",
      rootDirFiles: fs.readdirSync(rootDir),
      headers: req.headers,
    });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      configFile: path.resolve(rootDir, "vite.config.ts"),
    });

    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      try {
        let template = fs.readFileSync(path.resolve(rootDir, "client", "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(staticPath, { maxAge: "1d" }));

    app.get("/health", (_req, res) => res.json({
      status: "ok",
      version: "2.5",
      staticPath,
      exists: fs.existsSync(staticPath)
    }));

    app.get("*", (req, res) => {
      const indexPath = path.join(staticPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        console.error(`[FATAL] index.html missing at ${indexPath}`);
        res.status(404).send(`Application Error (v2.5): Build files not found. Contact support with code DEPLOY_404.`);
      }
    });
  }

  server.on("error", (e: any) => {
    if (e.code === "EADDRINUSE") {
      console.error(`[FATAL] Port ${PORT} occupied.`);
      process.exit(1);
    }
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] v2.5 - Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
