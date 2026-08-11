import { NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  createMetaMarketingConsentProof,
  createMetaCapiRevocationAcknowledgement,
  deriveMetaCapiSession,
  getMetaConsentSecret,
  hasActiveMetaCapiRevocation,
  hasCurrentMarketingConsent,
  hasServerAcknowledgedRegrant,
  META_CAPI_REGRANT_COOKIE,
  META_CAPI_REVOCATION_ACK_COOKIE,
  META_CAPI_REVOCATION_MAX_AGE_SECONDS,
  META_CAPI_SEED_COOKIE,
  META_CAPI_SESSION_MAX_AGE_SECONDS,
  readMetaCapiSeed,
  readMetaCapiRevocationEpoch,
  metaCapiSessionCookieName,
  scopedRevocationCookieName,
} from "@/lib/marketing/meta-consent-proof.server";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "private, no-store, max-age=0" };

function requestIsSameOrigin(request: Request): boolean {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  return origin === requestOrigin && (!fetchSite || fetchSite === "same-origin");
}

function sharedCookieDomain(request: Request): string | undefined {
  const hostname = new URL(request.url).hostname.toLowerCase();
  return hostname === "medexia-akt.com" || hostname.endsWith(".medexia-akt.com")
    ? "medexia-akt.com"
    : undefined;
}

function acknowledgeMetaCapiRevocation(
  response: NextResponse,
  request: Request,
  epoch: string,
  sessionValue: string,
): void {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none" as const,
    path: "/",
    // Keep the acknowledgement for the full lifetime of the denial marker.
    // Otherwise a valid explicit regrant would silently become denied again
    // when the shorter proof/session cookie expires.
    maxAge: META_CAPI_REVOCATION_MAX_AGE_SECONDS,
  };
  const domain = sharedCookieDomain(request);
  const acknowledgement = createMetaCapiRevocationAcknowledgement(epoch, sessionValue);
  if (!acknowledgement) return;
  response.cookies.set(
    scopedRevocationCookieName(META_CAPI_REVOCATION_ACK_COOKIE, epoch),
    acknowledgement,
    domain ? { ...options, domain } : options,
  );
}

export async function POST(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403, headers: NO_STORE_HEADERS });
  }

  if (!hasCurrentMarketingConsent(request.headers.get("cookie"))) {
    return NextResponse.json({ error: "marketing_consent_required" }, { status: 403, headers: NO_STORE_HEADERS });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "invalid_content_type" }, { status: 415, headers: NO_STORE_HEADERS });
  }

  let fbclid = "";
  try {
    const body = (await request.json()) as { fbclid?: unknown };
    fbclid = typeof body.fbclid === "string" ? body.fbclid.trim() : "";
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400, headers: NO_STORE_HEADERS });
  }

  if (!fbclid || fbclid.length > 256 || /[\u0000-\u001f\u007f]/.test(fbclid)) {
    return NextResponse.json({ error: "invalid_fbclid" }, { status: 400, headers: NO_STORE_HEADERS });
  }

  if (!getMetaConsentSecret()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503, headers: NO_STORE_HEADERS });
  }

  const cookieHeader = request.headers.get("cookie");
  const revocationEpoch = readMetaCapiRevocationEpoch(cookieHeader);
  const wasRevoked = hasActiveMetaCapiRevocation(cookieHeader);
  if (
    wasRevoked &&
    (!revocationEpoch || !hasServerAcknowledgedRegrant(cookieHeader, revocationEpoch))
  ) {
    return NextResponse.json(
      { error: "marketing_regrant_required" },
      { status: 403, headers: NO_STORE_HEADERS },
    );
  }
  if (!readMetaCapiSeed(cookieHeader)) {
    const response = NextResponse.json(
      { error: "session_initialization_required" },
      { status: 409, headers: NO_STORE_HEADERS },
    );
    const domain = sharedCookieDomain(request);
    response.cookies.set(META_CAPI_SEED_COOKIE, crypto.randomBytes(32).toString("base64url"), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: META_CAPI_REVOCATION_MAX_AGE_SECONDS,
      ...(domain ? { domain } : {}),
    });
    return response;
  }
  // The server-random HttpOnly seed makes this binding unguessable, while the
  // withdrawal epoch rotates and namespaces it without letting stale responses
  // replace a newer epoch's credential.
  const sessionValue = deriveMetaCapiSession(cookieHeader);
  if (!sessionValue) {
    return NextResponse.json({ error: "proof_unavailable" }, { status: 503, headers: NO_STORE_HEADERS });
  }
  const proof = createMetaMarketingConsentProof(fbclid, sessionValue);
  if (!proof) {
    return NextResponse.json({ error: "proof_unavailable" }, { status: 503, headers: NO_STORE_HEADERS });
  }
  const response = NextResponse.json({ proof }, { headers: NO_STORE_HEADERS });
  const productionDomain = sharedCookieDomain(request);
  response.cookies.set(metaCapiSessionCookieName(cookieHeader), sessionValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: META_CAPI_SESSION_MAX_AGE_SECONDS,
    ...(productionDomain ? { domain: productionDomain } : {}),
  });
  if (revocationEpoch) {
    acknowledgeMetaCapiRevocation(response, request, revocationEpoch, sessionValue);
  }
  return response;
}

export async function PUT(request: Request) {
  if (!requestIsSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403, headers: NO_STORE_HEADERS });
  }
  const cookieHeader = request.headers.get("cookie");
  if (!hasCurrentMarketingConsent(cookieHeader)) {
    return NextResponse.json(
      { error: "marketing_consent_required" },
      { status: 403, headers: NO_STORE_HEADERS },
    );
  }
  const epoch = readMetaCapiRevocationEpoch(cookieHeader);
  if (!epoch || !hasActiveMetaCapiRevocation(cookieHeader)) {
    return NextResponse.json({ acknowledged: true }, { headers: NO_STORE_HEADERS });
  }
  const response = NextResponse.json({ acknowledged: true }, { headers: NO_STORE_HEADERS });
  const domain = sharedCookieDomain(request);
  response.cookies.set(scopedRevocationCookieName(META_CAPI_REGRANT_COOKIE, epoch), epoch, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: META_CAPI_REVOCATION_MAX_AGE_SECONDS,
    ...(domain ? { domain } : {}),
  });
  return response;
}
