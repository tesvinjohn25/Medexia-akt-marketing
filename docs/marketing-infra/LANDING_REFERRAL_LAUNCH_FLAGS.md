# Landing Referral Launch Flags

Use these landing-host public environment variables for the official July 2026 referral sprint once the Replit app deployment can honour the referral checkout with the live `STRIPE_EARLYBIRD_REFERRAL_49_PRICE_ID`.

## Official Launch State

Use `.env.production.example` values:

- `NEXT_PUBLIC_APP_BASE_URL=https://app.medexia-akt.com`
- `NEXT_PUBLIC_CONSENT_BANNER_ENABLED=true`
- `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=false`
- `NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED=true`
- `NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED=true`

The code also defaults these two referral flags to enabled when the env vars are omitted. Keep the env vars explicit on the landing host anyway, so rollback is obvious.

Expected behaviour:

- `/` with no referral code shows normal £59 Early Access before 8 July.
- `/?ref=TEST123` before 8 July shows the £49 referral Early Access copy.
- CTA links include `ref=TEST123`, `referral_code=TEST123`, and `offer_id=earlybird_49_referral_pre_2026_07_08`.
- Without analytics consent, CTA links do not include `mx_vid`, UTM fields, referrer fields, or ad click ids.
- After analytics consent, CTA links include visitor/session and UTM attribution.
- Meta/Google pixels stay disabled while `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=false`.

## Rollback

Set either of these to `false`, then rebuild/redeploy the landing site:

- `NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED=false`
- `NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED=false`

With either flag disabled, the landing page still preserves `ref` and `referral_code`, but it must not show the public £49 offer copy.

## Pixels

First-party source/campaign handoff does not require Meta or Google pixels. Analytics-consented visitors still get first-party UTM/source handoff into the app.

Only enable third-party pixels when all of these are true:

- `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=true`
- the relevant Meta/Google public ids are set
- cookie/consent QA confirms scripts load only after explicit marketing consent

## Deployment Note

These are Next.js public build-time values. Changing them on the landing host requires a rebuild/redeploy of the landing site. Republishing the Replit app alone does not update a separately hosted landing site.

Growth Ledger persistence is still not live unless the app backend behind `NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT` is configured to persist events.
