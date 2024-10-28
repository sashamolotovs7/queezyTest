import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change the Vite dev server port to 3000 to avoid conflicts
    proxy: {
      "/api": {
        target: "http://localhost:3001", // The backend server should be on 3001
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
