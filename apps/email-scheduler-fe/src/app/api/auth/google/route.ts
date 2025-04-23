import { authUrlConfig, getGoogleAuthClient } from "@/lib/google";
import { ApiResponse } from "@/lib/route-handler";

export const GET = async () => {
  const client = await getGoogleAuthClient();
  const authUrl = client.generateAuthUrl(authUrlConfig);
  return new ApiResponse({ authUrl }).toResponse();
};
