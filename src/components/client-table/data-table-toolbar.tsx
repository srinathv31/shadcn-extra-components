"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { energies, statuses } from "@/lib/table/options";
import DataTableFilterList from "./data-table-filter-list";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  search?: { label: string; columnId: string };
  columnMapper?: Record<string, string>;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  search,
  columnMapper,
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between my-3">
      <div className="flex flex-1 items-center space-x-2">
        {search ? (
          <Input
            placeholder={`Search by ${search.label}...`}
            value={
              (table.getColumn(search.columnId)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table.getColumn(search.label)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ) : null}
        {table.getColumn("energy_level") && (
          <DataTableFacetedFilter
            column={table.getColumn("energy_level")}
            title="Energy"
            options={energies}
          />
        )}
        {table.getColumn("vaccination_status") && (
          <DataTableFacetedFilter
            column={table.getColumn("vaccination_status")}
            title="Vaccination"
            options={statuses}
          />
        )}
        {/* <DataTableFilterList table={table} /> */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} columnMapper={columnMapper} />
      </div>
    </div>
  );
}
