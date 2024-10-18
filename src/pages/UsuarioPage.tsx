import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import useModal from "@/hooks/useModal";
import { ModalDynamic } from "@/components/layout";
import { FormPersona } from "@/form/FormPersona";



export const UsuarioPage: React.FC = () => {

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Button
              variant="ghost"
              onClick={handleOpenModal}
              className="h-8 px-2 lg:px-3"
            >
              Agregar
              <PlusCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="rounded-md border">

          <ModalDynamic
            title="Registro Usuario"
            description="Complete el formulario."
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          >
            <FormPersona />
          </ModalDynamic>

        </div>
      </div>
    </div>
  );

}
