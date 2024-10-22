import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomCard, ModalDynamic, TableDynamic } from "@/components/layout";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormCatalogo } from "@/form";
import useCrudServer from "@/hooks/useCrudServer";
import { Categoria, Tipo } from "@/types/Categoria.interface";
import useModal from "@/hooks/useModal";
import { CatalogoSchema } from "@/schema";
import { z } from "zod";
import { ClockLoader } from "react-spinners";


const columns: ColumnDef<Categoria>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nombre")}</div>
    ),
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("valor")}</div>
    ),
  },
  {
    accessorKey: "orden",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Orden
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("orden")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      // const { mutate } = useDeleteDemo();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(payment.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type Props = {
  setCategoria: (value: number) => void
}

const SelectCategoria: React.FC<Props> = ({ setCategoria }) => {
  const { getAll } = useCrudServer<Tipo>("/categorias", ["categoria-all"])
  const { data: tipo, isLoading, isError } = getAll;

  if (isError) return <div>Error loading categories</div>;

  return (
    <Select onValueChange={(value: string) => setCategoria(parseInt(value, 10))}>
      <SelectTrigger className="max-w-sm">
        <SelectValue placeholder="Seleccione una categoría" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : (
            tipo?.map(({ id, nombre }) => (
              <SelectItem key={id} value={id.toString()}>
                {nombre}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const CatalogoPage: React.FC = () => {

  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const { create, getAll } = useCrudServer<Categoria>("/categoria-detalle", ["categoria-detalle-all"])
  const { data: categoria, isLoading, error } = getAll;

  const handleSubmit = (data: z.infer<typeof CatalogoSchema>) => {
    create.mutate(data)
    handleCloseModal();
  };

  if (error) return <div>Error loading categories</div>;

  return (
    <CustomCard
      title="Catalogo"
      description="Gestionar catalog lista insertar eliminar y actulizar">
      {
        isLoading ? (<div className="absolute inset-0 flex justify-center items-center">
          <ClockLoader size={35} color={"#000000"} loading={isLoading} />
        </div>) : (<div className="w-full">
          <div className="flex items-center py-4">
            <SelectCategoria setCategoria={setCategoriaId} />
            <Button
              size="sm"
              className="ml-auto h-8 gap-1 ma"
              onClick={handleOpenModal}
              disabled={categoriaId === 0 ? true : false}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          </div>
          {isModalOpen && (
            <ModalDynamic
              title="Registrar Catalogo"
              description="Formulario Catalogos"
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            >
              <FormCatalogo
                categoriaId={categoriaId}
                closeSubmitModal={handleSubmit}
              />
            </ModalDynamic>
          )}
          <TableDynamic
            data={categoriaId == 0 ? [] : categoria?.filter(item => item.categoriaId === categoriaId)!}
            columns={columns}
          />
        </div>)
      }
    </CustomCard>
  );
};
