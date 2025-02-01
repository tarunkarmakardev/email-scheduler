import { z } from "zod";

export const EmailTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  subject: z.string(),
  body: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  userId: z.string(),
});

export const EmailGetPayloadSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  search: z.string().optional(),
});

export const EmailGetDataSchema = z.object({
  results: z.array(EmailTemplateSchema),
  total: z.number(),
});

export const EmailTemplateCreatePayloadSchema = EmailTemplateSchema.pick({
  body: true,
  name: true,
  subject: true,
});
export type EmailTemplateCreatePayload = z.infer<
  typeof EmailTemplateCreatePayloadSchema
>;
export type EmailTemplate = z.infer<typeof EmailTemplateSchema>;
export type EmailTemplateGetPayload = z.infer<typeof EmailGetPayloadSchema>;
export type EmailTemplateGetData = z.infer<typeof EmailGetDataSchema>;
