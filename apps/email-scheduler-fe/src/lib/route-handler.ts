/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAuthUserId } from "./auth";
import { ApiErrorResponse, ApiResponseJson } from "@/schemas/api";
import { parseQueryString } from "./query-string";

type RouteHandlerConfig<Req> = {
  request: NextRequest;
  userId: string;
  payload: Req;
};

export function createRouteHandler<Req, Res>(
  handler: (
    routHandlerObj: RouteHandlerConfig<Req>
  ) => Promise<ApiResponse<Res>>
) {
  return async (request: NextRequest, { params }: { params: Promise<any> }) => {
    const userId = await getAuthUserId(request);
    if (!userId) throw new ApiError("Unauthorized", 401);
    const pathParams = await params;
    let payload = {} as Req;
    if (pathParams) {
      payload = pathParams as Req;
    }
    const contentLengthHeader = request.headers.get("Content-Length");
    const searchParams = request.nextUrl.searchParams.toString();
    const hasBody = contentLengthHeader && parseInt(contentLengthHeader) > 0;
    if (hasBody) {
      payload = (await request.json()) as Req;
    } else if (searchParams) {
      payload = parseQueryString(
        searchParams,
        {},
        {
          types: {
            search: "string",
            sortBy: "string",
            sortOrder: "string",
            limit: "number",
            offset: "number",
          },
        }
      ) as Req;
    }
    try {
      const res = await handler({ payload, request, userId });
      return res.toResponse();
    } catch (error) {
      let message = "";
      let statusCode = 500;
      if (error instanceof ZodError) {
        message = error.errors
          .map((e) => `${e.message} - ${e.path}`)
          .join(", ");
        statusCode = 400;
      } else if (error instanceof ApiError) {
        message = error.message;
        statusCode = error.statusCode;
      } else if (error instanceof Error) {
        message = error.message;
      }
      return NextResponse.json(
        { status: "ERROR", error: message, statusCode } as ApiErrorResponse,
        {
          status: statusCode,
        }
      );
    }
  };
}

export class ApiError extends Error {
  statusCode = 500;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ApiResponse<T> {
  private response = null as unknown as NextResponse<ApiResponseJson<T>>;
  constructor(result: T, statusCode = 200, options?: ResponseInit) {
    this.response = NextResponse.json(
      {
        status: "SUCCESS",
        statusCode,
        result,
      },
      options
    );
  }
  toResponse() {
    return this.response;
  }
}
