import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");

    console.log(`Building in ${mode} mode`);
    console.log(`VITE_API_URL: ${env.VITE_API_URL}`);
    console.log(`VITE_API_IMG: ${env.VITE_API_IMG}`);

    return {
        plugins: [react()],
        server: {
            proxy: mode === 'development' ? {
                "/api": {
                    target: env.VITE_API_URL || "http://62.169.23.81:8080/",
                    changeOrigin: true,
                },
                "/images": {
                    target: env.VITE_API_IMG || "http://62.169.23.81:9000/",
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
        // Убираем define - не нужно, Vite автоматически подставляет import.meta.env
    };
});