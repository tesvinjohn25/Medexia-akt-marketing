import { NextResponse } from "next/server";

const APP_REFERRAL_VALIDATION_URL =
  "https://app.medexia-akt.com/api/referral/validate";

export const dynamic = "force-dynamic";

type UpstreamReferralValidation = {
  valid?: unknown;
  friendPricePence?: unknown;
  standardPricePence?: unknown;
  sprintEndsAt?: unknown;
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
    const response = await fetch(
      `${APP_REFERRAL_VALIDATION_URL}/${encodeURIComponent(code)}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      return NextResponse.json(
        { valid: false },
        {
          status: response.status,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    const data = (await response.json()) as UpstreamReferralValidation;
    const valid =
      data.valid === true &&
      Number.isInteger(data.friendPricePence) &&
      Number(data.friendPricePence) > 0 &&
      Number.isInteger(data.standardPricePence) &&
      Number(data.standardPricePence) > Number(data.friendPricePence) &&
      typeof data.sprintEndsAt === "string" &&
      Boolean(data.sprintEndsAt.trim()) &&
      !Number.isNaN(Date.parse(data.sprintEndsAt));

    return NextResponse.json(
      valid
        ? {
            valid: true,
            friendPricePence: Number(data.friendPricePence),
            standardPricePence: Number(data.standardPricePence),
            sprintEndsAt: data.sprintEndsAt,
          }
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
