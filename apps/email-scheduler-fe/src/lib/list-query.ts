/* eslint-disable @typescript-eslint/no-explicit-any */

export function createListQuery<Payload>({
  payload,
  searchColumns,
}: {
  payload: Payload;
  searchColumns: string[];
}) {
  const { limit = 10, offset = 0, search, sortBy, sortOrder } = payload as any;

  let OR;
  let orderBy;

  if (search) {
    OR = searchColumns.map((column) => ({
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
