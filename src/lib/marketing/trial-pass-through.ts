const TRIAL_CODE_SESSION_STORAGE_KEY = "mx_trial_code";
const TRIAL_APP_JOIN_URL = "https://app.medexia-akt.com/join/trial";
const TRIAL_DOCUMENT_MARKER = "__mxTrialPassThroughInitialised";

type TrialWindow = Window & {
  __mxTrialPassThroughInitialised?: boolean;
};

export type TrialValidation = {
  valid: true;
  trialDays: number;
  label: string;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function incomingTrialCode(): string | null {
  if (!isBrowser()) return null;

  try {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("trial_code")) return null;
    return params.get("trial_code") || null;
  } catch {
    return null;
  }
}

function storedTrialCode(): string | null {
  if (!isBrowser()) return null;
  try {
    return window.sessionStorage.getItem(TRIAL_CODE_SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Keep a trial link active across client-side landing-page navigation, while
 * making every fresh document load authoritative. This prevents a clean URL
 * from inheriting a trial code remembered by an earlier page in the same tab.
 */
export function captureTrialCode(): string | null {
  if (!isBrowser()) return null;

  const trialWindow = window as TrialWindow;
  const incoming = incomingTrialCode();

  if (!trialWindow[TRIAL_DOCUMENT_MARKER]) {
    trialWindow[TRIAL_DOCUMENT_MARKER] = true;
    try {
      if (incoming) {
        window.sessionStorage.setItem(TRIAL_CODE_SESSION_STORAGE_KEY, incoming);
      } else {
        window.sessionStorage.removeItem(TRIAL_CODE_SESSION_STORAGE_KEY);
      }
    } catch {
      // The current-page handoff still works if sessionStorage is unavailable.
    }
    return incoming;
  }

  const stored = storedTrialCode();
  if (stored) return stored;
  if (!incoming) return null;

  try {
    window.sessionStorage.setItem(TRIAL_CODE_SESSION_STORAGE_KEY, incoming);
  } catch {
    // The current-page handoff still works if sessionStorage is unavailable.
  }
  return incoming;
}

export function buildTrialAppUrl(): string | null {
  const code = captureTrialCode();
  if (!code) return null;

  const url = new URL(TRIAL_APP_JOIN_URL);
  url.searchParams.set("code", code);
  return url.toString();
}

export async function validateTrialCode(
  code: string,
  signal?: AbortSignal,
): Promise<TrialValidation | null> {
  try {
    const response = await fetch(`/api/trial/validate/${encodeURIComponent(code)}`, {
      cache: "no-store",
      signal,
    });
    if (!response.ok) return null;

    const data: unknown = await response.json();
    if (!data || typeof data !== "object") return null;

    const candidate = data as Partial<TrialValidation>;
    if (
      candidate.valid !== true ||
      !Number.isInteger(candidate.trialDays) ||
      Number(candidate.trialDays) <= 0 ||
      typeof candidate.label !== "string" ||
      !candidate.label.trim()
    ) {
      return null;
    }

    return {
      valid: true,
      trialDays: Number(candidate.trialDays),
      label: candidate.label,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return null;
    return null;
  }
}

export function trialAudienceLabel(label: string): string {
  const audience = label.replace(/\s+(registrar\s+)?committee\s*$/i, "").trim();
  return audience || "Registrar";
}

export { TRIAL_APP_JOIN_URL, TRIAL_CODE_SESSION_STORAGE_KEY };
