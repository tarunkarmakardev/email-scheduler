import { ApiResponse, createRouteHandler } from "@/lib/route-handler";
import { db } from "@/lib/db";
import {
  EmailTemplateCreatePayload as PostPayload,
  EmailTemplate as PostData,
  EmailTemplateGetPayload as GetPayload,
  EmailTemplateGetData as GetData,
  EmailTemplateCreatePayloadSchema,
} from "@/schemas/email-templates";
import { createListQuery } from "@/lib/list-query";

export const GET = createRouteHandler<GetPayload, GetData>(
  async ({ request, userId, payload }) => {
    const query = createListQuery({
      payload,
      searchColumns: ["name", "body", "subject"],
    });
    const items = await db().emailTemplate.findMany({
      where: {
        userId,
        OR: query.where.OR,
      },
      orderBy: query.orderBy,
      take: query.take,
      skip: query.skip,
    });
    return new ApiResponse({ items, total: items.length });
  }
);

export const POST = createRouteHandler<PostPayload, PostData>(
  async ({ request, userId, payload }) => {
    const validatedData = EmailTemplateCreatePayloadSchema.parse(payload);
    const result = await db().emailTemplate.create({
      data: {
        ...validatedData,
        userId,
      },
    });
    return new ApiResponse(result);
  }
);
