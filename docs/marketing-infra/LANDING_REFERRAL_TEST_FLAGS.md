# Landing Referral Test Flags

Use these landing-host public environment variables only after the Replit app deployment can honour the referral checkout with the live `STRIPE_EARLYBIRD_REFERRAL_49_PRICE_ID`.

## Safe Default

Use `.env.example` as the safe production default:

- `NEXT_PUBLIC_APP_BASE_URL=https://medexia-akt.com`
- `NEXT_PUBLIC_CONSENT_BANNER_ENABLED=true`
- `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=false`
- `NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED=false`
- `NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED=false`

With these settings, the landing page can preserve `ref` and `referral_code`, but it must not show the public £49 offer copy.

## Referral QA

Use `.env.referral-test.example` values when the app is ready for end-to-end referral testing:

- `NEXT_PUBLIC_APP_BASE_URL=https://medexia-akt.com`
- `NEXT_PUBLIC_CONSENT_BANNER_ENABLED=true`
- `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=false`
- `NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED=true`
- `NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED=true`

Expected behaviour:

- `/` with no referral code shows normal £59 Early Access before 8 July.
- `/?ref=TEST123` before 8 July shows the £49 referral Early Access copy.
- CTA links include `ref=TEST123`, `referral_code=TEST123`, and `offer_id=earlybird_49_referral_pre_2026_07_08`.
- Without analytics consent, CTA links do not include `mx_vid`, UTM fields, referrer fields, or ad click ids.
- After analytics consent, CTA links include visitor/session and UTM attribution.
- Meta/Google pixels stay disabled because `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=false`.

## Deployment Note

These are Next.js public build-time values. Changing them on the landing host requires a rebuild/redeploy of the landing site. Republishing the Replit app alone does not update a separately hosted landing site.

Growth Ledger persistence is still not live unless `NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT` points at a backend endpoint that actually persists events.
