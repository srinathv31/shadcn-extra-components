import { createContext } from "react";

interface FacetedFilterContextProps {
  setFilteredColumns: React.Dispatch<React.SetStateAction<string[]>>;
  iconFn?: (value: string) => React.ReactNode;
}

// Context to pass the filter props between the various filter components
export const FacetedFilterContext =
  createContext<FacetedFilterContextProps | null>(null);
