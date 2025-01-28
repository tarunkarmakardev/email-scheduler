import { getEnv } from "./env";

export type QueryOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: BodyInit;
};
const env = getEnv();
export async function query<T = unknown>(url: string, options?: QueryOptions) {
  const req = await fetch(`${env.DOMAIN}${url}`, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: options?.body,
  });
  const res = (await req.json()) as T;
  return {
    res,
    status: req.status,
    statusText: req.statusText,
  };
}
