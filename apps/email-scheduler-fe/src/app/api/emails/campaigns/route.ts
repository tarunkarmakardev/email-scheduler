import { db } from "@/lib/db";
import { createListQuery } from "@/lib/list-query";
import { createRouteHandler } from "@/lib/route-handler";
import { CampaignCreatePayload, CampaignGetData } from "@/schemas/campaigns";
import { NextResponse } from "next/server";

export const GET = createRouteHandler(async (request, userId) => {
  const query = createListQuery({
    input: request.nextUrl.searchParams.toString(),
    searchColumns: ["name"],
  });
  const results = await db().campaign.findMany({
    where: {
      userId,
      OR: query.where.OR,
    },
    orderBy: query.orderBy,
    take: query.take,
    skip: query.skip,
  });
  return NextResponse.json({
    results,
    total: results.length,
  } as CampaignGetData);
});

export const POST = createRouteHandler(async (request, userId) => {
  const data = (await request.json()) as CampaignCreatePayload;
  const result = await db().campaign.create({
    data: {
      ...data,
      userId,
    },
  });
  return NextResponse.json(result);
});
