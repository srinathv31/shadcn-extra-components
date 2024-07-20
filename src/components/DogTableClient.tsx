"use client";

import { getDogs } from "@/lib/dogs";
import { use } from "react";
import { DataTable } from "./client-table/data-table";
import { columns } from "@/lib/table/dogs";
import useClientTable from "@/hooks/use-client-table";
import { DataTableToolbar } from "./client-table/data-table-toolbar";
import { dogTableColumnMap } from "@/lib/table/mapper";
import { dogFilterOptions } from "@/lib/table/options";
import { DogsTableToolbarActions } from "./dog-table/dogs-table-toolbar-actions";

export default function DogTableClient({
  dogsPromise,
}: {
  dogsPromise: ReturnType<typeof getDogs>;
}) {
  const dogs = use(dogsPromise);

  const { table } = useClientTable({ data: dogs, columns });

  return (
    <div className="container mx-auto">
      <DataTable table={table}>
        <DataTableToolbar
          table={table}
          search={{ label: "name", columnId: "name" }}
          columnMapper={dogTableColumnMap}
          filterOptions={dogFilterOptions}
        >
          <DogsTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
