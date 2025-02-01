import "server-only";
import { getEnv } from "./env";
import { cookies } from "next/headers";

export type QueryOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: BodyInit;
};
const env = getEnv();
export async function query<T = unknown>(url: string, options?: QueryOptions) {
  let status = 200;
  let statusText = "OK";
  try {
    const token = await cookies().get("token")?.value;
    const req = await fetch(`${env.DOMAIN}${url}`, {
      method: options?.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
      body: options?.body,
      cache: "no-store",
    });
    status = req.status;
    statusText = req.statusText;
    const res = (await req.json()) as T;
    return {
      res,
      status,
      statusText,
    };
  } catch (error) {
    const e = error instanceof Error ? error : new Error("Unknown Error");
    return {
      res: null,
      error: e.message,
      status,
      statusText,
    };
  }
}
