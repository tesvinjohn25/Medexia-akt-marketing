import Image from "next/image";

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
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <div className="container-x relative py-12 md:py-16">
          <header className="flex items-center justify-between">
            <Logo />
            <a
              className="btn-secondary text-sm"
              href="#how"
              style={{ padding: "10px 12px" }}
            >
              See how it works
            </a>
          </header>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <div className="faint text-xs tracking-[0.16em] uppercase">
                Guided revision for UK GP trainees
              </div>
              <h1
                className="mt-3 text-[40px] leading-[1.04] md:text-[56px]"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                The AKT covers everything.
                <br />
                <span style={{ color: "var(--brand-violet-light)" }}>
                  Medexia covers what matters.
                </span>
              </h1>
              <p className="muted mt-4 text-[16px] leading-[1.65] max-w-[58ch]">
                Don’t read about the idea. Experience the engine: a brutal 5‑question demo that
                reveals the explanation style that actually sticks.
              </p>

              <div className="mt-7 flex gap-3">
                <a className="btn-primary" href={DEMO_URL}>
                  Just revise
                </a>
                <a className="btn-secondary" href={DEMO_URL}>
                  Try the 5‑question demo
                </a>
              </div>

              <div className="mt-5 faint text-sm">
                No signup. Under 90 seconds. Most people get 1/5.
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="card p-4 md:p-5">
                <div className="text-sm font-semibold">The “wow” moment</div>
                <div className="muted mt-1 text-sm">
                  The explanation reveal: why correct is correct, why every distractor is wrong, and the
                  one thing you’ll remember on exam day.
                </div>

                <div className="mt-4 grid gap-3">
                  {[
                    { title: "Understanding the Question", accent: "rgba(155,107,255,.95)" },
                    { title: "Key points to take away for your AKT exam", accent: "rgba(155,107,255,.95)" },
                    { title: "Why the other options are wrong", accent: "rgba(155,107,255,.95)" },
                    { title: "Check your understanding", accent: "rgba(245,158,11,.9)" },
                  ].map((row) => (
                    <div
                      key={row.title}
                      className="rounded-2xl border px-4 py-4"
                      style={{
                        background: "rgba(255,255,255,.03)",
                        borderColor: "rgba(255,255,255,.10)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="text-sm font-semibold"
                          style={{ color: row.accent, letterSpacing: "-0.01em" }}
                        >
                          {row.title}
                        </div>
                        <div className="faint text-xs">▾</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs faint">
                  Clinical content is reviewed before it ships.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="container-x py-14 md:py-18">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              k: "01",
              h: "Try 5 brutal questions",
              p: "No signup. Designed to trip common AKT misconceptions and guideline edges.",
            },
            {
              k: "02",
              h: "Get the explanation style",
              p: "Senior‑colleague logic, distractor teardown, and a learning point that sticks.",
            },
            {
              k: "03",
              h: "Then we earn the email",
              p: "Only after value: save progress, get your breakdown, and continue the plan.",
            },
          ].map((c) => (
            <div key={c.k} className="card p-5">
              <div className="faint text-xs tracking-[0.14em]">{c.k}</div>
              <div className="mt-2 text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>
                {c.h}
              </div>
              <p className="muted mt-2 text-sm leading-[1.7]">{c.p}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 card p-5 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-lg font-semibold">Ready to feel the difference?</div>
              <div className="muted text-sm">One CTA. One job. Under 90 seconds.</div>
            </div>
            <a className="btn-primary" href={DEMO_URL}>
              Just revise
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="container-x pb-10">
        <div className="faint text-xs">© {new Date().getFullYear()} Medexia • AKT Navigator</div>
      </footer>

      {/* FAQ Schema (starter) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is there a free demo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — the landing page links to a short demo session you can try without signing up.",
                },
              },
              {
                "@type": "Question",
                name: "Who is Medexia for?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "UK GP trainees preparing for the MRCGP AKT who want guided revision and explanations that actually teach.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
