export interface Dog {
  id: string; // UUID
  name: string;
  age: number;
  weight: number; // Assuming weight is a decimal
  breed: string;
  profile_picture: string; // URL to the profile picture
  energy_level: "Low" | "Medium" | "High";
  owner_name: string;
  owner_contact: string;
  vaccination_status: boolean;
  microchip_id: string; // Assuming microchip ID is a string of digits
  last_checkup_date: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
