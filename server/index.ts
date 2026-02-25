import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    // Development mode with Vite middleware integration
    console.log("[Server] Starting in DEVELOPMENT mode with Vite integration...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      configFile: path.resolve(__dirname, "..", "vite.config.ts"),
    });

    // Use vite's connect instance as middleware
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        // Serve index.html from client folder and transform it with Vite
        let template = fs.readFileSync(path.resolve(__dirname, "..", "client", "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // Production mode - serve pre-built files
    const staticPath = path.resolve(__dirname, "public");
    console.log(`[Server] Serving static files from: ${staticPath}`);

    app.use(express.static(staticPath));

    app.get("*", (_req, res) => {
      const indexPath = path.join(staticPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Front-end build not found. Please run 'npm run build' first.");
      }
    });
  }

  const port = process.env.PORT || 5000;

  server.on("error", (e: any) => {
    if (e.code === "EADDRINUSE") {
      console.error(`[Server] Error: Port ${port} is already in use.`);
      process.exit(1);
    }
  });

  server.listen(port, () => {
    console.log(`[Server] ${isProduction ? "Production" : "Development"} server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
