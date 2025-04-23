import { getGoogleAuthClient } from "@/lib/google";
import { ApiResponse, createRouteHandler } from "@/lib/route-handler";

export const POST = createRouteHandler(async ({ request, userId }) => {
  const client = await getGoogleAuthClient(userId);

  return new ApiResponse({});
});
