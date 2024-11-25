import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Set your frontend to run on port 3000
        proxy: {
            "/api": {
                target: "http://localhost:3001", // Server running on 3001
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
