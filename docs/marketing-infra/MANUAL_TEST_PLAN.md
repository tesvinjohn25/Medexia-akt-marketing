# Manual Test Plan

## UTM Journey

Open:

```text
/?utm_source=reddit&utm_medium=organic&utm_campaign=audio_first_post&utm_content=too_tired_to_read
```

Expected:

- `mx_visitor_id` exists in localStorage.
- `mx_first_touch.utm_source` is `reddit`.
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
- `mx_last_touch.utm_source` updates to `tpd`.
- App CTA includes the latest UTM values and the original first-touch fields.

## Referral Journey

Open:

```text
/?ref=ABC123
```

Before 8 July 2026 expected:

- Referral banner appears.
- `mx_referral.referral_code` is `ABC123`.
- Early Access offer displays `£49`.
- App CTA includes `ref=ABC123`, `referral_code=ABC123`, `mx_vid`, and `offer_id=earlybird_49_referral_pre_2026_07_08`.

## Non-Referral Journey

Open `/` in a clean browser profile with no referral storage.

Expected:

- No `£49` offer appears.
- Early Access remains `£59` before 8 July.

## Pixels Disabled

With all pixel env vars unset or `NEXT_PUBLIC_ENABLE_MARKETING_PIXELS=false`:

- No Meta or Google tag script is injected.

With env vars set, pixels still require explicit marketing consent before loading.

## Build Checks

Run:

```text
npm run lint
npm run build
```

