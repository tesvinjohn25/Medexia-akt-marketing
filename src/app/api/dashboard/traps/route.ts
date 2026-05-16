import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

type FreshnessGateResult = {
  freshness_class?: "A" | "B" | "C";
  decision?: "fresh" | "superseded" | "freshness_check_failed";
  verification_method?: string;
  source_url?: string;
  source_excerpt?: string;
  current_rule_summary?: string;
  reasoning?: string;
  verifier_reasoning?: string;
};

type TrapRow = {
  trap_id: string;
  specialty: string | null;
  subtopic: string | null;
  source_ref: string | null;
  bait_statement: string | null;
  tripwire_statement: string | null;
  correct_move: string | null;
  consequence: string | null;
  guideline_dependency: string | null;
  guideline_source_url: string | null;
  freshness_gate_result: FreshnessGateResult | null;
  sonnet_gate_score: number | string | null;
  sonnet_gate_reasoning: string | null;
  status: string | null;
  rejection_reason: string | null;
  alfa_verified: boolean | null;
  alfa_verified_at: string | null;
  alfa_notes: string | null;
  deduped_into: string | null;
  updated_at: string | null;
};

function numericScore(score: number | string | null): number {
  if (typeof score === "number") return score;
  if (typeof score === "string") return Number(score);
  return 0;
}

function isReviewPoolTrap(row: TrapRow) {
  if (row.deduped_into) return false;
  if (row.specialty !== "neurology") return false;
  if (row.rejection_reason === "guideline_superseded") return false;

  const freshnessClass = row.freshness_gate_result?.freshness_class;
  const decision = row.freshness_gate_result?.decision;

  return (
    (row.status === "guideline_classified" && freshnessClass === "A") ||
    (row.status === "freshness_checked" && decision !== "superseded") ||
    row.status === "clinician_reviewing" ||
    row.status === "approved" ||
    row.status === "rejected"
  );
}

function deriveFlags(row: TrapRow) {
  const result = row.freshness_gate_result ?? {};
  const flags: string[] = [];
  const freshnessClass = result.freshness_class;
  const method = result.verification_method;
  const score = numericScore(row.sonnet_gate_score);

  if (method === "paywall_blocked") flags.push("paywall_blocked");
  if (method === "official_source_fetch_error") flags.push("source_unverifiable");
  if (method === "authority_review_needed") flags.push("authority_review_needed");
  if (freshnessClass === "C") flags.push("class_c_drug_dose");
  if (score > 0 && score < 0.75) flags.push("borderline_sonnet_score");
  if (row.guideline_dependency?.match(/DVLA|GMC|driv|confidential/i)) {
    flags.push("medicolegal_or_driving");
  }
  if (result.decision === "freshness_check_failed") {
    flags.push("freshness_check_failed");
  }

  return flags;
}

function deriveBucket(row: TrapRow) {
  if (row.status === "approved") return "approved";
  if (row.status === "rejected") return "rejected";

  const result = row.freshness_gate_result ?? {};
  const flags = deriveFlags(row);
  const score = numericScore(row.sonnet_gate_score);
  const freshnessClass = result.freshness_class;
  const isFresh = result.decision === "fresh";
  const isClassA = row.status === "guideline_classified" && freshnessClass === "A";

  if (flags.length > 0) return "needs_clinical_arbitration";
  if ((isClassA || isFresh) && score >= 0.75) return "ready_for_fast_signoff";
  return "needs_clinical_arbitration";
}

function mobileSummary(row: TrapRow) {
  const bait = row.bait_statement?.replace(/\s+/g, " ").trim();
  const tripwire = row.tripwire_statement?.replace(/\s+/g, " ").trim();
  if (!bait) return "Untitled trap";
  if (!tripwire) return bait;
  return `${bait} The trap: ${tripwire}`;
}

export async function GET(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  const queue = req.nextUrl.searchParams.get("queue") ?? "all";

  const { data, error } = await supabase
    .from("trap_card")
    .select(
      [
        "trap_id",
        "specialty",
        "subtopic",
        "source_ref",
        "bait_statement",
        "tripwire_statement",
        "correct_move",
        "consequence",
        "guideline_dependency",
        "guideline_source_url",
        "freshness_gate_result",
        "sonnet_gate_score",
        "sonnet_gate_reasoning",
        "status",
        "rejection_reason",
        "alfa_verified",
        "alfa_verified_at",
        "alfa_notes",
        "deduped_into",
        "updated_at",
      ].join(","),
    )
    .eq("specialty", "neurology")
    .is("deduped_into", null)
    .order("subtopic", { ascending: true })
    .order("sonnet_gate_score", { ascending: false })
    .limit(560);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const traps = ((data ?? []) as unknown as TrapRow[])
    .filter(isReviewPoolTrap)
    .map((row) => {
      const flags = deriveFlags(row);
      const review_bucket = deriveBucket(row);

      return {
        ...row,
        sonnet_gate_score: numericScore(row.sonnet_gate_score),
        review_bucket,
        flags,
        mobile_summary: mobileSummary(row),
        alfa_check_question:
          review_bucket === "needs_clinical_arbitration"
            ? "Does this trap teach the clinically safest action for a GP trainee today?"
            : null,
      };
    })
    .filter((row) => queue === "all" || row.review_bucket === queue);

  const counts = traps.reduce<Record<string, number>>((acc, row) => {
    acc[row.review_bucket] = (acc[row.review_bucket] ?? 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({ traps, counts, total: traps.length });
}
