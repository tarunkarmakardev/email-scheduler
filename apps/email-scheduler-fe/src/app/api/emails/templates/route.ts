import { createRouteHandler } from "@/lib/route-handler";
import { db } from "@/lib/db";
import {
  EmailTemplateCreatePayloadSchema,
  EmailTemplateGetData,
} from "@/schemas/email-templates";
import { NextResponse } from "next/server";
import { createListQuery } from "@/lib/list-query";

export const GET = createRouteHandler(async (request, userId) => {
  const query = createListQuery({
    input: request.nextUrl.searchParams.toString(),
    searchColumns: ["name", "body", "subject"],
  });
  const results = await db().emailTemplate.findMany({
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
  } as EmailTemplateGetData);
});

export const POST = createRouteHandler(async (request, userId) => {
  const data = await request.json();
  const validatedData = EmailTemplateCreatePayloadSchema.parse(data);
  const result = await db().emailTemplate.create({
    data: {
      ...validatedData,
      userId,
    },
  });
  return NextResponse.json(result);
});
