# Marketing Env Vars

Add names only; do not commit values.

| Name | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_BASE_URL` | Base URL for app handoff links | `https://app.medexia-akt.com` |
| `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS` | Master switch for third-party pixels | `false` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel id | empty |
| `META_CAPI_CONSENT_SECRET` | Server-only 32+ character secret used to sign consent-bound Meta registration handoffs; must exactly match the app host | empty / proof minting disabled |
| `REDDIT_CAPI_CONSENT_SECRET` | Server-only 32+ character secret used to sign consent-bound Reddit registration and activation handoffs; must exactly match the app host | empty / Reddit proof minting disabled |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement id | empty |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag id (public, not a secret) | `AW-18343035898` |
| `NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT` | First-party event endpoint | `https://app.medexia-akt.com/api/marketing/events` |
| `NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED` | Allows referral-sprint public copy when a referral code is present | `true` |
| `NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED` | Allows public `£49` friend-side referral price copy | `true` |
| `NEXT_PUBLIC_CONSENT_BANNER_ENABLED` | Shows the consent banner and settings UI | `true` |
| `NEXT_PUBLIC_CONSENT_VERSION` | Consent record and policy version | `2026-06-23-v1` |
| `NEXT_PUBLIC_COOKIE_POLICY_URL` | Cookie policy link shown in consent UI | `/cookies` |
| `NEXT_PUBLIC_PRIVACY_POLICY_URL` | Privacy policy link shown in consent UI | `/privacy` |
| `NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY` | Ed25519 public key used by middleware, browser, and app to verify short-lived internal QA tokens | empty / internal QA disabled |
| `INTERNAL_TEST_PRIVATE_KEY` | Local-only Ed25519 private seed used by the token-generation script; never deploy or commit | no default |

Third-party pixels require all of:

- `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=true`
- the relevant Meta or Google id
- user marketing consent in `mx_consent_v1`

Meta `CompleteRegistration` also requires a consent-bound landing-to-app handoff.
The landing server signs `mx_meta_capi_proof` only when the current consent
cookie grants Marketing and a consented `fbclid` is present. The proof is also
bound to the 24-hour HttpOnly `mx_meta_capi_session` cookie shared with the app
domain, so copying the handoff URL into another browser fails closed. Switching
Marketing off synchronously writes the denial-only `mx_meta_capi_revoked` parent
cookie; the app rejects retained proofs without relying on a withdrawal network
request. After consent is granted again, a new proof rotates the session and
acknowledges only the revocation epoch it received, and only when the consent
save flow first obtained a matching HttpOnly server regrant token. A later
withdrawal cannot be erased by a stale response or stale landing-site consent.
Never expose
`META_CAPI_CONSENT_SECRET` through a `NEXT_PUBLIC_*` variable, logs, or URLs;
configure the same dedicated value on both the landing host and app host.

Reddit CAPI uses the same consent and HttpOnly browser-session binding but a
separate signing secret. When a consented `rdt_cid` is present, the landing
server returns `mx_reddit_capi_proof`, bound to that exact click and session.
The app rejects copied, expired, click-mismatched, or withdrawn proofs. Never
expose `REDDIT_CAPI_CONSENT_SECRET`; configure the same dedicated value on both
hosts. The shared browser-session binding is currently derived using
`META_CAPI_CONSENT_SECRET`, so the landing host also requires that variable even
for a Reddit-only handoff. Keep Reddit delivery flags off until Event Testing
passes.

Vercel Analytics and first-party marketing events require analytics consent.

`NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY` is safe to expose because it can verify but cannot create QA tokens. The matching `INTERNAL_TEST_PRIVATE_KEY` must remain offline/local. Without a valid public key, `mx_test` query values and cookies are rejected and cannot suppress production measurement.

Referral codes are still captured and passed to the app when these referral flags are disabled. The landing page must not display the `£49` price unless both referral flags are `true`, a referral code is present, and the date is before 8 July 2026.

The official referral sprint default is on: the landing page shows the `£49` referral offer only when both referral flags are true, a referral code is present, and the date is before 8 July 2026. Set either referral flag to `false` to roll back the public referral copy while still preserving referral-code handoff.

See `.env.example` and `.env.production.example` for the official landing flag set. Public `NEXT_PUBLIC_*` values are build-time values; changing them on the landing host requires a rebuild/redeploy.
