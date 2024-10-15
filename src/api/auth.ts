import api from "@/lib/axios";

export const loginRequest = async (credentials: {
  cuenta: string;
  password: string;
}) => {
  try {
    const response = await api.post("/usuarios/login", credentials); // La URL se convertirá en /api/usuarios/login

    console.log("Login successful:", response.data);
    return response.data; // Retorna los datos de la respuesta si es necesario
  } catch (error: any) {
    console.error("Error during login:", error.message);
    if (error.response) {
      console.error("Server response:", error.response.data);
    }
  }
};
