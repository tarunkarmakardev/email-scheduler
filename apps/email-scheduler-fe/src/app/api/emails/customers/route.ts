import { db } from "@/lib/db";
import { createListQuery } from "@/lib/list-query";
import { parseQueryString } from "@/lib/query-string";
import { createRouteHandler } from "@/lib/route-handler";
import { CustomerGetData } from "@/schemas/customers";
import { NextResponse } from "next/server";

export const GET = createRouteHandler(async (request, userId) => {
  const { campaignId } = parseQueryString(
    request.nextUrl.searchParams.toString(),
    {
      campaignId: "",
    }
  );
  const query = createListQuery({
    input: request.nextUrl.searchParams.toString(),
    searchColumns: ["email", "firstName", "lastName"],
  });
  const results = await db().customer.findMany({
    ...query,
    where: {
      ...query.where,
      campaigns: {
        some: {
          id: campaignId,
        },
      },
    },
  });
  return NextResponse.json({
    results,
    total: results.length,
  } as CustomerGetData);
});
