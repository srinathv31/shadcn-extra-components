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
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ICustomer } from "@/lib/db/mongo/customer";

export const customerColumns: ColumnDef<ICustomer>[] = [
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
    cell: ({ row }) => {
      const val = "" + row.getValue("name");
      return <p className="w-36">{val}</p>;
    },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const val = row.getValue<string>("email") || "N/A";
      return <p className="w-48">{val}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const val = "" + row.getValue("status");
      return <p className="w-24 capitalize">{val}</p>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "mailing_list",
    header: "Mailing List",
    cell: ({ row }) => {
      const isSubscribed = row.getValue("mailing_list") as boolean;
      return <p>{isSubscribed ? "Subscribed" : "Not Subscribed"}</p>;
    },
  },
  {
    accessorKey: "premium",
    header: "Premium",
    cell: ({ row }) => {
      const isPremium = row.getValue("premium") as boolean;
      return <p>{isPremium ? "Yes" : "No"}</p>;
    },
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const val = "" + row.getValue("product");
      return <p className="w-48">{val}</p>;
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const val = row.getValue("created") as Date;
      return <p>{new Date(val).toLocaleDateString()}</p>;
    },
  },
  {
    accessorKey: "promo_code",
    header: "Promo Code",
    cell: ({ row }) => {
      const val = row.getValue<string>("promo_code") || "None";
      return <p className="w-36">{val}</p>;
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const val = row.getValue<string>("notes") || "No Notes";
      return <p className="w-48 truncate">{val}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

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
              onClick={() => navigator.clipboard.writeText(customer._id)}
            >
              Copy Customer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
