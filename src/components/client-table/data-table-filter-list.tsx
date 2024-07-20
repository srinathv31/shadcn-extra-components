"use client";

import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableFilterField } from "@/interfaces/table";

export default function DataTableFilterList<TData>({
  table,
  columnMapper,
  filterOptions,
}: {
  table: Table<TData>;
  columnMapper?: Record<string, string>;
  filterOptions?: DataTableFilterField<TData>[];
}) {
  const [filteredColumns, setfilteredColumns] = useState<string[]>([]);

  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide(),
    );

  const getMappedName = (columnId: string) => {
    return columnMapper ? (columnMapper[columnId] ?? columnId) : columnId;
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-2">
      {filteredColumns.map((columnId) => {
        const columnName = getMappedName(columnId);

        const filter = filterOptions?.find(
          (option) => option.value === columnId,
        );

        const options = filter?.options;
        const deriveOptions = filter?.deriveOptions;
        const title = filter?.label ?? columnName;
        const placeholder = filter?.placeholder;

        return (
          <>
            {table.getColumn(columnId) ? (
              <DataTableFacetedFilter
                key={columnId}
                column={table.getColumn(columnId)}
                title={title}
                options={options}
                deriveOptions={deriveOptions}
                placeholder={placeholder}
              />
            ) : null}
          </>
        );
      })}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto h-8 flex">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter Columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns.map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={filteredColumns.includes(column.id)}
                onClick={() => {
                  if (filteredColumns.includes(column.id)) {
                    setfilteredColumns((prev) =>
                      prev.filter((col) => col !== column.id),
                    );
                  } else {
                    setfilteredColumns((prev) => [...prev, column.id]);
                  }
                }}
              >
                {getMappedName(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}