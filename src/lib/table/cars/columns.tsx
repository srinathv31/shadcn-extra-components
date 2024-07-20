import { DataTableColumnHeader } from "@/components/client-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car } from "@/interfaces/Car"; // Ensure this interface is defined as per the previous response
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const carColumns: ColumnDef<Car>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "make",
    header: "Make",
    cell: ({ row }) => {
      const val = "" + row.getValue("make");
      return <p className="w-36">{val}</p>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => {
      const val = "" + row.getValue("model");
      return <p className="w-24">{val}</p>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    filterFn: (row, id, value) => {
      const rowValue = (row.getValue(id) as string).toString();
      return rowValue.includes(value.toString());
    },
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const val = "" + row.getValue("color");
      return <p className="w-24">{val}</p>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "mileage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mileage" />
    ),
    filterFn: (row, id, value) => {
      const rowValue = (row.getValue(id) as string).toString();
      return rowValue.includes(value.toString());
    },
  },
  {
    accessorKey: "vin",
    header: "VIN",
    cell: ({ row }) => {
      const val = "" + row.getValue("vin");
      return <p className="w-36">{val}</p>;
    },
  },
  {
    accessorKey: "owner_name",
    header: "Owner",
    cell: ({ row }) => {
      const val = "" + row.getValue("owner_name");
      return <p className="w-36">{val}</p>;
    },
  },
  {
    accessorKey: "owner_contact",
    header: "Owner Contact",
  },
  {
    accessorKey: "last_service_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Service Date" />
    ),
    cell: ({ row }) => {
      const val = "" + row.getValue("last_service_date");
      return <p>{new Date(val).toLocaleDateString()}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const car = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(car.id)}
            >
              Copy car ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View owner</DropdownMenuItem>
            <DropdownMenuItem>View car details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
