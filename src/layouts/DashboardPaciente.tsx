import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  BookMarked,
  User,
  Settings,
  Users2,
  Building2,
  NotebookTabs,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Outlet } from "react-router-dom";
import { LucideProps } from "lucide-react";

interface NavItem {
  name: string;
  to: string;
  icon: React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;
  tooltip?: string;
  active?: boolean;
}

interface AsideNavProps {
  items: NavItem[];
}

const items = [
  { name: "Home", to: "estudio", icon: Home, tooltip: "Estudios" },
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

const Sidebar: React.FC<AsideNavProps> = ({ items }) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {items.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <Link
                to={item.to}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  item.active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            </TooltipTrigger>
            {item.tooltip && (
              <TooltipContent side="right">{item.tooltip}</TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              {/* Icono de ajustes */}
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export const DashboardPaciente: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar items={items} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
