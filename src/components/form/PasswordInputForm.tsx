import { useState } from 'react'
import { Control, Path, FieldValues } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    description?: string;
}

export function PasswordInputForm<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    description
}: Props<T>) {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <FormField
            control={control}
            name={name} // Ahora 'name' es de tipo 'Path<T>', lo que soluciona el error
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                {...field}
                                type={showPassword ? 'text' : 'password'}
                                className="pr-10"
                                placeholder={placeholder}
                                value={field.value}
                                onChange={(event) => field.onChange(event.target.value)}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}