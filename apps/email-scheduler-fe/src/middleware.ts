import { NextRequest, NextResponse } from "next/server";
import { getAuthUserId } from "@/lib/auth";

const publicRoutes = ["/auth/sign-in", "/auth/sign-up", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);
  if (isProtectedRoute) {
    const userId = await getAuthUserId(req);
    if (!userId) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|.*\\.png$).*)"],
};
