import { getGoogleAuthClient } from "@/lib/google";
import { ApiResponse, createRouteHandler } from "@/lib/route-handler";

export const POST = createRouteHandler(async ({ request, userId, payload }) => {
  const client = await getGoogleAuthClient(userId);
  // TODO: To be implemented
  console.log(payload);

  return new ApiResponse({});
});
