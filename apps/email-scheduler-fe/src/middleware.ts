import { NextRequest, NextResponse } from "next/server";
import { verifyIsAuthenticated } from "@/lib/auth";

const publicRoutes = ["/auth/sign-in", "/auth/sign-up", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);
  const userId = await verifyIsAuthenticated(req);

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
