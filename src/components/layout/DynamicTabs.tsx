import { FC, ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface TabItem {
    label: string;
    value: string;
    content: ReactNode;
    hiddenOnSmallScreens?: boolean; // Para ocultar en pantallas pequeñas
}

interface DynamicTabsProps {
    defaultTab?: string;
    tabs: TabItem[];
    onAddProduct?: () => void;
}

export const DynamicTabs: FC<DynamicTabsProps> = ({ defaultTab = "all", tabs, onAddProduct }) => {
    return (
        <Tabs defaultValue={defaultTab}>
        <div className="flex flex-col space-y-4">
          {/* Pestañas en la parte superior */}
          <div className="flex items-center">
            <TabsList className="flex space-x-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={tab.hiddenOnSmallScreens ? "hidden sm:flex" : ""}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" onClick={onAddProduct}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar
                </span>
              </Button>
            </div>
          </div>
          
          {/* Contenido de las pestañas debajo */}
          <div>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    );
};
