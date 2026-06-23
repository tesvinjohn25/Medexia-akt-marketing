import { attributionForEvent, getMarketingSnapshot } from "./attribution";

type LandingEventProperties = Record<string, unknown>;

function randomEventId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    // fall through
  }
  return `mxe_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function endpoint(): string {
  return process.env.NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT || "/api/marketing/events";
}

function pagePath(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`.slice(0, 1024);
}

function userAgent(): string | null {
  if (typeof navigator === "undefined") return null;
  return navigator.userAgent.slice(0, 512);
}

export function trackLandingEvent(eventName: string, properties: LandingEventProperties = {}): void {
  try {
    const snapshot = getMarketingSnapshot();
    const payload = {
      event_id: randomEventId(),
      event_name: eventName,
      event_timestamp: new Date().toISOString(),
      page_path: pagePath(),
      user_agent: userAgent(),
      offer_id: snapshot.offer_context.offer_id,
      referral_code: snapshot.referral?.referral_code ?? null,
      ...attributionForEvent(),
      properties,
    };

    const body = JSON.stringify(payload);
    const url = endpoint();

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const sent = navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      if (sent) return;
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});

    if (process.env.NODE_ENV === "development") {
      console.debug("[marketing]", eventName, payload);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[marketing] event dropped", eventName, error);
    }
  }
}

