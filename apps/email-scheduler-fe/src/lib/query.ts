import "server-only";
import { getEnv } from "./env";
import { cookies } from "next/headers";

export type QueryOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: BodyInit;
  searchParams?: Record<string, string>;
  pathParams?: Record<string, string>;
};
export type QueryErrorResponse = {
  status: "ERROR";
  statusCode: number;
  statusText: string;
  error: string;
};
export type QuerySuccessResponse<T> = {
  status: "SUCCESS";
  statusCode: number;
  statusText: string;
  data: T;
};
export type QueryResponse<T> = QuerySuccessResponse<T> | QueryErrorResponse;
const env = getEnv();
export async function query<T = unknown>(
  url: string,
  options?: QueryOptions
): Promise<QueryResponse<T>> {
  const {
    method,
    headers,
    body,
    searchParams = {},
    pathParams = {},
  } = options ?? {};
  let statusCode = 200;
  let statusText = "OK";
  try {
    const token = await cookies().get("token")?.value;
    const urlInstance = new URL(url, env.DOMAIN);
    Object.entries(pathParams).forEach(([key, value]) => {
      urlInstance.pathname = urlInstance.pathname.replace(`:${key}`, value);
    });
    Object.entries(searchParams).forEach(([key, value]) => {
      urlInstance.searchParams.set(key, value);
    });
    const req = await fetch(urlInstance, {
      method: method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body,
      cache: "no-store",
    });
    statusCode = req.status;
    statusText = req.statusText;
    const data = (await req.json()) as T;
    return {
      status: "SUCCESS",
      data,
      statusCode,
      statusText,
    };
  } catch (error) {
    const e = error instanceof Error ? error : new Error("Unknown Error");
    return {
      status: "ERROR",
      error: e.message,
      statusCode,
      statusText,
    };
  }
}
