import { z } from "zod";

export const LoginSchema = z.object({
  cuenta: z
    .string()
    .min(1, { message: "El nombre de usuario es obligatorio." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});
