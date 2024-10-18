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
import { useAuthStore } from "@/stores/useAuthStore";

const items = [
  { name: "Home", to: "bienvenido", icon: Home, tooltip: "Inicio" },
  { name: "Usuarios", to: "usuario", icon: User, tooltip: "Usuarios" },
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

  const isRoles = useAuthStore((state) => state.roles);
  const menu = isRoles !=='admin' ? items.filter((item) => item.to === 'paciente'): items;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar items={menu} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header items={menu} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
