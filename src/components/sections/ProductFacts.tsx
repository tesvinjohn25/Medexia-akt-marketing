import {
  CANONICAL_POSITIONING,
  alwaysFreeItems,
  paidAfterJulyItems,
  productFacts,
} from "@/data/product-positioning";

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="mt-[3px] shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ProductFacts() {
  return (
    <section className="section-padding pt-8 md:pt-10">
      <div className="container-x">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,.94fr)_minmax(0,1.06fr)]">
          <article
            className="rounded-[20px] p-5 md:p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,25,24,.78), rgba(14,17,23,.64))",
              border: "1px solid rgba(52,211,153,.18)",
              boxShadow: "0 22px 72px rgba(0,0,0,.22)",
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "rgba(52,211,153,.86)" }}
            >
              Practice layer
            </p>
            <h2
              className="mt-2 text-[24px] leading-[1.12] md:text-[32px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
              }}
            >
              What stays free?
            </h2>
            <p
              className="mt-3 text-[14px] leading-[1.65] md:text-[15px]"
              style={{ color: "rgba(232,236,255,.72)" }}
            >
              AKT Navigator is not a short free trial question bank. The
              practice layer stays free; full audio is the upgrade.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div
                className="rounded-[16px] p-4"
                style={{
                  background: "rgba(52,211,153,.065)",
                  border: "1px solid rgba(52,211,153,.16)",
                }}
              >
                <h3
                  className="text-[13px] font-semibold"
                  style={{ color: "var(--fg-high)" }}
                >
                  Always free
                </h3>
                <ul
                  className="mt-3 space-y-2 text-[13px] leading-[1.55]"
                  style={{ color: "rgba(232,236,255,.72)" }}
                >
                  {alwaysFreeItems.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span style={{ color: "rgba(52,211,153,.9)" }}>
                        <CheckIcon />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-[16px] p-4"
                style={{
                  background: "rgba(167,139,250,.06)",
                  border: "1px solid rgba(167,139,250,.16)",
                }}
              >
                <h3
                  className="text-[13px] font-semibold"
                  style={{ color: "var(--fg-high)" }}
                >
                  Paid after 8 July
                </h3>
                <ul
                  className="mt-3 space-y-2 text-[13px] leading-[1.55]"
                  style={{ color: "rgba(232,236,255,.72)" }}
                >
                  {paidAfterJulyItems.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span style={{ color: "rgba(167,139,250,.95)" }}>
                        <CheckIcon />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <article
            className="rounded-[20px] p-5 md:p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,19,26,.86), rgba(17,19,26,.62))",
              border: "1px solid rgba(255,255,255,.08)",
              boxShadow: "0 22px 72px rgba(0,0,0,.22)",
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "rgba(167,139,250,.88)" }}
            >
              Product facts
            </p>
            <h2
              className="mt-2 text-[24px] leading-[1.12] md:text-[32px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
              }}
            >
              AKT Navigator at a glance
            </h2>
            <p
              className="mt-3 text-[14px] leading-[1.65] md:text-[15px]"
              style={{ color: "rgba(232,236,255,.72)" }}
            >
              {CANONICAL_POSITIONING}
            </p>

            <dl className="mt-5 grid gap-3">
              {productFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-1 rounded-[14px] px-3 py-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4"
                  style={{
                    background: "rgba(255,255,255,.035)",
                    border: "1px solid rgba(255,255,255,.07)",
                  }}
                >
                  <dt
                    className="text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: "rgba(232,236,255,.42)" }}
                  >
                    {fact.label}
                  </dt>
                  <dd
                    className="text-[13px] leading-[1.55]"
                    style={{ color: "rgba(232,236,255,.74)" }}
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href="/best-akt-revision-tool"
              className="mt-5 inline-flex items-center justify-center rounded-[14px] px-4 py-3 text-[13px] font-semibold transition-colors hover:bg-white/[.08]"
              style={{
                color: "var(--fg-high)",
                background: "rgba(255,255,255,.045)",
                border: "1px solid rgba(255,255,255,.10)",
              }}
            >
              Compare AKT revision tools &rarr;
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
