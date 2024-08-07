// lib/db/mongo/db.js
import { connectToDatabase } from "./connection";
import Customer from "./customer";
import Group from "./group";

connectToDatabase();

export const db = {
  Group,
  Customer,
};
