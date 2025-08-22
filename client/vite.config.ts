import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      // Для SPA: любые маршруты отдаём index.html
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://62.169.23.81:8080",
          changeOrigin: true,
          secure: false,
        },
        "/images": {
          target: env.VITE_API_IMG || "http://62.169.23.81:9000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/images/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
