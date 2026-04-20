"use client";

import { useEffect, useState } from "react";

export function LiveStatsRibbon() {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    fetch("https://app.medexia-akt.com/api/public/stats", {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (
          data &&
          typeof data.userCount === "number" &&
          data.userCount >= 0
        ) {
          setUserCount(Math.min(Math.floor(data.userCount), 99999));
        }
      })
      .catch(() => {})
      .finally(() => clearTimeout(timeout));

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  const showLive = userCount !== null && userCount >= 20;

  return (
    <div
      className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] md:text-[13px] font-medium"
      style={{ color: "rgba(232,236,255,.55)" }}
    >
      {showLive && (
        <>
          <span>
            <strong className="tabular-nums" style={{ color: "var(--fg-high)" }}>
              {userCount!.toLocaleString("en-GB")}
            </strong>{" "}
            trainees revising now
          </span>
          <span style={{ color: "rgba(232,236,255,.2)" }}>&middot;</span>
        </>
      )}
      <span>
        <strong className="tabular-nums" style={{ color: "var(--fg-high)" }}>
          90+
        </strong>{" "}
        hrs
      </span>
      <span style={{ color: "rgba(232,236,255,.2)" }}>&middot;</span>
      <span>
        <strong className="tabular-nums" style={{ color: "var(--fg-high)" }}>
          20,000+
        </strong>{" "}
        questions
      </span>
      <span style={{ color: "rgba(232,236,255,.2)" }}>&middot;</span>
      <span>
        <strong className="tabular-nums" style={{ color: "var(--fg-high)" }}>
          32
        </strong>{" "}
        topics
      </span>
      <span style={{ color: "rgba(232,236,255,.2)" }}>&middot;</span>
      <span style={{ color: "rgba(52,211,153,.9)" }}>
        Free for April &amp; July &mdash; no trial, no card
      </span>
    </div>
  );
}
