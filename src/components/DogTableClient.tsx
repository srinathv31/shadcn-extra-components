"use client";

import { getDogs } from "@/lib/dogs";
import { use } from "react";
import { DataTable } from "./ui/data-table";
import { columns } from "@/lib/db/table/dogs";

export default function DogTableClient({
  dogsPromise,
}: {
  dogsPromise: ReturnType<typeof getDogs>;
}) {
  const dogs = use(dogsPromise);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={dogs} />
    </div>
  );
}
