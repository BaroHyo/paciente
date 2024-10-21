import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PersonaSchema } from "@/schema/PersonaSchema";
import { DateForm, InputForm, SelectForm } from "@/components/form";
import { Button } from "@/components/ui/button";

const TIPO_DOCUMENTO = [
  { name: "Cedula Identidad", value: "cedula identidad" },
  { name: "Pasaporte", value: "pasaporte" },
];
const GENERO = [
  { name: "Masculino", value: "masculino" },
  { name: "Fermenino", value: "femenino" },
];

type Props = {
  handleSubmit: (data: z.infer<typeof PersonaSchema>) => void;
};

export const FormPersona: React.FC<Props> = ({ handleSubmit }) => {
  const form = useForm<z.infer<typeof PersonaSchema>>({
    resolver: zodResolver(PersonaSchema),
    defaultValues: {
      id: 0,
      primerNombre: "",
      segundoNombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      fechaNacimiento: undefined,
      numeroDocumento: "",
      direccion: "",
      telefono: "",
    },
  });

  const onSubmit = (data: z.infer<typeof PersonaSchema>) => {
    handleSubmit(data);
  };

  return (
    <Form {...form}>
      <div className="max-w-full p-10 overflow-auto">
        <form
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <InputForm
              control={form.control}
              name="primerNombre"
              label="Primer Nombre"
              placeholder="Ingrese el primer nombre."
            />
          </div>
          <div>
            <InputForm
              control={form.control}
              name="segundoNombre"
              label="Segundo Nombre"
              placeholder="Ingrese el segundo nombre"
            />
          </div>
          <div>
            <InputForm
              control={form.control}
              name="apellidoPaterno"
              label="Apellido Paterno"
              placeholder="Ingrese el apellido paternos."
            />
          </div>
          <div>
            <InputForm
              control={form.control}
              name="apellidoMaterno"
              label="Apellido Materno"
              placeholder="Ingrese el apellido materno."
            />
          </div>
          <div>
            <SelectForm
              control={form.control}
              name="genero"
              label="Género"
              options={GENERO}
              labelKey="name"
              valueKey="value"
            />
          </div>
          <div>
            <DateForm
              control={form.control}
              name="fechaNacimiento"
              label="Fecha de Nacimiento"
            />
          </div>
          <div>
            <SelectForm
              control={form.control}
              name="tipoDocumento"
              label="Tipo Documento"
              options={TIPO_DOCUMENTO}
              labelKey="name"
              valueKey="value"
            />
          </div>
          <div>
            <InputForm
              control={form.control}
              name="numeroDocumento"
              label="Número Documento"
              placeholder="Ingrese el nro. documento."
            />
          </div>
          <div className="col-span-2">
            <Button type="submit" className="w-full">
              Agregar
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};
