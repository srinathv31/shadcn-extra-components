import { Car } from "@/interfaces/Car";
import { ICustomer } from "@/lib/db/mongo/customer";

export const customerTableColumnMap: Partial<Record<keyof ICustomer, string>> =
  {
    name: "Name",
    email: "Email",
    created: "Created",
    status: "Status",
    mailing_list: "Mailing List",
    premium: "Premium",
    product: "Product",
    notes: "Notes",
    promo_code: "Promo Code",
  };
