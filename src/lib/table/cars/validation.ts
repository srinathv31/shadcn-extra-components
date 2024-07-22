import { z } from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
  make: z.string().optional(),
  year: z.string().optional(),
  owner_name: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export const getCarsSchema = searchParamsSchema;

export type GetCarsSchema = z.infer<typeof getCarsSchema>;
