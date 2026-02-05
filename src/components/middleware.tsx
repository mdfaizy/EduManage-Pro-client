// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;

//   // Agar admin route hai aur login nahi hai
//   if (request.nextUrl.pathname.startsWith("/admin") && !token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isPublicRoute =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/about") ||
    request.nextUrl.pathname.startsWith("/contact") ||
    request.nextUrl.pathname.startsWith("/features") ||
    request.nextUrl.pathname.startsWith("/pricing");

  // User logged in hai → public page open kare to dashboard bhejo
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // User logged out hai → admin open kare to login bhejo
  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
