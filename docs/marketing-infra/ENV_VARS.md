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

Third-party pixels also require `mx_marketing_consent=granted` in localStorage. There is no consent banner in this repo yet, so do not enable pixels in production until consent UX is implemented.

