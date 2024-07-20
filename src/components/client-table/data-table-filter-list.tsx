"use client";

import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { useContext, useState } from "react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { ToolbarContext } from "./context/ToolbarContext";
import { FacetedFilterContext } from "./context/FacetedFilterContext";

export default function DataTableFilterList<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const toolbarProps = useContext(ToolbarContext);
  const { columnMapper, filterOptions } = toolbarProps ?? {};

  const [filteredColumns, setFilteredColumns] = useState<string[]>([]);

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
            <FacetedFilterContext.Provider value={{ setFilteredColumns }}>
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
            </FacetedFilterContext.Provider>
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
                    setFilteredColumns((prev) =>
                      prev.filter((col) => col !== column.id),
                    );
                  } else {
                    setFilteredColumns((prev) => [...prev, column.id]);
                  }
                }}
              >
                {getMappedName(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center"
            onClick={() => {
              table.resetColumnFilters();
              setFilteredColumns([]);
            }}
          >
            {/* <LogOut className="mr-2 h-4 w-4" /> */}
            <p>Clear Filters</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
