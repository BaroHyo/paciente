import { z } from "zod";

const mensajeRequerido = "Debe completar este campo.";

export const CatalogoSchema = z.object({
    idCatalogo: z.number({ required_error: mensajeRequerido }),
    nombre: z
        .string()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    valor: z
        .string()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
    ordenar: z
        .string({ required_error: mensajeRequerido })
        .regex(/^\d+$/, { message: "El orden debe contener solo números." }) // Validación de solo números
        .transform((val) => val.trim()), // Remover espacios en blanco
});
