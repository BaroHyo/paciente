import {
    MoreHorizontal,
    PlusCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { usePatientStore } from "@/store"
import { useNavigate } from "react-router-dom"
import { Paciente } from "@/interfaces/paciente"


export const PacienteHome = () => {

    const patients = usePatientStore((state) => state.patients);
    const deletePatient = usePatientStore((state) => state.deletePatient)
    const getPatientById = usePatientStore((state) => state.getPatientById)

    const navigate = useNavigate();


    const handleClick = (patient: Paciente) => {
        deletePatient(patient.id)
    }
    const handleEditClick = (patient: Paciente) => {
        navigate(`edit/${patient.id}`)
        getPatientById(patient.id)
    }



    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">all</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <Button
                            size="sm"
                            className="h-8 gap-1"
                            onClick={() => { navigate("/new") }}
                        >
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Registrar
                            </span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Pacientes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="hidden md:table-cell">Fecha</TableHead>
                                        <TableHead className="hidden md:table-cell">Paciente</TableHead>
                                        <TableHead className="hidden md:table-cell">Medico</TableHead>
                                        <TableHead className="hidden md:table-cell">Estudio</TableHead>
                                        <TableHead className="hidden md:table-cell">Tipo Estudio</TableHead>
                                        <TableHead className="hidden md:table-cell">Cancelo</TableHead>
                                        <TableHead className="hidden md:table-cell">Debe</TableHead>
                                        <TableHead className="hidden md:table-cell">Forma de Pago</TableHead>
                                        <TableHead className="hidden md:table-cell">Nro Factura</TableHead>
                                        <TableHead className="hidden md:table-cell">Observacion</TableHead>
                                        <TableHead className="hidden md:table-cell">Telefono</TableHead>
                                        <TableHead>
                                            <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patients.map((paciente) => (
                                        <TableRow key={paciente.id}>
                                            <TableCell>{paciente.fecha ? new Date(paciente.fecha).toLocaleDateString() : 'Fecha no disponible'}</TableCell>
                                            <TableCell>{paciente.nombre}</TableCell>
                                            <TableCell>{paciente.medico}</TableCell>
                                            <TableCell>{paciente.estudio}</TableCell>
                                            <TableCell>{paciente.tipoEstudio}</TableCell>
                                            <TableCell>{paciente.cancelo}</TableCell>
                                            <TableCell>{0}</TableCell>
                                            <TableCell>{paciente.formaPago}</TableCell>
                                            <TableCell>{paciente.nroFactura}</TableCell>
                                            <TableCell>{paciente.seguro}</TableCell>
                                            <TableCell>{paciente.telefono}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleEditClick(paciente)}>Editar</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleClick(paciente)}>Eliminar</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}
