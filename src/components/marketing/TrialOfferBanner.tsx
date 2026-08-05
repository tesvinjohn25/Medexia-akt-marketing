"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  captureTrialCode,
  validateTrialCode,
  type TrialValidation,
} from "@/lib/marketing/trial-pass-through";

export type ValidatedTrialOffer = TrialValidation & {
  code: string;
};

const TrialOfferContext = createContext<ValidatedTrialOffer | null>(null);

export function TrialOfferProvider({ children }: { children: ReactNode }) {
  const [trial, setTrial] = useState<ValidatedTrialOffer | null>(null);

  useEffect(() => {
    const code = captureTrialCode();
    if (!code) {
      setTrial(null);
      return;
    }

    const controller = new AbortController();
    let active = true;
    void validateTrialCode(code, controller.signal).then((result) => {
      if (active) setTrial(result ? { ...result, code } : null);
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return (
    <TrialOfferContext.Provider value={trial}>
      {children}
    </TrialOfferContext.Provider>
  );
}

export function useValidatedTrialOffer(): ValidatedTrialOffer | null {
  return useContext(TrialOfferContext);
}

export function TrialOfferBanner() {
  const trial = useValidatedTrialOffer();
  if (!trial) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-50 border-b border-violet-300/25 bg-violet-950/95 px-4 py-3 text-center text-sm text-violet-50 shadow-lg backdrop-blur sm:text-base"
    >
      <p className="mx-auto max-w-4xl">
        <strong>{trial.label} trial applied.</strong>{" "}
        Create your account to start your {trial.trialDays}-day free trial.
      </p>
    </div>
  );
}
