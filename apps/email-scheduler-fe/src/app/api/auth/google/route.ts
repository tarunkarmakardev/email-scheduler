import { authUrlConfig, getGoogleAuthClient } from "@/lib/google";
import { GoogleAuthResponse } from "@/schemas/google";

export async function GET(request: Request) {
  const client = getGoogleAuthClient();
  const authUrl = client.generateAuthUrl(authUrlConfig);
  const res: GoogleAuthResponse = { authUrl };
  return Response.json(res);
}
