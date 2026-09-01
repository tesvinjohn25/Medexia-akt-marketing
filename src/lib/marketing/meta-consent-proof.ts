import {
  awaitMetaCapiRegrant,
  canUseMarketing,
  getMetaCapiConsentGeneration,
} from "../consent/consent";
import { sanitizeMarketingUrl } from "./attribution";
import { redditClickIdFromSearchParams } from "./reddit-click-id";

const META_PROOF_PARAM = "mx_meta_capi_proof";
const REDDIT_PROOF_PARAM = "mx_reddit_capi_proof";
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

interface MarketingConsentProofs {
  metaProof: string | null;
  redditProof: string | null;
}

const proofRequests = new Map<string, Promise<MarketingConsentProofs>>();

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
  url.searchParams.delete(REDDIT_PROOF_PARAM);
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

async function requestProofs(
  fbclid: string,
  rdtCid: string,
): Promise<MarketingConsentProofs> {
  const generation = getMetaCapiConsentGeneration();
  const requestKey = `${fbclid}\n${rdtCid}\n${generation}`;
  const existing = proofRequests.get(requestKey);
  if (existing) return existing;

  const request = (async () => {
    if (!(await awaitMetaCapiRegrant())) {
      return { metaProof: null, redditProof: null };
    }
    if (getMetaCapiConsentGeneration() !== generation) {
      return { metaProof: null, redditProof: null };
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), PROOF_TIMEOUT_MS);
    try {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const response = await fetch(META_PROOF_ENDPOINT, {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...(fbclid ? { fbclid } : {}),
            ...(rdtCid ? { rdt_cid: rdtCid } : {}),
          }),
          signal: controller.signal,
        });
        // The first request can install the server-random HttpOnly browser
        // seed. The browser applies Set-Cookie before this bounded retry.
        if (response.status === 409 && attempt === 0) continue;
        if (!response.ok) return { metaProof: null, redditProof: null };
        const body = (await response.json()) as {
          proof?: unknown;
          redditProof?: unknown;
        };
        if (getMetaCapiConsentGeneration() !== generation) {
          return { metaProof: null, redditProof: null };
        }
        const metaProof =
          typeof body.proof === "string" &&
          body.proof.length <= 2048 &&
          isCurrentProof(body.proof)
            ? body.proof
            : null;
        const redditProof =
          typeof body.redditProof === "string" &&
          body.redditProof.length <= 2048 &&
          isCurrentProof(body.redditProof)
            ? body.redditProof
            : null;
        return { metaProof, redditProof };
      }
      return { metaProof: null, redditProof: null };
    } catch {
      return { metaProof: null, redditProof: null };
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
  url.searchParams.delete(REDDIT_PROOF_PARAM);
  if (!canUseMarketing()) return stripWithdrawnMarketingData(url);

  const fbclid = url.searchParams.get("fbclid")?.trim() || "";
  const rdtCid = redditClickIdFromSearchParams(url.searchParams) || "";
  if (url.searchParams.has("rdt_cid") && !rdtCid) {
    url.searchParams.delete("rdt_cid");
  }
  if (
    (!fbclid && !rdtCid) ||
    fbclid.length > 256 ||
    rdtCid.length > 256 ||
    url.searchParams.get("mx_mc") !== "1"
  ) {
    return url.toString();
  }

  const { metaProof, redditProof } = await requestProofs(fbclid, rdtCid);
  if (!canUseMarketing()) return stripWithdrawnMarketingData(url);
  if (fbclid && metaProof) url.searchParams.set(META_PROOF_PARAM, metaProof);
  if (rdtCid && redditProof) url.searchParams.set(REDDIT_PROOF_PARAM, redditProof);
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
  const currentRdtCid = redditClickIdFromSearchParams(current.searchParams);
  if (current.searchParams.has("rdt_cid") && !currentRdtCid) {
    current.searchParams.delete("rdt_cid");
    current.searchParams.delete(REDDIT_PROOF_PARAM);
  }
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
  const prefetchedRedditClickId = redditClickIdFromSearchParams(prefetched.searchParams);
  const prefetchedRedditProof = prefetched.searchParams.get(REDDIT_PROOF_PARAM);
  if (
    currentRdtCid &&
    currentRdtCid === prefetchedRedditClickId &&
    current.origin === prefetched.origin &&
    current.pathname === prefetched.pathname &&
    prefetchedRedditProof &&
    isCurrentProof(prefetchedRedditProof)
  ) {
    current.searchParams.set(REDDIT_PROOF_PARAM, prefetchedRedditProof);
  }
  return current.toString();
}
