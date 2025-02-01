import { createRouteHandler } from "@/lib/route-handler";
import { seedDb } from "@/lib/seed-db";
import { NextResponse } from "next/server";

export const POST = createRouteHandler(async (request, userId) => {
  await seedDb(request, userId);
  return NextResponse.json({ success: true });
});
