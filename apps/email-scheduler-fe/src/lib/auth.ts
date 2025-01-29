import "server-only";
import * as jose from "jose";
import { getEnv } from "./env";
import { cookies } from "next/headers";

const env = getEnv();

export function generateAuthToken(user: { id: string }, expiresAt: Date) {
  return new jose.SignJWT({
    id: user.id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(new TextEncoder().encode(env.SECRET));
}

export function verifyAuthToken(token: string) {
  return jose.jwtVerify(token, new TextEncoder().encode(env.SECRET));
}

export async function createSession(user: { id: string }) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const token = await generateAuthToken(user, expiresAt);
  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
export async function verifyIsAuthenticated(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) return null;
  try {
    const { payload } = await verifyAuthToken(token.value);
    return payload.id as string;
  } catch (e) {
    return null;
  }
}
