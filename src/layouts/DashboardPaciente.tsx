import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookMarked,
  User,
  Settings,
  Users2,
  Building2,
  NotebookTabs,
  Search,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Outlet } from "react-router-dom";
import { LucideProps } from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useUiStore } from "@/store/ui";

interface NavItem {
  name: string;
  to: string;
  icon: React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
  tooltip?: string;
}

interface AsideNavProps {
  items: NavItem[];
}

const items = [
  { name: "Home", to: "bienvenido", icon: Home, tooltip: "Inicio", },
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

  const storeUI = useUiStore();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {items.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <Link
                to={item.to}
                onClick={() => storeUI.setActiveItem(item.to)} // Cambia el estado activo
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${storeUI.activeItem === item.to
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

const Header: React.FC = () => {

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {
            pathSegments.map((segment, index) => {
              const to = `/${pathSegments.slice(0, index + 1).join('/')}`;
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={to}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export const DashboardPaciente: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar items={items} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
