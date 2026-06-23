"use client";

import { useEffect, useState } from "react";
import {
  acceptAllConsent,
  CONSENT_SETTINGS_EVENT,
  consentBannerEnabled,
  getStoredConsent,
  rejectAllConsent,
  type ConsentChoices,
  type ConsentSource,
} from "@/lib/consent/consent";
import { trackLandingEvent } from "@/lib/marketing/events";
import { CookieSettingsModal } from "./CookieSettingsModal";

function trackConsentUpdate(mechanism: ConsentSource, choices: ConsentChoices) {
  trackLandingEvent("consent_updated", {
    mechanism,
    functional: choices.functional,
    analytics: choices.analytics,
    marketing: choices.marketing,
  });
}

export function ConsentBanner() {
  const [hasDecision, setHasDecision] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsSource, setSettingsSource] = useState<ConsentSource>("settings");

  useEffect(() => {
    setHasDecision(Boolean(getStoredConsent()) || !consentBannerEnabled());

    const openSettings = () => {
      setSettingsSource("footer");
      setSettingsOpen(true);
      setHasDecision(true);
    };

    window.addEventListener(CONSENT_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, openSettings);
  }, []);

  const acceptAll = () => {
    const record = acceptAllConsent("banner");
    trackConsentUpdate("banner", record);
    setHasDecision(true);
  };

  const rejectAll = () => {
    const record = rejectAllConsent("banner");
    trackConsentUpdate("banner", record);
    setHasDecision(true);
  };

  return (
    <>
      {!hasDecision && (
        <section
          aria-label="Cookie and tracking choices"
          className="fixed inset-x-3 bottom-3 z-[90] rounded-2xl border bg-[#0c1020] p-4 shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[520px] sm:p-5"
          style={{ borderColor: "rgba(255,255,255,.14)" }}
        >
          <h2 className="text-lg font-semibold text-white">Control cookies and tracking</h2>
          <p className="mt-2 text-sm leading-6 text-white/68">
            We use essential technologies to make this site work. With your permission,
            we&apos;d also like to use analytics to understand what helps GP trainees
            and marketing tools to measure referral and ad campaigns.
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-xl border border-white/16 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="rounded-xl border border-white/16 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={() => {
                setSettingsSource("settings");
                setSettingsOpen(true);
              }}
              className="rounded-xl border border-white/16 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Manage choices
            </button>
          </div>
        </section>
      )}

      <CookieSettingsModal
        open={settingsOpen}
        source={settingsSource}
        onClose={() => {
          setSettingsOpen(false);
          setHasDecision(Boolean(getStoredConsent()) || !consentBannerEnabled());
        }}
      />
    </>
  );
}
