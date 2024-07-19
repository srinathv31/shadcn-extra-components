import { Dog } from "@/interfaces/Dog";
import { query } from "./db/postgres";

export async function getDogs() {
  const dogs = await query<Dog>(
    `
    SELEcT * FROM dogs 
    ORDER BY last_checkup_date DESC
    `,
  );
  return dogs;
}
