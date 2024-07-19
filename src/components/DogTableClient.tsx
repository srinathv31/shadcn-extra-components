"use client";

import { getDogs } from "@/lib/dogs";
import { use } from "react";
import { DataTable } from "./client-table/data-table";
import { columns } from "@/lib/table/dogs";
import { TasksTableToolbarActions } from "./dog-table/tasks-table-toolbar-actions";

export default function DogTableClient({
  dogsPromise,
}: {
  dogsPromise: ReturnType<typeof getDogs>;
}) {
  const dogs = use(dogsPromise);

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={dogs}></DataTable>
    </div>
  );
}
