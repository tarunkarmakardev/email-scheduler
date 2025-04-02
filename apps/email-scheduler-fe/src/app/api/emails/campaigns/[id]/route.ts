import { db } from "@/lib/db";
import { ApiError, ApiResponse, createRouteHandler } from "@/lib/route-handler";
import {
  CampaignUpdatePayloadSchema as PatchSchema,
  CampaignUpdatePayload as PatchPayload,
  CampaignUpdateData as PatchData,
  CampaignDetailPayload as DetailPayload,
  CampaignDetailData as DetailData,
  CampaignDeletePayload as DeletePayload,
  CampaignDeleteData as DeleteData,
} from "@/schemas/campaigns";

export const PATCH = createRouteHandler<PatchPayload, PatchData>(
  async ({ payload, userId }) => {
    const { id, customers = [], ...data } = PatchSchema.parse(payload);
    const _customers = await db().$transaction((tx) => {
      const updates = customers.map((c) =>
        tx.customer.upsert({
          create: { ...c, userId },
          update: { ...c, userId },
          where: { email: c.email },
        })
      );
      return Promise.all(updates);
    });
    const campaign = await db().campaign.update({
      where: { id, userId },
      data: {
        ...data,
        customers: { set: _customers.map((c) => ({ id: c.id })) },
      },
      include: {
        customers: true,
      },
    });
    return new ApiResponse(campaign as unknown as PatchData);
  }
);

export const DELETE = createRouteHandler<DeletePayload, DeleteData>(
  async ({ payload, userId }) => {
    const campaign = await db().campaign.delete({
      where: { id: payload.id, userId },
      include: {
        customers: true,
      },
    });
    return new ApiResponse(campaign as unknown as DeleteData);
  }
);

export const GET = createRouteHandler<DetailPayload, DetailData>(
  async ({ payload, userId }) => {
    const campaign = await db().campaign.findUnique({
      where: { id: payload.id, userId },
      include: {
        customers: true,
      },
    });
    if (!campaign) {
      throw new ApiError("Campaign not found", 404);
    }
    return new ApiResponse(campaign as unknown as DetailData);
  }
);
