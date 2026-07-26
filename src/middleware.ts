import { NextRequest, NextResponse } from "next/server";
import { verifyInternalTestToken } from "@/lib/marketing/internal-test-token";

const INTERNAL_TEST_QUERY_PARAM = "mx_test";
const INTERNAL_TEST_COOKIE = "mx_internal_test";

function setInternalTestCookie(
  response: NextResponse,
  request: NextRequest,
  token: string,
): void {
  const expiresAt = Number(token.split(".")[1]);
  response.cookies.set(INTERNAL_TEST_COOKIE, token, {
    path: "/",
    sameSite: "strict",
    secure: request.nextUrl.protocol === "https:",
    httpOnly: false,
    expires: new Date(expiresAt * 1000),
  });
}

function clearInternalTestCookie(response: NextResponse): void {
  response.cookies.set(INTERNAL_TEST_COOKIE, "", {
    path: "/",
    sameSite: "strict",
    maxAge: 0,
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const queryToken = request.nextUrl.searchParams.get(INTERNAL_TEST_QUERY_PARAM);
  const cookieToken = request.cookies.get(INTERNAL_TEST_COOKIE)?.value ?? null;
  const candidateToken = queryToken ?? cookieToken;
  const validInternalTest = verifyInternalTestToken(
    candidateToken,
    process.env.NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY,
  );

  // Internal QA can only start with a short-lived, Ed25519-signed token.
  // Redirect immediately so the token is not retained in page paths, browser
  // history, referrers, or first-party event payloads.
  if (queryToken !== null) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete(INTERNAL_TEST_QUERY_PARAM);
    const response = NextResponse.redirect(cleanUrl);
    if (validInternalTest && candidateToken) {
      setInternalTestCookie(response, request, candidateToken);
    } else {
      clearInternalTestCookie(response);
    }
    return response;
  }

  let response: NextResponse;

  // Skip login page and auth API
  if (
    pathname === "/dashboard/login" ||
    pathname.startsWith("/api/dashboard/auth")
  ) {
    response = NextResponse.next();
  } else if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api/dashboard")
  ) {
    const cookie = request.cookies.get("dashboard_auth");
    if (!cookie) {
      if (pathname.startsWith("/api/")) {
        response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      } else {
        response = NextResponse.redirect(new URL("/dashboard/login", request.url));
      }
    } else {
      response = NextResponse.next();
    }
  } else {
    response = NextResponse.next();
  }

  if (cookieToken && !validInternalTest) {
    clearInternalTestCookie(response);
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)",
  ],
};
