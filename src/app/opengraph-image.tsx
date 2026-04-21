import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Medexia AKT Navigator — The whole AKT, in 90 hours of audio. Free for April & July 2026.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background:
            "linear-gradient(135deg, #0B0D12 0%, #110C20 40%, #0E0A1A 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cosmic glow orbs — same palette as the site hero */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(109,106,232,.25), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            right: "-60px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(155,107,255,.20), transparent 65%)",
          }}
        />

        {/* Brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#F5F7FF",
              letterSpacing: "-0.01em",
            }}
          >
            Medexia
          </span>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#9B6BFF",
            }}
          >
            AKT Navigator
          </span>
        </div>

        {/* Headline — direct echo of homepage H1, muted setup + bold payoff */}
        <div
          style={{
            fontSize: "78px",
            fontWeight: 800,
            color: "rgba(232,236,255,.55)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
          }}
        >
          The whole AKT.
        </div>
        <div
          style={{
            fontSize: "78px",
            fontWeight: 800,
            color: "#F5F7FF",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            marginBottom: "26px",
          }}
        >
          In 90 hours of audio.
        </div>

        {/* Accent divider */}
        <div
          style={{
            width: "80px",
            height: "4px",
            borderRadius: "2px",
            background: "linear-gradient(90deg, #6D6AE8, #9B6BFF)",
            marginBottom: "20px",
          }}
        />

        {/* Subline — names the three homepage pillars */}
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            fontWeight: 500,
            color: "rgba(167,139,250,.9)",
            letterSpacing: "-0.005em",
          }}
        >
          The most efficient way to revise &mdash; audio &middot; algorithm &middot; mocks.
        </div>

        {/* Free badge */}
        <div style={{ display: "flex", marginTop: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 24px",
              borderRadius: "12px",
              background: "rgba(52,211,153,.12)",
              border: "1.5px solid rgba(52,211,153,.30)",
              fontSize: "22px",
              fontWeight: 700,
              color: "rgba(52,211,153,.95)",
              letterSpacing: "0.04em",
            }}
          >
            FREE FOR APRIL &amp; JULY 2026
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
