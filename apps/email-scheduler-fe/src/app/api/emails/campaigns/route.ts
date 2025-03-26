import { db } from "@/lib/db";
import { createListQuery } from "@/lib/list-query";
import { ApiResponse, createRouteHandler } from "@/lib/route-handler";
import {
  CampaignGetData as GetData,
  CampaignGetPayload as GetPayload,
  CampaignCreatePayload as PostPayload,
  CampaignCreateData as PostData,
} from "@/schemas/campaigns";

export const GET = createRouteHandler<GetPayload, GetData>(
  async ({ userId, payload }) => {
    const query = createListQuery({
      payload,
      searchColumns: ["name"],
      defaultPayload: {
        sortBy: "name",
        sortOrder: "asc",
      },
    });
    const items = await db().campaign.findMany({
      where: {
        userId,
        OR: query.where.OR,
      },
      orderBy: query.orderBy,
      take: query.take,
      skip: query.skip,
      include: {
        customers: true,
      },
    });
    return new ApiResponse({
      items,
      total: items.length,
    });
  }
);

export const POST = createRouteHandler<PostPayload, PostData>(
  async ({ payload, userId }) => {
    const { customers, name } = payload;
    await db().customer.createMany({
      data: customers.map((c) => ({ ...c, userId })),
      skipDuplicates: true,
    });
    const customerItems = await db().customer.findMany({
      where: {
        email: {
          in: customers.map((c) => c.email),
        },
      },
    });

    const result = await db().campaign.create({
      data: {
        name,
        userId,
        customers: {
          connect: customerItems,
        },
      },
      include: {
        customers: true,
      },
    });
    return new ApiResponse(result);
  }
);
