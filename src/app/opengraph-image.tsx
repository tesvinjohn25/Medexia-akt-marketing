import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Medexia AKT Navigator — Free MRCGP AKT revision for April & July";
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
          background: "linear-gradient(135deg, #0B0D12 0%, #110C20 40%, #0E0A1A 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(109,106,232,.25), transparent 65%)",
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
            background: "radial-gradient(circle, rgba(155,107,255,.20), transparent 65%)",
          }}
        />

        {/* Top line: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
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

        {/* Headline */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#F5F7FF",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginBottom: "24px",
          }}
        >
          RCGP AKT Revision
        </div>

        {/* Divider accent */}
        <div
          style={{
            width: "80px",
            height: "4px",
            borderRadius: "2px",
            background: "linear-gradient(90deg, #6D6AE8, #9B6BFF)",
            marginBottom: "28px",
          }}
        />

        {/* Features line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            fontWeight: 600,
            color: "#9B6BFF",
          }}
        >
          <span>90+ hrs Audio</span>
          <span style={{ color: "rgba(155,107,255,.4)" }}>|</span>
          <span>Adaptive Learning</span>
          <span style={{ color: "rgba(155,107,255,.4)" }}>|</span>
          <span>Deep Explanations</span>
        </div>

        {/* Free badge */}
        <div
          style={{
            display: "flex",
            marginTop: "36px",
          }}
        >
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
            FREE FOR APRIL & JULY 2026
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
