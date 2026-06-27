import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { initializeJsonDb } from "./config/jsonDb.js";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import apiRouter from "./routes/index.js";
import * as ProductController from "./controllers/ProductController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log("Starting server with Local JSON DB...");
  
  // Initialize Local JSON Database
  try {
    initializeJsonDb();
    console.log("Local JSON Database initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize local JSON DB:", err);
  }

  console.log("Initializing Express app...");
  const app = express();
  

  app.set('trust proxy', 1);
  
  console.log("Setting up middlewares...");
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  console.log("Defining routes...");
  app.get("/test-json", (req, res) => {
    res.json({ success: true, message: "Express is working with Local JSON DB" });
  });

  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok",
      readyState: 1,
      database: "local_json_db",
      timestamp: new Date().toISOString()
    });
  });

  // API Routes - MOVED TO TOP
  app.get("/api/db-status", (req, res) => {
    res.json({ 
      status: "connected",
      readyState: 1,
      dbName: "local_json_db",
      uriProvided: false,
      maskedUri: "local filesystem (backend/data/*.json)"
    });
  });

  app.get("/api/ping", (req, res) => {
    res.json({ message: "pong", handled_by: "direct_route" });
  });

  app.get("/api/products", ProductController.getAllProducts);
  
  app.use("/api", apiRouter);

  // Security Middlewares - MOVED AFTER API ROUTES
  console.log("Setting up security middlewares...");
  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  // Vite Middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite middleware...");
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite middleware initialized.");
    } catch (err) {
      console.error("Failed to initialize Vite middleware:", err);
    }
  } else {
    // In production, serve from dist
    console.log("Serving static files from dist...");
    const distPath = path.join(__dirname, "..", "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3007;
  console.log(`Starting to listen on port ${PORT}...`);
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("CRITICAL: Failed to start server:", err);
  process.exit(1);
});
