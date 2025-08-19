import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log(`Building in ${mode} mode`);
  console.log(`VITE_API_URL: ${env.VITE_API_URL}`);
  console.log(`VITE_API_IMG: ${env.VITE_API_IMG}`);

  return {
    plugins: [react()],
    server: {
      proxy: mode === 'development' ? {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
        "/images": {
          target: env.VITE_API_IMG,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/images/, ""),
        },
      } : undefined,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    define: {
      __VITE_API_URL__: JSON.stringify(env.VITE_API_URL),
      __VITE_API_IMG__: JSON.stringify(env.VITE_API_IMG),
    }
  };
});