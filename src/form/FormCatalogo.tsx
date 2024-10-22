import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CatalogoSchema } from "@/schema";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/form";
import { Button } from "@/components/ui/button";

type Props = {
  categoriaId: number;
  closeSubmitModal: (data: z.infer<typeof CatalogoSchema>) => void;
};

export const FormCatalogo: React.FC<Props> = ({ categoriaId, closeSubmitModal }) => {

  const form = useForm<z.infer<typeof CatalogoSchema>>({
    resolver: zodResolver(CatalogoSchema),
    defaultValues: {
      id: 0,
      categoriaId,
      nombre: "",
      valor: "",
      orden: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof CatalogoSchema>) => {
    closeSubmitModal(data);
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <InputForm
            control={form.control}
            name="nombre"
            label="Nombre"
            placeholder="Ingrese el nombre."
          />
        </div>
        <div className="grid gap-2">
          <InputForm
            control={form.control}
            name="valor"
            label="Valor"
            placeholder="Ingrese el valor."
          />
        </div>
        <div className="grid gap-2">
          <InputForm
            control={form.control}
            name="orden"
            label="Orden"
            type="number"
            placeholder="Ingrese el orden."
          />
        </div>
        <Button type="submit" className="w-full">
          Guardar
        </Button>
      </form>
    </Form>
  );
};
