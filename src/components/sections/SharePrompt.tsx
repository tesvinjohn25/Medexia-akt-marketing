"use client";

import { useState } from "react";

const SHARE_TEXT =
  "Hey — found this free AKT revision tool. 50+ hours of audio, mock exams, deep explanations. Free until July. https://medexia-akt.com";
const WHATSAPP_URL = `whatsapp://send?text=${encodeURIComponent(SHARE_TEXT)}`;
const EMAIL_URL = `mailto:?subject=${encodeURIComponent("Free AKT revision tool")}&body=${encodeURIComponent(SHARE_TEXT)}`;

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function SharePrompt() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://medexia-akt.com");
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = "https://medexia-akt.com";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 text-center">
      <p
        className="text-[14px] mb-3"
        style={{ color: "var(--fg-muted)" }}
      >
        Know someone sitting the AKT?
      </p>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "Free AKT revision tool",
                text: SHARE_TEXT,
                url: "https://medexia-akt.com",
              }).catch(() => {});
            } else {
              window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
            }
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-white/[.06]"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            color: "var(--fg-mid)",
            minHeight: 44,
          }}
        >
          <WhatsAppIcon /> WhatsApp
        </button>
        <button
          onClick={copyLink}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-white/[.06]"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            color: "var(--fg-mid)",
            minHeight: 44,
          }}
        >
          <LinkIcon /> {copied ? "Copied!" : "Copy link"}
        </button>
        <a
          href={EMAIL_URL}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-white/[.06]"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            color: "var(--fg-mid)",
            minHeight: 44,
          }}
        >
          <EmailIcon /> Email
        </a>
      </div>
    </div>
  );
}
