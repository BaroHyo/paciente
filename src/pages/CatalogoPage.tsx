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
import { ModalDynamic, TableDynamic } from "@/components/layout";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormCatalogo } from "@/forms";
import useCategoriaService from "@/hooks/useCategoriaService";
import useCategoriaServiceDet, {
  ResponseCategoriaDet,
} from "@/hooks/useCategoriaServiceDet";
import { ApiResponse } from "@/services/GenericService";
import {
  CategoriaDet,
  useAllDemo,
  useCreateDemo,
  useDeleteDemo,
} from "@/api/demo";
import { CatalogoSchema } from "@/schema";
import { z } from "zod";

const columns: ColumnDef<CategoriaDet>[] = [
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

      const { mutate } = useDeleteDemo();

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
            <DropdownMenuItem onClick={() => mutate(payment.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const SelectCategoria: React.FC = () => {
  const { useFetchCategorias } = useCategoriaService();
  const { data: categorias, isLoading, isError } = useFetchCategorias();

  if (isError) return <div>Error loading categories</div>;

  return (
    <Select>
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
            categorias?.map(({ id, nombre }) => (
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
  const { data: categoria, isLoading } = useAllDemo();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => setModalOpen(false);

  if (isLoading) return <div>Error loading categories</div>;

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Catalogo</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4">
            <SelectCategoria />
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
          <TableDynamic data={categoria || []} columns={columns} />
        </div>

        <ModalDynamic
          title="Registrar Catalogo"
          description="Formulario Catalogos"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <FormCatalogo categoriaId={1} CloseModal={handleCloseModal} />
        </ModalDynamic>
      </CardContent>
    </Card>
  );
};
