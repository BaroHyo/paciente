export interface Persona {
  id: number;
  primerNombre: string;
  segundoNombre?: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  fechaNacimiento: Date;
  genero: string;
  tipoDocumento: string;
  numeroDocumento: string;
  direccion?: string;
  telefono?: string;
}
