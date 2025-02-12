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
    const { id, ...data } = PatchSchema.parse(payload);
    const campaign = await db().campaign.update({
      where: { id, userId },
      data,
    });
    return new ApiResponse(campaign);
  }
);

export const DELETE = createRouteHandler<DeletePayload, DeleteData>(
  async ({ payload, userId }) => {
    const campaign = await db().campaign.delete({
      where: { id: payload.id, userId },
    });
    return new ApiResponse(campaign);
  }
);

export const GET = createRouteHandler<DetailPayload, DetailData>(
  async ({ payload, userId }) => {
    const campaign = await db().campaign.findUnique({
      where: { id: payload.id, userId },
    });
    if (!campaign) {
      throw new ApiError("Campaign not found", 404);
    }
    return new ApiResponse(campaign);
  }
);
