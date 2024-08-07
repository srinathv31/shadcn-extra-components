import CreateCustomerDialog from "@/components/CreateCustomerDialog";
import CustomerList from "@/components/CustomerList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function CustomersPage() {
  return (
    <div className="flex flex-col h-[90vh] items-center justify-center">
      <ErrorBoundary fallback={<p>Error ❌</p>}>
        <Suspense fallback={<p>Loading Customers... ⏳</p>}>
          <CustomerList />
        </Suspense>
      </ErrorBoundary>
      <CreateCustomerDialog />
    </div>
  );
}
