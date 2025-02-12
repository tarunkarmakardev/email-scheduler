import { z } from "zod";
import { CustomerCreatePayloadSchema } from "./customers";

export const CampaignSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  userId: z.string(),
});

export const CampaignGetPayloadSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  search: z.string().optional(),
});

export const CampaignGetDataSchema = z.object({
  items: z.array(CampaignSchema),
  total: z.number(),
});
export const CampaignDetailPayloadSchema = z.object({
  id: z.string().uuid(),
});
export const CampaignDetailDataSchema = CampaignSchema;
export const CampaignCreatePayloadSchema = CampaignSchema.pick({
  name: true,
});
export const CampaignUpdatePayloadSchema = CampaignSchema.pick({
  id: true,
  name: true,
})
  .partial()
  .required({ id: true });

export const CampaignDeleteSchema = CampaignSchema.pick({
  id: true,
});

export const CampaignFormValuesSchema = CampaignSchema.pick({
  name: true,
}).extend({
  customers: z.array(CustomerCreatePayloadSchema),
});

export type Campaign = z.infer<typeof CampaignSchema>;
export type CampaignGetPayload = z.infer<typeof CampaignGetPayloadSchema>;
export type CampaignGetData = z.infer<typeof CampaignGetDataSchema>;
export type CampaignDetailPayload = z.infer<typeof CampaignDetailPayloadSchema>;
export type CampaignDetailData = z.infer<typeof CampaignDetailDataSchema>;
export type CampaignCreatePayload = z.infer<typeof CampaignCreatePayloadSchema>;
export type CampaignCreateData = Campaign;
export type CampaignUpdatePayload = z.infer<typeof CampaignUpdatePayloadSchema>;
export type CampaignUpdateData = Campaign;
export type CampaignDeletePayload = z.infer<typeof CampaignDeleteSchema>;
export type CampaignDeleteData = Campaign;
export type CampaignFormValues = z.infer<typeof CampaignFormValuesSchema>;
