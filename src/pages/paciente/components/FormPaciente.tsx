
import { useEffect, useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { ComboxForm, DateForm, InputForm, SelectForm } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { dataEstudio, doctores, formaPago, turnoData } from "@/data";
import { tipoEstudio } from "@/interfaces/estudio.interface";
import { getByIdMedico, getByIdEstudio, getByIdTipoEstudio, getByIdTurno, getByIdFormaPago } from "@/services/api.service";
import { DraftPaciente } from "@/interfaces/paciente";
import { usePatientStore } from "@/store";
import { useNavigate } from "react-router-dom";


const mensage = "Debe completar este campo.";
const FormSchema = z.object({
  fecha: z.date({ required_error: mensage }),
  nombre: z.string().min(2, { message: "Nombre debe tener al menos 2 caracteres." }),
  edad: z.number({ required_error: mensage }),
  idDoctor: z.number({ required_error: mensage }),
  idEstudio: z.number({ required_error: mensage }),
  idTipoEstudio: z.number({ required_error: mensage }),
  cancelo: z.number({ required_error: mensage }),
  idTurno: z.number({ required_error: mensage }),
  idFormaPago: z.number({ required_error: mensage }),
  nroFactura: z.string({ required_error: mensage }),
  seguro: z.string({ required_error: mensage }),
  telefono: z.number({ required_error: mensage }),
});

export const FormPaciente = () => {

  const navigate = useNavigate();

  const addPatient = usePatientStore(state => state.addPatient);
  const [tipoEstudio, setTipoEstudio] = useState<tipoEstudio[]>([]);
  const activeId = usePatientStore(state => state.activeId)
  const patients = usePatientStore(state => state.patients)
  const updatePatient = usePatientStore(state => state.updatePatient)




  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fecha: new Date(),
      nombre: "",
      edad: undefined,
      idDoctor: undefined,
      idEstudio: undefined,
      idTipoEstudio: undefined,
      cancelo: undefined,
      idTurno: undefined,
      idFormaPago: undefined,
      nroFactura: "",
      seguro: "",
      telefono: undefined,
    },
  });

  const westudio = form.watch('idEstudio');

  useEffect(() => {
    if (westudio) {
      const estudio = dataEstudio.find(es => es.value == westudio);
      setTipoEstudio(estudio ? estudio.tipoEstudio : []);
    } else {
      setTipoEstudio([]);
    }
  }, [westudio]);

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(patient => patient.id === activeId)[0]
      form.setValue('fecha', new Date());  // Ajusta con la fecha correcta si es necesario
      form.setValue('nombre', activePatient.nombre);
      form.setValue('edad', activePatient.edad);
      form.setValue('idDoctor', activePatient.idDoctor);
      form.setValue('idEstudio', activePatient.idEstudio);
      form.setValue('idTipoEstudio', activePatient.idTipoEstudio);
      form.setValue('cancelo', activePatient.cancelo);
      form.setValue('idTurno', activePatient.idTurno);
      form.setValue('idFormaPago', activePatient.idFormaPago);
      form.setValue('nroFactura', activePatient.nroFactura);
      form.setValue('seguro', activePatient.seguro);
      form.setValue('telefono', activePatient.telefono);
    }
  }, [activeId, patients, form.setValue])


  const registerPatient = (data: z.infer<typeof FormSchema>) => {

    const medico = getByIdMedico(data.idDoctor);
    const estudio = getByIdEstudio(data.idEstudio);
    const tipoEstudio = getByIdTipoEstudio(data.idEstudio, data.idTipoEstudio);
    const turno = getByIdTurno(data.idTurno);
    const formaPago = getByIdFormaPago(data.idFormaPago);


    if (activeId) {
      const body: DraftPaciente = {
        ...data,
        medico,
        estudio,
        tipoEstudio,
        turno,
        formaPago
      }
      updatePatient(body)
    } else {

      const body: DraftPaciente = {
        ...data,
        medico,
        estudio,
        tipoEstudio,
        turno,
        formaPago
      }

      addPatient(body)
    } 

    navigate(-1); // Navegar hacia atrás en el historial

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(registerPatient)}>
        <div className="grid grid-cols-2 gap-4">
          <DateForm
            control={form.control}
            name="fecha"
            label="Fecha de Nacimiento"
          />
          <InputForm
            control={form.control}
            name="nombre"
            label="Nombre de Paciente"
            placeholder="Ingrese el nombre completo del paciente."
          />
          <InputForm
            control={form.control}
            name="edad"
            label="Edad de Paciente"
            placeholder="Ingrese la edad actual del paciente."
            type="number"
          />
          <ComboxForm
            control={form.control}
            name="idDoctor"
            label="Medico"
            options={doctores}
            placeholder="Elige un médico."
          />
          <SelectForm
            control={form.control}
            name="idEstudio"
            label="Estudio"
            options={dataEstudio}
            labelKey="label"
            valueKey="value"
          />
          <SelectForm
            control={form.control}
            name="idTipoEstudio"
            label="Tipo Estudio"
            options={tipoEstudio}
            labelKey="label"
            valueKey="value"
          />
          <InputForm
            control={form.control}
            name="cancelo"
            label="Cancelo"
            placeholder="Ingrese el importe."
            type="number"
          />
          <SelectForm
            control={form.control}
            name="idTurno"
            label="Turno"
            options={turnoData}
            labelKey="label"
            valueKey="value"
          />
          <SelectForm
            control={form.control}
            name="idFormaPago"
            label="Forma Pago"
            options={formaPago}
            labelKey="label"
            valueKey="value"
          />
          <InputForm
            control={form.control}
            name="nroFactura"
            label="Nro. Factura"
            placeholder="Edad del Paciente"
          />
          <InputForm
            control={form.control}
            name="seguro"
            label="Seguro"
            placeholder="Ingrese el nombre del seguro"
          />
          <InputForm
            control={form.control}
            name="telefono"
            label="teléfono"
            placeholder="Ingrese el numero de telefono"
            type="number"
          />
        </div>
        <div className="mt-4">
          <Button type="submit" className="p-2 w-full">
            {activeId ? 'Actualizar' : 'Registrar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
