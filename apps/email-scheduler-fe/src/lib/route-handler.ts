import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAuthUserId } from "./auth";

export function createRouteHandler<T>(
  handler: (
    request: NextRequest,
    userId: string
  ) => Promise<NextResponse<T>> | NextResponse<T>
) {
  return async (request: NextRequest) => {
    const userId = await getAuthUserId(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
      return await handler(request, userId);
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
