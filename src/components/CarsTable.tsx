"use client";

import { use } from "react";
import { DataTable } from "./client-table/data-table";
import useClientTable from "@/hooks/use-client-table";
import { DataTableToolbar } from "./client-table/data-table-toolbar";
import { getCars } from "@/lib/db/cars";
import { carColumns } from "@/lib/table/cars/columns";
import { CarsTableToolbarActions } from "./car-table/cars-table-toolbar-actions";
import { carTableColumnMap } from "@/lib/table/cars/column-mapper";
import { carFilterOptions } from "@/lib/table/cars/options";

export default function CarsTable({
  carsPromise,
}: {
  carsPromise: ReturnType<typeof getCars>;
}) {
  const cars = use(carsPromise);

  const { table } = useClientTable({ data: cars, columns: carColumns });

  return (
    <div className="container mx-auto">
      <DataTable table={table}>
        <DataTableToolbar
          table={table}
          search={{ label: "Owner", columnId: "owner_name" }}
          columnMapper={carTableColumnMap}
          filterOptions={carFilterOptions}
        >
          <CarsTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
