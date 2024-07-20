import { Dog } from "@/interfaces/Dog";
import { query } from "./postgres";

export async function getDogs() {
  const dogs = await query<Dog>(
    `
    SELECT * FROM dogs 
    ORDER BY last_checkup_date DESC
    `,
  );
  return dogs;
}
