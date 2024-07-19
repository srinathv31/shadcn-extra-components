import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableWideColumnHeader } from "@/components/table/data-table-wide-column-header";
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
  },
  {
    accessorKey: "breed",
    header: "Breed",
    cell: ({ row }) => {
      const val = "" + row.getValue("breed");
      return <p className="w-48">{val}</p>;
    },
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
    header: "Energy",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "owner_name",
    header: "Owner",
    cell: ({ row }) => {
      const val = "" + row.getValue("owner_name");
      return <p className="w-48">{val}</p>;
    },
  },
  {
    accessorKey: "owner_contact",
    header: "Owner Contact",
  },
  {
    accessorKey: "vaccination_status",
    header: () => <DataTableWideColumnHeader title="Vaccination Status" />,
    cell: (info) => (info.getValue() ? "Yes" : "No"),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "microchip_id",
    header: "Microchip ID",
  },
  {
    accessorKey: "last_checkup_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Checkup" />
    ),
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
