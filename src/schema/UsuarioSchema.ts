import { z } from "zod";

const mensajeRequerido = "Debe completar este campo.";

export const UsuarioSchema = z.object({
    id: z.number({ required_error: mensajeRequerido }),
    personaId: z.number({ required_error: mensajeRequerido }),
    cuenta: z
        .string()
        .min(5, { message: "La cuenta debe tener al menos 5 caracteres." }),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
    roles: z.string(),
    sucursalId: z.number({ required_error: mensajeRequerido }),

  }).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
    
   /* nombre: z
        .string()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    apellido: z
        .string()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    idRol: z.number({ required_error: mensajeRequerido }),
    idSucursal: z.number({ required_error: mensajeRequerido }),*/
});
