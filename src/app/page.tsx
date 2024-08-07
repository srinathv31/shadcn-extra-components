import DogTableClient from "@/components/DogTableClient";
import { getDogs } from "@/lib/db/dogs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  const dogsPromise = getDogs();

  return (
    <main className="flex justify-center items-center overflow-scroll m-10">
      <ErrorBoundary fallback={<p>Error ❌</p>}>
        <Suspense fallback={<p>Loading... ⏳</p>}>
          <DogTableClient dogsPromise={dogsPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
