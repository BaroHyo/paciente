import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormLogin } from "@/forms";

export function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Bienvenido</CardTitle>
          <CardDescription>
            Ingrese su cuenta a continuación para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormLogin />
        </CardContent>
      </Card>
    </div>
  );
}
