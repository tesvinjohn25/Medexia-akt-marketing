"use client";

import { useEffect, useState } from "react";
import {
  captureTrialCode,
  trialAudienceLabel,
  validateTrialCode,
  type TrialValidation,
} from "@/lib/marketing/trial-pass-through";

export function TrialOfferBanner() {
  const [trial, setTrial] = useState<TrialValidation | null>(null);

  useEffect(() => {
    const code = captureTrialCode();
    if (!code) return;

    const controller = new AbortController();
    void validateTrialCode(code, controller.signal).then((result) => {
      if (result) setTrial(result);
    });

    return () => controller.abort();
  }, []);

  if (!trial) return null;

  const audience = trialAudienceLabel(trial.label);

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-50 border-b border-violet-300/25 bg-violet-950/95 px-4 py-3 text-center text-sm text-violet-50 shadow-lg backdrop-blur sm:text-base"
    >
      <p className="mx-auto max-w-4xl">
        <strong>{audience} trial applied.</strong>{" "}
        Create your account to start your {trial.trialDays}-day free trial.
      </p>
    </div>
  );
}
