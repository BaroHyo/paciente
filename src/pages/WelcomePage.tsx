import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const WelcomePage: React.FC = () => {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardContent>
        <h1 className="text-3xl font-bold mb-4 text-center">¡Bienvenido!</h1>
        <p className="text-lg mb-4 text-center">
          Estamos felices de tenerte aquí. Explora nuestras características y
          comienza tu viaje con nosotros.
        </p>
      </CardContent>
    </Card>
  );
};
