import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { DraftPaciente, Paciente } from './interfaces/paciente'


type PatientState = {
    patients: Paciente[]
    activeId: Paciente['id']
    addPatient: (data: DraftPaciente) => void
    deletePatient: (id: Paciente['id']) => void
    getPatientById: (id: Paciente['id']) => void
    updatePatient: (data: DraftPaciente) => void
}


const createPatient = (patient: DraftPaciente): Paciente => {
    return { ...patient, id: uuidv4() }
}


export const usePatientStore = create<PatientState>()(
    devtools(
        persist((set) => ({
            patients: [],
            activeId: '',
            addPatient: (data) => {
                const newPatient = createPatient(data)
                set((state) => ({
                    patients: [...state.patients, newPatient]
                }))
            },
            deletePatient: (id) => {
                set((state) => ({
                    patients: state.patients.filter(patient => patient.id !== id)
                }))
            },
            getPatientById: (id) => {
                set(() => ({
                    activeId: id
                }))
            },
            updatePatient: (data) => {
                set((state) => ({
                    patients: state.patients.map(patient => patient.id === state.activeId ? { id: state.activeId, ...data } : patient),
                    activeId: ''
                }))
            }
        }), {
            name: 'patient-storage'
        })
    )
)