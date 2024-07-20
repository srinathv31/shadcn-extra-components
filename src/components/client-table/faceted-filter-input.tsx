import { SearchCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Column } from "@tanstack/react-table";

interface FacetedFilterInputProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  searchInput?: string | string[];
  placeholder?: string;
}

export default function FacetedFilterInput<TData, TValue>({
  column,
  title,
  searchInput,
  placeholder,
}: FacetedFilterInputProps<TData, TValue>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <SearchCheck className="mr-2 h-4 w-4" />
          {title}
          {searchInput && searchInput.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {searchInput.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {searchInput}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] lg:w-[250px] p-0" align="start">
        <Input
          placeholder={placeholder ?? `Search by ${title}...`}
          value={(column?.getFilterValue() as string) ?? ""}
          onChange={(event) => column?.setFilterValue(event.target.value)}
          className=" focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-0"
        />
      </PopoverContent>
    </Popover>
  );
}
