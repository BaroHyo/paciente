import { z } from "zod";

const mensajeRequerido = "Debe completar este campo.";

export const PacienteSchema = z.object({
  fecha: z.date({ required_error: mensajeRequerido }),
  nombre: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  edad: z
    .number({ required_error: mensajeRequerido })
    .min(0, { message: "La edad debe ser un número positivo." }), // Asegúrate de que la edad sea positiva
  idDoctor: z.number({ required_error: mensajeRequerido }),
  idEstudio: z.number({ required_error: mensajeRequerido }),
  idTipoEstudio: z.number({ required_error: mensajeRequerido }),
  cancelo: z.number({ required_error: mensajeRequerido }),
  idTurno: z.number({ required_error: mensajeRequerido }),
  idFormaPago: z.number({ required_error: mensajeRequerido }),
  nroFactura: z
    .string({ required_error: mensajeRequerido })
    .min(1, { message: "El número de factura no puede estar vacío." }),
  seguro: z.string({ required_error: mensajeRequerido }),
  telefono: z
    .string({ required_error: mensajeRequerido })
    .regex(/^\d+$/, { message: "El teléfono debe contener solo números." }) // Validación de solo números
    .transform((val) => val.trim()), // Remover espacios en blanco
});
