export const REFERRAL_OG_TITLE =
  "You've been invited to AKT Navigator - £10 off Full Audio";
export const REFERRAL_OG_DESCRIPTION =
  "A colleague shared their referral link. Try it free, and pay £69 instead of £79 if you upgrade to Full Audio.";
export const REFERRAL_OG_IMAGE_URL =
  "https://app.medexia-akt.com/referral-og.png";
const REFERRAL_IDENTITY_URL = "https://medexia-akt.com/invite";

export function isReferralLandingRequest(
  pathname: string,
  searchParams: Pick<URLSearchParams, "get">,
): boolean {
  return pathname === "/" && Boolean(searchParams.get("ref"));
}

export function buildReferralShareUrl(referralCode: string): string {
  const url = new URL(REFERRAL_IDENTITY_URL);
  url.searchParams.set("ref", referralCode);
  return url.toString();
}
