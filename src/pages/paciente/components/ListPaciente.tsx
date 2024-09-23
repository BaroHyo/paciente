import {
  Table,
  TableBody,
   TableCell,
   TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePatientStore } from "@/store"

 
export const ListPaciente = () => {

  const patients = usePatientStore((state) => state.patients);


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Paciente</TableHead>
          <TableHead>Medico</TableHead>
          <TableHead>Estudio</TableHead>
          <TableHead>Tipo Estudio</TableHead>
          <TableHead>Cancelo</TableHead>
          <TableHead>Debe</TableHead>
          <TableHead>Forma de Pago</TableHead>
          <TableHead>Nro Factura</TableHead>
          <TableHead>Observacion</TableHead>
          <TableHead>Telefono</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
