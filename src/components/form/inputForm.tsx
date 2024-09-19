import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Path, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>; // Utiliza Path<T> para que coincida con los nombres válidos de los campos
    label: string;
    placeholder?: string;
    description?: string;
}

export function InputForm<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    description,
}: Props<T>) {
    return (
        <FormField
            control={control}
            name={name} // Ahora 'name' es de tipo 'Path<T>', lo que soluciona el error
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}