import {
  getPublicResultProof,
  type ResultProof,
  type ResultProofSummary,
} from "@/lib/resultProof";

const SERIF = 'Georgia, "Times New Roman", Times, serif';

function formatListening(minutes?: number) {
  if (!minutes || minutes < 60) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

function resultMetric(summary: ResultProofSummary, responses: ResultProof[]) {
  if (
    typeof summary.totalResponses === "number" &&
    typeof summary.passedResponses === "number" &&
    summary.totalResponses > 0
  ) {
    return {
      value: `${summary.passedResponses}/${summary.totalResponses}`,
      label: "reported passing",
    };
  }

  const passedPublic = responses.filter((item) => item.passed).length;
  return {
    value: String(passedPublic),
    label: passedPublic === 1 ? "public passed result" : "public passed results",
  };
}

function helpedMetric(summary: ResultProofSummary, responses: ResultProof[]) {
  if (
    typeof summary.totalResponses === "number" &&
    typeof summary.helpedResponses === "number" &&
    summary.totalResponses > 0
  ) {
    return {
      value: `${summary.helpedResponses}/${summary.totalResponses}`,
      label: "said AKT Navigator helped",
    };
  }

  const helpedPublic = responses.filter((item) => item.helped).length;
  return {
    value: String(helpedPublic),
    label: helpedPublic === 1 ? "said it helped" : "said it helped",
  };
}

export async function ResultProofSection() {
  const data = await getPublicResultProof();
  const hero = data.responses[0];
  if (!hero) return null;

  const passMetric = resultMetric(data.summary, data.responses);
  const helped = helpedMetric(data.summary, data.responses);
  const listening = formatListening(hero.listeningMinutes);

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-6 h-[420px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side at 50% 20%, rgba(52,211,153,.12), transparent 72%)",
          filter: "blur(22px)",
        }}
      />

      <div className="container-x relative">
        <div
          className="mx-auto max-w-[1020px] overflow-hidden rounded-[22px] p-5 md:p-8"
          style={{
            background:
              "linear-gradient(150deg, rgba(17,27,25,.86), rgba(17,19,26,.82) 42%, rgba(19,14,31,.72))",
            border: "1px solid rgba(52,211,153,.18)",
            boxShadow: "0 34px 110px rgba(0,0,0,.28)",
          }}
        >
          <div className="grid gap-7 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <div
                className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: "rgba(52,211,153,.86)" }}
              >
                April result proof
              </div>
              <h2
                className="mt-3 text-[26px] md:text-[38px] leading-[1.08] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.03em",
                }}
              >
                April sitters are now telling us what helped.
              </h2>
              <p
                className="mt-4 text-[14px] md:text-[16px] leading-[1.65]"
                style={{ color: "rgba(232,236,255,.66)" }}
              >
                These are result-response reviews collected after April AKT
                results, shown only when the user gives public consent.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[passMetric, helped].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[16px] p-4"
                    style={{
                      background: "rgba(255,255,255,.045)",
                      border: "1px solid rgba(255,255,255,.08)",
                    }}
                  >
                    <div
                      className="text-[28px] md:text-[34px] font-bold leading-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "rgba(52,211,153,.92)",
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      className="mt-2 text-[10px] md:text-[11px] tracking-[0.14em] uppercase font-semibold"
                      style={{ color: "rgba(232,236,255,.54)" }}
                    >
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <figure
              className="rounded-[18px] p-5 md:p-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,12,18,.72), rgba(10,12,18,.48))",
                border: "1px solid rgba(255,255,255,.10)",
              }}
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {[
                  "Passed",
                  hero.helped ? "Helped: yes" : null,
                  "Public consent",
                  listening ? `${listening} listening` : null,
                ]
                  .filter((item): item is string => Boolean(item))
                  .map((item) => (
                    <span
                      key={item}
                      className="rounded-full px-3 py-1 text-[11px] font-semibold"
                      style={{
                        color: item === "Passed" ? "rgba(52,211,153,.95)" : "rgba(232,236,255,.72)",
                        background:
                          item === "Passed"
                            ? "rgba(52,211,153,.12)"
                            : "rgba(255,255,255,.055)",
                        border:
                          item === "Passed"
                            ? "1px solid rgba(52,211,153,.22)"
                            : "1px solid rgba(255,255,255,.08)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
              </div>

              <blockquote
                className="italic text-[18px] md:text-[22px] leading-[1.45]"
                style={{
                  fontFamily: SERIF,
                  color: "rgba(245,247,255,.9)",
                }}
              >
                &ldquo;{hero.quote}&rdquo;
              </blockquote>
              <figcaption
                className="mt-5 text-[11px] tracking-[0.18em] uppercase font-semibold"
                style={{ color: "rgba(52,211,153,.78)" }}
              >
                {hero.credit}
                {hero.deanery ? ` · ${hero.deanery}` : ""} · {data.summary.examLabel}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
