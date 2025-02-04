import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
