import { z } from "zod";

export const customerSearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  status: z.string().optional(),
  //   status: z.enum(["active", "inactive", "pending"]).optional(),
  mailing_list: z.coerce.boolean().optional(),
  //   premium: z.coerce.boolean().optional(),
  premium: z.string().optional(),
  product: z.string().optional(),
  from: z.string().optional(), // Assuming this will be a date string
  to: z.string().optional(), // Assuming this will be a date string
  operator: z.enum(["and", "or"]).optional(),
});

export const getCustomersSchema = customerSearchParamsSchema;

export type GetCustomersSchema = z.infer<typeof getCustomersSchema>;
