import type { CtaIntent } from "./attribution";

const REFERRAL_CODE_SESSION_STORAGE_KEY = "mx_referral_code";
const REFERRAL_FREE_APP_JOIN_URL = "https://app.medexia-akt.com/join/free";
const REFERRAL_FULL_ACCESS_APP_JOIN_URL =
  "https://app.medexia-akt.com/join/full-access";
const REFERRAL_VALIDATION_URL = "/api/referral/validate";

export type ReferralValidation = {
  valid: true;
  friendPricePence: number;
  standardPricePence: number;
  sprintEndsAt: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function incomingReferralCode(): string | null {
  if (!isBrowser()) return null;

  try {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("ref")) return null;
    return params.get("ref") || null;
  } catch {
    return null;
  }
}

function storedReferralCode(): string | null {
  if (!isBrowser()) return null;

  try {
    return window.sessionStorage.getItem(REFERRAL_CODE_SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Hold the referral for the lifetime of this browser tab. A later explicit
 * referral link is authoritative; a clean landing-page navigation keeps the
 * referral already captured for the current session.
 */
export function captureReferralCode(): string | null {
  if (!isBrowser()) return null;

  const incoming = incomingReferralCode();
  if (!incoming) return storedReferralCode();

  try {
    window.sessionStorage.setItem(REFERRAL_CODE_SESSION_STORAGE_KEY, incoming);
  } catch {
    // The current-page handoff still works if sessionStorage is unavailable.
  }

  return incoming;
}

function referralDestination(
  pathOrExistingUrl: string,
  intent?: CtaIntent,
): string | null {
  if (intent === "login" || intent === "demo" || intent === "app_open") {
    return null;
  }

  if (
    intent === "checkout" ||
    intent === "earlybird_upgrade" ||
    intent === "referral_earlybird"
  ) {
    return REFERRAL_FULL_ACCESS_APP_JOIN_URL;
  }

  if (intent === "start_free" || intent === "start_audio") {
    return REFERRAL_FREE_APP_JOIN_URL;
  }

  try {
    const path = new URL(
      pathOrExistingUrl,
      "https://app.medexia-akt.com",
    ).pathname;
    if (path === "/join/full-access") return REFERRAL_FULL_ACCESS_APP_JOIN_URL;
    if (path === "/join/free") return REFERRAL_FREE_APP_JOIN_URL;
  } catch {
    return null;
  }

  return null;
}

export function buildReferralAppUrl(
  code: string | null | undefined,
  pathOrExistingUrl: string,
  intent?: CtaIntent,
): string | null {
  if (!code) return null;

  const destination = referralDestination(pathOrExistingUrl, intent);
  if (!destination) return null;

  const url = new URL(destination);
  url.searchParams.set("referral_code", code);
  return url.toString();
}

export async function validateReferralCode(
  code: string,
  signal?: AbortSignal,
): Promise<ReferralValidation | null> {
  try {
    const response = await fetch(
      `${REFERRAL_VALIDATION_URL}/${encodeURIComponent(code)}`,
      {
        cache: "no-store",
        credentials: "omit",
        headers: { Accept: "application/json" },
        signal,
      },
    );
    if (!response.ok) return null;

    const data: unknown = await response.json();
    if (!data || typeof data !== "object") return null;

    const candidate = data as Partial<ReferralValidation>;
    if (
      candidate.valid !== true ||
      !Number.isInteger(candidate.friendPricePence) ||
      Number(candidate.friendPricePence) <= 0 ||
      !Number.isInteger(candidate.standardPricePence) ||
      Number(candidate.standardPricePence) <=
        Number(candidate.friendPricePence) ||
      typeof candidate.sprintEndsAt !== "string" ||
      !candidate.sprintEndsAt.trim() ||
      Number.isNaN(Date.parse(candidate.sprintEndsAt))
    ) {
      return null;
    }

    return {
      valid: true,
      friendPricePence: Number(candidate.friendPricePence),
      standardPricePence: Number(candidate.standardPricePence),
      sprintEndsAt: candidate.sprintEndsAt,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return null;
    return null;
  }
}

export {
  REFERRAL_CODE_SESSION_STORAGE_KEY,
  REFERRAL_FREE_APP_JOIN_URL,
  REFERRAL_FULL_ACCESS_APP_JOIN_URL,
  REFERRAL_VALIDATION_URL,
};
