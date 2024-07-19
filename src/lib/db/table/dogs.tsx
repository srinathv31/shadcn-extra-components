import { Dog } from "@/interfaces/Dog";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Dog>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "weight",
    header: "Weight",
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
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
];
