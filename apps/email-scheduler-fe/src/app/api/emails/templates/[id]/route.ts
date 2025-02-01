import { db } from "@/lib/db";
import { createRouteHandler } from "@/lib/route-handler";
import {
  EmailTemplateDeletePayloadSchema,
  EmailTemplateUpdatePayloadSchema,
} from "@/schemas/email-templates";
import { NextResponse } from "next/server";

export const PATCH = createRouteHandler(
  async (request, userId, { params }: { params: Promise<{ id: string }> }) => {
    const data = await request.json();
    const id = (await params).id;
    const validatedData = EmailTemplateUpdatePayloadSchema.parse({
      ...data,
      id,
    });
    const result = await db().emailTemplate.update({
      where: {
        id: validatedData.id,
        userId,
      },
      data: {
        ...validatedData,
      },
    });
    return NextResponse.json(result);
  }
);

export const DELETE = createRouteHandler(
  async (request, userId, { params }: { params: Promise<{ id: string }> }) => {
    const validatedData = EmailTemplateDeletePayloadSchema.parse(params);
    const result = await db().emailTemplate.delete({
      where: {
        id: validatedData.id,
        userId,
      },
    });
    return NextResponse.json(result);
  }
);
