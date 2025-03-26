/* eslint-disable @typescript-eslint/no-explicit-any */
export function createListQuery<Payload>(options: {
  payload: Payload;
  searchColumns: string[];
  defaultPayload?: Payload;
}) {
  const payload = { ...options.defaultPayload, ...options.payload };
  const { limit = 10, offset = 0, search, sortBy, sortOrder } = payload as any;

  let OR;
  let orderBy;

  if (search) {
    OR = options.searchColumns.map((column) => ({
      [column]: {
        contains: search,
        mode: "insensitive",
      },
    }));
  }

  if (sortBy && sortOrder) {
    orderBy = {
      [sortBy]: sortOrder,
    };
  }

  return {
    where: {
      OR,
    },
    orderBy,
    take: limit,
    skip: offset,
  };
}
