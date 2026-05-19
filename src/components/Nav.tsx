"use client";

import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
        paddingBottom: 8,
        background: scrolled
          ? "rgba(11,13,18,.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,.06)"
          : "1px solid transparent",
      }}
    >
      <div className="container-x flex items-center justify-between">
        <div
          className="flex items-center gap-2"
          style={{
            filter: "drop-shadow(0 18px 45px rgba(0,0,0,.45))",
          }}
        >
          <img
            src="/brand/wordmark.png"
            alt="Medexia AKT Navigator"
            style={{ height: 32, width: "auto" }}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Log in — desktop only */}
          <a
            href="https://app.medexia-akt.com"
            className="hidden md:inline-flex rounded-full border px-3 py-[8px] text-sm font-semibold transition-colors"
            style={{
              borderColor: "rgba(255,255,255,.14)",
              background: "rgba(6,7,12,.28)",
              backdropFilter: "blur(14px)",
              color: "rgba(245,247,255,.86)",
            }}
          >
            Log in
          </a>

          <a
            href="https://app.medexia-akt.com"
            className="btn-primary text-sm !py-[8px] !px-[14px]"
          >
            Start free
          </a>
        </div>
      </div>
    </nav>
  );
}
