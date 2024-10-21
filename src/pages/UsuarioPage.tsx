import React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import useModal from "@/hooks/useModal";
import { ModalDynamic } from "@/components/layout";
import { FormPersona } from "@/form/FormPersona";
import useCrudServer from "@/hooks/useCrudServer";
import { Persona } from "@/types/Persona.interface";
import { PersonaSchema } from "@/schema/PersonaSchema";

export const UsuarioPage: React.FC = () => {
  const { create } = useCrudServer<Persona>("/persona", ["persona-all"]);

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  const handleSubmit = (data: z.infer<typeof PersonaSchema>) => {
    create.mutate(data);
    handleCloseModal();
  };

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
          {isModalOpen && (
            <ModalDynamic
              title="Registro Usuario"
              description="Complete el formulario."
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            >
              <FormPersona handleSubmit={handleSubmit} />
            </ModalDynamic>
          )}
        </div>
      </div>
    </div>
  );
};
