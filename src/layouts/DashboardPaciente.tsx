import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "@/components/layout";
import {
  Home,
  BookMarked,
  User,
  Users2,
  Building2,
  NotebookTabs,
} from "lucide-react";

const items = [
  { name: "Home", to: "bienvenido", icon: Home, tooltip: "Inicio" },
  { name: "Usuarios", to: "usuario", icon: User, tooltip: "Usuarios" },
  { name: "Persona", to: "persona", icon: User, tooltip: "Persona" },
  {
    name: "Catalogos",
    to: "catalogo",
    icon: BookMarked,
    tooltip: "Catalogos",
  },
  { name: "Estudios", to: "estudio", icon: Building2, tooltip: "Estudios" },
  { name: "Medicos", to: "medico", icon: Users2, tooltip: "Medicos" },
  {
    name: "Pacientes",
    to: "paciente",
    icon: NotebookTabs,
    tooltip: "Pacientes",
  },
];

export const DashboardPaciente: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar items={items} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header items={items} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
