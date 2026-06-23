"use client";

import { useEffect, useRef, useState } from "react";
import {
  acceptAllConsent,
  getStoredConsent,
  rejectAllConsent,
  saveConsent,
  type ConsentChoices,
  type ConsentSource,
} from "@/lib/consent/consent";
import { trackLandingEvent } from "@/lib/marketing/events";

interface CookieSettingsModalProps {
  open: boolean;
  source: ConsentSource;
  onClose: () => void;
}

const POLICY_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "/privacy";
const COOKIE_URL = process.env.NEXT_PUBLIC_COOKIE_POLICY_URL || "/cookies";

function trackConsentUpdate(mechanism: ConsentSource, choices: ConsentChoices) {
  trackLandingEvent("consent_updated", {
    mechanism,
    functional: choices.functional,
    analytics: choices.analytics,
    marketing: choices.marketing,
  });
}

export function CookieSettingsModal({ open, source, onClose }: CookieSettingsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [choices, setChoices] = useState<ConsentChoices>(() => {
    const initial = getStoredConsent();
    return {
      functional: initial?.functional ?? false,
      analytics: initial?.analytics ?? false,
      marketing: initial?.marketing ?? false,
    };
  });

  useEffect(() => {
    if (!open) return;
    const current = getStoredConsent();
    setChoices({
      functional: current?.functional ?? false,
      analytics: current?.analytics ?? false,
      marketing: current?.marketing ?? false,
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) || [],
      ).filter((element) => !element.hasAttribute("disabled"));

    const first = focusable()[0];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const persist = (next: ConsentChoices) => {
    saveConsent(next, source);
    trackConsentUpdate(source, next);
    onClose();
  };

  const toggle = (key: keyof ConsentChoices) => {
    setChoices((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end bg-black/55 p-3 backdrop-blur-sm sm:items-center sm:justify-center"
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        className="w-full max-w-[560px] rounded-2xl border bg-[#0c1020] p-5 shadow-2xl sm:p-6"
        style={{ borderColor: "rgba(255,255,255,.14)" }}
      >
        <div className="mb-5">
          <h2 id="cookie-settings-title" className="text-xl font-semibold text-white">
            Cookie settings
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/68">
            Choose which optional technologies Medexia can use on this marketing site.
            The site still works if you reject non-essential tracking.
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4">
            <span>
              <span className="block text-sm font-semibold text-white">Necessary</span>
              <span className="mt-1 block text-sm leading-5 text-white/58">
                Required for the site, security, and storing these choices.
              </span>
            </span>
            <input type="checkbox" checked disabled aria-label="Necessary cookies always on" />
          </label>

          {[
            ["functional", "Functional", "Remember optional preferences and preserve a referral journey across pages."],
            ["analytics", "Analytics", "Help us understand which pages and campaigns help GP trainees."],
            ["marketing", "Marketing", "Allow ad measurement, retargeting tags, and ad click ID handling."],
          ].map(([key, label, description]) => (
            <label
              key={key}
              className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4"
            >
              <span>
                <span className="block text-sm font-semibold text-white">{label}</span>
                <span className="mt-1 block text-sm leading-5 text-white/58">{description}</span>
              </span>
              <input
                type="checkbox"
                checked={choices[key as keyof ConsentChoices]}
                onChange={() => toggle(key as keyof ConsentChoices)}
                aria-label={`${label} cookies`}
              />
            </label>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-sm text-white/60">
          <a href={POLICY_URL} className="underline underline-offset-4 hover:text-white">
            Privacy policy
          </a>
          <a href={COOKIE_URL} className="underline underline-offset-4 hover:text-white">
            Cookie policy
          </a>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          <button
            type="button"
            className="rounded-xl border border-white/16 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            onClick={() => persist(choices)}
          >
            Save choices
          </button>
          <button
            type="button"
            className="rounded-xl border border-white/16 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            onClick={() => {
              const record = acceptAllConsent(source);
              trackConsentUpdate(source, record);
              onClose();
            }}
          >
            Accept all
          </button>
          <button
            type="button"
            className="rounded-xl border border-white/16 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            onClick={() => {
              const record = rejectAllConsent(source);
              trackConsentUpdate(source, record);
              onClose();
            }}
          >
            Reject all
          </button>
        </div>
      </div>
    </div>
  );
}
