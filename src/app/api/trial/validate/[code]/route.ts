import { NextResponse } from "next/server";

const APP_TRIAL_VALIDATION_URL = "https://app.medexia-akt.com/api/trial/validate";

export const dynamic = "force-dynamic";

type UpstreamTrialValidation = {
  valid?: unknown;
  trialDays?: unknown;
  label?: unknown;
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  if (!code) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  try {
    const response = await fetch(`${APP_TRIAL_VALIDATION_URL}/${encodeURIComponent(code)}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json(
        { valid: false },
        { status: response.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    const data = (await response.json()) as UpstreamTrialValidation;
    const valid =
      data.valid === true &&
      Number.isInteger(data.trialDays) &&
      Number(data.trialDays) > 0 &&
      typeof data.label === "string" &&
      Boolean(data.label.trim());

    return NextResponse.json(
      valid
        ? { valid: true, trialDays: Number(data.trialDays), label: data.label }
        : { valid: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { valid: false },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
