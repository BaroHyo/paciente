import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { CatalogoSchema } from '@/schema';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/components/form';


export const FormCatalogo: React.FC = () => {


    const form = useForm<z.infer<typeof CatalogoSchema>>({
        resolver: zodResolver(CatalogoSchema),
        defaultValues: {

        },
    });

    const onSubmit = async (data: z.infer<typeof CatalogoSchema>) => {

    };
    return (
        <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <InputForm
                        control={form.control}
                        name="nombre"
                        label="Nombre"
                        placeholder="Ingrese su cuenta."
                    />
                </div>
                <div className="grid gap-2">
                    <InputForm
                        control={form.control}
                        name="valor"
                        label="Valor"
                        placeholder="Ingrese su cuenta."
                    />
                </div>
                <div className="grid gap-2">
                    <InputForm
                        control={form.control}
                        name="ordenar"
                        label="Ordenar"
                        placeholder="Ingrese su cuenta."
                    />
                </div>
            </form>
        </Form>
    )
}
