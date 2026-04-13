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

interface Question {
  question_uid: string;
  stem: string;
  topic: string;
  subtopic: string;
  difficulty: string;
  correct: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  rationale_preview: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#F59E0B",
  running: "#6D6AE8",
  completed: "#22C55E",
  failed: "#EF4444",
};

const DIFF_COLORS: Record<string, string> = {
  hard: "#EF4444",
  medium: "#F59E0B",
  easy: "#22C55E",
};

export default function GeneratePage() {
  const [jobType, setJobType] = useState("both");
  const [style, setStyle] = useState("both");
  const [submitting, setSubmitting] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  // Question search state
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedUids, setSelectedUids] = useState<Set<string>>(new Set());
  const [searching, setSearching] = useState(false);
  const [expandedUid, setExpandedUid] = useState<string | null>(null);

  // Load topics on mount
  useEffect(() => {
    fetch("/api/dashboard/questions")
      .then((r) => r.json())
      .then((data) => {
        if (data.topics) setTopics(data.topics);
        else console.error("Topics API error:", data.error);
      })
      .catch((err) => console.error("Topics fetch failed:", err));
  }, []);

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

  async function searchQuestions() {
    if (!selectedTopic && !searchQuery.trim()) return;
    setSearching(true);
    const params = new URLSearchParams();
    if (selectedTopic) params.set("topic", selectedTopic);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());

    const res = await fetch(`/api/dashboard/questions?${params}`);
    if (res.ok) {
      const data = await res.json();
      setQuestions(data.questions || []);
    }
    setSearching(false);
  }

  function toggleSelect(uid: string) {
    setSelectedUids((prev) => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });
  }

  function selectAll() {
    if (selectedUids.size === questions.length) {
      setSelectedUids(new Set());
    } else {
      setSelectedUids(new Set(questions.map((q) => q.question_uid)));
    }
  }

  async function handleCancel(jobId: string) {
    await fetch(`/api/dashboard/jobs/${jobId}/cancel`, { method: "POST" });
    fetchJobs();
  }

  async function handleGenerate() {
    if (selectedUids.size === 0) return;
    setSubmitting(true);

    // Create one job per selected question
    const uids = Array.from(selectedUids);
    for (const uid of uids) {
      await fetch("/api/dashboard/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_type: jobType,
          style,
          question_uid: uid,
          count: 1,
        }),
      });
    }

    setSubmitting(false);
    setSelectedUids(new Set());
    fetchJobs();
  }

  return (
    <div>
      <h2
        className="text-xl sm:text-2xl font-semibold mb-6"
        style={{ color: "var(--fg-high)" }}
      >
        Generate Content
      </h2>

      {/* Settings row */}
      <div
        className="p-4 sm:p-6 rounded-2xl border mb-4 space-y-4"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>

      {/* Question search */}
      <div
        className="p-4 sm:p-6 rounded-2xl border mb-8 space-y-4"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        <h3
          className="text-sm font-semibold"
          style={{ color: "var(--fg-high)" }}
        >
          Find Questions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Topic dropdown */}
          <div>
            <label
              className="block text-xs mb-1.5 font-medium"
              style={{ color: "var(--fg-muted)" }}
            >
              Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--fg-high)",
                borderColor: "var(--border)",
              }}
            >
              <option value="">All topics</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Keyword search */}
          <div>
            <label
              className="block text-xs mb-1.5 font-medium"
              style={{ color: "var(--fg-muted)" }}
            >
              Keyword (stem, explanation, or subtopic)
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchQuestions();
                }
              }}
              placeholder="e.g. eczema, p-value, atrial fibrillation"
              className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--fg-high)",
                borderColor: "var(--border)",
              }}
            />
          </div>
        </div>

        <button
          onClick={searchQuestions}
          disabled={searching || (!selectedTopic && !searchQuery.trim())}
          className="px-5 py-2 rounded-xl text-sm font-medium transition-opacity disabled:opacity-40"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--fg-high)",
            borderWidth: 1,
            borderColor: "var(--border)",
          }}
        >
          {searching ? "Searching..." : "Search"}
        </button>

        {/* Results */}
        {questions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
                {questions.length} result{questions.length !== 1 ? "s" : ""}
                {selectedUids.size > 0 && (
                  <span style={{ color: "var(--brand-iris)" }}>
                    {" "}
                    &middot; {selectedUids.size} selected
                  </span>
                )}
              </p>
              <button
                onClick={selectAll}
                className="text-xs font-medium"
                style={{ color: "var(--brand-iris)" }}
              >
                {selectedUids.size === questions.length
                  ? "Deselect all"
                  : "Select all"}
              </button>
            </div>

            <div
              className="max-h-80 overflow-y-auto space-y-1.5 rounded-lg p-2"
              style={{ background: "var(--bg-elevated)" }}
            >
              {questions.map((q) => {
                const isSelected = selectedUids.has(q.question_uid);
                const isExpanded = expandedUid === q.question_uid;
                return (
                  <div key={q.question_uid}>
                    <div
                      className="flex items-start gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors"
                      style={{
                        background: isSelected
                          ? "rgba(109, 106, 232, 0.15)"
                          : "transparent",
                      }}
                      onClick={() => toggleSelect(q.question_uid)}
                    >
                      {/* Checkbox */}
                      <div
                        className="w-4 h-4 mt-0.5 rounded border-2 shrink-0 flex items-center justify-center"
                        style={{
                          borderColor: isSelected
                            ? "var(--brand-iris)"
                            : "var(--fg-muted)",
                          background: isSelected
                            ? "var(--brand-iris)"
                            : "transparent",
                        }}
                      >
                        {isSelected && (
                          <span className="text-white text-[10px]">&#10003;</span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="text-sm leading-snug"
                          style={{ color: "var(--fg-high)" }}
                        >
                          {isExpanded
                            ? q.stem
                            : q.stem.length > 150
                              ? q.stem.slice(0, 150) + "..."
                              : q.stem}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                            style={{
                              background: "rgba(109, 106, 232, 0.2)",
                              color: "var(--brand-iris)",
                            }}
                          >
                            {q.subtopic}
                          </span>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded font-medium capitalize"
                            style={{
                              background: `${DIFF_COLORS[q.difficulty] || "var(--fg-muted)"}20`,
                              color:
                                DIFF_COLORS[q.difficulty] || "var(--fg-muted)",
                            }}
                          >
                            {q.difficulty}
                          </span>
                          <span
                            className="text-[10px]"
                            style={{ color: "var(--fg-muted)" }}
                          >
                            Ans: {q.correct}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedUid(
                                isExpanded ? null : q.question_uid,
                              );
                            }}
                            className="text-[10px] ml-auto"
                            style={{ color: "var(--fg-muted)" }}
                          >
                            {isExpanded ? "Hide" : "Details"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div
                        className="ml-6.5 pl-4 pb-2 text-xs space-y-1.5"
                        style={{ color: "var(--fg-mid)" }}
                      >
                        <div className="grid grid-cols-1 gap-1 mt-1">
                          {["a", "b", "c", "d"].map((letter) => {
                            const optKey = `option_${letter}` as keyof Question;
                            const isCorrect =
                              q.correct.toLowerCase() === letter;
                            return (
                              <p
                                key={letter}
                                style={{
                                  color: isCorrect
                                    ? "#22C55E"
                                    : "var(--fg-muted)",
                                }}
                              >
                                {letter.toUpperCase()}.{" "}
                                {q[optKey] as string}
                                {isCorrect && " \u2713"}
                              </p>
                            );
                          })}
                        </div>
                        {q.rationale_preview && (
                          <p
                            className="text-xs mt-1"
                            style={{ color: "var(--fg-muted)" }}
                          >
                            {q.rationale_preview}
                            {q.rationale_preview.length >= 200 ? "..." : ""}
                          </p>
                        )}
                        <p
                          className="text-[10px] font-mono mt-1"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          {q.question_uid}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={submitting || selectedUids.size === 0}
              className="w-full py-2.5 rounded-xl text-sm font-medium transition-opacity disabled:opacity-40"
              style={{ background: "var(--brand-grad)", color: "white" }}
            >
              {submitting
                ? "Creating jobs..."
                : `Generate ${selectedUids.size} question${selectedUids.size !== 1 ? "s" : ""}`}
            </button>
          </div>
        )}

        {questions.length === 0 && selectedTopic && !searching && (
          <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
            No results. Try a different topic or keyword.
          </p>
        )}
      </div>

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
            No jobs yet.
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
                <p
                  className="text-sm truncate"
                  style={{ color: "var(--fg-high)" }}
                >
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
              {(job.status === "pending" || job.status === "running") && (
                <button
                  onClick={() => handleCancel(job.id)}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "rgba(239, 68, 68, 0.15)",
                    color: "#EF4444",
                  }}
                >
                  Kill
                </button>
              )}
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
