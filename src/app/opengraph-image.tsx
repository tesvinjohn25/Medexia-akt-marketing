import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AKT Navigator by Medexia — the whole AKT in 90 hours of audio. Full access free until 8 July. £59 Early Access before 8 July; £79 from 8 July.";
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
          padding: "64px 80px 58px",
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
            AKT Navigator
          </span>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#9B6BFF",
            }}
          >
            by Medexia
          </span>
        </div>

        {/* Headline — audio-first product promise */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#F5F7FF",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          The whole AKT.
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "rgba(232,236,255,.58)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginBottom: "24px",
          }}
        >
          In 90 hours.
        </div>

        {/* Accent divider */}
        <div
          style={{
            width: "80px",
            height: "4px",
            borderRadius: "2px",
            background: "linear-gradient(90deg, #6D6AE8, #9B6BFF)",
            marginBottom: "22px",
          }}
        />

        {/* Subline — pricing timing */}
        <div
          style={{
            display: "flex",
            fontSize: "31px",
            fontWeight: 700,
            color: "rgba(167,139,250,.9)",
            letterSpacing: "-0.005em",
          }}
        >
          Full access free until 8 July
        </div>

        <div style={{ display: "flex", gap: "14px", marginTop: "36px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: "12px",
              background: "rgba(255,255,255,.055)",
              border: "1.5px solid rgba(255,255,255,.12)",
              fontSize: "21px",
              fontWeight: 700,
              color: "rgba(232,236,255,.88)",
              letterSpacing: "-0.01em",
            }}
          >
            £59 Early Access before 8 July
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: "12px",
              background: "rgba(52,211,153,.12)",
              border: "1.5px solid rgba(52,211,153,.30)",
              fontSize: "21px",
              fontWeight: 700,
              color: "rgba(52,211,153,.95)",
              letterSpacing: "-0.01em",
            }}
          >
            £79 from 8 July
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: "12px",
              background: "rgba(167,139,250,.10)",
              border: "1.5px solid rgba(167,139,250,.24)",
              fontSize: "21px",
              fontWeight: 700,
              color: "rgba(197,170,255,.96)",
              letterSpacing: "-0.01em",
            }}
          >
            Questions + 2h audio stay free
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "42px",
            fontSize: "24px",
            fontWeight: 600,
            color: "rgba(232,236,255,.62)",
            letterSpacing: "-0.01em",
          }}
        >
          Audio-first MRCGP AKT revision by Medexia
        </div>
      </div>
    ),
    { ...size },
  );
}
