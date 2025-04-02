/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { getEnv } from "@/lib/env";
import { google, Auth } from "googleapis";
import { db } from "./db";

const env = getEnv();

export async function getGoogleAuthClient(userId?: string) {
  const client = new google.auth.OAuth2({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    redirectUri: `${env.DOMAIN}/api/auth/google/callback`,
  });

  if (userId && Object.keys(client.credentials).length === 0) {
    const user = await db().user.findUnique({
      where: { id: userId },
    });
    if (user) {
      client.setCredentials(user.googleToken as any);
    }
  }
  return client;
}
export const authUrlConfig = {
  access_type: "offline",
  response_type: "code",
  scope: [
    "https://mail.google.com",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
  prompt: "consent",
};

export async function getUserInfo(client: Auth.OAuth2Client) {
  const oauth = google.oauth2({ version: "v2", auth: client });
  const res = await oauth.userinfo.get();
  return {
    firstName: res.data.given_name,
    lastName: res.data.family_name,
    email: res.data.email,
    picture: res.data.picture,
    fullName: res.data.name,
  } as {
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    fullName: string;
  };
}
export async function getUserEmails(client: Auth.OAuth2Client) {
  const gmail = google.gmail({ version: "v1", auth: client });
  const res = await gmail.users.messages.list({
    userId: "me",
  });
  const messages = res.data.messages;
  return { messages } as {
    messages: {
      id: string;
      threadId: string;
    }[];
  };
}
export async function getUserEmail(client: Auth.OAuth2Client, id: string) {
  const gmail = google.gmail({ version: "v1", auth: client });
  const res = await gmail.users.messages.get({
    userId: "me",
    id,
  });
  const message = {
    id: res.data.id,
    threadId: res.data.threadId,
    snippet: res.data.snippet,
    body:
      Buffer.from(
        res.data.payload?.parts?.[1]?.body?.data || "",
        "base64"
      ).toString("utf-8") || null,
  } as {
    id: string;
    threadId: string;
    snippet: string;
    body: string | null;
  };
  return message;
}

export async function sendGmailEmail({
  client,
  to,
  subject,
  body,
}: {
  client: Auth.OAuth2Client;
  to: string;
  subject: string;
  body: string;
}) {
  return;
}
