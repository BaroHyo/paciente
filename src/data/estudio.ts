import { Estudio } from "@/interfaces/estudio.interface";

export const dataEstudio: Estudio[] = [
    {
        value: 1, label: "DO",
        tipoEstudio: [
            { value: 1, label: "D. OSEA" },
            { value: 2, label: "D. FEMUR" },
            { value: 3, label: "D. CABEZA" },
        ]
    },
    {
        value: 2, label: "ECO",
        tipoEstudio: [
            { value: 1, label: "ABDOMINAL" },
            { value: 2, label: "TV" },
            { value: 3, label: "RODILLA DERECHA" },
            { value: 4, label: "HOMBRO DERECHO" },
        ]
    },
    {
        value: 3, label: "RX",
        tipoEstudio: [
            { value: 1, label: "ABDOMEN DE PIE" },
            { value: 2, label: "TORAX PA" },
            { value: 3, label: "PELVIS AP AXIALES" },
        ]
    },
    {
        value: 4, label: "TM",
        tipoEstudio: [
            { value: 1, label: "CRANEO SIMPLE" },
            { value: 2, label: "PELVIS" },
            { value: 3, label: "COL LUMBAR" },
            { value: 4, label: "CUELLO MARCAGE" },
        ]
    },
    {
        value: 5, label: "RS",
        tipoEstudio: [
            { value: 1, label: "RODILLA IZQUIERDA SIMPLE" },
            { value: 2, label: "CRANEO SIMPLE" },
        ]
    },
]

