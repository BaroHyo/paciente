import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form
} from "@/components/ui/form"
import { ComboxForm, DateForm, InputForm, SelectForm } from "./components/form"
import { Button } from "./components/ui/button"

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  // otras opciones...
];

const emailOptions = [
  { value: "m@example.com", label: "m@example.com" },
  { value: "m@google.com", label: "m@google.com" },
  { value: "m@support.com", label: "m@support.com" },
];

const FormSchema = z.object({
  fecha: z.date({
    required_error: "Se requiere una Fecha.",
  }),
  nombre: z.string().min(2, { message: "Nombre debe tener al menos 2 caracteres." }),
  edad: z.string().min(2, { message: "Se requiere una edad" }),
  doctor: z.string({
    required_error: "Please select a language.",
  }),
  estudio: z.string({
    required_error: "Please select a language.",
  }),
  tipoEstudio: z.string({
    required_error: "Please select a language.",
  }),
})

const App = () => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fecha: new Date(),
      nombre: "",
      edad: "",
      doctor: "",
      estudio: "",
      tipoEstudio: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="w-1/2  mx-auto p-4">
      {/* Título del formulario */}
      <h2 className="text-lg font-bold mb-4">Formulario</h2>

      {/* Formulario con dos columnas */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">

            <DateForm
              control={form.control}
              name="fecha"
              label="Fecha de Nacimiento"
              placeholder="Selecciona una fecha"
            />

            <InputForm
              control={form.control}
              name="nombre"
              label="Paciente"
              placeholder="Nombre del paciente"
            />
            <InputForm
              control={form.control}
              name="edad"
              label="Edada"
              placeholder="Edad del Paciente"
            />

            <ComboxForm
              control={form.control}
              name="doctor"
              label="Medico"
              options={languages}
              placeholder="Seleciona un medico"
            />

            <SelectForm
              control={form.control}
              name="estudio"
              label="Estudio"
              options={emailOptions}
              placeholder="Select a verified email to display"
            />

            <SelectForm
              control={form.control}
              name="tipoEstudio"
              label="Tipo de Estudio"
              options={emailOptions}
              placeholder="Select a verified email to display"
            />

            <InputForm
              control={form.control}
              name="edad"
              label="Cancelo"
              placeholder="Edad del Paciente"
            />

            <SelectForm
              control={form.control}
              name="tipoEstudio"
              label="Turno"
              options={emailOptions}
              placeholder="Select a verified email to display"
            />

            <SelectForm
              control={form.control}
              name="tipoEstudio"
              label="Forma Pago"
              options={emailOptions}
              placeholder="Select a verified email to display"
            />

            <InputForm
              control={form.control}
              name="edad"
              label="Nro. Factura"
              placeholder="Edad del Paciente"
            />

            <InputForm
              control={form.control}
              name="edad"
              label="Seguro"
              placeholder="Edad del Paciente"
            />
            <InputForm
              control={form.control}
              name="edad"
              label="teléfono"
              placeholder="Edad del Paciente"
            />
          </div>

          {/* Botón de envío */}
          <div className="mt-4">
            <Button type="submit" className="p-2 w-full">Registrar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default App





