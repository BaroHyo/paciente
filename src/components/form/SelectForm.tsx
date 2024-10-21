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
            onValueChange={(value) => {
              const newValue = isNaN(Number(value)) ? value : Number(value);
              field.onChange(newValue);
            }}
            value={field.value?.toString() || ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option[valueKey].toString()}
                  value={option[valueKey].toString()}
                >
                  {option[labelKey]}
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
