"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type ReviewBucket =
  | "ready_for_fast_signoff"
  | "needs_clinical_arbitration"
  | "approved"
  | "rejected"
  | "all";

type Trap = {
  trap_id: string;
  subtopic: string | null;
  source_ref: string | null;
  bait_statement: string | null;
  tripwire_statement: string | null;
  correct_move: string | null;
  consequence: string | null;
  guideline_dependency: string | null;
  guideline_source_url: string | null;
  freshness_gate_result: {
    freshness_class?: "A" | "B" | "C";
    decision?: string;
    verification_method?: string;
    source_url?: string;
    source_excerpt?: string;
    current_rule_summary?: string;
    reasoning?: string;
    verifier_reasoning?: string;
  } | null;
  sonnet_gate_score: number;
  sonnet_gate_reasoning: string | null;
  status: string | null;
  rejection_reason: string | null;
  alfa_verified: boolean | null;
  alfa_verified_at: string | null;
  alfa_notes: string | null;
  review_bucket: ReviewBucket;
  flags: string[];
  mobile_summary: string;
  alfa_check_question: string | null;
};

const QUEUES: { value: ReviewBucket; label: string; short: string }[] = [
  { value: "ready_for_fast_signoff", label: "Fast signoff", short: "Fast" },
  {
    value: "needs_clinical_arbitration",
    label: "Needs Alfa",
    short: "Alfa",
  },
  { value: "approved", label: "Approved", short: "Yes" },
  { value: "rejected", label: "Rejected", short: "No" },
  { value: "all", label: "All", short: "All" },
];

function bucketLabel(bucket: ReviewBucket) {
  return QUEUES.find((queue) => queue.value === bucket)?.label ?? bucket;
}

function freshnessLabel(trap: Trap) {
  const result = trap.freshness_gate_result;
  const klass = result?.freshness_class ?? "?";
  const decision =
    result?.decision ??
    (trap.status === "guideline_classified" ? "stable clinical content" : "");
  return `Class ${klass}${decision ? ` · ${decision.replace(/_/g, " ")}` : ""}`;
}

function scorePercent(score: number) {
  return Number.isFinite(score) ? `${Math.round(score * 100)}%` : "n/a";
}

export default function TrapReviewPage() {
  const [queue, setQueue] = useState<ReviewBucket>("ready_for_fast_signoff");
  const [traps, setTraps] = useState<Trap[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [notes, setNotes] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTraps = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = queue !== "all" ? `?queue=${queue}` : "";
    const res = await fetch(`/api/dashboard/traps${params}`);
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Could not load traps");
      setTraps([]);
    } else {
      setTraps(data.traps ?? []);
      setSelectedIndex(0);
      setNotes("");
      setDetailsOpen(false);
    }

    setLoading(false);
  }, [queue]);

  useEffect(() => {
    fetchTraps();
  }, [fetchTraps]);

  const selected = traps[selectedIndex] ?? null;
  const progress = useMemo(() => {
    if (!traps.length) return "0 / 0";
    return `${selectedIndex + 1} / ${traps.length}`;
  }, [selectedIndex, traps.length]);

  function move(delta: number) {
    setSelectedIndex((index) => {
      const next = Math.min(Math.max(index + delta, 0), traps.length - 1);
      if (next !== index) {
        setNotes("");
        setDetailsOpen(false);
      }
      return next;
    });
  }

  async function submit(action: "approve" | "reject" | "unsure") {
    if (!selected) return;
    setActing(true);
    setError(null);

    const res = await fetch(`/api/dashboard/traps/${selected.trap_id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, notes: notes || null }),
    });

    const data = await res.json();
    setActing(false);

    if (!res.ok) {
      setError(data.error ?? "Review save failed");
      return;
    }

    setTraps((current) => current.filter((trap) => trap.trap_id !== selected.trap_id));
    setSelectedIndex((index) => Math.min(index, Math.max(traps.length - 2, 0)));
    setNotes("");
    setDetailsOpen(false);
  }

  return (
    <div className="min-h-[calc(100vh-80px)] pb-48 md:pb-6">
      <header className="mb-4 md:mb-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              className="text-xl font-semibold tracking-tight md:text-2xl"
              style={{ color: "var(--fg-high)" }}
            >
              Trap Review
            </h2>
            <p className="mt-1 text-sm leading-5" style={{ color: "var(--fg-muted)" }}>
              Phone-first clinical signoff for neurology traps.
            </p>
          </div>
          <div
            className="shrink-0 rounded-xl border px-3 py-2 text-right"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--fg-muted)" }}>
              Queue
            </p>
            <p className="text-sm font-semibold" style={{ color: "var(--fg-high)" }}>
              {progress}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {QUEUES.map((item) => {
            const active = queue === item.value;
            return (
              <button
                key={item.value}
                onClick={() => setQueue(item.value)}
                className="min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors"
                style={{
                  background: active ? "var(--fg-high)" : "var(--bg-surface)",
                  color: active ? "var(--bg-ink)" : "var(--fg-mid)",
                  borderColor: active ? "var(--fg-high)" : "var(--border)",
                }}
              >
                <span className="sm:hidden">{item.short}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {error && (
        <div
          className="mb-4 rounded-xl border p-3 text-sm"
          style={{
            background: "rgba(239,68,68,.10)",
            borderColor: "rgba(239,68,68,.30)",
            color: "#FCA5A5",
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <div
          className="rounded-2xl border p-6 text-sm"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border)",
            color: "var(--fg-muted)",
          }}
        >
          Loading review queue...
        </div>
      )}

      {!loading && !selected && (
        <div
          className="rounded-2xl border p-6 text-sm"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border)",
            color: "var(--fg-muted)",
          }}
        >
          No traps in {bucketLabel(queue)}.
        </div>
      )}

      {selected && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article
            className="rounded-2xl border"
            style={{
              background: "linear-gradient(180deg, rgba(17,19,26,.98), rgba(17,19,26,.90))",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div className="border-b p-4 md:p-5" style={{ borderColor: "var(--border)" }}>
              <div className="mb-3 flex flex-wrap gap-2">
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{
                    background: "rgba(109,106,232,.16)",
                    color: "var(--brand-violet-light)",
                  }}
                >
                  {bucketLabel(selected.review_bucket)}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ background: "var(--bg-elevated)", color: "var(--fg-mid)" }}
                >
                  {freshnessLabel(selected)}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ background: "var(--bg-elevated)", color: "var(--fg-mid)" }}
                >
                  Bait {scorePercent(selected.sonnet_gate_score)}
                </span>
              </div>

              <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "var(--fg-muted)" }}>
                {selected.subtopic || "Neurology"}
              </p>
              <h3 className="mt-3 text-[22px] font-semibold leading-[1.18] md:text-3xl" style={{ color: "var(--fg-high)" }}>
                {selected.bait_statement}
              </h3>
              <p className="mt-4 text-base leading-6 md:text-lg" style={{ color: "var(--fg-mid)" }}>
                {selected.tripwire_statement}
              </p>
            </div>

            <div className="space-y-4 p-4 md:p-5">
              {selected.flags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selected.flags.map((flag) => (
                    <span
                      key={flag}
                      className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        borderColor: "rgba(245,158,11,.32)",
                        color: "#FBBF24",
                        background: "rgba(245,158,11,.08)",
                      }}
                    >
                      {flag.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              )}

              {selected.alfa_check_question && (
                <div
                  className="rounded-xl border p-3"
                  style={{
                    borderColor: "rgba(155,107,255,.28)",
                    background: "rgba(155,107,255,.08)",
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--brand-violet-light)" }}>
                    Alfa check
                  </p>
                  <p className="mt-1 text-sm leading-5" style={{ color: "var(--fg-high)" }}>
                    {selected.alfa_check_question}
                  </p>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoBlock title="Correct move" text={selected.correct_move} />
                <InfoBlock title="Consequence" text={selected.consequence} />
              </div>

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Optional note for this decision"
                rows={3}
                className="w-full resize-none rounded-xl border p-3 text-sm outline-none"
                style={{
                  background: "var(--bg-elevated)",
                  borderColor: "var(--border)",
                  color: "var(--fg-high)",
                }}
              />

              <button
                onClick={() => setDetailsOpen((open) => !open)}
                className="w-full rounded-xl border px-4 py-3 text-sm font-semibold"
                style={{
                  background: "transparent",
                  borderColor: "var(--border)",
                  color: "var(--fg-mid)",
                }}
              >
                {detailsOpen ? "Hide source and reasoning" : "Show source and reasoning"}
              </button>

              {detailsOpen && <Details trap={selected} />}
            </div>
          </article>

          <aside className="hidden lg:block">
            <div
              className="sticky top-8 rounded-2xl border p-4"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
            >
              <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "var(--fg-muted)" }}>
                Nearby traps
              </p>
              <div className="mt-3 space-y-2">
                {traps.slice(Math.max(0, selectedIndex - 2), selectedIndex + 5).map((trap) => (
                  <button
                    key={trap.trap_id}
                    onClick={() => {
                      setSelectedIndex(traps.findIndex((item) => item.trap_id === trap.trap_id));
                      setNotes("");
                      setDetailsOpen(false);
                    }}
                    className="w-full rounded-lg border p-2 text-left text-xs leading-4"
                    style={{
                      background:
                        trap.trap_id === selected.trap_id
                          ? "var(--bg-elevated)"
                          : "transparent",
                      borderColor:
                        trap.trap_id === selected.trap_id
                          ? "var(--brand-iris)"
                          : "var(--border)",
                      color: "var(--fg-mid)",
                    }}
                  >
                    {trap.bait_statement}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-x-0 bottom-[76px] z-40 border-t p-3 md:bottom-0 md:left-56"
          style={{
            background: "rgba(11,13,18,.96)",
            borderColor: "var(--border)",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="mx-auto flex max-w-5xl items-center gap-2">
            <button
              onClick={() => move(-1)}
              disabled={selectedIndex === 0 || acting}
              className="h-12 w-11 shrink-0 rounded-xl border text-lg disabled:opacity-35"
              style={{ borderColor: "var(--border)", color: "var(--fg-mid)" }}
              aria-label="Previous trap"
            >
              ‹
            </button>
            <button
              onClick={() => submit("reject")}
              disabled={acting}
              className="h-12 flex-1 rounded-xl text-sm font-bold disabled:opacity-50"
              style={{ background: "rgba(239,68,68,.14)", color: "#FCA5A5" }}
            >
              Reject
            </button>
            <button
              onClick={() => submit("unsure")}
              disabled={acting}
              className="h-12 flex-1 rounded-xl text-sm font-bold disabled:opacity-50"
              style={{ background: "var(--bg-elevated)", color: "var(--fg-high)" }}
            >
              Unsure
            </button>
            <button
              onClick={() => submit("approve")}
              disabled={acting}
              className="h-12 flex-1 rounded-xl text-sm font-bold disabled:opacity-50"
              style={{ background: "var(--fg-high)", color: "var(--bg-ink)" }}
            >
              Approve
            </button>
            <button
              onClick={() => move(1)}
              disabled={selectedIndex >= traps.length - 1 || acting}
              className="h-12 w-11 shrink-0 rounded-xl border text-lg disabled:opacity-35"
              style={{ borderColor: "var(--border)", color: "var(--fg-mid)" }}
              aria-label="Next trap"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string | null }) {
  return (
    <div
      className="rounded-xl border p-3"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--fg-muted)" }}>
        {title}
      </p>
      <p className="mt-2 text-sm leading-5" style={{ color: "var(--fg-high)" }}>
        {text || "Not populated"}
      </p>
    </div>
  );
}

function Details({ trap }: { trap: Trap }) {
  const result = trap.freshness_gate_result;

  return (
    <div className="space-y-3">
      <InfoBlock title="Guideline dependency" text={trap.guideline_dependency || "None"} />
      <InfoBlock
        title="Source URL"
        text={result?.source_url || trap.guideline_source_url || "No source URL"}
      />
      <InfoBlock
        title="Current rule summary"
        text={result?.current_rule_summary || "No live-source summary"}
      />
      <InfoBlock
        title="Source excerpt"
        text={result?.source_excerpt || "No source excerpt"}
      />
      <InfoBlock
        title="Freshness reasoning"
        text={result?.verifier_reasoning || result?.reasoning || "No verifier reasoning"}
      />
      <InfoBlock title="Sonnet bait reasoning" text={trap.sonnet_gate_reasoning} />
      <div className="text-[11px] leading-4" style={{ color: "var(--fg-muted)" }}>
        Trap ID: {trap.trap_id}
      </div>
    </div>
  );
}
