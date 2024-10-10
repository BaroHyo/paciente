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
    name: Path<T>;
    type?: string,
    label: string;
    placeholder?: string;
    description?: string;
}

export function InputForm<T extends FieldValues>({
    control,
    name,
    type = 'text',
    label,
    placeholder,
    description
}: Props<T>) {
    return (
        <FormField
            control={control}
            name={name} // Ahora 'name' es de tipo 'Path<T>', lo que soluciona el error
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            inputMode={type === "number" ? "numeric" : undefined}
                            placeholder={placeholder}
                            value={(type === "number" && field.value === 0) ? "" : (field.value || "")}
                            onChange={(event) => {
                                if (type === "number") {
                                    field.onChange(Number(event.target.value));
                                } else {
                                    field.onChange(event.target.value);
                                }
                            }}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}