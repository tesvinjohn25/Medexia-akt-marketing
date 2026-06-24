# Consent UX

Consent storage key:

- `mx_consent_v1`

Consent version:

- `2026-06-23-v1`

## Categories

### Strictly necessary

Always on. Used for rendering the site, essential operation, and storing consent choices.

Allowed key:

- `mx_consent_v1`

### Functional

Optional and default off. Used for non-essential UI preferences and referral-code continuity across marketing-site navigation.

Allowed key:

- `mx_referral`

### Analytics

Optional and default off. Used for first-party landing events, Vercel Analytics, source/campaign measurement, and funnel events.

Allowed keys:

- `mx_visitor_id`
- `mx_session_id`
- `mx_first_touch`
- `mx_last_touch`
- `mx_offer_context`

Analytics consent enables these first-party events:

- `landing_page_viewed`
- `landing_offer_viewed`
- `referral_landing_viewed`
- `cta_clicked_start_free`
- `cta_clicked_earlybird`
- `cta_clicked_referral_earlybird`
- `app_handoff_started`

### Marketing

Optional and default off. Used for ad measurement, retargeting, Meta Pixel, Google tags, and ad click ID handling.

Marketing consent can allow these fields only after consent:

- `gclid`
- `gbraid`
- `wbraid`
- `fbclid`
- `ttclid`
- `msclkid`

Marketing pixels still require:

- `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=true`
- a configured Meta or Google id
- user marketing consent

## Gated Code Paths

- `MarketingAttributionProvider` reads consent before persistent attribution initialization.
- `initMarketingAttribution()` creates/persists visitor/session IDs only after analytics or marketing consent.
- Functional-only consent can persist referral continuity without creating analytics IDs.
- `trackLandingEvent()` is a no-op unless analytics consent is true, except for the first-party `consent_updated` audit event.
- When analytics consent is false, `consent_updated` is stripped to a minimal consent audit payload: event name, timestamp, consent version, choices, and source/mechanism only. It must not include `mx_visitor_id`, UTMs, referrer, ad click IDs, or first/last-touch attribution.
- `maybeLoadMarketingPixels()` is a no-op unless marketing consent and pixel env vars are present.
- `buildAppUrl()` strips `mx_*`, UTM, referrer, campaign, and ad click ID params before consent. It can still pass `referral_code`, `ref`, referral `offer_id`, and `intent` when needed to honour a referral link.
- Vercel Analytics only renders after analytics consent.

## Growth Ledger Persistence Status

The landing site now gates first-party event collection behind analytics consent and posts to `NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT`, which should be the app backend endpoint: `https://app.medexia-akt.com/api/marketing/events`.

The app backend must still provide CORS allowlisting, validation, and DB persistence. Until that Replit-side work is complete and enabled, this should be treated as consent-safe capture and handoff infrastructure, not a tracking dashboard.

## Withdrawal

When analytics and marketing consent are withdrawn, Medexia clears:

- `mx_visitor_id`
- `mx_session_id`
- `mx_first_touch`
- `mx_last_touch`
- `mx_referral`
- `mx_offer_context`
- ad click ID keys set by this app
- legacy `mx_marketing_consent`

The consent record remains. If third-party scripts were already loaded, Medexia prevents further calls from its own code, but cannot guarantee third-party cookie cleanup outside its domain.

## Test Matrix

No consent:

- no `mx_visitor_id`
- no first/last touch storage
- no first-party landing events
- no Vercel Analytics
- no Meta or Google scripts
- app handoff has no `mx_*`, UTM, referrer, campaign, or ad click ID params
- referral code may pass through current CTA

Reject all:

- `mx_consent_v1` stores analytics `false` and marketing `false`
- banner does not immediately reappear
- non-essential storage remains absent

Analytics only:

- `mx_visitor_id` and `mx_session_id` are created
- UTM/referrer attribution is stored
- first-party events are enabled
- Vercel Analytics can render
- no Meta or Google scripts load
- ad click IDs are not stored or passed

Marketing consent:

- Meta/Google scripts load only when env vars are configured
- Google Consent Mode defaults to denied before update
- PageView fires only after marketing consent
- ad click IDs can be stored/passed

Withdraw consent:

- analytics and marketing flags become false
- non-essential storage is cleared
- future events are no-op
- no new pixels are loaded
- footer Cookie settings can reopen the modal

## Safe Launch Sequence

1. Deploy consent UX with `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=false`.
2. Test Reject all, Accept analytics, Accept marketing, withdrawal, and referral handoff.
3. Connect and verify Growth Ledger persistence through the app backend configured at `NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT` after Replit DB work is complete.
4. Enable first-party analytics events through analytics consent.
5. Configure Meta/Google ids only after consent QA.
6. Start paid retargeting only after marketing-consent paths are verified.

## Ad Platform Guardrail

Do not send deanery, clinical learning data, question performance, learning weaknesses, individual answers, or other sensitive educational or clinical data to Meta, Google, or other ad platforms.
