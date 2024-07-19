import { Dog } from "@/interfaces/Dog";
import { query } from "./db/postgres";

export async function getDogs() {
  const dogs = await query<Dog>("SELECT * FROM dogs");
  return dogs;
}
