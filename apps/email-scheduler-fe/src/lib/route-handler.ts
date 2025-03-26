/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAuthUserId } from "./auth";
import { ApiErrorResponse, ApiResponseJson } from "@/schemas/api";
import { parseQueryString } from "./query-string";

type RouteHandlerConfig<Payload> = {
  request: NextRequest;
  userId: string;
  payload: Payload;
  originalBody: Payload;
};

export function createRouteHandler<Payload, Res>(
  handler: (
    routHandlerObj: RouteHandlerConfig<Payload>
  ) => Promise<ApiResponse<Res>>
) {
  return async (request: NextRequest, { params }: { params: Promise<any> }) => {
    const userId = await getAuthUserId(request);
    if (!userId) throw new ApiError("Unauthorized", 401);
    const pathParams = await params;
    let payload = {} as Payload;
    let originalBody: Payload | undefined;
    if (pathParams) {
      payload = pathParams as Payload;
    }
    const contentLengthHeader = request.headers.get("Content-Length");
    const searchParams = request.nextUrl.searchParams.toString();
    const hasBody = contentLengthHeader && parseInt(contentLengthHeader) > 0;
    if (hasBody) {
      originalBody = await request.json();
      if (!Array.isArray(originalBody)) {
        payload = { ...payload, ...originalBody };
      }
    } else if (searchParams) {
      const parsedSearchParams = parseQueryString(
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
      );
      payload = { ...payload, ...parsedSearchParams };
    }
    try {
      const res = await handler({
        payload,
        request,
        originalBody: originalBody as Payload,
        userId,
      });
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
