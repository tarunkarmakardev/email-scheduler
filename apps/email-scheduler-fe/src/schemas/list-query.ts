import { z } from "zod";

export const ListQuerySchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
  search: z.string().optional(),
});

export type ListQuery = z.infer<typeof ListQuerySchema>;
