import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  const isProduction = process.env.NODE_ENV === "production";

  // In production, we serve from dist/public. In dev, we serve from ../dist/public
  const staticPath = isProduction
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  console.log(`[Server] Serving static files from: ${staticPath}`);
  
  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    const indexPath = path.join(staticPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Front-end build not found. Please run 'npm run build' first.");
    }
  });

  const port = process.env.PORT || (isProduction ? 3000 : 5000);

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

import fs from "fs";
startServer().catch(console.error);
