import React from "react";
import { CustomCard, ModalDynamic } from "@/components/layout";
import useModal from "@/hooks/useModal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FormUsuario } from "@/form";

export const UsuarioPage: React.FC = () => {

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  return (
    <CustomCard
      title="Usuario"
      description="Gestionar Usuario lista insertar eliminar y actulizar">
      <div className="w-full">
        <div className="flex items-center py-4">
          <Button
            size="sm"
            className="ml-auto h-8 gap-1 ma"
            onClick={handleOpenModal}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar
            </span>
          </Button>
        </div>
        {isModalOpen && (
            <ModalDynamic
              title="Registrar Usuaario"
              description="Formulario Usuaario"
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            >
               <FormUsuario/>
            </ModalDynamic>
          )}


      </div>
    </CustomCard>
  );
};
