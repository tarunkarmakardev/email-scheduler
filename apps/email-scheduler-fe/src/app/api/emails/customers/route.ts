import { db } from "@/lib/db";
import { createListQuery } from "@/lib/list-query";
import { ApiResponse, createRouteHandler } from "@/lib/route-handler";
import {
  CustomerGetData as GetData,
  CustomerGetPayload as GetPayload,
  CustomerCreatePayload as PostPayload,
  CustomerCreateData as PostData,
  CustomerCreatePayloadSchema as PostSchema,
} from "@/schemas/customers";

export const GET = createRouteHandler<GetPayload, GetData>(
  async ({ payload }) => {
    const query = createListQuery({
      searchColumns: ["email", "firstName", "lastName"],
      payload,
    });
    const items = await db().customer.findMany({
      ...query,
      where: {
        ...query.where,
        campaigns: {
          some: {
            id: payload.campaignId,
          },
        },
      },
    });
    return new ApiResponse({
      items,
      total: items.length,
    } as unknown as GetData);
  }
);

export const POST = createRouteHandler<PostPayload, PostData>(
  async ({ payload, userId }) => {
    const data = PostSchema.parse(payload);
    const customer = await db().customer.create({
      data: { ...data, userId },
    });
    return new ApiResponse(customer as unknown as PostData);
  }
);
