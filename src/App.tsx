import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import {
  CatalogoPage,
  EstudioPage,
  LoginPage,
  MedicoPage,
  PacientePage,
  UsuarioPage,
  WelcomePage,
} from "./pages";
import { DashboardPaciente } from "./layouts/DashboardPaciente";
import { useAuthStore } from "./stores/auth";
import { ErrorAlert, ProtectedRoute } from "./components/layout";

const App: React.FC = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  console.log(isAuth);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: isAuth ? (
        <Navigate to="/dashboard/bienvenido" replace />
      ) : (
        <LoginPage />
      ), // Redirige si ya está autenticado
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute isAllowed={isAuth}>
          <DashboardPaciente />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "bienvenido",
          element: <WelcomePage />,
        },
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
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ]);

  return (
    <TooltipProvider>
      <ErrorAlert />
      <RouterProvider router={router} />
    </TooltipProvider>
  );
};

export default App;
