import { ICustomer } from "@/lib/db/mongo/customer";
import { DataTableFilterField } from "@/interfaces/table";
import { Circle, CircleIcon } from "lucide-react";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

export function getStatusIcon(status: string) {
  const color =
    status === "active" ? "green" : status === "inactive" ? "red" : "orange";
  return (
    <Circle
      size={16}
      color="#f4f4f4"
      fill={color}
      className="mr-2 h-4 w-4 text-muted-foreground"
    />
  );
}

function getPremiumIcon(status: boolean) {
  const statusIcons = {
    true: CheckCircledIcon,
    false: CrossCircledIcon,
  };

  return statusIcons[("" + status) as keyof typeof statusIcons] || CircleIcon;
}

export const customerFilterOptions: DataTableFilterField<ICustomer>[] = [
  {
    value: "name",
    placeholder: "Filter by name...",
  },
  {
    value: "email",
    placeholder: "Filter by email...",
  },
  {
    value: "status",
    deriveOptions: true,
    iconFn: getStatusIcon,
  },
  {
    value: "product",
    placeholder: "Filter by product...",
  },
  {
    value: "created",
    placeholder: "Search by date...",
  },
  {
    value: "promo_code",
    placeholder: "Filter by promo code...",
  },
  {
    value: "premium",
    options: ["Yes", "No"].map((status) => ({
      label: status,
      value: "Yes" === status,
      icon: getPremiumIcon("Yes" === status),
      withCount: false,
    })),
  },
];
