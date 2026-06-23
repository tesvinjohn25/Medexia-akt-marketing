# Attribution Handoff

The landing site captures first-party attribution and appends a compact handoff to every app CTA through `buildAppUrl()`.

## Stored Keys

Local storage and first-party cookies:

- `mx_visitor_id`
- `mx_first_touch`
- `mx_last_touch`
- `mx_referral`
- `mx_offer_context`

Session storage and a session cookie:

- `mx_session_id`

Cookies use `SameSite=Lax`; `Secure` is added automatically on HTTPS.

## Captured Fields

First and last touch store:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `referrer`
- `first_landing_page`
- `touch_timestamp`
- `device_type`
- `campaign_id`
- `offer_id`
- `gclid`, `gbraid`, `wbraid`, `fbclid`, `ttclid`, `msclkid`
- `ref`
- `referral_code`

First-touch is set once on the first meaningful touch. Direct or unknown revisits do not overwrite it. Last-touch updates only when the current page load has a meaningful source signal: UTM, campaign id, referral code, ad click id, or an external referrer.

## Referral Logic

These query parameters are accepted:

- `ref`
- `referral`
- `referral_code`
- `r`

They are normalized into `referral_code`, persisted in `mx_referral`, and appended to app CTA handoffs as both `referral_code` and `ref`.

Before 8 July 2026, a persisted referral code makes the landing offer context:

- `earlybird_49_referral_pre_2026_07_08`

Without a referral code, the landing site must not display the `£49` price.

## Offer Logic

The UK cutover is `2026-07-08T00:00:00+01:00`.

Offer ids:

- `free_unlimited_pre_2026_07_08`
- `earlybird_59_pre_2026_07_08`
- `earlybird_49_referral_pre_2026_07_08`
- `free_questions_2h_audio_post_2026_07_08`
- `standard_79_post_2026_07_08`

Explicit `offer_id` query params are accepted only when they are known and safe. The referral `£49` offer is ignored unless a referral code is present.

## App Query Params

Every tracked app CTA appends:

- `mx_vid`
- `mx_sid`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `first_touch_source`, `first_touch_medium`, `first_touch_campaign`, `first_touch_content`
- `last_touch_source`, `last_touch_medium`, `last_touch_campaign`, `last_touch_content`
- `referrer`
- `first_landing_page`
- `referral_code`
- `ref`
- `campaign_id`
- `offer_id`
- `intent`

Existing app URL query params are preserved.

