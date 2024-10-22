import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { UsuarioSchema } from '@/schema';
import useCrudServer from '@/hooks/useCrudServer';
import { Persona } from '@/types/Persona.interface';
import { ComboxForm, InputForm, PasswordInputForm, SelectForm } from '@/components/form';
import { Button } from '@/components/ui/button';
import { ClockLoader } from 'react-spinners';





export const FormUsuario: React.FC = () => {

  const { getAll } = useCrudServer<Persona>("/persona", ["persona-all"])

  const { data: personas, isLoading } = getAll;
  console.log(personas);


  const form = useForm<z.infer<typeof UsuarioSchema>>({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: {
      id: 0,
      personaId: undefined,
      cuenta: '',
      password: '',
      confirmPassword: '',
      roles: '',
      sucursalId: 0
    },
  });


  const onSubmit = async (data: z.infer<typeof UsuarioSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className='md:col-span-2'>
          {isLoading ?
            (<div className="flex items-center justify-center m-0">
              <ClockLoader size={15} color={"#000000"} loading={isLoading} />
            </div>) : (<ComboxForm
              control={form.control}
              name="personaId"
              label="Persona"
              options={personas?.map(item => {
                return {
                  ...item,
                  nombreCompleto: `${item.primerNombre} ${item.segundoNombre} ${item.apellidoPaterno} ${item.apellidoMaterno}`
                }
              }) || []}
              labelKey="nombreCompleto"
              valueKey="id"
            />)
          }

        </div>
        <div className='md:col-span-2'>
          <InputForm
            control={form.control}
            name="cuenta"
            label="Cuenta"
            placeholder="Ingrese la cuenta"
          />
        </div>
        <div className='md:col-span-2'>
          <PasswordInputForm
            control={form.control}
            name="password"
            label="Contraseña"
            placeholder="Ingrese contraseña."
          />
        </div>
        <div className='md:col-span-2'>
          <PasswordInputForm
            control={form.control}
            name="confirmPassword"
            label="Confirmar Contraseña"
            placeholder="Ingrese contraseña para verficar ."
          />
        </div>
        <div>
          <SelectForm
            control={form.control}
            name="roles"
            label="Rol"
            options={[]}
            labelKey="name"
            valueKey="value"
          />
        </div>
        <div>
          <SelectForm
            control={form.control}
            name="sucursalId"
            label="Sucursal"
            options={[]}
            labelKey="name"
            valueKey="value"
          />
        </div>
        <div className="col-span-2">
          <Button type="submit" className="w-full">
            Agregar
          </Button>
        </div>

      </form>
    </Form>
  )
}
