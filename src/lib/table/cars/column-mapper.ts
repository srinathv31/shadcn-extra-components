import { Car } from "@/interfaces/Car";

export const carTableColumnMap: Record<keyof Car, string> = {
  id: "ID",
  make: "Make",
  model: "Model",
  year: "Year",
  color: "Color",
  mileage: "Mileage",
  vin: "VIN",
  owner_name: "Owner",
  owner_contact: "Owner Contact",
  last_service_date: "Service Date",
  created_at: "Created At",
  updated_at: "Updated At",
};
