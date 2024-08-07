import { ICustomer } from "@/lib/db/mongo/customer";
import { db } from "@/lib/db/mongo/db";

const { Customer } = db;

async function getCustomers() {
  return await Customer.find<ICustomer>({});
}

export default async function CustomerList() {
  const customers = await getCustomers();

  return (
    <div>
      {customers.map((customer) => (
        <div key={customer._id} className="border p-3 m-2 rounded bg-white">
          <p>{customer.name}</p>
        </div>
      ))}
    </div>
  );
}
