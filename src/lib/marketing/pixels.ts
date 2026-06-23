let loaded = false;

function envEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_MARKETING_PIXELS === "true";
}

function marketingConsentGranted(): boolean {
  try {
    return window.localStorage.getItem("mx_marketing_consent") === "granted";
  } catch {
    return false;
  }
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
  if (!envEnabled() || !marketingConsentGranted()) return;

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
    appendScript("mx-google-tag", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleId)}`);
    w.gtag("js", new Date());
    if (gaMeasurementId) w.gtag("config", gaMeasurementId);
    if (googleAdsId) w.gtag("config", googleAdsId);
  }

  loaded = true;
}

