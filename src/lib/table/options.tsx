import { Dog } from "@/interfaces/Dog";
import { DataTableFilterField } from "@/interfaces/table";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const energies = [
  {
    value: "Low",
    label: "Low",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Medium",
    label: "Medium",
    icon: CircleIcon,
  },
  {
    value: "High",
    label: "High",
    icon: StopwatchIcon,
  },
];

export const statuses = [
  {
    label: "No",
    value: false,
    icon: ArrowDownIcon,
  },
  {
    label: "Yes",
    value: true,
    icon: ArrowRightIcon,
  },
];

function getEnergyIcon(energy: Dog["energy_level"]) {
  const energyIcons = {
    High: ArrowUpIcon,
    Low: ArrowDownIcon,
    Medium: ArrowRightIcon,
  };

  return energyIcons[energy] || CircleIcon;
}

function getStatusIcon(status: Dog["vaccination_status"]) {
  const statusIcons = {
    true: CheckCircledIcon,
    false: CrossCircledIcon,
  };

  return statusIcons[("" + status) as keyof typeof statusIcons] || CircleIcon;
}

export const dogFilterOptions: DataTableFilterField<Dog>[] = [
  {
    label: "Microchip ID",
    value: "microchip_id",
    placeholder: "Filter id...",
  },
  {
    label: "Owner",
    value: "owner_name",
    placeholder: "Filter owner...",
  },
  {
    label: "Energy",
    value: "energy_level",
    options: ["High", "Medium", "Low"].map((energy) => ({
      label: energy,
      value: energy,
      icon: getEnergyIcon(energy as Dog["energy_level"]),
      withCount: true,
    })),
  },
  {
    label: "Breed",
    value: "breed",
    deriveOptions: true,
  },
  {
    label: "Vaccination",
    value: "vaccination_status",
    options: ["Yes", "No"].map((status) => ({
      label: status,
      value: "Yes" === status,
      icon: getStatusIcon("Yes" === status),
      withCount: true,
    })),
  },
];
