import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // 🔒 Protect admin routes
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔄 Logged-in user shouldn't see login page
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
