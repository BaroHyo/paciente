import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/form";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";

import { LoginSchema } from "@/schema";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const FormLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      cuenta: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
    login();
    navigate("/paciente");
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <InputForm
            control={form.control}
            name="cuenta"
            label="Cuenta"
            placeholder="Ingrese su cuenta."
          />
        </div>
        <div className="grid gap-2">
          <InputForm
            control={form.control}
            type="password"
            name="password"
            label="Contraseña"
            placeholder="*********"
          />
        </div>
        <div className="grid gap-2">
          <Alert variant="destructive">
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </div>
        <Button type="submit" className="w-full">
          Ingresar
        </Button>
      </form>
    </Form>
  );
};
