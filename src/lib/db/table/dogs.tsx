import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
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
import { Dog } from "@/interfaces/Dog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Dog>[] = [
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //   },
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
  },
  {
    accessorKey: "weight",
    header: () => <div className="text-right">Weight</div>,
    cell: ({ row }) => {
      const weight = row.getValue("weight");
      return <div className="text-right font-medium">{"" + weight}</div>;
    },
  },
  {
    accessorKey: "breed",
    header: "Breed",
  },
  {
    accessorKey: "profile_picture",
    header: "Profile Picture",
    cell: ({ row }) => {
      const val = "" + row.getValue("profile_picture");
      return <p>{val}</p>;
    },
  },
  {
    accessorKey: "energy_level",
    header: "Energy Level",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "owner_name",
    header: "Owner Name",
  },
  {
    accessorKey: "owner_contact",
    header: "Owner Contact",
  },
  {
    accessorKey: "vaccination_status",
    header: "Vaccination Status",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  },
  {
    accessorKey: "microchip_id",
    header: "Microchip ID",
  },
  {
    accessorKey: "last_checkup_date",
    header: "Last Checkup Date",
    cell: ({ row }) => {
      const val = "" + row.getValue("last_checkup_date");
      return <p>{new Date(val).toLocaleDateString()}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
