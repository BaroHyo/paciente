import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { useAuth } from "./hooks/useAuth";
import {
  CatalogoPage,
  EstudioPage,
  LoginPage,
  MedicoPage,
  PacientePage,
  UsuarioPage,
} from "./pages";
import { DashboardPaciente } from "./layouts/DashboardPaciente";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardPaciente />,
      children: [
        {
          path: "usuario",
          element: <UsuarioPage />,
        },
        {
          path: "catalogo",
          element: <CatalogoPage />,
        },
        {
          path: "estudio",
          element: <EstudioPage />,
        },
        {
          path: "medico",
          element: <MedicoPage />,
        },
        {
          path: "paciente",
          element: <PacientePage />,
        },
      ],
    },
    /* {
      path: "/paciente",
      element: isAuthenticated ? (
        <PacientePage />
      ) : (
        <Navigate to="/login" replace />
      ),
    },*/
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ]);

  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  );
};

export default App;
