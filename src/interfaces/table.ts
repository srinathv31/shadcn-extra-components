import { ReactNode } from "react";

export interface Option {
  label: string;
  value: string | boolean;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

interface BaseDataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
}

interface OptionsFilterField<TData> extends BaseDataTableFilterField<TData> {
  options: Option[];
  deriveOptions?: never; // Explicitly set to `never` to enforce the constraint
  iconFn?: never; // Explicitly set to `never` to enforce the constraint
}

interface DeriveOptionsFilterField<TData>
  extends BaseDataTableFilterField<TData> {
  deriveOptions?: boolean;
  iconFn?: (value: string) => ReactNode;
  options?: never; // Explicitly set to `never` to enforce the constraint
}

export type DataTableFilterField<TData> =
  | OptionsFilterField<TData>
  | DeriveOptionsFilterField<TData>;
