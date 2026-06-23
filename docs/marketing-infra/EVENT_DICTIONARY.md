# Marketing Event Dictionary

This landing repo records first-party marketing events only after analytics consent. Third-party ad pixels stay disabled unless explicitly configured and marketing consent is granted.

| Event | When it fires | Required properties | Optional properties | Destination |
| --- | --- | --- | --- | --- |
| `landing_page_viewed` | Landing app initializes attribution on page load | `event_id`, `mx_visitor_id`, `mx_session_id`, `page_path`, `event_timestamp`, attribution snapshot | `referral_code`, `offer_id`, `user_agent` | First-party only |
| `landing_offer_viewed` | Offer context is calculated on page load | `event_id`, `mx_visitor_id`, `mx_session_id`, `offer_id`, `page_path` | `phase`, `referral_code` | First-party only |
| `referral_landing_viewed` | A referral code is present or already persisted | `event_id`, `mx_visitor_id`, `mx_session_id`, `referral_code`, `offer_id` | `page_path` | First-party only |
| `cta_clicked_start_free` | Visitor clicks a Start Free app CTA | `event_id`, `mx_visitor_id`, `mx_session_id`, `intent`, `href`, `offer_id` | attribution snapshot | First-party only |
| `cta_clicked_earlybird` | Visitor clicks a non-referral Early Access CTA | `event_id`, `mx_visitor_id`, `mx_session_id`, `intent`, `href`, `offer_id` | attribution snapshot | First-party only |
| `cta_clicked_referral_earlybird` | Visitor clicks a referral Early Access CTA | `event_id`, `mx_visitor_id`, `mx_session_id`, `intent`, `href`, `offer_id`, `referral_code` | attribution snapshot | First-party only |
| `cta_clicked_login` | Visitor clicks Log in | `event_id`, `mx_visitor_id`, `mx_session_id`, `intent`, `href` | attribution snapshot | First-party only |
| `app_handoff_started` | Any tracked app-bound CTA starts handoff | `event_id`, `mx_visitor_id`, `mx_session_id`, `intent`, `href` | `offer_id`, `referral_code` | First-party only |
| `consent_updated` | Visitor accepts, rejects, or saves granular cookie choices | `event_id`, `event_timestamp`, `functional`, `analytics`, `marketing`, `mechanism` | page path, consent source | First-party consent audit only |

`consent_updated` is not sent to Meta or Google. Ordinary landing and CTA events are no-ops unless analytics consent is true.

Future ad-platform standard events must stay limited to `PageView`, `CompleteRegistration`, `InitiateCheckout`, and `Purchase`. The future custom optimisation event is `Reached30MinAudio`, but it should only be emitted from the app after the user has genuinely reached 30 minutes of audio.
