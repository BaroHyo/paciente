export interface Persona {
    id: number;
    primerNombre: string;
    segundoNombre?: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento?: Date;
    genero: string;
    cedulaIdentidad: string;
    correo: string;
}