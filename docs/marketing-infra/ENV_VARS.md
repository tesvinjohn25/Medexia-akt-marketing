# Marketing Env Vars

Add names only; do not commit values.

| Name | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_BASE_URL` | Base URL for app handoff links | `https://app.medexia-akt.com` |
| `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS` | Master switch for third-party pixels | `false` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel id | empty |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement id | empty |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag id | empty |
| `NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT` | First-party event endpoint | `/api/marketing/events` |
| `NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED` | Allows referral-sprint public copy when a referral code is present | `false` |
| `NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED` | Allows public `£49` friend-side referral price copy | `false` |
| `NEXT_PUBLIC_CONSENT_BANNER_ENABLED` | Shows the consent banner and settings UI | `true` |
| `NEXT_PUBLIC_CONSENT_VERSION` | Consent record and policy version | `2026-06-23-v1` |
| `NEXT_PUBLIC_COOKIE_POLICY_URL` | Cookie policy link shown in consent UI | `/cookies` |
| `NEXT_PUBLIC_PRIVACY_POLICY_URL` | Privacy policy link shown in consent UI | `/privacy` |

Third-party pixels require all of:

- `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=true`
- the relevant Meta or Google id
- user marketing consent in `mx_consent_v1`

Vercel Analytics and first-party marketing events require analytics consent.

Referral codes are still captured and passed to the app when these referral flags are disabled. The landing page must not display the `£49` price unless both referral flags are `true`, a referral code is present, and the date is before 8 July 2026.
