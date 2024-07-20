export interface Car {
  id: string; // UUID
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number; // Assuming mileage is a decimal
  vin: string; // 17 characters long
  owner_name: string;
  owner_contact: string;
  last_service_date: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
