import {
  alwaysFreeItems,
  paidAfterJulyItems,
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
    <section className="section-padding py-8 md:py-10">
      <div className="container-x">
        <article
          className="rounded-[20px] px-4 py-5 md:px-6 md:py-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,25,24,.76), rgba(17,19,26,.68))",
            border: "1px solid rgba(52,211,153,.16)",
            boxShadow: "0 22px 72px rgba(0,0,0,.22)",
          }}
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "rgba(52,211,153,.86)" }}
              >
                Free practice, paid audio
              </p>
              <h2
                className="mt-2 text-[24px] leading-[1.12] md:text-[32px]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.03em",
                }}
              >
                Keep making progress before you pay.
              </h2>
              <p
                className="mt-3 max-w-[560px] text-[14px] leading-[1.6] md:text-[15px]"
                style={{ color: "rgba(232,236,255,.72)" }}
              >
                Before 8 July, the whole product is free to try. From 8 July
                onwards, questions, mocks, explanations and your first 2 hours
                of AKT audio stay free; full audio and premium resources are
                the upgrade.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                <a
                  href="/free-akt-questions"
                  className="inline-flex text-[13px] font-semibold transition-colors hover:text-white"
                  style={{ color: "rgba(52,211,153,.88)" }}
                >
                  Free AKT questions &rarr;
                </a>
                <a
                  href="/best-akt-revision-tool"
                  className="inline-flex text-[13px] font-semibold transition-colors hover:text-white"
                  style={{ color: "rgba(167,139,250,.94)" }}
                >
                  Compare AKT revision tools &rarr;
                </a>
                <a
                  href="/akt-explanation-builder"
                  className="inline-flex text-[13px] font-semibold transition-colors hover:text-white"
                  style={{ color: "rgba(96,165,250,.88)" }}
                >
                  Try the free explanation builder &rarr;
                </a>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
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
                  className="mt-3 grid gap-2 text-[13px] leading-[1.45]"
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
                  className="mt-3 grid gap-2 text-[13px] leading-[1.45]"
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
          </div>
        </article>
      </div>
    </section>
  );
}
