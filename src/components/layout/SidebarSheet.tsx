import React from "react";
import { useUiStore } from "@/stores/useUiStore";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PanelLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AsideNavProps } from "@/types";

export const SidebarSheet: React.FC<AsideNavProps> = ({ items }) => {
  const storeUI = useUiStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {items.map((item) => (
            <React.Fragment key={item.name}>
              <Link
                key={item.name}
                to={item.to}
                onClick={() => storeUI.setActiveItem(item.to)} // Cambia el estado activo
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
