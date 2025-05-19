import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let replitPlugin = null;
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  // Because top-level await is not allowed, use require or dynamic import workaround
  // But in ESM this is tricky - easiest way: move to async config or omit plugin during dev
  // Alternatively, just omit this plugin for now or use an env variable to include it
  // For simplicity, omit it or handle via environment variable separately
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    // You can conditionally add replit plugin here if you find a way to import it sync
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
