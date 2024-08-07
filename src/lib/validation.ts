import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  status: z.enum(["active", "inactive", "pending"]),
  mailing_list: z.boolean().default(false),
  premium: z.boolean().default(false),
  product: z.string(),
  notes: z.string().optional(),
  promo_code: z.number(),
});

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
