import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/form";
import { Button } from "@/components/ui/button";

import { LoginSchema } from "@/schema";
import { useAuthStore } from "@/stores/useAuthStore";
import { loginRequest } from "@/api/auth";
// import { Alert, AlertDescription } from "@/components/ui/alert";

export const FormLogin: React.FC = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      cuenta: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const resLogin = await loginRequest({
      cuenta: data.cuenta,
      password: data.password,
    });
    setToken(resLogin.token);
    navigate("/dashboard/bienvenido");
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
        {/* <div className="grid gap-2">
          <Alert variant="destructive">
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </div> */}
        <Button type="submit" className="w-full">
          Ingresar
        </Button>
      </form>
    </Form>
  );
};
