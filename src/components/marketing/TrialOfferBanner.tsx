"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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

export type TrialOfferState = {
  code: string | null;
  validationSettled: boolean;
  validatedOffer: ValidatedTrialOffer | null;
};

const TrialOfferContext = createContext<TrialOfferState>({
  code: null,
  validationSettled: false,
  validatedOffer: null,
});

export function TrialOfferProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<string | null>(null);
  const [validationSettled, setValidationSettled] = useState(false);
  const [validatedOffer, setValidatedOffer] =
    useState<ValidatedTrialOffer | null>(null);

  useEffect(() => {
    const capturedCode = captureTrialCode();
    setCode(capturedCode);
    setValidatedOffer(null);
    if (!capturedCode) {
      setValidationSettled(true);
      return;
    }

    setValidationSettled(false);
    const controller = new AbortController();
    let active = true;
    void validateTrialCode(capturedCode, controller.signal).then((result) => {
      if (active) {
        setValidatedOffer(result ? { ...result, code: capturedCode } : null);
        setValidationSettled(true);
      }
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const value = useMemo(
    () => ({ code, validationSettled, validatedOffer }),
    [code, validationSettled, validatedOffer],
  );

  return (
    <TrialOfferContext.Provider value={value}>
      {children}
    </TrialOfferContext.Provider>
  );
}

export function useTrialOfferState(): TrialOfferState {
  return useContext(TrialOfferContext);
}

export function useValidatedTrialOffer(): ValidatedTrialOffer | null {
  return useContext(TrialOfferContext).validatedOffer;
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
