import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardHome from "./dashboard/DashboardHome";
import { PacienteForm, PacienteHome } from "./pages/paciente/views";
import { TooltipProvider } from "./components/ui/tooltip";


const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardHome />,
    children: [
      {
        path: '/',
        element: <PacienteHome />,
      },
      {
        path: "/new",
        element: <PacienteForm />,
      }
    ],
  },
]);


const App = () => {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  )
}

export default App