/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAuthUserId } from "./auth";

export function createRouteHandler<T>(
  handler: (
    request: NextRequest,
    userId: string,
    ...args: any[]
  ) => Promise<NextResponse<T>> | NextResponse<T>
) {
  return async (request: NextRequest, ...args: any[]) => {
    const userId = await getAuthUserId(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
      return await handler(request, userId, ...args);
    } catch (error) {
      let message = "";
      if (error instanceof ZodError) {
        message = error.errors
          .map((e) => `${e.message} - ${e.path}`)
          .join(", ");
      } else if (error instanceof Error) {
        message = error.message;
      }
      return NextResponse.json({ message }, { status: 400 });
    }
  };
}
