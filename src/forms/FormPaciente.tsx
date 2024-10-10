import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { PacienteSchema } from "@/schema";
import { InputForm, DateForm } from "@/components/form";
// import { useNavigate } from "react-router-dom";

export const FormPaciente = () => {
  // const navigate = useNavigate();

  const form = useForm<z.infer<typeof PacienteSchema>>({
    resolver: zodResolver(PacienteSchema),
    defaultValues: {
      fecha: new Date(),
      nombre: "",
      edad: 0,
      idDoctor: 0,
      idEstudio: 0,
      idTipoEstudio: 0,
      cancelo: 0,
      idTurno: 0,
      idFormaPago: 0,
      nroFactura: "",
      seguro: "",
      telefono: "",
    },
  });

  const onSubmit = (data: z.infer<typeof PacienteSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="max-w-2xl mx-auto p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <DateForm
              control={form.control}
              name="fecha"
              label="Fecha de Nacimiento"
            />
          </div>
          <div>
            <InputForm
              control={form.control}
              name="nombre"
              label="Nombre de Paciente"
              placeholder="Ingrese el nombre completo del paciente."
            />
          </div>
          <div>
            <InputForm
              control={form.control}
              name="edad"
              label="Edad de Paciente"
              placeholder="Ingrese la edad actual del paciente."
              type="number"
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
