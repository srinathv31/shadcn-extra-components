import DogTableClient from "@/components/DogTableClient";
import { getCars } from "@/lib/db/cars";
import { Suspense } from "react";

export default function CarsPage() {
  // const carsPromise = getCars();

  return (
    <main className="flex justify-center items-center overflow-scroll m-10">
      <p>Car table</p>
      {/* <Suspense fallback={<p>Cars Loading... 🏎️</p>}>
        <DogTableClient dogsPromise={carsPromise} />
      </Suspense> */}
    </main>
  );
}
