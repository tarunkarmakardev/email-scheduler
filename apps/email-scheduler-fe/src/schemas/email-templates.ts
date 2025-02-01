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
export const EmailTemplateUpdatePayloadSchema = EmailTemplateSchema.pick({
  id: true,
  body: true,
  name: true,
  subject: true,
})
  .partial()
  .required({ id: true });

export const EmailTemplateDeletePayloadSchema = EmailTemplateSchema.pick({
  id: true,
});

export type EmailTemplateCreatePayload = z.infer<
  typeof EmailTemplateCreatePayloadSchema
>;
export type EmailTemplateUpdatePayload = z.infer<
  typeof EmailTemplateUpdatePayloadSchema
>;
export type EmailTemplateDeletePayload = z.infer<
  typeof EmailTemplateDeletePayloadSchema
>;
export type EmailTemplate = z.infer<typeof EmailTemplateSchema>;
export type EmailTemplateGetPayload = z.infer<typeof EmailGetPayloadSchema>;
export type EmailTemplateGetData = z.infer<typeof EmailGetDataSchema>;
