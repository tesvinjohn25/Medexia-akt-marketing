const PROMO_QUERY_SESSION_STORAGE_KEY = "mx_promo_query";
const PROMO_APP_JOIN_URL = "https://medexia-akt.com/join/full-access";
const PROMO_DOCUMENT_MARKER = "__mxPromoPassThroughInitialised";

type PromoWindow = Window & {
  __mxPromoPassThroughInitialised?: boolean;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function incomingPromoQuery(): string | null {
  if (!isBrowser()) return null;

  const query = window.location.search;
  if (!query) return null;

  try {
    if (!new URLSearchParams(query).has("promo_code")) return null;
  } catch {
    return null;
  }

  // Preserve the browser's raw query serialization. In particular, do not read
  // and rebuild promo_code: it is opaque and the app owns all validation.
  return query.startsWith("?") ? query : `?${query}`;
}

function storedPromoQuery(): string | null {
  if (!isBrowser()) return null;
  try {
    return window.sessionStorage.getItem(PROMO_QUERY_SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Capture the first promo-bearing landing query for this browser session.
 * Nothing removes or replaces it; sessionStorage expires with the session.
 */
export function capturePromoPassThroughQuery(): string | null {
  if (!isBrowser()) return null;

  const promoWindow = window as PromoWindow;
  const incoming = incomingPromoQuery();

  // sessionStorage can outlive a page load in the same tab. On each fresh
  // document, make the address bar authoritative so a clean entry cannot
  // inherit an offer from an earlier visit. The marker remains set across
  // client-side landing-page navigation, where continuity is intentional.
  if (!promoWindow[PROMO_DOCUMENT_MARKER]) {
    promoWindow[PROMO_DOCUMENT_MARKER] = true;
    try {
      if (incoming) {
        window.sessionStorage.setItem(PROMO_QUERY_SESSION_STORAGE_KEY, incoming);
      } else {
        window.sessionStorage.removeItem(PROMO_QUERY_SESSION_STORAGE_KEY);
      }
    } catch {
      // The current-page handoff still works if sessionStorage is unavailable.
    }
    return incoming;
  }

  const stored = storedPromoQuery();
  if (stored) return stored;

  if (!incoming) return null;

  try {
    window.sessionStorage.setItem(PROMO_QUERY_SESSION_STORAGE_KEY, incoming);
  } catch {
    // The current-page handoff still works if sessionStorage is unavailable.
  }

  return incoming;
}

/**
 * Return the fixed app join destination with the captured query appended
 * byte-for-byte as exposed by window.location.search.
 */
export function buildPromoAppPassThroughUrl(): string | null {
  const query = capturePromoPassThroughQuery();
  return query ? `${PROMO_APP_JOIN_URL}${query}` : null;
}

export { PROMO_APP_JOIN_URL, PROMO_QUERY_SESSION_STORAGE_KEY };
