"use client";

import Image from "next/image";

export function MinimalFooter() {
  return (
    <footer
      className="border-t py-8"
      style={{ borderColor: "rgba(255,255,255,.06)" }}
    >
      <div className="container-x flex flex-col items-center gap-4 md:flex-row md:justify-between">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 overflow-hidden rounded-xl border"
            style={{ borderColor: "rgba(255,255,255,.08)" }}
          >
            <Image src="/logo.jpg" alt="Medexia" width={64} height={64} />
          </div>
          <span
            className="text-[14px] font-semibold"
            style={{ letterSpacing: "-0.01em" }}
          >
            AKT Navigator
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 text-[13px]" style={{ color: "rgba(232,236,255,.45)" }}>
          <a
            href="/privacy"
            className="transition-colors hover:text-white/70"
          >
            Privacy
          </a>
          <a
            href="mailto:hello@medexia-akt.com"
            className="transition-colors hover:text-white/70"
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div
          className="text-[12px]"
          style={{ color: "rgba(232,236,255,.35)" }}
        >
          &copy; 2025 Medexia Ltd.
        </div>
      </div>
    </footer>
  );
}
