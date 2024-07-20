import { query } from "./postgres";
import { Car } from "@/interfaces/Car";

export async function getCars() {
  const dogs = await query<Car>(
    `
    SELECT * FROM car_owners 
    ORDER BY last_service_date DESC
    `,
  );
  return dogs;
}
