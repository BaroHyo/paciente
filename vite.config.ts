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
        target: "https://localhost:7009", // Cambia esto al puerto donde se ejecuta tu aplicación .NET
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
