import { getGoogleAuthClient } from "@/lib/google";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const client = getGoogleAuthClient();
  const { tokens } = await client.getToken(
    url.searchParams.get("code") as string
  );
  //  Create user here

  return Response.json({});
}
