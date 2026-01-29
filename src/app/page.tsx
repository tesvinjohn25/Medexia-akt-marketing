import Image from "next/image";
import { HeroFrames } from "@/components/HeroFrames";
import { HeroOverlay } from "@/components/HeroOverlay";

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
          {/* Subtle global scrim (keep the phone visible) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(980px 700px at 16% 70%, rgba(5,6,10,.62), rgba(5,6,10,0) 58%)",
            }}
          />

          {/* Desktop overlay (left-aligned, does not cover phone) */}
          <div className="hidden md:block">
            <div className="container-x relative flex h-full items-center">
              <div
                className="pointer-events-auto max-w-[58ch] rounded-[28px] border px-7 py-7"
                style={{
                  background: "rgba(6,7,12,.55)",
                  borderColor: "rgba(255,255,255,.10)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 30px 90px rgba(0,0,0,.55)",
                }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <Logo />
                  <a className="btn-secondary text-sm" href={DEMO_URL} style={{ padding: "10px 12px" }}>
                    Try the demo
                  </a>
                </div>

                <div className="faint text-xs tracking-[0.16em] uppercase">
                  Guided revision for UK GP trainees
                </div>
                <h1
                  className="mt-3 text-[60px] leading-[1.03]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.035em",
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
                  className="mt-4 text-[16px] leading-[1.65]"
                  style={{ color: "rgba(232,236,255,.78)", textShadow: "0 14px 40px rgba(0,0,0,.6)" }}
                >
                  Scroll to move the phone into place. Next: a scroll‑scrubbed walkthrough of the app.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a className="btn-primary" href={DEMO_URL}>
                    Just revise
                  </a>
                  <a className="btn-secondary" href={DEMO_URL}>
                    Try the 5‑question demo
                  </a>
                </div>

                <div className="mt-5 text-sm" style={{ color: "rgba(232,236,255,.62)" }}>
                  No signup. Under 90 seconds. Most people get 1/5.
                </div>
              </div>
            </div>
          </div>

          {/* Mobile overlay: collapsible bottom sheet so the phone stays visible */}
          <div className="md:hidden">
            <HeroOverlay demoUrl={DEMO_URL} />
          </div>
        </HeroFrames>
      </section>

      {/* (Next section will be the scroll‑scrubbed app walkthrough.) */}
    </main>
  );
}
