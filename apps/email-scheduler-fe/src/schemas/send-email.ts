import { z } from "zod";

export const SendEmailPostPayloadSchema = z.object({
  campaignId: z.string(),
  subject: z.string(),
  body: z.string(),
});

export const SendEmailPostDataSchema = z.object({
  id: z.string(),
  campaignId: z.string(),
  subject: z.string(),
  body: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SendEmailFormValues = z.infer<typeof SendEmailPostPayloadSchema>;
export type SendEmailPostPayload = z.infer<typeof SendEmailPostPayloadSchema>;
export type SendEmailPostData = z.infer<typeof SendEmailPostDataSchema>;
