import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      host: "a40b8200-76e5-489f-b8fa-1bb2d5e05786-00-qogc2wy9246v.worf.replit.dev",
      protocol: "wss",
    },
    allowedHosts: ["a40b8200-76e5-489f-b8fa-1bb2d5e05786-00-qogc2wy9246v.worf.replit.dev"],
  },
});
