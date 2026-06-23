import assert from "node:assert/strict";
import test from "node:test";

const { OFFER_IDS, determineOfferContext, normalizeReferralCode } = await import(
  "../src/lib/marketing/attribution.ts"
);

function setReferralFlags(enabled) {
  process.env.NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED = enabled ? "true" : "false";
  process.env.NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED = enabled ? "true" : "false";
}

test("referral offer is only selected when public sprint and discount flags are enabled", () => {
  const now = new Date("2026-06-23T12:00:00+01:00");

  setReferralFlags(false);
  assert.equal(
    determineOfferContext({
      referralCode: "ABC123",
      intent: "referral_earlybird",
      now,
    }).offer_id,
    OFFER_IDS.earlybird59Pre,
  );

  setReferralFlags(true);
  assert.equal(
    determineOfferContext({
      referralCode: "ABC123",
      intent: "referral_earlybird",
      now,
    }).offer_id,
    OFFER_IDS.earlybird49ReferralPre,
  );

  assert.equal(
    determineOfferContext({
      referralCode: null,
      intent: "earlybird_upgrade",
      explicitOfferId: OFFER_IDS.earlybird49ReferralPre,
      now,
    }).offer_id,
    OFFER_IDS.earlybird59Pre,
  );
});

test("post-cutover never selects the referral early-bird offer", () => {
  setReferralFlags(true);
  assert.equal(
    determineOfferContext({
      referralCode: "ABC123",
      intent: "referral_earlybird",
      now: new Date("2026-07-08T00:00:01+01:00"),
    }).offer_id,
    OFFER_IDS.freePost,
  );
});

test("post-cutover start-free offer becomes the free questions plus 2h audio tier", () => {
  assert.equal(
    determineOfferContext({
      intent: "start_free",
      now: new Date("2026-07-08T00:00:01+01:00"),
    }).offer_id,
    OFFER_IDS.freePost,
  );
});

test("ref query params normalize into referral_code", () => {
  const params = new URLSearchParams("?ref=ABC123");
  assert.deepEqual(normalizeReferralCode(params), {
    referralCode: "ABC123",
    sourceParam: "ref",
  });
});
