import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const ACTIONS = ["approve", "reject", "unsure"] as const;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { action, notes } = await req.json();

  if (!ACTIONS.includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const update =
    action === "approve"
      ? {
          status: "approved",
          alfa_verified: true,
          alfa_verified_at: now,
          alfa_notes: notes || null,
          rejection_reason: null,
        }
      : action === "reject"
        ? {
            status: "rejected",
            alfa_verified: false,
            alfa_verified_at: now,
            alfa_notes: notes || null,
            rejection_reason: "clinically_wrong",
          }
        : {
            status: "clinician_reviewing",
            alfa_verified: null,
            alfa_verified_at: now,
            alfa_notes: notes || null,
            rejection_reason: null,
          };

  const { data, error } = await supabase
    .from("trap_card")
    .update(update)
    .eq("trap_id", id)
    .is("deduped_into", null)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ trap: data });
}
