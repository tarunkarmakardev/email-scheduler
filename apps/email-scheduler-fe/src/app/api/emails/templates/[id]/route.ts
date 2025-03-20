import { db } from "@/lib/db";
import { ApiError, ApiResponse, createRouteHandler } from "@/lib/route-handler";
import {
  EmailTemplateDeletePayloadSchema as DeletePayloadSchema,
  EmailTemplateUpdatePayloadSchema as PatchPayloadSchema,
  EmailTemplateDeletePayload as DeletePayload,
  EmailTemplateDeleteData as DeleteData,
  EmailTemplateDetailData as GetData,
  EmailTemplateDetailPayload as GetPayload,
  EmailTemplateUpdatePayload as PatchPayload,
  EmailTemplateUpdateData as PatchData,
} from "@/schemas/email-templates";

export const GET = createRouteHandler<GetPayload, GetData>(
  async ({ payload, userId }) => {
    const result = await db().emailTemplate.findUnique({
      where: {
        id: payload.id,
        userId,
      },
    });
    if (!result) {
      throw new ApiError("Email template not found", 404);
    }
    return new ApiResponse(result);
  }
);

export const DELETE = createRouteHandler<DeletePayload, DeleteData>(
  async ({ payload, userId }) => {
    const { id } = DeletePayloadSchema.parse(payload);
    const template = await db().emailTemplate.delete({
      where: {
        id,
        userId,
      },
    });
    return new ApiResponse(template);
  }
);

export const PATCH = createRouteHandler<PatchPayload, PatchData>(
  async ({ payload, userId }) => {
    const validatedData = PatchPayloadSchema.parse(payload);
    const result = await db().emailTemplate.delete({
      where: {
        id: validatedData.id,
        userId,
      },
    });
    return new ApiResponse(result);
  }
);
