import { GetCarsSchema } from "../table/cars/validation";
import { query } from "./postgres";
import { Car } from "@/interfaces/Car";

export async function getCarsClient() {
  const dogs = await query<Car>(
    `
    SELECT * FROM car_owners 
    ORDER BY last_service_date DESC
    `,
  );
  return dogs;
}

export async function getCars(searchParams: GetCarsSchema) {
  const { page, per_page, sort } = searchParams;
  console.log("🚀 ~ getCars ~ searchParams:", searchParams);

  // Offset to paginate the results
  const offset = (page - 1) * per_page;
  // Column and order to sort by
  // Splitting the sort string by "." to get the column and order
  // Example: "title.desc" => ["title", "desc"]
  const [column, order] = (sort?.split(".").filter(Boolean) ?? [
    "created_at",
    "desc",
  ]) as [keyof Car | undefined, "asc" | "desc" | undefined];

  const { query: whereClause, values: whereValues } =
    buildWhereClause(searchParams);
  console.log("🚀 ~ getCars ~ whereClause:", whereClause);

  const carsQuery = `
      SELECT *
      FROM car_owners
      WHERE ${whereClause}
      ORDER BY ${column} ${order}
      OFFSET $${whereValues.length + 1} LIMIT $${whereValues.length + 2};
    `;

  const countQuery = `
      SELECT COUNT(*) as total_count
      FROM car_owners
      WHERE ${whereClause};
    `;

  try {
    const cars = await query<Car>(carsQuery, [
      ...whereValues,
      offset,
      per_page,
    ]);

    const totalCountResult = await query<{ total_count: number }>(
      countQuery,
      whereValues,
    );
    const totalCount = totalCountResult[0].total_count;
    const pageCount = Math.ceil(totalCount / per_page);

    const enums = await getDistinctCarAttributes();

    return { cars, pageCount, enums };
  } catch (err) {
    console.error("Error executing queries", err);
    throw err;
  }
}

const buildWhereClause = (input: GetCarsSchema) => {
  const { model, color, make, from, to, operator, year, owner_name } = input;
  const conditions: string[] = [];
  const values: any[] = [];
  let valueIndex = 1;

  const parseMultipleOptions = (field: string, valueString: string) => {
    const options = valueString.split(".");
    const placeholders = options.map(() => `$${valueIndex++}`).join(", ");
    options.forEach((option) => values.push(option));
    return `${field} IN (${placeholders})`;
  };

  if (model) {
    conditions.push(parseMultipleOptions("model", model));
  }

  if (color) {
    conditions.push(parseMultipleOptions("color", color));
  }

  if (make) {
    conditions.push(parseMultipleOptions("make", make));
  }

  if (year) {
    conditions.push(parseMultipleOptions("year", year));
  }

  if (owner_name) {
    conditions.push(`owner_name ILIKE $${valueIndex}`);
    values.push(`%${owner_name}%`);
    valueIndex++;
  }

  if (from && to) {
    conditions.push(`created_at BETWEEN $${valueIndex} AND $${valueIndex + 1}`);
    values.push(from, to);
    valueIndex += 2;
  }

  const query =
    conditions.length > 0
      ? conditions.join(` ${operator ? operator.toUpperCase() : "AND"} `)
      : "1=1";

  return { query, values };
};

export async function getDistinctCarAttributes() {
  const distinctMakesResult = await query<{ make: string }>(
    `
        SELECT DISTINCT make
        FROM car_owners
        ORDER BY make
      `,
  );

  const distinctModelsResult = await query<{ model: string }>(
    `
        SELECT DISTINCT model
        FROM car_owners
        ORDER BY model
      `,
  );

  const distinctColorsResult = await query<{ color: string }>(
    `
        SELECT DISTINCT color
        FROM car_owners
        ORDER BY color
      `,
  );

  const make = distinctMakesResult.map((item) => item.make);
  const model = distinctModelsResult.map((item) => item.model);
  const color = distinctColorsResult.map((item) => item.color);

  return {
    make,
    model,
    color,
  };
}
