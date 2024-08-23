import { SortOrder } from "mongoose";
import { GetCustomersSchema } from "../table/customers/validation";
import { ICustomer } from "./mongo/customer";
import { db } from "./mongo/db";

const { Customer } = db;

export default async function getCustomersClient() {
  try {
    const data = await Customer.find<ICustomer>({});

    const customers = JSON.parse(JSON.stringify(data)) as ICustomer[];

    return { customers };
  } catch (error) {
    console.error("Error getting customers:", error);
    return { customers: [], error };
  }
}

export async function getCustomers(searchParams: GetCustomersSchema) {
  const { page, per_page, sort } = searchParams;
  console.log("🚀 ~ getCustomers ~ searchParams:", searchParams);

  // Offset to paginate the results
  const skip = (page - 1) * per_page;

  // Column and order to sort by
  const [column, order] = (sort?.split(".").filter(Boolean) ?? [
    "created",
    "desc",
  ]) as [keyof ICustomer, "asc" | "desc"];

  const sortOrder: SortOrder = order === "asc" ? 1 : -1;

  // Ensure the column is defined before using it as a computed property name
  const sortOptions: { [key: string]: SortOrder } = column
    ? { [column]: sortOrder }
    : {};

  const { query: whereClause } = buildWhereClause(searchParams);
  console.log("🚀 ~ getCustomers ~ whereClause:", whereClause);

  try {
    // Fetch the customers with the applied filters, sorting, and pagination
    const mongoData = await Customer.find(whereClause)
      .sort(sortOptions)
      .skip(skip)
      .limit(per_page)
      .exec();

    const customers = JSON.parse(JSON.stringify(mongoData)) as ICustomer[];

    // Count total matching documents for pagination
    const totalCount = await Customer.countDocuments(whereClause).exec();
    const pageCount = Math.ceil(totalCount / per_page);

    const enums = await getDistinctCustomerAttributes();

    return { customers, pageCount, enums };
  } catch (err) {
    console.error("Error executing queries", err);
    return { customers: [], pageCount: 0 };
  }
}

const buildWhereClause = (input: GetCustomersSchema) => {
  const {
    name,
    email,
    status,
    mailing_list,
    premium,
    product,
    from,
    to,
    operator,
  } = input;
  const conditions: any = {};

  const parseMultipleOptions = (field: string, valueString: string) => {
    const options = valueString.split(".");
    conditions[field] = { $in: options };
  };

  if (name) {
    conditions.name = { $regex: name, $options: "i" }; // Case-insensitive partial match
  }

  if (email) {
    conditions.email = { $regex: email, $options: "i" }; // Case-insensitive partial match
  }

  if (status) {
    parseMultipleOptions("status", status);
  }

  if (mailing_list !== undefined) {
    conditions.mailing_list = mailing_list;
  }

  if (premium !== undefined) {
    // Handle multiple boolean values in the 'premium' field
    const premiumOptions = premium.split(".").map((value) => value === "true");
    conditions.premium = { $in: premiumOptions };
  }

  if (product) {
    conditions.product = { $regex: product, $options: "i" }; // Case-insensitive partial match
  }

  if (from && to) {
    conditions.created = { $gte: new Date(from), $lte: new Date(to) };
  }

  // Combine conditions with either AND or OR operators
  const query = operator === "or" ? { $or: [conditions] } : conditions;

  return { query };
};

export async function getDistinctCustomerAttributes() {
  const distinctProducts = await Customer.distinct("product").exec();
  const distinctStatuses = await Customer.distinct("status").exec();

  return {
    product: distinctProducts,
    status: distinctStatuses,
  };
}
