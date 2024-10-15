import { z } from "zod";

const mensajeRequerido = "Debe completar este campo.";

export const UsuarioSchema = z.object({
    nombre: z
        .string()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    apellido: z
        .string()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    idRol: z.number({ required_error: mensajeRequerido }),
    idSucursal: z.number({ required_error: mensajeRequerido }),
});
