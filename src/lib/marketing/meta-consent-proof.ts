import {
  awaitMetaCapiRegrant,
  canUseMarketing,
  getMetaCapiConsentGeneration,
} from "../consent/consent";
import { sanitizeMarketingUrl } from "./attribution";

const META_PROOF_PARAM = "mx_meta_capi_proof";
const META_PROOF_ENDPOINT = "/api/marketing/meta-consent-proof";
const PROOF_TIMEOUT_MS = 1_500;
const AD_CLICK_PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
  "rdt_cid",
] as const;
const URL_ATTRIBUTION_PARAMS = ["referrer", "first_landing_page"] as const;

const proofRequests = new Map<string, Promise<string | null>>();

function isCurrentProof(proof: string): boolean {
  try {
    const payloadPart = proof.split(".")[1];
    if (!payloadPart) return false;
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload = JSON.parse(atob(padded)) as { exp?: unknown };
    return (
      typeof payload.exp === "number" &&
      Number.isFinite(payload.exp) &&
      payload.exp > Math.floor(Date.now() / 1000) + 30
    );
  } catch {
    return false;
  }
}

function stripWithdrawnMarketingData(url: URL): string {
  url.searchParams.delete(META_PROOF_PARAM);
  for (const key of AD_CLICK_PARAMS) url.searchParams.delete(key);
  for (const key of URL_ATTRIBUTION_PARAMS) {
    const original = url.searchParams.get(key);
    if (!original) continue;
    const sanitized = sanitizeMarketingUrl(original, false);
    if (sanitized) url.searchParams.set(key, sanitized);
    else url.searchParams.delete(key);
  }
  if (url.searchParams.has("mx_mc")) url.searchParams.set("mx_mc", "0");
  return url.toString();
}

async function requestProof(fbclid: string): Promise<string | null> {
  const generation = getMetaCapiConsentGeneration();
  const requestKey = `${fbclid}\n${generation}`;
  const existing = proofRequests.get(requestKey);
  if (existing) return existing;

  const request = (async () => {
    if (!(await awaitMetaCapiRegrant())) return null;
    if (getMetaCapiConsentGeneration() !== generation) return null;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), PROOF_TIMEOUT_MS);
    try {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const response = await fetch(META_PROOF_ENDPOINT, {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fbclid }),
          signal: controller.signal,
        });
        // The first request can install the server-random HttpOnly browser
        // seed. The browser applies Set-Cookie before this bounded retry.
        if (response.status === 409 && attempt === 0) continue;
        if (!response.ok) return null;
        const body = (await response.json()) as { proof?: unknown };
        return getMetaCapiConsentGeneration() === generation &&
          typeof body.proof === "string" &&
          body.proof.length <= 2048 &&
          isCurrentProof(body.proof)
          ? body.proof
          : null;
      }
      return null;
    } catch {
      return null;
    } finally {
      window.clearTimeout(timeout);
    }
  })();

  proofRequests.set(requestKey, request);
  try {
    return await request;
  } finally {
    if (proofRequests.get(requestKey) === request) proofRequests.delete(requestKey);
  }
}

export async function addMetaMarketingConsentProof(appUrl: string): Promise<string> {
  let url: URL;
  try {
    url = new URL(appUrl);
  } catch {
    return appUrl;
  }
  // Institutional promo pass-through URLs intentionally stay on the landing
  // origin and preserve their opaque query byte-for-byte. They are not an app
  // handoff and must never be parsed/reserialized by the proof helper.
  if (
    typeof window !== "undefined" &&
    window.location?.origin &&
    url.origin === window.location.origin
  ) return appUrl;

  url.searchParams.delete(META_PROOF_PARAM);
  if (!canUseMarketing()) return stripWithdrawnMarketingData(url);

  const fbclid = url.searchParams.get("fbclid")?.trim() || "";
  if (!fbclid || fbclid.length > 256 || url.searchParams.get("mx_mc") !== "1") {
    return url.toString();
  }

  const proof = await requestProof(fbclid);
  if (!canUseMarketing()) return stripWithdrawnMarketingData(url);
  if (proof) url.searchParams.set(META_PROOF_PARAM, proof);
  return url.toString();
}

export function reusePrefetchedMetaMarketingConsentProof(
  appUrl: string,
  prefetchedUrl: string,
): string {
  let current: URL;
  let prefetched: URL;
  try {
    current = new URL(appUrl);
    prefetched = new URL(prefetchedUrl);
  } catch {
    return appUrl;
  }
  if (
    typeof window !== "undefined" &&
    window.location?.origin &&
    current.origin === window.location.origin
  ) return appUrl;
  if (!canUseMarketing()) return stripWithdrawnMarketingData(current);

  const currentFbclid = current.searchParams.get("fbclid");
  const prefetchedProof = prefetched.searchParams.get(META_PROOF_PARAM);
  if (
    currentFbclid &&
    currentFbclid === prefetched.searchParams.get("fbclid") &&
    current.origin === prefetched.origin &&
    current.pathname === prefetched.pathname &&
    prefetchedProof &&
    isCurrentProof(prefetchedProof)
  ) {
    current.searchParams.set(META_PROOF_PARAM, prefetchedProof);
  }
  return current.toString();
}
