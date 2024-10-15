import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { UsuarioSchema } from '@/schema';
import { SelectForm, InputForm, DateForm } from '@/components/form';

const GENERO = [
  { id: 1, value: 'Maculino' },
  { id: 2, value: 'Femenino' }
]

export const FormUsuario: React.FC = () => {

  const form = useForm<z.infer<typeof UsuarioSchema>>({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: {

    },
  });


  const onSubmit = async (data: z.infer<typeof UsuarioSchema>) => {

  };


  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className='md:col-span-2'>
          <InputForm
            control={form.control}
            name="nombre"
            label="Nombre Completo"
            placeholder="Ingrese el nombre completo del paciente."
          />
        </div>
        <div>
          <InputForm
            control={form.control}
            name="apellido"
            label="Apellido Paterno"
            placeholder="Ingrese el nombre completo del paciente."
          />
        </div>
        <div>
          <InputForm
            control={form.control}
            name="apellido"
            label="Apellido Materno"
            placeholder="Ingrese el nombre completo del paciente."
          />
        </div>
        <div>
          <SelectForm
            control={form.control}
            name="apellido"
            label="Genero"
            options={GENERO}
            labelKey="value"
            valueKey="id"
          />
        </div>
        <div>
          <DateForm
            control={form.control}
            name="apellido"
            label="Fecha de Nacimiento"
          />
        </div>
        <div>
          <SelectForm
            control={form.control}
            name="apellido"
            label="Sucursal"
            options={GENERO}
            labelKey="value"
            valueKey="id"
          />
        </div>
        <div>
          <SelectForm
            control={form.control}
            name="apellido"
            label="Rol"
            options={GENERO}
            labelKey="value"
            valueKey="id"
          />
        </div>
      </form>
    </Form>
  )
}
