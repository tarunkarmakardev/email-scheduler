import { ApiResponse, createRouteHandler } from "@/lib/route-handler";
import { seedDb } from "@/lib/seed-db";

export const POST = createRouteHandler(async ({ request, userId }) => {
  await seedDb(request, userId);
  return new ApiResponse({ message: "Successfully seeded database" });
});
