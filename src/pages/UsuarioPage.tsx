import React from "react";
import { DynamicTabs } from "@/components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const tabsData = [
  {
    label: "All",
    value: "all",
    content: <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong>{" "}
          products
        </div>
      </CardFooter>
    </Card>

  },
  {
    label: "Active",
    value: "active",
    content: <div>Active products content</div>
  },
  {
    label: "Draft",
    value: "draft",
    content: <div>Draft products content</div>
  },
  {
    label: "Archived",
    value: "archived",
    content: <div>Archived products content</div>,
    hiddenOnSmallScreens: true
  }
];

export const UsuarioPage: React.FC = () => {
  const handleAddProduct = () => {
    console.log("Add product clicked!");
  };

  return <DynamicTabs defaultTab="all" tabs={tabsData} onAddProduct={handleAddProduct} />;

}
