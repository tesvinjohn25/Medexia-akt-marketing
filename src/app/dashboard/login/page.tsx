"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/dashboard/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/dashboard/generate");
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg-ink)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-2xl border"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        <h1
          className="text-xl font-semibold mb-1"
          style={{ color: "var(--fg-high)" }}
        >
          Command Center
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--fg-muted)" }}>
          Enter your password to continue
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition-colors focus:border-[var(--brand-iris)]"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--fg-high)",
            borderColor: "var(--border)",
          }}
          autoFocus
        />

        {error && (
          <p className="text-red-400 text-xs mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium transition-opacity disabled:opacity-40"
          style={{
            background: "var(--brand-grad)",
            color: "white",
          }}
        >
          {loading ? "Checking..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
