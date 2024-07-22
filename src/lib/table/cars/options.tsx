import { Car } from "@/interfaces/Car";
import { DataTableFilterField } from "@/interfaces/table";
import { Circle } from "lucide-react";

export function getCarColorIcon(color: string) {
  return (
    <Circle
      size={16}
      color="#f4f4f4"
      fill={color}
      className="mr-2 h-4 w-4 text-muted-foreground"
    />
  );
}

export const carFilterOptions: DataTableFilterField<Car>[] = [
  {
    value: "owner_contact",
    placeholder: "Email...",
  },
  {
    value: "owner_name",
    placeholder: "Filter owner...",
  },
  {
    value: "make",
    deriveOptions: true,
  },
  {
    value: "model",
    deriveOptions: true,
  },
  {
    value: "color",
    deriveOptions: true,
    iconFn: getCarColorIcon,
  },
  {
    value: "year",
    placeholder: "Search Year...",
  },
];
