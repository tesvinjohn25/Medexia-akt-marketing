import { attributionForEvent, getMarketingSnapshot } from "./attribution";
import { canUseAnalytics, CONSENT_VERSION } from "../consent/consent";

type LandingEventProperties = Record<string, unknown>;
type EventPayload = Record<string, unknown>;

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

function sendEventPayload(eventName: string, payload: EventPayload): void {
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
}

export function trackLandingEvent(eventName: string, properties: LandingEventProperties = {}): void {
  try {
    const analyticsAllowed = canUseAnalytics();

    if (eventName === "consent_updated" && !analyticsAllowed) {
      sendEventPayload(eventName, consentAuditPayload(properties));
      return;
    }

    if (!analyticsAllowed) return;

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

    sendEventPayload(eventName, payload);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[marketing] event dropped", eventName, error);
    }
  }
}
