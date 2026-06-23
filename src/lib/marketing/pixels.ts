import { canUseAnalytics, canUseMarketing } from "../consent/consent";

let loaded = false;

function envEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_MARKETING_PIXELS === "true";
}

function appendScript(id: string, src: string): void {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function maybeLoadMarketingPixels(): void {
  if (loaded || typeof window === "undefined" || typeof document === "undefined") return;
  if (!envEnabled() || !canUseMarketing()) return;

  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  if (metaPixelId) {
    const w = window as typeof window & { fbq?: (...args: unknown[]) => void; _fbq?: unknown };
    if (!w.fbq) {
      const fbq = (...args: unknown[]) => {
        (fbq as unknown as { queue: unknown[] }).queue.push(args);
      };
      (fbq as unknown as { queue: unknown[]; loaded: boolean; version: string }).queue = [];
      (fbq as unknown as { loaded: boolean }).loaded = true;
      (fbq as unknown as { version: string }).version = "2.0";
      w.fbq = fbq;
      w._fbq = fbq;
    }
    appendScript("mx-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
    w.fbq("init", metaPixelId);
    w.fbq("track", "PageView");
  }

  const googleId = gaMeasurementId || googleAdsId;
  if (googleId) {
    const w = window as typeof window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    w.gtag = (...args: unknown[]) => {
      w.dataLayer?.push(args);
    };
    w.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    w.gtag("consent", "update", {
      analytics_storage: canUseAnalytics() ? "granted" : "denied",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    appendScript("mx-google-tag", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleId)}`);
    w.gtag("js", new Date());
    if (gaMeasurementId) w.gtag("config", gaMeasurementId);
    if (googleAdsId) w.gtag("config", googleAdsId);
  }

  loaded = true;
}
