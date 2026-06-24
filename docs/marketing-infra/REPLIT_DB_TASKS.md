# Replit DB Tasks

No database migration was run from this landing repo.

The landing endpoint currently validates marketing event shape and returns `202`; it does not persist custom Growth Ledger events. Persistence should be added by the Replit app agent after the schema is approved.

Until persistence exists, landing events are consent-gated and can be sent to a validation endpoint, but there is no stored tracking table or dashboard for source -> signup -> activation -> purchase analysis.

The landing site should use `NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT=https://app.medexia-akt.com/api/marketing/events` so consent-approved landing events are forwarded to the app backend. The app endpoint must allow the landing origin and must persist only when app-side persistence is explicitly enabled.

## Suggested Tables

### `marketing_events`

- `id`
- `event_id`
- `event_name`
- `mx_visitor_id`
- `mx_session_id`
- `user_id` nullable
- `anonymous_id` nullable
- `event_timestamp`
- `page_path`
- `source`
- `medium`
- `campaign`
- `content`
- `term`
- `first_touch` JSON
- `last_touch` JSON
- `referral_code` nullable
- `offer_id` nullable
- `properties` JSONB
- `created_at`

### `user_marketing_attribution`

- `user_id`
- `mx_visitor_id`
- `first_touch_source`
- `first_touch_medium`
- `first_touch_campaign`
- `first_touch_content`
- `first_touch_referrer`
- `first_landing_page`
- `first_touch_at`
- `last_touch_source`
- `last_touch_medium`
- `last_touch_campaign`
- `last_touch_content`
- `last_touch_referrer`
- `last_touch_at`
- `referral_code`
- `self_reported_source` nullable
- `signup_offer_id`
- `created_at`
- `updated_at`

### `referral_conversions`

- `id`
- `referrer_user_id`
- `referred_user_id`
- `referral_code`
- `referred_signup_at`
- `referred_30m_audio_at` nullable
- `referred_purchase_at` nullable
- `offer_id`
- `amount_paid`
- `reward_amount`
- `reward_status`
- `created_at`
- `updated_at`

## Notes

- Do not write sensitive learning performance, deanery, or question-result data to ad platforms.
- Purchase attribution should ultimately come from Stripe webhook metadata, not a frontend success page.
- The 30-minute activation event must be app-side and fire only once per user.
