import { dataEstudio, doctores, formaPago, turnoData } from "@/data"

export const getByIdMedico = (id: number): string | undefined => {
    const medico = doctores.find(m => m.value === id);
    return medico?.label;
};

export const getByIdEstudio = (id: number): string | undefined => {
    const estudio = dataEstudio.find(e => e.value === id);
    return estudio?.label;
}

export const getByIdTipoEstudio = (idEstudio: number, idTipoEstudio: number): string | undefined => {
    const estudio = dataEstudio.find(e => e.value === idEstudio);
    const tipoEstudio = estudio?.tipoEstudio?.find(t => t.value === idTipoEstudio);
    return tipoEstudio?.label;
};

export const getByIdTurno = (id: number): string | undefined => {
    const turno = turnoData.find(tu => tu.value === id);
    return turno?.label;
}
export const getByIdFormaPago = (id: number): string | undefined => {
    const forma = formaPago.find(fo => fo.value === id);
    return forma?.label;
}