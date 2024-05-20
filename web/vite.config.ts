import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
import * as path from "path";

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    react(),
    istanbul({
      cypress: true,
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
