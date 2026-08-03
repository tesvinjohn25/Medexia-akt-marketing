# Attribution Handoff

The landing site captures source attribution and appends a compact handoff to every app CTA through `buildAppUrl()`. UTM parameters win. If no UTM tag is present, the first page load classifies `document.referrer` into search, AI assistant, social, or referral source buckets so the app does not see the internal `medexia-akt.com` handoff as the acquisition source.

The canonical top-level `source`/`utm_*` handoff is **last-touch** because it represents the campaign that immediately preceded the app visit. The explicit `first_touch_*` and `last_touch_*` fields are both retained so acquisition and assist reporting remain available without overloading the canonical fields.

## Campaign canonicalization

The marketing-to-app bridge uses a reviewed, exact-match campaign alias map at both capture and handoff:

```text
akt_search_uk_oct26 -> akt_search_uk_high_intent
```

This makes cached landing pages and touches stored by older releases reach the app under `akt_search_uk_high_intent`. The current `akt_search_uk_high_intent` and `akt_search_must_win_exact` labels, and every label not listed in the governed map, pass through unchanged. `campaign_id` and consented click IDs are not rewritten.

The raw legacy label remains available without a new schema in the existing sanitized `first_landing_page` metadata (and in the current landing event `page_path`). Canonical campaign fields are used for first/last-touch event context and the app query-string handoff.

Rollback is a code-only revert of the alias map and its boundary calls. No database cleanup, environment change, or conversion-event rollback is required. Previously canonicalized browser touches remain valid under the current campaign name.

Before consent:

- no `mx_visitor_id` or `mx_session_id` is created;
- first/last source touch can be persisted so the app handoff can carry the original source;
- no first-party landing events are sent except the optional `consent_updated` audit event;
- no Meta, Google, GA4, Google Ads, or Vercel Analytics script is loaded;
- app links can include `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `first_touch_*`, `last_touch_*`, `referrer`, `first_landing_page`, `referral_code`, `ref`, referral `offer_id`, and `intent`;
- ad click IDs are not persisted or passed.

When marketing consent is not granted, ad click IDs are also removed from nested URL fields (`page_path`, `first_landing_page`, and `referrer`) before storage or handoff. This includes URL-encoded values written by an older release. Structured and nested click IDs are retained only after marketing consent.

After Reject all, non-essential source storage is cleared and future handoffs do not include source attribution unless the current URL has an active referral code that must be honoured.

## Stored Keys

Before a consent decision, and after functional, analytics, or marketing consent where applicable, local storage and first-party cookies may contain:

- `mx_first_touch`
- `mx_last_touch`
- `mx_referral`

After analytics consent, local storage and first-party cookies may also contain:

- `mx_visitor_id`
- `mx_offer_context`

After analytics consent, session storage and a session cookie:

- `mx_session_id`

A controlled QA visit uses a short-lived Ed25519-signed `mx_test` token. Middleware verifies the signature, removes the token from the visible URL, and stores it in the host-only `mx_internal_test` cookie until the token expires. The browser independently verifies the cookie against the public key before it can change measurement behaviour. Unsigned, expired, or client-forged values are rejected.

Cookies use `SameSite=Lax`; `Secure` is added automatically on HTTPS. `mx_consent_v1` is strictly necessary and is stored separately for about 6 months.

## Captured Fields

First and last touch store:

- `source`, `medium`, `campaign`, `content`, `term`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `referrer`
- `first_landing_page`
- `touch_timestamp`
- `device_type`
- `campaign_id`
- `offer_id`
- `ref`
- `referral_code`

After marketing consent, first and last touch may also store/pass:

- `gclid`, `gbraid`, `wbraid`, `fbclid`, `ttclid`, `msclkid`

First-touch is set once on the first meaningful touch. Direct visits, internal `medexia-akt.com` referrers, and unknown revisits do not overwrite it. Last-touch updates only when the current page load has a meaningful source signal: UTM, campaign id, referral code, ad click id, or a classified external referrer.

Referrer fallback buckets:

- Search engines become `medium=organic`, for example `google`, `bing`, `duckduckgo`, `yahoo`, `ecosia`, `yandex`, `baidu`, `brave`, `startpage`, `qwant`.
- AI assistants become `medium=ai`, for example `chatgpt`, `copilot`, `perplexity`, `gemini`, `claude`.
- Social sources become `medium=social`, for example `facebook`, `instagram`, `twitter`, `linkedin`, `reddit`, `youtube`, `telegram`, `tiktok`, `pinterest`.
- Other external hosts become `medium=referral` with the bare hostname as source.

## Referral Logic

These query parameters are accepted:

- `ref`
- `referral`
- `referral_code`
- `r`

They are normalized into `referral_code` and appended to app CTA handoffs as both `referral_code` and `ref`.

- Without optional consent, the current URL referral code can be handed to the app in memory.
- With functional consent, the referral code can be persisted across marketing-site navigation in `mx_referral`.
- With analytics consent, the referral code is included in first-party attribution/event context.

Before 8 July 2026, a persisted referral code makes the landing offer context:

- `earlybird_49_referral_pre_2026_07_08`

only when both public flags are enabled:

- `NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED=true`
- `NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED=true`

If either flag is disabled, the referral code is still persisted and passed to the app, but the landing site displays the normal `£59` Early Access offer. Without a referral code, the landing site must not display the `£49` price.

## Offer Logic

The UK cutover is `2026-07-08T00:00:00+01:00`.

Offer ids:

- `free_unlimited_pre_2026_07_08`
- `earlybird_59_pre_2026_07_08`
- `earlybird_49_referral_pre_2026_07_08`
- `free_questions_2h_audio_post_2026_07_08`
- `standard_79_post_2026_07_08`

Explicit `offer_id` query params are accepted only when they are known and safe. The referral `£49` offer is ignored unless a referral code is present, both public referral flags are enabled, and the date is before 8 July 2026.

## App Query Params

Before analytics or marketing consent, app CTAs append:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `first_touch_source`, `first_touch_medium`, `first_touch_campaign`, `first_touch_content`, `first_touch_term`
- `last_touch_source`, `last_touch_medium`, `last_touch_campaign`, `last_touch_content`, `last_touch_term`
- `referrer`
- `first_landing_page`
- `referral_code`
- `ref`
- referral `offer_id` when the referral price is publicly enabled and applicable
- `intent`

With analytics consent, tracked app CTAs also append:

- `mx_vid`
- `mx_sid`
- `campaign_id`
- `offer_id`

With marketing consent, app CTAs may also append:

- `gclid`, `gbraid`, `wbraid`, `fbclid`, `ttclid`, `msclkid`

Existing app URL query params are preserved.

## Controlled Internal Tests

Generate an Ed25519 keypair once:

```text
npm run test:marketing:keypair
```

Keep `INTERNAL_TEST_PRIVATE_KEY` offline/local. Configure only the printed `NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY` on the marketing deployment and app, then generate a short-lived token locally:

```text
INTERNAL_TEST_PRIVATE_KEY='...' npm run test:marketing:token
```

Open a QA journey with `?mx_test=<generated-token>`. Middleware validates the signature, redirects to a clean URL, and stores a host-only cookie until the token expiry. The signed token is appended to every app handoff as `mx_test=<generated-token>`.

For marked test traffic:

- Meta, Reddit, GA4, and Google Ads scripts are not loaded by the landing site;
- any Google tag already managed by this page receives denied consent;
- `mx_mc=0` is passed to the app even when the tester has previously granted marketing consent;
- click IDs are neither stored nor handed to the app;
- consented first-party events remain available for end-to-end QA with `is_test=true` and `traffic_type=internal`.

The app must verify the signed token with the same public key, retain the verified marker through signup, and suppress its own ad-platform conversions for that journey. Reporting queries should exclude `is_test=true` / `traffic_type=internal`. The private key must never be deployed or committed.

## Known privacy risk outside this repair

The existing pre-consent source-attribution storage behaviour is unchanged. Broadening the consent categories or storage semantics is intentionally outside this campaign-label repair and should be handled as a separate privacy change with its own review and migration/cleanup plan.
