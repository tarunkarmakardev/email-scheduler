import "server-only";
import { getEnv } from "./env";
import { cookies } from "next/headers";
import { ApiErrorResponse, ApiResponseJson } from "@/schemas/api";

export type QueryOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: BodyInit;
  searchParams?: Record<string, string>;
  pathParams?: Record<string, string>;
};
const env = getEnv();
export async function query<T = unknown>(
  url: string,
  options?: QueryOptions
): Promise<ApiResponseJson<T>> {
  const {
    method,
    headers,
    body,
    searchParams = {},
    pathParams = {},
  } = options ?? {};
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
    return (await req.json()) as ApiResponseJson<T>;
  } catch (error) {
    return {
      error: "Unknown Error",
      status: "ERROR",
      statusCode: 500,
      __error: error,
    } as ApiErrorResponse;
  }
}
