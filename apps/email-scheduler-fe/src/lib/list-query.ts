import { ListQuery, ListQuerySchema } from "@/schemas/list-query";
import { parseQueryString } from "./query-string";

export function createListQuery({
  input,
  searchColumns,
}: {
  input: string;
  searchColumns: string[];
}) {
  const initialValues = {
    limit: 10,
    offset: 0,
    search: "",
    sortBy: "",
    sortOrder: "",
  };
  const { limit, offset, search, sortBy, sortOrder } = ListQuerySchema.parse(
    parseQueryString<ListQuery>(input, initialValues, {
      types: {
        search: "string",
        sortBy: "string",
        sortOrder: "string",
        limit: "number",
        offset: "number",
      },
    })
  );

  const OR = searchColumns.map((column) => ({
    [column]: {
      contains: search,
      mode: "insensitive",
    },
  }));
  return {
    where: {
      OR,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : undefined,
    take: limit,
    skip: offset,
  };
}
