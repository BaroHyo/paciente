import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "../wwwroot", // Ajusta la ruta según tu estructura de carpetas
    emptyOutDir: true, // Limpia la carpeta de salida antes de construir
  },
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:7009", // Dirección del backend .NET
        changeOrigin: true, // Cambia el origen para que coincida con el backend
        secure: false, // Si usas HTTPS con certificados autofirmados
        //rewrite: (path) => path.replace(/^\/apidd/, ""), // Reescribir la URL para quitar '/api'
      },
    },
  },
});
