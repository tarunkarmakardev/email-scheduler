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
