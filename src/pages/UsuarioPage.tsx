import React, { useState } from "react";
import { DynamicTabs, ModalDynamic } from "@/components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
 
import { FormUsuario } from "@/forms";


const tabsData = [
  {
    label: "Todos",
    value: "todo",
    content: <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>
          Listado de usuario
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
    label: "Activos",
    value: "activos",
    content: <div>Active products content</div>
  },
  {
    label: "Inactivos",
    value: "inactivos",
    content: <div>Draft products content</div>
  },
  /*{
    label: "Archived",
    value: "archived",
    content: <div>Archived products content</div>,
    hiddenOnSmallScreens: true
  }*/
];



export const UsuarioPage: React.FC = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = () => {
    // Lógica para guardar los cambios
    console.log('Save changes');
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };



  return (<React.Fragment>
    <DynamicTabs
      defaultTab="todo"
      tabs={tabsData}
      onAddProduct={openModal}
    />
    <ModalDynamic
      title="Registrar Usuario"
      description="Formulario para registrar un nuevo usuario, donde se puede asignar el rol y la sucursal."
      onSave={handleSave}
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
    >
      <FormUsuario />
    </ModalDynamic>
  </React.Fragment>);

}
