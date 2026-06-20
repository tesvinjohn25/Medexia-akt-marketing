import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Gynae Revision: HRT and Contraception",
  description:
    "MRCGP AKT women's health revision: contraception, HRT, menopause, abnormal bleeding, breast lumps, PCOS, endometriosis and cancer red flags.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-womens-health",
  },
  openGraph: {
    title: "MRCGP AKT Gynae Revision: HRT and Contraception",
    description:
      "A focused AKT women's health guide covering contraception, HRT, menopause, abnormal bleeding, breast symptoms and cancer red flags.",
    type: "article",
    url: "https://medexia-akt.com/akt-womens-health",
  },
};

const coreAreas = [
  {
    title: "Contraception and UKMEC",
    text: "Revise LARC effectiveness, combined-pill contraindications, migraine with aura, smoking over 35, hypertension, BMI, drug interactions and emergency contraception.",
  },
  {
    title: "Menopause and HRT",
    text: "Know clinical diagnosis, vasomotor symptoms, urogenital symptoms, HRT options, progesterone need with a uterus, bleeding on HRT and contraception overlap.",
  },
  {
    title: "Abnormal bleeding",
    text: "Separate heavy menstrual bleeding, intermenstrual bleeding, post-coital bleeding and postmenopausal bleeding. The key AKT skill is knowing when to investigate or refer.",
  },
  {
    title: "Breast symptoms",
    text: "Revise breast lumps, nipple change, skin change, mastalgia, mastitis, gynaecomastia and when suspected-cancer referral is needed.",
  },
  {
    title: "PCOS and endometriosis",
    text: "Cover cycle disturbance, hyperandrogenism, subfertility, metabolic risk, cyclical pelvic pain, dyspareunia and empirical primary-care management.",
  },
  {
    title: "Ovarian and endometrial cancer signals",
    text: "Pay attention to persistent bloating, early satiety, pelvic mass, new IBS-type symptoms over 50, postmenopausal bleeding and unexplained weight loss.",
  },
];

const redFlags = [
  "Postmenopausal bleeding",
  "Persistent intermenstrual or post-coital bleeding",
  "Unexplained breast lump, nipple change or skin tethering",
  "Persistent abdominal distension, bloating, early satiety or pelvic mass",
  "New IBS-type symptoms in a woman over 50",
  "Severe pelvic pain, fever, pregnancy possibility or haemodynamic concern",
];

const faqs = [
  {
    question: "Is women's health tested in the MRCGP AKT?",
    answer:
      "Yes. Women's health appears through gynaecology, breast health, maternity and reproductive health. Common AKT areas include contraception, menopause, HRT, abnormal bleeding, breast symptoms, PCOS, endometriosis and cancer recognition.",
  },
  {
    question: "What women's health topics should I revise for the AKT?",
    answer:
      "Prioritise contraception and UKMEC, emergency contraception, menopause and HRT, abnormal uterine bleeding, postmenopausal bleeding, breast lumps, cervical screening, PCOS, endometriosis and ovarian or endometrial cancer red flags.",
  },
  {
    question: "How does HRT come up in AKT questions?",
    answer:
      "HRT questions often test menopause diagnosis, benefits and risks, whether progesterone is needed, bleeding while taking HRT, contraception overlap and when symptoms or bleeding need investigation.",
  },
  {
    question: "What contraception facts are high yield for the AKT?",
    answer:
      "Know LARC duration and effectiveness, copper IUD emergency contraception, levonorgestrel and ulipristal windows, combined-pill contraindications and UKMEC risk categories.",
  },
];

export default function AktWomensHealthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Gynae Revision: HRT and Contraception",
        description:
          "A focused MRCGP AKT women's health guide for contraception, HRT, menopause, abnormal bleeding, breast symptoms, PCOS, endometriosis and cancer red flags.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-06-20",
        dateModified: "2026-06-20",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://medexia-akt.com/" },
          {
            name: "AKT Women's Health",
            url: "https://medexia-akt.com/akt-womens-health",
          },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[860px]">
          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            MRCGP AKT women&apos;s health revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Women&apos;s health questions often test practical GP decisions:
            whether contraception is safe, whether bleeding needs
            investigation, when HRT is appropriate, and which breast or pelvic
            symptoms need suspected-cancer referral.
          </p>

          <div
            className="mt-6 rounded-xl p-4"
            style={{
              background: "rgba(52,211,153,.06)",
              border: "1px solid rgba(52,211,153,.18)",
            }}
          >
            <h2
              className="text-[18px] font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quick answer
            </h2>
            <p
              className="mt-2 text-[14px] leading-[1.65]"
              style={{ color: "var(--fg-mid)" }}
            >
              For AKT women&apos;s health, prioritise contraception and UKMEC,
              emergency contraception, menopause and HRT, abnormal bleeding,
              postmenopausal bleeding, breast lumps, PCOS, endometriosis,
              cervical screening and ovarian or endometrial cancer red flags.
            </p>
          </div>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              What to revise first
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {coreAreas.map((area) => (
                <article
                  key={area.title}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[16px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {area.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {area.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Red flags to recognise quickly
            </h2>
            <ul
              className="mt-4 grid gap-3 sm:grid-cols-2"
              style={{ color: "var(--fg-mid)" }}
            >
              {redFlags.map((flag) => (
                <li
                  key={flag}
                  className="rounded-xl p-4 text-[14px] leading-[1.55]"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {flag}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Why this area catches candidates out
            </h2>
            <div
              className="mt-4 rounded-xl p-4"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-[15px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                The stem often gives age, bleeding pattern, contraception,
                pregnancy possibility or breast symptoms for a reason. Before
                choosing treatment, decide whether the scenario is safe for
                primary-care management or needs investigation, urgent referral
                or safety-netting.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT women&apos;s health FAQ
            </h2>
            <div className="mt-4 grid gap-3">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.65]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="mt-10 rounded-xl p-4"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-[18px] font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Official sources
            </h2>
            <div
              className="mt-3 grid gap-2 text-[14px]"
              style={{ color: "var(--fg-mid)" }}
            >
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/gynaecology-and-breast-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP gynaecology and breast health topic guide
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/maternity-and-reproductive-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP maternity and reproductive health topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng23"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE menopause guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng12"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE suspected cancer recognition and referral
              </a>
              <a
                href="https://cks.nice.org.uk/topics/contraception-assessment/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS contraception assessment
              </a>
              <a
                href="https://cks.nice.org.uk/topics/menopause/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS menopause
              </a>
              <a
                href="https://bnf.nice.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                BNF
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary text-center text-[16px]" href="/topics/gynaecology-breast">
              Open gynae and breast topic &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/topics/maternity-reproductive-health">
              Open reproductive health topic
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE CKS and BNF guidance for clinical decisions. Last
            reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
