import { attributionForEvent, getMarketingSnapshot } from "./attribution";
import { canUseAnalytics, CONSENT_VERSION } from "../consent/consent";

type LandingEventProperties = Record<string, unknown>;
type EventPayload = Record<string, unknown>;
type SendOptions = {
  /**
   * Normal page-view events can use sendBeacon. CTA navigation events use
   * fetch keepalive and wait briefly before leaving the page so the browser
   * does not abort the request during cross-origin navigation.
   */
  preferBeacon?: boolean;
};

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
  return (
    process.env.NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT ||
    "https://app.medexia-akt.com/api/marketing/events"
  );
}

function pagePath(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`.slice(0, 1024);
}

function userAgent(): string | null {
  if (typeof navigator === "undefined") return null;
  return navigator.userAgent.slice(0, 512);
}

function boolProperty(properties: LandingEventProperties, key: string): boolean {
  return properties[key] === true;
}

function stringProperty(properties: LandingEventProperties, key: string): string | null {
  const value = properties[key];
  return typeof value === "string" && value ? value.slice(0, 64) : null;
}

function consentAuditPayload(properties: LandingEventProperties): EventPayload {
  const source =
    stringProperty(properties, "source") ??
    stringProperty(properties, "mechanism") ??
    "settings";

  return {
    event_name: "consent_updated",
    event_timestamp: new Date().toISOString(),
    consent_version: CONSENT_VERSION,
    choices: {
      functional: boolProperty(properties, "functional"),
      analytics: boolProperty(properties, "analytics"),
      marketing: boolProperty(properties, "marketing"),
    },
    source,
    mechanism: source,
  };
}

function sendEventPayload(eventName: string, payload: EventPayload, options: SendOptions = {}): Promise<boolean> {
  const body = JSON.stringify(payload);
  const url = endpoint();
  const preferBeacon = options.preferBeacon !== false;

  if (preferBeacon && typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const sent = navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    if (sent) {
      if (process.env.NODE_ENV === "development") {
        console.debug("[marketing]", eventName, payload);
      }
      return Promise.resolve(true);
    }
  }

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "omit",
  })
    .then((response) => response.ok)
    .catch(() => false)
    .finally(() => {
      if (process.env.NODE_ENV === "development") {
        console.debug("[marketing]", eventName, payload);
      }
    });
}

function buildLandingEventPayload(eventName: string, properties: LandingEventProperties = {}): EventPayload | null {
  const analyticsAllowed = canUseAnalytics();

  if (eventName === "consent_updated" && !analyticsAllowed) {
    return consentAuditPayload(properties);
  }

  if (!analyticsAllowed) return null;

  const snapshot = getMarketingSnapshot();
  return {
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
}

export function trackLandingEvent(eventName: string, properties: LandingEventProperties = {}): void {
  try {
    const payload = buildLandingEventPayload(eventName, properties);
    if (!payload) return;
    void sendEventPayload(eventName, payload);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[marketing] event dropped", eventName, error);
    }
  }
}

export function flushLandingEvent(eventName: string, properties: LandingEventProperties = {}): Promise<boolean> {
  try {
    const payload = buildLandingEventPayload(eventName, properties);
    if (!payload) return Promise.resolve(false);
    return sendEventPayload(eventName, payload, { preferBeacon: false });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[marketing] event dropped", eventName, error);
    }
    return Promise.resolve(false);
  }
}
