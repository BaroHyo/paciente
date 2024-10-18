import { z } from "zod";

const mensajeRequerido = "Debe completar este campo.";

export const CatalogoSchema = z.object({
  id: z.number({ required_error: mensajeRequerido }),
  categoriaId: z.number({ required_error: mensajeRequerido }),
  nombre: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  valor: z
    .string()
    .min(2, { message: "El valor debe tener al menos 2 caracteres." }),
  orden: z.number({ required_error: mensajeRequerido }),
});
