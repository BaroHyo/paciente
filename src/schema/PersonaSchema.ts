import { z } from "zod";

const mensajeRequerido = "Debe completar este campo.";

export const PersonaSchema = z.object({
  id: z.number({ required_error: mensajeRequerido }),
  primerNombre: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  segundoNombre: z.string().optional(),
  apellidoPaterno: z.string().min(2, {
    message: "El apellido paterno debe tener al menos 2 caracteres.",
  }),
  apellidoMaterno: z.string().optional(),
  fechaNacimiento: z.date({ required_error: mensajeRequerido }),
  genero: z.string({ required_error: mensajeRequerido }),
  tipoDocumento: z.string({ required_error: mensajeRequerido }),
  numeroDocumento: z.string().min(9, {
    message: "La cédula de identidad debe tener al menos 9 caracteres.",
  }),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
});
