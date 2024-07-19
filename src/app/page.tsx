import DogTableClient from "@/components/DogTableClient";
import { getDogs } from "@/lib/dogs";
import { Suspense } from "react";

export default function Home() {
  const dogsPromise = getDogs();

  return (
    <main className="flex justify-center items-center overflow-scroll m-10">
      <Suspense fallback={<p>Loading... ⏳</p>}>
        <DogTableClient dogsPromise={dogsPromise} />
      </Suspense>
    </main>
  );
}
