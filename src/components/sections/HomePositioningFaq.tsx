import { homePositioningFaqs } from "@/data/product-positioning";

export function HomePositioningFaq() {
  return (
    <section className="section-padding pt-8 md:pt-10">
      <div className="container-x">
        <div className="mx-auto max-w-[780px] text-center">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "rgba(167,139,250,.85)" }}
          >
            Clear answers
          </p>
          <h2
            className="mt-3 text-[26px] leading-[1.1] md:text-[38px]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.035em",
            }}
          >
            Audio-first does not mean audio-only.
          </h2>
        </div>

        <div className="mx-auto mt-7 grid max-w-[900px] gap-3 md:grid-cols-2">
          {homePositioningFaqs.map((faq) => (
            <section
              key={faq.question}
              className="rounded-[18px] p-4 md:p-5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,19,26,.82), rgba(17,19,26,.58))",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <h3
                className="text-[15px] font-semibold leading-[1.35] md:text-[16px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {faq.question}
              </h3>
              <p
                className="mt-2 text-[13px] leading-[1.65] md:text-[14px]"
                style={{ color: "rgba(232,236,255,.66)" }}
              >
                {faq.answer}
              </p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
