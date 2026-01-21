import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/mock": {
        target: "http://192.168.1.19:8087",
      },
    },
  },
});
