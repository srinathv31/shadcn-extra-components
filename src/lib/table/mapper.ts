import { Dog } from "@/interfaces/Dog";

export const dogTableColumnMap: Record<keyof Dog | string, string> = {
  id: "ID",
  name: "Name",
  age: "Age",
  weight: "Weight",
  breed: "Breed",
  profile_picture: "Profile Picture",
  energy_level: "Energy",
  owner_name: "Owner",
  owner_contact: "Owner Contact",
  vaccination_status: "Vaccination Status",
  microchip_id: "Microchip ID",
  last_checkup_date: "Last Checkup",
  created_at: "Created At",
  updated_at: "Updated At",
};
