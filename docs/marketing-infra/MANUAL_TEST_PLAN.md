# Manual Test Plan

## UTM Journey

Open:

```text
/?utm_source=reddit&utm_medium=organic&utm_campaign=audio_first_post&utm_content=too_tired_to_read
```

Expected:

- Before consent, no `mx_visitor_id` exists.
- Before consent, `mx_first_touch.source` is `reddit` and the app URL includes `utm_source=reddit`, `utm_medium=organic`, `utm_campaign=audio_first_post`, and `utm_content=too_tired_to_read`.
- Before consent, the app URL does not include `mx_vid` or ad click IDs.
- Accept Analytics in Cookie settings.
- `mx_visitor_id` exists in localStorage.
- `mx_first_touch.source` and `mx_first_touch.utm_source` are `reddit`.
- Start Free app URL includes `mx_vid`, `mx_sid`, `utm_source=reddit`, `utm_medium=organic`, `utm_campaign=audio_first_post`, `utm_content=too_tired_to_read`, `offer_id=free_unlimited_pre_2026_07_08`, and `intent=start_free`.

## Direct Revisit

Reload `/` with no UTMs after the UTM journey.

Expected:

- `mx_first_touch` remains the Reddit touch.
- `mx_last_touch` does not become unknown/direct.

## New Campaign Visit

Open:

```text
/?utm_source=tpd&utm_medium=email&utm_campaign=free_akt_cram_plan
```

Expected:

- `mx_first_touch` remains the original Reddit touch.
- `mx_last_touch.source` updates to `tpd`.
- App CTA uses `utm_source=tpd` for the canonical last-touch source, keeps `first_touch_source=reddit`, and includes `last_touch_source=tpd`.

## Click-ID Redaction

Open:

```text
/?utm_source=google&utm_medium=cpc&gclid=QA_GCLID&next=https%3A%2F%2Fexample.com%2F%3Ffbclid%3DQA_FBCLID
```

Grant Analytics but leave Marketing off.

Expected:

- `mx_first_touch.gclid` is empty.
- Stored `first_landing_page` and `referrer` contain no ad click IDs.
- First-party `page_path` contains no ad click IDs.
- The app CTA contains no top-level or URL-encoded `gclid`, `gbraid`, `wbraid`, `fbclid`, `ttclid`, `msclkid`, or `rdt_cid`.
- Granting Marketing on a fresh, non-test visit permits the structured click-ID handoff.

## Controlled Internal QA

Generate a keypair once with `npm run test:marketing:keypair`. Keep the private key offline/local and configure only `NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY` on the marketing deployment and app. Generate a 30-minute token locally:

```text
INTERNAL_TEST_PRIVATE_KEY='...' npm run test:marketing:token
```

Use a fresh browser and open:

```text
/?mx_test=<generated-token>&utm_source=google&utm_medium=cpc&utm_campaign=qa&gclid=QA_GCLID
```

Accept all consent choices.

Expected:

- The first request redirects to the same URL without `mx_test`.
- A host-only `mx_internal_test` cookie contains the signed token until it expires.
- Client code verifies the cookie signature before setting `is_test=true` or suppressing measurement.
- No `mx-google-tag`, `mx-meta-pixel`, or `mx-reddit-pixel` script is injected by the landing site.
- First-party events include `is_test=true` and `traffic_type=internal`.
- `page_path` and stored nested URL fields contain no click ID.
- Every app CTA includes the signed `mx_test` token and `mx_mc=0`, and excludes `gclid`.
- Navigate to another marketing page; the app CTA remains marked until token expiry.
- Verify that an unsigned `?mx_test=1` is rejected and does not activate internal mode.
- Clear the `mx_internal_test` cookie to end the controlled test early.

## Referral Journey

Open:

```text
/?ref=ABC123
```

Before 8 July 2026 with `NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED=false` or `NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED=false` expected:

- No `£49` price appears.
- Early Access remains `£59`.
- Before consent, app CTA includes `ref=ABC123` and `referral_code=ABC123`, but not `mx_vid` or ad click IDs.
- With functional or analytics consent, referral continuity can be persisted.

Before 8 July 2026 with both referral flags enabled expected:

- Referral banner appears.
- Early Access offer displays `£49`.
- Before analytics consent, app CTA includes `ref=ABC123`, `referral_code=ABC123`, and `offer_id=earlybird_49_referral_pre_2026_07_08`, but not `mx_vid`.
- After analytics consent, app CTA also includes `mx_vid` and attribution fields.

After 8 July 2026 expected:

- No `£49` or `£59` early-bird CTA appears.
- The paid CTA points to the standard full-audio upgrade.

## Non-Referral Journey

Open `/` in a clean browser profile with no referral storage.

Expected:

- No `£49` offer appears.
- Early Access remains `£59` before 8 July.

## Pixels Disabled

With all pixel env vars unset or `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=false`:

- No Meta or Google tag script is injected.

With env vars set, pixels still require explicit marketing consent before loading.

## Consent UX

Fresh browser profile expected:

- Banner title is `Control cookies and tracking`.
- First layer shows `Accept all`, `Reject all`, and `Manage choices`.
- `Reject all` is as prominent and easy to click as `Accept all`.
- Manage choices opens a keyboard-accessible modal.
- Necessary is always on and disabled.
- Functional, Analytics, and Marketing default off.
- Escape closes settings without changing an existing decision.
- Footer `Cookie settings` reopens settings at any time.

Reject all expected:

- `mx_consent_v1` stores analytics `false` and marketing `false`.
- Banner does not immediately reappear.
- No `mx_visitor_id`, first touch, landing events, Vercel Analytics, Meta, or Google scripts.

Withdraw consent expected:

- Non-essential `mx_*` attribution storage is cleared.
- Future landing/CTA events are no-op.
- Already loaded third-party scripts are not called again by Medexia code.

## Build Checks

Run:

```text
npm run lint
npm run build
```
