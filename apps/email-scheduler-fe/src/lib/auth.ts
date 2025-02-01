import "server-only";
import * as jose from "jose";
import { getEnv } from "./env";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const env = getEnv();
const SECRET = new TextEncoder().encode(env.SECRET);

export function generateAuthToken(user: { id: string }, expiresAt: Date) {
  return new jose.SignJWT({
    id: user.id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(SECRET);
}

export function verifyAuthToken(token: string) {
  return jose.jwtVerify(token, SECRET);
}

export async function createSession(user: { id: string }) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const token = await generateAuthToken(user, expiresAt);
  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
export async function getAuthCookie(req: NextRequest) {
  try {
    const token =
      req.cookies.get("token")?.value ||
      req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return null;
    return token as string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
}

export async function getAuthUserId(req: NextRequest) {
  const token = await getAuthCookie(req);
  if (!token) return null;
  const { payload } = await verifyAuthToken(token);
  return payload.id as string;
}

export async function signOut() {
  const cookieStore = cookies();
  cookieStore.delete("token");
}
