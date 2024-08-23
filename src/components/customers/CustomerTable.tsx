"use client";

import { use } from "react";
import useClientTable from "@/hooks/use-client-table";
import { useServerTable } from "@/hooks/use-server-table";
import { customerColumns } from "@/lib/table/customers/columns";
import { DataTable } from "../client-table/data-table";
import { DataTableToolbar } from "../client-table/data-table-toolbar";
import { customerTableColumnMap } from "@/lib/table/customers/column-mapper";
import { customerFilterOptions } from "@/lib/table/customers/options";
import { getCustomers } from "@/lib/db/customers";

export default function CustomersTable({
  customersPromise,
}: {
  customersPromise: ReturnType<typeof getCustomers>;
}) {
  const { customers, pageCount, enums } = use(customersPromise);

  //   const { table } = useClientTable({
  //     data: customers,
  //     columns: customerColumns,
  //   });

  const { table } = useServerTable({
    data: customers,
    columns: customerColumns,
    pageCount,
    // optional props
    filterFields: customerFilterOptions,
    // enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    defaultPerPage: 10,
    defaultSort: "created.desc",
  });

  return (
    <div className="container mx-auto">
      <DataTable table={table}>
        <DataTableToolbar
          table={table}
          search={{ label: "Name", columnId: "name" }}
          columnMapper={customerTableColumnMap}
          filterOptions={customerFilterOptions}
          enums={enums}
        >
          {/* <CarsTableToolbarActions table={table} /> */}
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
