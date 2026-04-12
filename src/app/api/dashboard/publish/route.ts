import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Publishing API coming in Sprint 2",
    queue: [],
  });
}

export async function POST() {
  return NextResponse.json(
    { error: "Publishing not yet implemented" },
    { status: 501 },
  );
}
