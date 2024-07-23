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
import { useServerTable } from "@/hooks/use-server-table";
import { DateRangePicker } from "./client-table/date-range-picker";

export default function CarsTable({
  carsPromise,
}: {
  carsPromise: ReturnType<typeof getCars>;
}) {
  const { cars, pageCount, enums } = use(carsPromise);

  //   const { table } = useClientTable({ data: cars, columns: carColumns });

  const { table } = useServerTable({
    data: cars,
    columns: carColumns,
    pageCount,
    // optional props
    filterFields: carFilterOptions,
    // enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    defaultPerPage: 10,
    defaultSort: "last_service_date.desc",
  });

  return (
    <div className="container mx-auto">
      <DateRangePicker
        triggerSize="sm"
        triggerClassName="ml-auto w-56 sm:w-60"
        align="end"
      />
      <DataTable table={table}>
        <DataTableToolbar
          table={table}
          search={{ label: "Owner", columnId: "owner_name" }}
          columnMapper={carTableColumnMap}
          filterOptions={carFilterOptions}
          enums={enums}
        >
          <CarsTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
