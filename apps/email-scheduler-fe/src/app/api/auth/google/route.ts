import { authUrlConfig, getGoogleAuthClient } from "@/lib/google";
import { ApiResponse, createRouteHandler } from "@/lib/route-handler";
import { GoogleAuthGetData, GoogleAuthGetPayload } from "@/schemas/google";

export const GET = createRouteHandler<GoogleAuthGetPayload, GoogleAuthGetData>(
  async () => {
    const client = getGoogleAuthClient();
    const authUrl = client.generateAuthUrl(authUrlConfig);
    return new ApiResponse({ authUrl });
  }
);
