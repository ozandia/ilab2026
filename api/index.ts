// api/index.ts — Vercel Serverless Function (Express adapter)
// This file wraps the Express app for Vercel's serverless environment.
import express from "express";
import fs from "fs";
import path from "path";

const MAX_VOTES = Number(process.env.MAX_VOTES) || 27;
const MAX_SELECTIONS = Number(process.env.MAX_SELECTIONS) || 8;
const RATE_LIMIT_MS = Number(process.env.RATE_LIMIT_MS) || 60_000;

// In Vercel Functions the filesystem is read-only, use /tmp for state
const VOTE_FILE = path.join("/tmp", "votes.json");

const COMPANIES: readonly string[] = [
    "Techbiz", "Teltronic", "Valid", "Flash", "Funcional", "Aeromot", "Axon",
    "Berkana", "BGS", "Condor", "Glagio", "Helper", "Inspect", "Iron Fence",
    "Magnet", "Raytec", "Revo", "Smart Power", "VMI", "Digitro", "ADTech",
    "Motorola", "Protecta", "Ford", "Airbus", "Byrna", "Ulbrichts", "Clarian",
    "Hex360", "Montreal", "Actatec",
];
const COMPANY_SET = new Set(COMPANIES);

type VoteStore = Record<string, number>;

function loadVotes(): VoteStore {
    try {
        if (fs.existsSync(VOTE_FILE)) {
            return JSON.parse(fs.readFileSync(VOTE_FILE, "utf-8")) as VoteStore;
        }
    } catch {
        // corrupted file — reset
    }
    const initial: VoteStore = {};
    for (const c of COMPANIES) initial[c] = 0;
    return initial;
}

function saveVotes(votes: VoteStore): void {
    try {
        fs.writeFileSync(VOTE_FILE, JSON.stringify(votes, null, 2), "utf-8");
    } catch {
        // /tmp writes can fail in some environments — non-fatal
    }
}

let voteStore: VoteStore = loadVotes();
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

const rateLimitMap = new Map<string, number>();
function isRateLimited(ip: string): boolean {
    const last = rateLimitMap.get(ip) ?? 0;
    if (Date.now() - last < RATE_LIMIT_MS) return true;
    rateLimitMap.set(ip, Date.now());
    return false;
}

function buildCompanyList(store: VoteStore) {
    return COMPANIES.map((name) => ({
        name,
        votes: store[name] ?? 0,
        disabled: (store[name] ?? 0) >= MAX_VOTES,
    }));
}

const app = express();
app.use(express.json());

app.get("/api/poll", (_req, res) => {
    res.json({ companies: buildCompanyList(voteStore) });
});

app.post("/api/poll", async (req, res) => {
    const ip =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0] ??
        req.ip ??
        "unknown";

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

    if (new Set(names).size !== names.length) {
        return res.status(400).json({ error: "Seleções duplicadas não são permitidas." });
    }

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

    if ("error" in result) return res.status(409).json(result);
    return res.json({ ok: true, ...result });
});

app.get("/api/health", (_req, res) => res.json({ status: "ok", v: "4.0" }));

export default app;
