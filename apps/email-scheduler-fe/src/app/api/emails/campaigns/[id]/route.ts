import { db } from "@/lib/db";
import { createRouteHandler } from "@/lib/route-handler";
import { CampaignCreatePayloadSchema } from "@/schemas/campaigns";
import { NextResponse } from "next/server";

export const PATCH = createRouteHandler(
  async (req, userId, { params }: { params: Promise<{ id: string }> }) => {
    const body = await req.json();
    const { id } = await params;
    const data = CampaignCreatePayloadSchema.parse({
      ...body,
      id,
    });
    const campaign = await db().campaign.update({
      where: { id, userId },
      data,
    });
    return NextResponse.json(campaign);
  }
);

export const DELETE = createRouteHandler(
  async (req, userId, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const campaign = await db().campaign.delete({
      where: { id, userId },
    });
    return NextResponse.json(campaign);
  }
);

export const GET = createRouteHandler(
  async (req, userId, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const campaign = await db().campaign.findUnique({
      where: { id, userId },
    });
    return NextResponse.json(campaign);
  }
);
