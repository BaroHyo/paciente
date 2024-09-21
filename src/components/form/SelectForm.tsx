import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Control, Path, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    options: Array<Record<string, any>>;
    labelKey: string;
    valueKey: string;
}

export function SelectForm<T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "Seleccione una opción",
    options,
    labelKey,
    valueKey,
}: Props<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={(value) =>
                            field.onChange(
                                isNaN(Number(value)) ? value : Number(value) // Convertir a número si es numérico
                            )
                        }
                        value={field.value?.toString()} // Convertir a string para mantener la consistencia con Select
                        defaultValue={field.value?.toString()}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option[valueKey].toString()} // Convertir el valor a string para la key
                                    value={option[valueKey].toString()} // Asegurarnos de pasar el valor como string
                                >
                                    {option[labelKey]} {/* Mostrar el label */}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}