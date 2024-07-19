import DogTableClient from "@/components/DogTableClient";
import { getDogs } from "@/lib/dogs";
import { Suspense } from "react";

export default function Home() {
  const dogsPromise = getDogs();

  return (
    <main className="flex justify-center items-center overflow-scroll">
      <Suspense fallback={<p>Loading... ⏳</p>}>
        <DogTableClient dogsPromise={dogsPromise} />
      </Suspense>
    </main>
  );
}
