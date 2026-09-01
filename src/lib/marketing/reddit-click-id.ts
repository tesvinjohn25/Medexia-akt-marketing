const MAX_REDDIT_CLICK_ID_LENGTH = 256;

const REDDIT_CLICK_ID_SENTINELS = new Set([
  "undefined",
  "null",
  "none",
  "nil",
  "nan",
  "unknown",
  "missing",
  "(null)",
  "<null>",
  "n/a",
  "rdt_cid",
  "rdtcid",
  "rdt-cid",
  "not_set",
  "not-set",
  "notset",
  "not_provided",
  "not-provided",
]);

const UNSAFE_REDDIT_CLICK_ID_CHARACTERS = /[\p{White_Space}\p{Cc}\p{Cf}\uFFFD]/u;

/**
 * Reddit click ids are opaque. Preserve an accepted value exactly; never trim,
 * decode, case-fold, or truncate it. Values that look like broken URL decoding
 * or integration placeholders are safer to discard than to attribute.
 */
export function normalizeRedditClickId(value: unknown): string | null {
  if (typeof value !== "string" || !value || value.length > MAX_REDDIT_CLICK_ID_LENGTH) {
    return null;
  }
  if (
    UNSAFE_REDDIT_CLICK_ID_CHARACTERS.test(value) ||
    REDDIT_CLICK_ID_SENTINELS.has(value.toLowerCase())
  ) {
    return null;
  }
  try {
    // URLSearchParams leaves malformed percent escapes in the decoded value.
    // This check also catches incomplete UTF-8 percent sequences.
    decodeURIComponent(value);
  } catch {
    return null;
  }
  return value;
}

export function redditClickIdFromSearchParams(params: URLSearchParams): string | null {
  const values = params.getAll("rdt_cid");
  return values.length === 1 ? normalizeRedditClickId(values[0]) : null;
}

/**
 * Remove an invalid/ambiguous Reddit id without changing consent state or UTMs.
 * The boolean explicitly tells the Pixel loader whether the current URL is safe
 * for Reddit's automatic click-id parsing.
 */
export function removeInvalidRedditClickIdFromCurrentUrl(): boolean {
  if (typeof window === "undefined" || !window.location) return false;
  const params = new URLSearchParams(window.location.search);
  if (!params.has("rdt_cid") || redditClickIdFromSearchParams(params)) return true;

  params.delete("rdt_cid");
  const query = params.toString();
  const next = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  if (typeof window.history?.replaceState !== "function") return false;
  try {
    window.history.replaceState(window.history.state, "", next);
    return !new URLSearchParams(window.location.search).has("rdt_cid");
  } catch {
    return false;
  }
}
