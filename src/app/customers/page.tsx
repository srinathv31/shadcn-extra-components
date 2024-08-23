import CustomersTable from "@/components/customers/CustomerTable";
import { getCustomers } from "@/lib/db/customers";
import { customerSearchParamsSchema } from "@/lib/table/customers/validation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export interface IndexPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function CustomersPage({ searchParams }: IndexPageProps) {
  const search = customerSearchParamsSchema.parse(searchParams);
  console.log("🚀 ~ CustomersPage ~ searchParams:", searchParams);

  const customersPromise = getCustomers(search);

  return (
    <div className="flex justify-center items-center overflow-scroll m-10">
      <ErrorBoundary fallback={<p>Error ❌</p>}>
        <Suspense fallback={<p>Loading Customers... ⏳</p>}>
          <CustomersTable customersPromise={customersPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
