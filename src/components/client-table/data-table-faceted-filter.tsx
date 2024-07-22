import { Column } from "@tanstack/react-table";

import FacetedFilterInput from "./faceted-filter-input";
import FacetedFilterSelect from "./faceted-filter-select";
import { useContext } from "react";
import { ToolbarContext } from "./context/ToolbarContext";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options?: {
    label: string;
    value: string | boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  deriveOptions?: boolean;
  placeholder?: string;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  deriveOptions,
  placeholder,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const enums = useContext(ToolbarContext)?.enums;
  const facets = column?.getFacetedUniqueValues();

  const convertFacetsMapToArray = () =>
    facets
      ? Array.from(facets, ([label, value]) => ({
          label,
          value: label,
          icon: undefined,
        }))
      : [];

  const getEnumOptions = (columnId: string) => {
    return columnId && enums
      ? enums[columnId].map((enumValue) => ({
          label: enumValue,
          value: enumValue,
          icon: undefined,
        }))
      : [];
  };

  // If options are not provided, derive them from the enums or column's unique values. Else, return an empty array.
  const filterOptions = options
    ? options
    : deriveOptions
      ? enums
        ? getEnumOptions(column?.id as string)
        : convertFacetsMapToArray()
      : [];

  const searchInput = column?.getFilterValue() as string | string[] | undefined;
  const selectedValues = new Set(searchInput as any[]);

  // If no options are provided, render an input field
  return (
    <>
      {!filterOptions || filterOptions.length < 1 ? (
        <FacetedFilterInput
          column={column}
          title={title}
          searchInput={searchInput}
          placeholder={placeholder}
        />
      ) : (
        <FacetedFilterSelect
          column={column}
          title={title}
          options={filterOptions}
          selectedValues={selectedValues}
          facets={facets}
        />
      )}
    </>
  );
}
