"use client";

import { useState, useEffect, useCallback } from "react";

interface Asset {
  id: string;
  job_id: string;
  question_uid: string;
  asset_type: string;
  slug: string;
  slide1_url: string | null;
  slide2_url: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  caption_carousel_ig: string | null;
  caption_reel_ig: string | null;
  caption_reel_tiktok: string | null;
  review_status: string;
  reviewed_at: string | null;
  review_notes: string | null;
  created_at: string;
}

type Filter = "pending" | "approved" | "rejected" | "all";
type CaptionTab = "carousel_ig" | "reel_ig" | "reel_tiktok";
type RegenTarget = "full" | "slide1" | "slide2" | "reel" | "reel_script";

const REGEN_OPTIONS: { value: RegenTarget; label: string }[] = [
  { value: "full", label: "Full (infographic + reel)" },
  { value: "slide1", label: "Slide 1 only" },
  { value: "slide2", label: "Slide 2 only" },
  { value: "reel", label: "Reel (script + video)" },
  { value: "reel_script", label: "Reel script only" },
];

export default function ReviewPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filter, setFilter] = useState<Filter>("pending");
  const [selected, setSelected] = useState<Asset | null>(null);
  const [notes, setNotes] = useState("");
  const [captionTab, setCaptionTab] = useState<CaptionTab>("carousel_ig");
  const [acting, setActing] = useState(false);

  // Regeneration state
  const [showRegen, setShowRegen] = useState(false);
  const [regenTarget, setRegenTarget] = useState<RegenTarget>("full");
  const [regenInstructions, setRegenInstructions] = useState("");
  const [regenSubmitting, setRegenSubmitting] = useState(false);

  const fetchAssets = useCallback(async () => {
    const params = filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/dashboard/assets${params}`);
    if (res.ok) {
      const data = await res.json();
      setAssets(data.assets);
    }
  }, [filter]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  async function handleReview(status: "approved" | "rejected") {
    if (!selected) return;
    setActing(true);
    await fetch(`/api/dashboard/assets/${selected.id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes: notes || null }),
    });
    setActing(false);
    setSelected(null);
    setNotes("");
    fetchAssets();
  }

  async function handleRegenerate() {
    if (!selected || !regenInstructions.trim()) return;
    setRegenSubmitting(true);

    // Determine job_type and style from the asset being regenerated
    const isCarousel = selected.asset_type === "carousel";
    const isTight = selected.asset_type === "reel_tight";
    const jobType = isCarousel ? "infographic" : "reel";
    const style = isTight ? "tight" : isCarousel ? "both" : "classic";

    await fetch("/api/dashboard/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_type: jobType,
        style,
        question_uid: selected.question_uid,
        count: 1,
        custom_instructions: regenInstructions,
        regenerate_from: selected.id,
        regenerate_target: regenTarget,
      }),
    });

    setRegenSubmitting(false);
    setShowRegen(false);
    setRegenInstructions("");
    setSelected(null);
    fetchAssets();
  }

  const captionMap: Record<CaptionTab, string | null | undefined> = selected
    ? {
        carousel_ig: selected.caption_carousel_ig,
        reel_ig: selected.caption_reel_ig,
        reel_tiktok: selected.caption_reel_tiktok,
      }
    : { carousel_ig: null, reel_ig: null, reel_tiktok: null };

  const BADGE_COLORS: Record<string, string> = {
    carousel: "#6D6AE8",
    reel_classic: "#9B6BFF",
    reel_tight: "#F59E0B",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--fg-high)" }}
        >
          Review Content
        </h2>

        {/* Filter tabs */}
        <div
          className="flex rounded-lg border overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          {(["pending", "approved", "rejected", "all"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 text-xs font-medium capitalize transition-colors"
              style={{
                background:
                  filter === f ? "var(--bg-elevated)" : "transparent",
                color:
                  filter === f ? "var(--fg-high)" : "var(--fg-muted)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Asset grid */}
      {assets.length === 0 && (
        <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
          No assets matching &ldquo;{filter}&rdquo;.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {assets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => {
              setSelected(asset);
              setNotes("");
              setCaptionTab("carousel_ig");
              setShowRegen(false);
              setRegenInstructions("");
            }}
            className="text-left p-3 rounded-xl border transition-colors hover:border-[var(--brand-iris)]"
            style={{
              background: "var(--bg-surface)",
              borderColor:
                selected?.id === asset.id
                  ? "var(--brand-iris)"
                  : "var(--border)",
            }}
          >
            {/* Thumbnail */}
            {(asset.thumbnail_url || asset.slide1_url) && (
              <img
                src={asset.thumbnail_url || asset.slide1_url || ""}
                alt={asset.slug}
                className="w-full aspect-[4/5] object-cover rounded-lg mb-2"
                style={{ background: "var(--bg-elevated)" }}
              />
            )}
            {!asset.thumbnail_url && !asset.slide1_url && (
              <div
                className="w-full aspect-[4/5] rounded-lg mb-2 flex items-center justify-center text-xs"
                style={{
                  background: "var(--bg-elevated)",
                  color: "var(--fg-muted)",
                }}
              >
                No preview
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                style={{
                  background: `${BADGE_COLORS[asset.asset_type] || "var(--fg-muted)"}20`,
                  color:
                    BADGE_COLORS[asset.asset_type] || "var(--fg-muted)",
                }}
              >
                {asset.asset_type}
              </span>
              {asset.review_status !== "pending" && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-medium capitalize"
                  style={{
                    color:
                      asset.review_status === "approved"
                        ? "#22C55E"
                        : "#EF4444",
                  }}
                >
                  {asset.review_status}
                </span>
              )}
            </div>
            <p
              className="text-xs mt-1 truncate"
              style={{ color: "var(--fg-mid)" }}
            >
              {asset.slug}
            </p>
            <p
              className="text-[10px] mt-0.5"
              style={{ color: "var(--fg-muted)" }}
            >
              {new Date(asset.created_at).toLocaleDateString()}
            </p>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--fg-high)" }}
                >
                  {selected.slug}
                </h3>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {selected.asset_type} &middot; {selected.question_uid}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-lg"
                style={{ color: "var(--fg-muted)" }}
              >
                &times;
              </button>
            </div>

            {/* Preview */}
            <div className="flex gap-3 mb-4">
              {selected.slide1_url && (
                <img
                  src={selected.slide1_url}
                  alt="Slide 1"
                  className="w-1/2 rounded-lg"
                  style={{ background: "var(--bg-elevated)" }}
                />
              )}
              {selected.slide2_url && (
                <img
                  src={selected.slide2_url}
                  alt="Slide 2"
                  className="w-1/2 rounded-lg"
                  style={{ background: "var(--bg-elevated)" }}
                />
              )}
            </div>

            {selected.video_url && (
              <video
                src={selected.video_url}
                controls
                className="w-full max-w-sm mx-auto rounded-lg mb-4"
                style={{ background: "var(--bg-elevated)" }}
              />
            )}

            {/* Caption tabs */}
            <div
              className="flex rounded-lg border overflow-hidden mb-2"
              style={{ borderColor: "var(--border)" }}
            >
              {(
                [
                  ["carousel_ig", "IG Carousel"],
                  ["reel_ig", "IG Reel"],
                  ["reel_tiktok", "TikTok"],
                ] as [CaptionTab, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setCaptionTab(key)}
                  className="px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    background:
                      captionTab === key
                        ? "var(--bg-elevated)"
                        : "transparent",
                    color:
                      captionTab === key
                        ? "var(--fg-high)"
                        : "var(--fg-muted)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <pre
              className="text-xs p-3 rounded-lg whitespace-pre-wrap mb-4 max-h-40 overflow-y-auto"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--fg-mid)",
              }}
            >
              {captionMap[captionTab] || "No caption"}
            </pre>

            {/* Review actions */}
            {selected.review_status === "pending" && !showRegen && (
              <>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Review notes (optional)"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none resize-none mb-3"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--fg-high)",
                    borderColor: "var(--border)",
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReview("approved")}
                    disabled={acting}
                    className="flex-1 py-2 rounded-xl text-sm font-medium transition-opacity disabled:opacity-40"
                    style={{ background: "#22C55E", color: "white" }}
                  >
                    {acting ? "..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleReview("rejected")}
                    disabled={acting}
                    className="flex-1 py-2 rounded-xl text-sm font-medium transition-opacity disabled:opacity-40"
                    style={{ background: "#EF4444", color: "white" }}
                  >
                    {acting ? "..." : "Reject"}
                  </button>
                  <button
                    onClick={() => setShowRegen(true)}
                    className="flex-1 py-2 rounded-xl text-sm font-medium border"
                    style={{
                      borderColor: "var(--brand-iris)",
                      color: "var(--brand-iris)",
                    }}
                  >
                    Regenerate
                  </button>
                </div>
              </>
            )}

            {/* Regeneration panel */}
            {showRegen && (
              <div
                className="p-4 rounded-xl border space-y-3"
                style={{
                  background: "var(--bg-elevated)",
                  borderColor: "var(--brand-iris)",
                }}
              >
                <div className="flex items-center justify-between">
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: "var(--fg-high)" }}
                  >
                    Regenerate with instructions
                  </h4>
                  <button
                    onClick={() => setShowRegen(false)}
                    className="text-xs"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    Cancel
                  </button>
                </div>

                {/* Target selector */}
                <div>
                  <label
                    className="block text-xs mb-1 font-medium"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    What to regenerate
                  </label>
                  <select
                    value={regenTarget}
                    onChange={(e) =>
                      setRegenTarget(e.target.value as RegenTarget)
                    }
                    className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
                    style={{
                      background: "var(--bg-ink)",
                      color: "var(--fg-high)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {REGEN_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Instructions */}
                <div>
                  <label
                    className="block text-xs mb-1 font-medium"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    Instructions for AI
                  </label>
                  <textarea
                    value={regenInstructions}
                    onChange={(e) => setRegenInstructions(e.target.value)}
                    placeholder='e.g. "Make the hook more attention-grabbing", "Simplify the teaching bullets", "Focus the pearl on dosing"'
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg text-sm border outline-none resize-none"
                    style={{
                      background: "var(--bg-ink)",
                      color: "var(--fg-high)",
                      borderColor: "var(--border)",
                    }}
                    autoFocus
                  />
                </div>

                <button
                  onClick={handleRegenerate}
                  disabled={regenSubmitting || !regenInstructions.trim()}
                  className="w-full py-2 rounded-xl text-sm font-medium transition-opacity disabled:opacity-40"
                  style={{ background: "var(--brand-grad)", color: "white" }}
                >
                  {regenSubmitting
                    ? "Creating job..."
                    : `Regenerate ${REGEN_OPTIONS.find((o) => o.value === regenTarget)?.label}`}
                </button>
              </div>
            )}

            {/* Already reviewed — show status + regenerate option */}
            {selected.review_status !== "pending" && !showRegen && (
              <div className="flex items-center justify-between">
                <p
                  className="text-sm capitalize"
                  style={{
                    color:
                      selected.review_status === "approved"
                        ? "#22C55E"
                        : "#EF4444",
                  }}
                >
                  {selected.review_status}
                  {selected.review_notes && (
                    <span style={{ color: "var(--fg-muted)" }}>
                      {" "}
                      &mdash; {selected.review_notes}
                    </span>
                  )}
                </p>
                <button
                  onClick={() => setShowRegen(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                  style={{
                    borderColor: "var(--brand-iris)",
                    color: "var(--brand-iris)",
                  }}
                >
                  Regenerate
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
