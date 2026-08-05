"use client";

import {
  Suspense,
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  captureReferralCode,
  validateReferralCode,
  type ReferralValidation,
} from "@/lib/marketing/referral-pass-through";
import { capturePromoPassThroughQuery } from "@/lib/marketing/promo-pass-through";
import { useTrialOfferState } from "./TrialOfferBanner";

export type ValidatedReferralOffer = ReferralValidation & {
  code: string;
};

type ReferralOfferState = {
  code: string | null;
  promoOwnsHandoff: boolean;
  validatedOffer: ValidatedReferralOffer | null;
};

const ReferralOfferContext = createContext<ReferralOfferState>({
  code: null,
  promoOwnsHandoff: false,
  validatedOffer: null,
});

function ReferralLocationObserver({ onChange }: { onChange: () => void }) {
  const searchParams = useSearchParams();
  const locationQuery = searchParams.toString();
  const firstEffectRef = useRef(true);

  useEffect(() => {
    if (firstEffectRef.current) {
      firstEffectRef.current = false;
      return;
    }
    onChange();
  }, [locationQuery, onChange]);

  return null;
}

export function ReferralOfferProvider({ children }: { children: ReactNode }) {
  const [locationVersion, setLocationVersion] = useState(0);
  const [code, setCode] = useState<string | null>(null);
  const [promoOwnsHandoff, setPromoOwnsHandoff] = useState(false);
  const [validatedOffer, setValidatedOffer] =
    useState<ValidatedReferralOffer | null>(null);

  useEffect(() => {
    const capturedCode = captureReferralCode();
    setPromoOwnsHandoff(Boolean(capturePromoPassThroughQuery()));
    setCode(capturedCode);
    setValidatedOffer(null);
    if (!capturedCode) {
      return;
    }

    const controller = new AbortController();
    let active = true;
    void validateReferralCode(capturedCode, controller.signal).then((result) => {
      if (active) {
        setValidatedOffer(result ? { ...result, code: capturedCode } : null);
      }
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [locationVersion]);

  const refreshForClientNavigation = useCallback(() => {
    setLocationVersion((current) => current + 1);
  }, []);

  const value = useMemo(
    () => ({ code, promoOwnsHandoff, validatedOffer }),
    [code, promoOwnsHandoff, validatedOffer],
  );

  return (
    <ReferralOfferContext.Provider value={value}>
      <Suspense fallback={null}>
        <ReferralLocationObserver onChange={refreshForClientNavigation} />
      </Suspense>
      {children}
    </ReferralOfferContext.Provider>
  );
}

export function useHeldReferralCode(): string | null {
  return useContext(ReferralOfferContext).code;
}

export function useValidatedReferralOffer(): ValidatedReferralOffer | null {
  return useContext(ReferralOfferContext).validatedOffer;
}

function formatPrice(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: pence % 100 === 0 ? 0 : 2,
  }).format(pence / 100);
}

export function ReferralOfferBanner() {
  const { promoOwnsHandoff, validatedOffer: referral } =
    useContext(ReferralOfferContext);
  const trial = useTrialOfferState();
  const trialOwnsOrMayOwnHandoff =
    Boolean(trial.validatedOffer) ||
    (Boolean(trial.code) && !trial.validationSettled);

  if (!referral || promoOwnsHandoff || trialOwnsOrMayOwnHandoff) return null;

  const friendPrice = formatPrice(referral.friendPricePence);
  const standardPrice = formatPrice(referral.standardPricePence);

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-50 border-b border-emerald-300/25 bg-emerald-950/95 px-4 py-3 text-center text-sm text-emerald-50 shadow-lg backdrop-blur sm:text-base"
    >
      <p className="mx-auto max-w-4xl">
        <strong>A colleague shared their referral with you.</strong>{" "}
        Sign up free, and if you choose full audio later you pay {friendPrice}{" "}
        instead of {standardPrice}.
      </p>
    </div>
  );
}
