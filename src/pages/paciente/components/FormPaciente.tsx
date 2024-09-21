
import { useEffect, useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { ComboxForm, DateForm, InputForm, SelectForm } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { dataEstudio, doctores, formaPago, turnoData } from "@/data";
import { tipoEstudio } from "@/interfaces/estudio.interface";


const mensage = "Debe completar este campo.";
const FormSchema = z.object({
  fecha: z.date({ required_error: mensage }),
  nombre: z.string().min(2, { message: "Nombre debe tener al menos 2 caracteres." }),
  edad: z.number({ required_error: mensage }),
  doctor: z.number({ required_error: mensage }),
  estudio: z.number({ required_error: mensage }),
  tipoEstudio: z.number({ required_error: mensage }),
  camcelo: z.number({ required_error: mensage }),
  turno: z.number({ required_error: mensage }),
  formaPago: z.number({ required_error: mensage }),
  nroFactura: z.string({ required_error: mensage }),
  seguro: z.string({ required_error: mensage }),
  telefono: z.number({ required_error: mensage }),
});

export const FormPaciente = () => {

  const [tipoEstudio, setTipoEstudio] = useState<tipoEstudio[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fecha: new Date(),
      nombre: "",
      edad: undefined,
      doctor: undefined,
      estudio: undefined,
      tipoEstudio: undefined,
      camcelo: undefined,
      turno: undefined,
      formaPago: undefined,
      nroFactura: "",
      seguro: "",
      telefono: undefined,
    },
  });

  const westudio = form.watch('estudio');

  useEffect(() => {
    if (westudio) {
      const estudio = dataEstudio.find(es => es.value == westudio);
      setTipoEstudio(estudio ? estudio.tipoEstudio : []);
    } else {
      setTipoEstudio([]);
    }
  }, [westudio]);



  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <DateForm
            control={form.control}
            name="fecha"
            label="Fecha de Nacimiento"
          />
          <InputForm
            control={form.control}
            name="nombre"
            label="Nombre de Paciente"
            placeholder="Ingrese el nombre completo del paciente."
          />
          <InputForm
            control={form.control}
            name="edad"
            label="Edad de Paciente"
            placeholder="Ingrese la edad actual del paciente."
            type="number"
          />
          <ComboxForm
            control={form.control}
            name="doctor"
            label="Medico"
            options={doctores}
            placeholder="Elige un médico."
          />
          <SelectForm
            control={form.control}
            name="estudio"
            label="Estudio"
            options={dataEstudio}
            labelKey="label"
            valueKey="value"
          />
          <SelectForm
            control={form.control}
            name="tipoEstudio"
            label="Tipo Estudio"
            options={tipoEstudio}
            labelKey="label"
            valueKey="value"
          />
          <InputForm
            control={form.control}
            name="camcelo"
            label="Cancelo"
            placeholder="Ingrese el importe."
            type="number"
          />
          <SelectForm
            control={form.control}
            name="turno"
            label="Turno"
            options={turnoData}
            labelKey="label"
            valueKey="value"
          />
          <SelectForm
            control={form.control}
            name="formaPago"
            label="Forma Pago"
            options={formaPago}
            labelKey="label"
            valueKey="value"
          />
          <InputForm
            control={form.control}
            name="nroFactura"
            label="Nro. Factura"
            placeholder="Edad del Paciente"
          />
          <InputForm
            control={form.control}
            name="seguro"
            label="Seguro"
            placeholder="Ingrese el nombre del seguro"
          />
          <InputForm
            control={form.control}
            name="telefono"
            label="teléfono"
            placeholder="Ingrese el numero de telefono"
            type="number"
          />
        </div>
        <div className="mt-4">
          <Button type="submit" className="p-2 w-full">Registrar</Button>
        </div>
      </form>
    </Form>
  )
}
