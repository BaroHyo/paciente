import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

// Crear una instancia de Axios
const api = axios.create({
  // baseURL: "https://localhost:7009/api", // Base URL que se usará para las solicitudes
  baseURL: "/api", // Solo el prefijo '/api', el proxy de Vite redirige al backend
});

// Configurar interceptores (opcional)
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Respuesta del interceptor (opcional)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejar errores globalmente
    console.error("Error en la respuesta de la API:", error.response);
    return Promise.reject(error);
  }
);

export default api;
