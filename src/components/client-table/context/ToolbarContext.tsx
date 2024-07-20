import { createContext } from "react";
import { DataTableToolbarProps } from "../data-table-toolbar";

// Context to pass the table instance to the toolbar components
export const ToolbarContext = createContext<DataTableToolbarProps<any> | null>(
  null,
);
