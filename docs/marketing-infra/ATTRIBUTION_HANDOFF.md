# Attribution Handoff

The landing site captures first-party attribution and appends a compact handoff to every app CTA through `buildAppUrl()`, but only after the relevant consent category has been granted.

Before consent or after Reject all:

- no `mx_visitor_id` or `mx_session_id` is created;
- no UTM, referrer, campaign, or ad click ID values are persisted;
- no first-party landing events are sent except the optional `consent_updated` audit event;
- no Meta, Google, GA4, Google Ads, or Vercel Analytics script is loaded;
- app links may still include `referral_code`, `ref`, referral `offer_id`, and `intent` where needed to honour a referral offer the visitor clicked.

## Stored Keys

After analytics consent, local storage and first-party cookies:

- `mx_visitor_id`
- `mx_first_touch`
- `mx_last_touch`
- `mx_referral`
- `mx_offer_context`

After analytics consent, session storage and a session cookie:

- `mx_session_id`

Cookies use `SameSite=Lax`; `Secure` is added automatically on HTTPS. `mx_consent_v1` is strictly necessary and is stored separately for about 6 months.

## Captured Fields

After analytics consent, first and last touch store:

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

First-touch is set once on the first meaningful touch. Direct or unknown revisits do not overwrite it. Last-touch updates only when the current page load has a meaningful source signal: UTM, campaign id, referral code, ad click id, or an external referrer.

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

Without analytics or marketing consent, app CTAs append only:

- `referral_code`
- `ref`
- referral `offer_id` when the referral price is publicly enabled and applicable
- `intent`

With analytics consent, tracked app CTAs append:

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

With marketing consent, app CTAs may also append:

- `gclid`, `gbraid`, `wbraid`, `fbclid`, `ttclid`, `msclkid`

Existing app URL query params are preserved.
