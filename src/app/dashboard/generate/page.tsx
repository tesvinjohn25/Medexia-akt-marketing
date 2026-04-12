"use client";

import { useState, useEffect, useCallback } from "react";

interface Job {
  id: string;
  status: string;
  job_type: string;
  style: string;
  topic: string | null;
  question_uid: string | null;
  count: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#F59E0B",
  running: "#6D6AE8",
  completed: "#22C55E",
  failed: "#EF4444",
};

export default function GeneratePage() {
  const [jobType, setJobType] = useState("both");
  const [style, setStyle] = useState("both");
  const [topic, setTopic] = useState("");
  const [uid, setUid] = useState("");
  const [count, setCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = useCallback(async () => {
    const res = await fetch("/api/dashboard/jobs");
    if (res.ok) {
      const data = await res.json();
      setJobs(data.jobs);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 10_000);
    return () => clearInterval(interval);
  }, [fetchJobs]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    await fetch("/api/dashboard/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_type: jobType,
        style,
        topic: topic || null,
        question_uid: uid || null,
        count,
      }),
    });

    setSubmitting(false);
    fetchJobs();
  }

  return (
    <div>
      <h2
        className="text-2xl font-semibold mb-6"
        style={{ color: "var(--fg-high)" }}
      >
        Generate Content
      </h2>

      {/* Job creation form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl border mb-8 space-y-4"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Job type */}
          <div>
            <label
              className="block text-xs mb-1.5 font-medium"
              style={{ color: "var(--fg-muted)" }}
            >
              Job Type
            </label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--fg-high)",
                borderColor: "var(--border)",
              }}
            >
              <option value="infographic">Infographic only</option>
              <option value="reel">Reel only</option>
              <option value="both">Both</option>
            </select>
          </div>

          {/* Style */}
          <div>
            <label
              className="block text-xs mb-1.5 font-medium"
              style={{ color: "var(--fg-muted)" }}
            >
              Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--fg-high)",
                borderColor: "var(--border)",
              }}
            >
              <option value="classic">Classic</option>
              <option value="tight">Tight</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        {/* Topic (optional) */}
        <div>
          <label
            className="block text-xs mb-1.5 font-medium"
            style={{ color: "var(--fg-muted)" }}
          >
            Topic (optional)
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. dermatology, statistics"
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
            style={{
              background: "var(--bg-elevated)",
              color: "var(--fg-high)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        {/* Question UID */}
        <div>
          <label
            className="block text-xs mb-1.5 font-medium"
            style={{ color: "var(--fg-muted)" }}
          >
            Question UID (optional, overrides topic)
          </label>
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="e.g. abc123-def456"
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
            style={{
              background: "var(--bg-elevated)",
              color: "var(--fg-high)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        {/* Count */}
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label
              className="block text-xs mb-1.5 font-medium"
              style={{ color: "var(--fg-muted)" }}
            >
              Count
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--fg-high)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-xl text-sm font-medium transition-opacity disabled:opacity-40"
            style={{ background: "var(--brand-grad)", color: "white" }}
          >
            {submitting ? "Creating..." : "Generate"}
          </button>
        </div>
      </form>

      {/* Job list */}
      <h3
        className="text-lg font-semibold mb-3"
        style={{ color: "var(--fg-high)" }}
      >
        Recent Jobs
      </h3>

      <div className="space-y-2">
        {jobs.length === 0 && (
          <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
            No jobs yet. Create one above.
          </p>
        )}
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between p-4 rounded-xl border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: STATUS_COLORS[job.status] || "var(--fg-muted)",
                }}
              />
              <div className="min-w-0">
                <p className="text-sm truncate" style={{ color: "var(--fg-high)" }}>
                  {job.job_type} &middot; {job.style}
                  {job.question_uid && (
                    <span style={{ color: "var(--fg-muted)" }}>
                      {" "}
                      &middot; {job.question_uid.slice(0, 12)}...
                    </span>
                  )}
                  {job.topic && !job.question_uid && (
                    <span style={{ color: "var(--fg-muted)" }}>
                      {" "}
                      &middot; {job.topic}
                    </span>
                  )}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {new Date(job.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: `${STATUS_COLORS[job.status]}20`,
                  color: STATUS_COLORS[job.status],
                }}
              >
                {job.status}
              </span>
              {job.error && (
                <span
                  className="text-xs max-w-28 sm:max-w-48 truncate"
                  style={{ color: "#EF4444" }}
                  title={job.error}
                >
                  {job.error}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
