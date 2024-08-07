import { createGroup } from "@/actions/mongo";
import GroupList from "@/components/GroupList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function GroupsPage() {
  return (
    <div className="flex flex-col h-[90vh] items-center justify-center">
      <ErrorBoundary fallback={<p>Error ❌</p>}>
        <Suspense fallback={<p>Loading... ⏳</p>}>
          <GroupList />
        </Suspense>
      </ErrorBoundary>
      <form action={createGroup} className="flex flex-col items-center">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
