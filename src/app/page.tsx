import Image from "next/image";
import { HeroFrames } from "@/components/HeroFrames";

const DEMO_URL = "https://medexia-akt.com/demo";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 overflow-hidden rounded-2xl border"
        style={{
          borderColor: "rgba(255,255,255,.10)",
          boxShadow: "0 18px 45px rgba(0,0,0,.45)",
        }}
      >
        <Image src="/logo.jpg" alt="Medexia" width={80} height={80} />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold" style={{ letterSpacing: "-0.01em" }}>
          Medexia
        </div>
        <div className="text-xs faint">AKT Navigator</div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* HERO (scrolly, full-screen lock) */}
      <section className="relative overflow-hidden">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <HeroFrames>
          {/* Readability scrim */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              // Mobile: keep the phone readable (avoid over-darkening the whole frame)
              background:
                "radial-gradient(900px 640px at 18% 78%, rgba(5,6,10,.72), rgba(5,6,10,0) 58%), linear-gradient(to top, rgba(5,6,10,.65), rgba(5,6,10,0) 68%)",
            }}
          />

          {/* Overlay copy (mobile: compact & low so the phone stays visible) */}
          <div className="container-x relative flex h-full items-end pb-6 md:items-center md:pb-0">
            <div
              className="pointer-events-auto w-full max-w-[560px] rounded-[26px] border px-5 py-5 md:max-w-[58ch] md:px-7 md:py-7"
              style={{
                background: "rgba(6,7,12,.44)",
                borderColor: "rgba(255,255,255,.10)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 26px 80px rgba(0,0,0,.55)",
              }}
            >
              {/* Desktop header only */}
              <div className="hidden md:flex items-center justify-between">
                <Logo />
                <a
                  className="btn-secondary text-sm"
                  href={DEMO_URL}
                  style={{ padding: "10px 12px" }}
                >
                  Try the demo
                </a>
              </div>

              <div className="faint text-[11px] tracking-[0.18em] uppercase">
                Guided revision for UK GP trainees
              </div>
              <h1
                className="mt-2 text-[34px] leading-[1.02] md:mt-3 md:text-[60px]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.04em",
                  textShadow: "0 18px 60px rgba(0,0,0,.65)",
                }}
              >
                The AKT covers everything.
                <br />
                <span style={{ color: "var(--brand-violet-light)" }}>
                  Medexia covers what matters.
                </span>
              </h1>
              <p
                className="mt-3 text-[15px] leading-[1.55] md:mt-4 md:text-[16px] md:leading-[1.65]"
                style={{ color: "rgba(232,236,255,.80)", textShadow: "0 14px 40px rgba(0,0,0,.6)" }}
              >
                Scroll to move the phone into place. (Full app scroll-demo coming next.)
              </p>

              <div className="mt-5 flex flex-col gap-3 md:mt-7 md:flex-row md:flex-wrap">
                <a className="btn-primary w-full md:w-auto" href={DEMO_URL}>
                  Just revise
                </a>
                <a className="btn-secondary w-full md:w-auto" href={DEMO_URL}>
                  Try the 5‑question demo
                </a>
              </div>

              <div className="mt-4 text-[13px]" style={{ color: "rgba(232,236,255,.62)" }}>
                No signup. Under 90 seconds. Most people get 1/5.
              </div>

              {/* Subtle scroll hint */}
              <div className="mt-4 flex items-center gap-3" style={{ color: "rgba(232,236,255,.55)" }}>
                <div
                  className="h-[34px] w-[22px] rounded-full border"
                  style={{ borderColor: "rgba(255,255,255,.18)", position: "relative" }}
                  aria-hidden
                >
                  <div
                    className="h-[6px] w-[6px] rounded-full"
                    style={{
                      background: "rgba(255,255,255,.65)",
                      position: "absolute",
                      left: "50%",
                      top: 7,
                      transform: "translateX(-50%)",
                      animation: "heroDot 1.6s ease-in-out infinite",
                    }}
                  />
                </div>
                <div className="text-[11px] tracking-[0.16em] uppercase">Scroll</div>
              </div>
            </div>
          </div>
        </HeroFrames>
      </section>

      {/* (Temporarily removed everything below — this will be replaced by the scroll-scrub app demo section.) */}
    </main>
  );
}
