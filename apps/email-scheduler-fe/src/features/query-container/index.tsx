import { query, QueryOptions, QuerySuccessResponse } from "@/lib/query";

export type QueryContainerProps<T> = {
  url: string;
  options?: QueryOptions;
  children: (res: QuerySuccessResponse<T>) => React.ReactNode;
};

export default async function QueryContainer<T>({
  url,
  options,
  children,
}: QueryContainerProps<T>) {
  const res = await query<T>(url, options);
  if (res.status === "ERROR") return <div>Error</div>;
  return <div>{children(res)}</div>;
}
