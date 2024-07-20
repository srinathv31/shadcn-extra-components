import { Car } from "@/interfaces/Car";
import { DataTableFilterField } from "@/interfaces/table";
import { Circle } from "lucide-react";

function getCarColorIcon(color: keyof Car["color"]) {
  return <Circle size={16} color={color.toString()} />;
}

export const carFilterOptions: DataTableFilterField<Car>[] = [
  {
    label: "Owner Contact",
    value: "owner_contact",
    placeholder: "Email...",
  },
  {
    label: "Owner",
    value: "owner_name",
    placeholder: "Filter owner...",
  },
  {
    label: "Make",
    value: "make",
    deriveOptions: true,
  },
  {
    label: "Model",
    value: "model",
    deriveOptions: true,
  },
  {
    label: "Color",
    value: "color",
    deriveOptions: true,
  },
];
