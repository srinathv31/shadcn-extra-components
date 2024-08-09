"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { exportTableToCSV } from "@/lib/table/export";
import { useMemo } from "react";
import { Car } from "@/interfaces/Car";
import AddCardDialog from "./add-car-dialog";

// import { CreateTaskDialog } from "./create-task-dialog"
// import { DeleteTasksDialog } from "./delete-tasks-dialog"

interface TasksTableToolbarActionsProps<TData> {
  table: Table<TData>;
}

export function CarsTableToolbarActions<TData>({
  table,
}: TasksTableToolbarActionsProps<TData>) {
  // grab all the selected rows
  const selectedCars = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original as Car);

  // extract the ids of the selected cars, useMemo is used to avoid re-computing the selectedCarsIds on every render
  const selectedCarsIds = useMemo(
    () => selectedCars.map((car) => car.id),
    [selectedCars],
  );

  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <CreateTaskDialog /> */}
      <AddCardDialog />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "cars",
            excludeColumns: ["select", "actions"],
          })
        }
        className="ml-auto flex h-8"
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
