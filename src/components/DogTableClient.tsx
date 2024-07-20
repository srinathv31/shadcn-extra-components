"use client";

import { getDogs } from "@/lib/dogs";
import { use } from "react";
import { DataTable } from "./client-table/data-table";
import { columns } from "@/lib/table/dogs";
import useClientTable from "@/hooks/use-client-table";
import { DataTableToolbar } from "./client-table/data-table-toolbar";
import { TasksTableToolbarActions } from "./dog-table/tasks-table-toolbar-actions";
import { dogTableColumnMap } from "@/lib/table/mapper";

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
        >
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
