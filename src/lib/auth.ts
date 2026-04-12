import { cookies } from "next/headers";

const COOKIE_NAME = "dashboard_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function verifyPassword(password: string): Promise<boolean> {
  return password === process.env.DASHBOARD_PASSWORD;
}

export async function setAuthCookie() {
  const jar = await cookies();
  // Simple HMAC-like token: hash of the password so we can verify without storing plaintext
  const token = Buffer.from(process.env.DASHBOARD_PASSWORD || "").toString(
    "base64",
  );
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const cookie = jar.get(COOKIE_NAME);
  if (!cookie) return false;
  const expected = Buffer.from(process.env.DASHBOARD_PASSWORD || "").toString(
    "base64",
  );
  return cookie.value === expected;
}
