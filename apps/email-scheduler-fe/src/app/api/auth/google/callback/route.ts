import { appRoutes } from "@/config";
import { createSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getGoogleAuthClient, getUserInfo } from "@/lib/google";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const client = getGoogleAuthClient();
  const { tokens } = await client.getToken(
    url.searchParams.get("code") as string
  );
  client.setCredentials(tokens);
  const { email, firstName, lastName, picture } = await getUserInfo(client);
  let user = await db().user.findUnique({ where: { email } });
  if (!user) {
    user = await db().user.create({
      data: {
        email,
        firstName,
        lastName,
        picture,
        googleToken: JSON.stringify(tokens),
      },
    });
  }
  await createSession(user);
  redirect(appRoutes.templates.list);
}
