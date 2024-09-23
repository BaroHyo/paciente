export type Paciente = {
    id: string
    fecha: Date
    nombre: string
    edad: number
    medico: string | undefined
    estudio: string | undefined
    tipoEstudio: string | undefined
    cancelo: number
    turno: string | undefined
    formaPago: string | undefined
    nroFactura: string
    seguro: string
    telefono: number,
    idDoctor: number,
    idEstudio: number,
    idTipoEstudio: number,
    idTurno: number,
    idFormaPago: number,
}


export type DraftPaciente = Omit<Paciente, 'id'>
