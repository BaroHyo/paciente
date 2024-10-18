import { z } from "zod";

const mensajeRequerido = "Debe completar este campo.";

export const PersonaSchema = z.object({
    id: z.number().optional(),
    primerNombre: z
        .string()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    segundoNombre: z.string().optional(),
    apellidoPaterno: z
        .string()
        .min(2, { message: "El apellido paterno debe tener al menos 2 caracteres." }),
    apellidoMaterno: z.string().optional(),
    fechaNacimiento: z.date({ required_error: mensajeRequerido }),
    genero: z.number({ required_error: mensajeRequerido }),
    cedulaIdentidad: z
        .string()
        .min(9, { message: "La cédula de identidad debe tener al menos 2 caracteres." }),
    correo: z
        .string()
        .optional(),
});
