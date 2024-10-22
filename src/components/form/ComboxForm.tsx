import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { Control, Path, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

// Definimos las propiedades que el componente reutilizable va a aceptar
interface Props<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    options: Array<Record<string, any>>;
    labelKey: string;
    valueKey: string;
    placeholder?: string; // Placeholder opcional
}

export function ComboxForm<T extends FieldValues>({
    control,
    name,
    label,
    options,
    labelKey,
    valueKey,
    placeholder = "Select an option",
}: Props<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col mt-2.5">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? options.find((option) => option[valueKey] === field.value)?.[labelKey]
                                        : placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                        <Command>
                                <CommandInput placeholder={`Buscar ${label.toLowerCase()}...`} />
                                <CommandList>
                                    <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                value={option[labelKey]}
                                                key={option[valueKey]}
                                                onSelect={() => field.onChange(option[valueKey])}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        option[valueKey] === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {option[labelKey]}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
