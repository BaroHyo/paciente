import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { PersonaSchema } from '@/schema/PersonaSchema';
import { DateForm, InputForm, SelectForm } from '@/components/form';
import { Button } from '@/components/ui/button';

export const FormPersona: React.FC = () => {

  const form = useForm<z.infer<typeof PersonaSchema>>({
    resolver: zodResolver(PersonaSchema),
    defaultValues: {
      id: 0,
      primerNombre: '',
      segundoNombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      fechaNacimiento: undefined,
      genero: undefined,
      cedulaIdentidad: '',
      correo: ''
    },
  });


  const onSubmit = async (data: z.infer<typeof PersonaSchema>) => {
    console.log(data);
  };


  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
          <DateForm
            control={form.control}
            name="fechaNacimiento"
            label="Fecha de Nacimiento"
          />
        </div>
        <div>
          <SelectForm
            control={form.control}
            name="genero"
            label="Genero"
            options={[]}
            labelKey="value"
            valueKey="id"
          />
        </div>
        <div>
          <InputForm
            control={form.control}
            name="cedulaIdentidad"
            label="Cedula Identidad"
            placeholder="Ingrese la cedula de identidad."
          />
        </div>
        <div>
          <InputForm
            control={form.control}
            name="correo"
            label="Correo"
            placeholder="Ingrese el correo electronico."
          />
        </div>
        <div className='col-span-2'>
        <Button type='submit' className='w-full'>
          Agregar
        </Button>
        </div>
    
      </form>
    </Form>
  )
}
