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
  campaignId: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  search: z.string().optional(),
});

export const CustomerGetDataSchema = z.object({
  items: z.array(CustomerSchema),
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

export const CustomerDetailPayloadSchema = CustomerSchema.pick({
  id: true,
});
export const CustomerDeletePayloadSchema = CustomerSchema.pick({
  id: true,
});

export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerGetPayload = z.infer<typeof CustomerGetPayloadSchema>;
export type CustomerGetData = z.infer<typeof CustomerGetDataSchema>;
export type CustomerCreatePayload = z.infer<typeof CustomerCreatePayloadSchema>;
export type CustomerCreateData = Customer;
export type CustomerUpdatePayload = z.infer<typeof CustomerUpdatePayloadSchema>;
export type CustomerUpdateData = Customer;
export type CustomerDetailPayload = z.infer<typeof CustomerDetailPayloadSchema>;
export type CustomerDetailData = Customer;
export type CustomerDeletePayload = z.infer<typeof CustomerDeletePayloadSchema>;
export type CustomerDeleteData = Customer;
