import Image from "next/image";
import { ExamCountdown } from "./ExamCountdown";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Cosmic nebula background */}
      <div className="hero-nebula" aria-hidden />
      <div className="hero-stars" aria-hidden />
      <div className="hero-noise" />

      <div className="relative z-[1] container-x pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* Text — first on mobile (top) and desktop (left) */}
          <div className="md:flex-1 max-w-[580px]">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <div
                className="inline-flex items-center rounded-md px-2 py-[3px]"
                style={{
                  background: "rgba(96,165,250,.08)",
                  border: "1px solid rgba(96,165,250,.18)",
                }}
              >
                <span
                  className="text-[10px] tracking-[0.2em] uppercase font-bold"
                  style={{ color: "rgba(96,165,250,.9)" }}
                >
                  MRCGP AKT
                </span>
              </div>
              <span
                className="text-[10px] tracking-[0.06em] font-medium"
                style={{ color: "rgba(232,236,255,.35)" }}
              >
                &middot;
              </span>
              <span
                className="inline-flex items-center rounded-md px-2 py-[3px]"
                style={{
                  background: "rgba(52,211,153,.08)",
                  border: "1px solid rgba(52,211,153,.18)",
                }}
              >
                <span
                  className="text-[10px] tracking-[0.14em] uppercase font-bold"
                  style={{ color: "rgba(52,211,153,.85)" }}
                >
                  Free for April &amp; July
                </span>
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mt-4 text-[32px] md:text-[42px] lg:text-[48px] leading-[1.06]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              The AKT revision tool that fits into a GP trainee&rsquo;s life.
            </h1>

            {/* Subtext */}
            <p
              className="mt-4 text-[15px] md:text-[17px] leading-[1.55] max-w-[480px]"
              style={{ color: "rgba(232,236,255,.72)" }}
            >
              90+ hours of audiobooks covering the whole RCGP curriculum. An
              algorithm that drags you to pass level by targeting your weak
              spots. No notes. No wasted minutes.
            </p>

            {/* Countdown */}
            <div className="mt-5 max-w-[340px]">
              <ExamCountdown variant="hero" />
            </div>

            {/* CTA */}
            <div className="mt-6">
              <a
                data-hero-cta
                className="btn-primary inline-block text-[16px]"
                href="https://app.medexia-akt.com"
              >
                Start revising free &rarr;
              </a>
            </div>
          </div>

          {/* Phone — below text on mobile, right on desktop */}
          <div className="md:flex-1 flex justify-center mt-8 md:mt-0">
            <div className="relative w-full max-w-[220px] md:max-w-[300px] lg:max-w-[320px]">
              {/* Aura glow */}
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(236,72,153,.22) 0%, rgba(167,139,250,.12) 35%, transparent 70%)",
                  filter: "blur(24px)",
                  transform: "scale(1.35)",
                }}
              />
              <div
                className="relative overflow-hidden rounded-[28px]"
                style={{
                  boxShadow:
                    "0 28px 100px rgba(236,72,153,.34), 0 0 120px rgba(167,139,250,.14)",
                }}
              >
                <Image
                  src="/appshots/02-audio-1206x2622.png"
                  alt="AKT Navigator audio library — 90+ hours of MRCGP revision, Must Listen Before Your Exam, topic progress tracking"
                  width={1206}
                  height={2622}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
