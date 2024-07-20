import CarsTable from "@/components/CarsTable";
import { getCars } from "@/lib/db/cars";
import { Suspense } from "react";

export default function CarsPage() {
  const carsPromise = getCars();

  return (
    <main className="flex justify-center items-center overflow-scroll m-10">
      <Suspense fallback={<p>Cars Loading... 🏎️</p>}>
        <CarsTable carsPromise={carsPromise} />
      </Suspense>
    </main>
  );
}
