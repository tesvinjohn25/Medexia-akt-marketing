import { NextRequest, NextResponse } from "next/server";

const EVENT_NAME_RE = /^[a-z][a-z0-9_]{1,79}$/;

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    if (
      !payload ||
      typeof payload !== "object" ||
      typeof payload.event_name !== "string" ||
      !EVENT_NAME_RE.test(payload.event_name)
    ) {
      return NextResponse.json({ ok: false, error: "Invalid event payload" }, { status: 400 });
    }

    if (process.env.NODE_ENV === "development") {
      console.debug("[marketing/events]", {
        event_name: payload.event_name,
        event_id: payload.event_id,
        mx_visitor_id: payload.mx_visitor_id,
      });
    }

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
}

