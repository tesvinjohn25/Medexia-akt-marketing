import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page and auth API
  if (
    pathname === "/dashboard/login" ||
    pathname.startsWith("/api/dashboard/auth")
  ) {
    return NextResponse.next();
  }

  // Check auth cookie for dashboard routes
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api/dashboard")
  ) {
    const cookie = request.cookies.get("dashboard_auth");
    if (!cookie) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
