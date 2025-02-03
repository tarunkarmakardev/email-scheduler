import { z } from "zod";

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  userId: z.string(),
});

export const CustomerGetPayloadSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  search: z.string().optional(),
});

export const CustomerGetDataSchema = z.object({
  results: z.array(CustomerSchema),
  total: z.number(),
});

export const CustomerCreatePayloadSchema = CustomerSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});

export const CustomerUpdatePayloadSchema = CustomerSchema.pick({
  id: true,
  firstName: true,
  lastName: true,
  email: true,
})
  .partial()
  .required({ id: true });

export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerGetPayload = z.infer<typeof CustomerGetPayloadSchema>;
export type CustomerGetData = z.infer<typeof CustomerGetDataSchema>;
export type CustomerCreatePayload = z.infer<typeof CustomerCreatePayloadSchema>;
export type CustomerUpdatePayload = z.infer<typeof CustomerUpdatePayloadSchema>;
