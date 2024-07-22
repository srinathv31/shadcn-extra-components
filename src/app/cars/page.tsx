import CarsTable from "@/components/CarsTable";
import { getCars } from "@/lib/db/cars";
import { searchParamsSchema } from "@/lib/table/cars/validation";
import { Suspense } from "react";

export interface IndexPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function CarsPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams);

  const carsPromise = getCars(search);

  return (
    <main className="flex justify-center items-center overflow-scroll m-10">
      <Suspense fallback={<p>Cars Loading... 🏎️</p>}>
        <CarsTable carsPromise={carsPromise} />
      </Suspense>
    </main>
  );
}
