import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import useModal from "@/hooks/useModal";
import { PersonaSchema } from "@/schema/PersonaSchema";
import { z } from "zod";
import { FormPersona } from "@/form/FormPersona";
import { ClockLoader } from 'react-spinners';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useCrudServer from "@/hooks/useCrudServer";
import { Persona } from "@/types/Persona.interface";
import { formatDate } from "@/lib/format";


interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode; // Para incluir contenido dinámico dentro del Card
}

const CustomCard: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <Card x-chunk="dashboard-06-chunk-0" className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (<CardDescription>
          {description}
        </CardDescription>)}
        <CardContent>
          {children}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

type SheetSideType = typeof SHEET_SIDES[number];


type Props = {
  isOpen: boolean;
  side: SheetSideType;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const CustomSheetForm: React.FC<Props> = ({ isOpen, side, title, description, onClose, children }) => {
  return (
    <Sheet open={isOpen} modal={true} onOpenChange={onClose}>
      <SheetContent side={side} onInteractOutside={(event) => event.preventDefault()}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {
            description && (
              <SheetDescription>
                {description}
              </SheetDescription>
            )
          }
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>

  )
}

const payments: ColumnDef<Persona>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "primerNombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombres
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{`${row.getValue("primerNombre")} ${row.getValue("segundoNombre")}`}</div>
    ),
  },

  {
    accessorKey: "apellidoPaterno",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellidos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{`${row.getValue("apellidoPaterno")} ${row.getValue("apellidoMaterno")}`}</div>
    ),
  },
  {
    accessorKey: "fechaNacimiento",
    header: "Fecha Nacimiento",
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(new Date(row.getValue("fechaNacimiento")))}</div>
    ),
  },
  {
    accessorKey: "genero",
    header: "Genero",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("genero")}</div>
    ),
  },
  {
    accessorKey: "tipoDocumento",
    header: "Tipo Docuemnto",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tipoDocumento")}</div>
    ),
  },
  {
    accessorKey: "numeroDocumento",
    header: "Nro. Documento",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("numeroDocumento")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => { }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

/*
          */

export const PersonaPage: React.FC = () => {

  const { getAll, create } = useCrudServer<Persona>("/persona", ["persona-all"])

  const { data: personas, isLoading } = getAll;

  const data = personas || [];


  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns: payments,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })




  const handleSubmit = (data: z.infer<typeof PersonaSchema>) => {
    create.mutate(data)
    handleCloseModal();
  };


  return (
    <CustomCard
      title="Persona"
      description="Gestionar Personas lista insertar eliminar y actulizar">
      {
        isLoading ? (<div className="absolute inset-0 flex justify-center items-center">
          <ClockLoader size={35} color={"#000000"} loading={isLoading} />
        </div>) : (
          <div className="w-full">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter emails..."
                value={(table.getColumn("primerNombre")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("primerNombre")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
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
            <CustomSheetForm
              isOpen={isModalOpen}
              side="top"
              title="Formulario Persona"
              onClose={handleCloseModal}
            >
              <FormPersona handleSubmit={handleSubmit} />
            </CustomSheetForm>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={payments.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )
      }

    </CustomCard>
  );
};

/* */

{/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}