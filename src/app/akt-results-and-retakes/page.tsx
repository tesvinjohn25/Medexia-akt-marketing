import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Results, Feedback and Retakes",
  description:
    "MRCGP AKT results and retakes: when results are released, how to read your score report, what to do if you fail, appeals and attempt limits.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-results-and-retakes",
  },
  openGraph: {
    title: "MRCGP AKT Results, Feedback and Retakes",
    description:
      "A practical guide to AKT results, score reports, retakes, appeals and how to plan your next sitting after an unsuccessful attempt.",
    type: "article",
    url: "https://medexia-akt.com/akt-results-and-retakes",
  },
};

const steps = [
  {
    title: "Read the result, then the report",
    text: "Do not stop at pass or fail. Look at the score, the pass mark for that sitting and the domain feedback, then compare it with your revision history.",
  },
  {
    title: "Separate knowledge gaps from exam-process issues",
    text: "A near miss may be pacing, fatigue or confidence under time pressure. A larger gap usually needs deeper topic review before another attempt.",
  },
  {
    title: "Rebuild around weak areas",
    text: "Use the RCGP feedback report themes, your own score report and timed mocks to decide what gets the most revision time next.",
  },
  {
    title: "Check eligibility and attempts",
    text: "Attempt limits depend on when you entered GP training. If you are close to the limit, check the official RCGP rules and speak to your training team early.",
  },
];

const faqs = [
  {
    question: "When are MRCGP AKT results released?",
    answer:
      "RCGP publishes result dates for each AKT sitting on its key dates pages. For example, the October 2026 UK AKT sitting has a published result date of 25 November 2026 at 17:00.",
  },
  {
    question: "What should I do if I fail the AKT?",
    answer:
      "First read the official score report and compare your score with the pass mark. Then identify whether the problem was knowledge, statistics, pacing, fatigue or specific weak domains. Build a retake plan around those gaps rather than simply repeating the same revision.",
  },
  {
    question: "Can I appeal an AKT result?",
    answer:
      "The RCGP has an appeals process, but appeals are not a general re-marking route. Check the official RCGP appeals policy and deadlines before deciding what to do.",
  },
  {
    question: "How many times can you retake the AKT?",
    answer:
      "Attempt limits depend on when you entered GP specialty training. The RCGP states that trainees already in training on 1 August 2023 have four attempts, while trainees entering GP specialty training for the first time on or after 2 August 2023 have six attempts.",
  },
];

export default function AktResultsAndRetakesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Results, Feedback and Retakes",
        description:
          "Practical guidance for GP trainees on AKT results, score reports, retakes, appeals and attempt limits.",
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
            name: "MRCGP AKT Results and Retakes",
            url: "https://medexia-akt.com/akt-results-and-retakes",
          },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[820px]">
          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            MRCGP AKT results, feedback and retakes
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            AKT results are not just a pass or fail outcome. The useful part is
            understanding the score report, the pass mark for that sitting and
            what your next revision block should target if you need another
            attempt.
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
              AKT result dates are published by the RCGP for each sitting. If
              you are unsuccessful, use the score report, pass mark and official
              feedback report to rebuild your plan around weak areas, timed
              mocks and pacing. Check attempt limits and appeal deadlines on
              official RCGP pages before booking another sitting.
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
              How to read an AKT result
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Your score",
                  text: "Shows how far above or below the sitting pass mark you were.",
                },
                {
                  label: "Pass mark",
                  text: "Changes by sitting because papers differ in measured difficulty.",
                },
                {
                  label: "Feedback",
                  text: "Points toward the domains and behaviours that need the next revision block.",
                },
              ].map((item) => (
                <article
                  key={item.label}
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
                    {item.label}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.text}
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
              If you need to retake the AKT
            </h2>
            <div className="mt-4 grid gap-3">
              {steps.map((step) => (
                <article
                  key={step.title}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[16px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {step.text}
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
              Build the next attempt differently
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              A retake plan should be narrower and more honest than a first
              sitting plan. Start with the weakest domains from your result,
              then add the latest RCGP feedback-report themes: statistics and
              data interpretation,{" "}
              <a
                href="/akt-prescribing-and-medication-safety"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                prescribing and medication monitoring,
              </a>
              {" "}
              <a
                href="/akt-neurology"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                neurology,
              </a>
              {" "}
              <a
                href="/akt-confidentiality-safeguarding-data-protection"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                confidentiality, safeguarding and children.
              </a>
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If your weak areas include paediatrics, use the{" "}
              <a
                href="/akt-children-young-people"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT children and young people guide
              </a>{" "}
              to target acute illness, cancer red flags and safeguarding.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If evidence interpretation was weak, use the{" "}
              <a
                href="/akt-evidence-in-practice"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT evidence in practice guide
              </a>{" "}
              to revise critical appraisal, study design, bias, diagnostic
              tests, risk communication and applying guidance in GP.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If screening, immunisation or health-inequality questions were
              weak, use the{" "}
              <a
                href="/akt-population-planetary-health"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT population and planetary health guide
              </a>{" "}
              to revise prevention, wider determinants, greener prescribing and
              safe follow-up systems.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If clinical thresholds were the issue, use the{" "}
              <a
                href="/akt-cardiovascular"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT cardiovascular guide
              </a>{" "}
              to revise hypertension, AF anticoagulation, heart failure and
              chest-pain red flags.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If respiratory questions were weak, use the{" "}
              <a
                href="/akt-respiratory"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT respiratory guide
              </a>{" "}
              to revise asthma, COPD, inhaler technique, spirometry and lung
              cancer red flags.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If diabetes or endocrine questions were weak, use the{" "}
              <a
                href="/akt-diabetes-endocrinology"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT diabetes and endocrinology guide
              </a>{" "}
              to revise diabetes medicines, thyroid function tests, sick-day
              rules and adrenal red flags.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If renal or urology questions were weak, use the{" "}
              <a
                href="/akt-renal-urology"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT renal and urology guide
              </a>{" "}
              to revise CKD, AKI, medication safety, UTI, haematuria, PSA and
              renal stones.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If musculoskeletal questions were weak, use the{" "}
              <a
                href="/akt-musculoskeletal"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT musculoskeletal guide
              </a>{" "}
              to revise back pain red flags, arthritis, osteoporosis, gout and
              urgent referral.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If gastroenterology questions were weak, use the{" "}
              <a
                href="/akt-gastroenterology"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT gastroenterology guide
              </a>{" "}
              to revise IBS, IBD, coeliac testing, dyspepsia, liver disease and
              GI cancer red flags.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If ENT questions were weak, use the{" "}
              <a
                href="/akt-ent-speech-hearing"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT ENT guide
              </a>{" "}
              to revise otitis media, sore throat, sinusitis, hearing loss,
              vertigo, epistaxis and head and neck cancer red flags.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If eyes and vision questions were weak, use the{" "}
              <a
                href="/akt-eyes-vision"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT eyes and vision guide
              </a>{" "}
              to revise red eye, sudden visual loss, flashes and floaters,
              diplopia, glaucoma, cataracts, AMD and diabetic eye disease.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If haematology questions were weak, use the{" "}
              <a
                href="/akt-haematology"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT haematology guide
              </a>{" "}
              to revise anaemia, iron deficiency, B12 and folate, VTE,
              anticoagulation, abnormal FBCs and haematological cancer red
              flags.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If allergy or immunology questions were weak, use the{" "}
              <a
                href="/akt-allergy-immunology"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT allergy and immunology guide
              </a>{" "}
              to revise anaphylaxis, adrenaline, food allergy, drug allergy,
              urticaria, angioedema and immunodeficiency red flags.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If infectious diseases or travel health questions were weak, use
              the{" "}
              <a
                href="/akt-infectious-diseases-travel"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT infectious diseases and travel health guide
              </a>{" "}
              to revise HIV testing, hepatitis, immunisation, malaria,
              returning traveller fever and antimicrobial stewardship.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If maternity or reproductive health questions were weak, use the{" "}
              <a
                href="/akt-maternity-reproductive-health"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT maternity and reproductive health guide
              </a>{" "}
              to revise antenatal care, early pregnancy bleeding,
              pre-eclampsia, gestational diabetes, postnatal care and
              contraception after pregnancy.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If sexual-health questions were weak, use the{" "}
              <a
                href="/akt-sexual-health"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT sexual health guide
              </a>{" "}
              to revise STI testing, chlamydia, gonorrhoea, genital herpes,
              HIV testing, partner notification, consent and safeguarding.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If older-adult scenarios were weak, use the{" "}
              <a
                href="/akt-older-adults"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT older adults guide
              </a>{" "}
              to revise frailty, falls, dementia, delirium, polypharmacy,
              multimorbidity, care homes and mental capacity.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If long-term conditions or cancer recognition were weak, use the{" "}
              <a
                href="/akt-long-term-conditions-cancer"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT long-term conditions and cancer guide
              </a>{" "}
              to revise multimorbidity, treatment burden, chronic disease
              reviews, cancer red flags, safety-netting and suspected-cancer
              referral decisions.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If palliative or end-of-life care was weak, use the{" "}
              <a
                href="/akt-end-of-life"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT end of life guide
              </a>{" "}
              to revise DNACPR, capacity, anticipatory medicines, symptom
              control, last-days care and communication with families.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If learning disability or accessible care was weak, use the{" "}
              <a
                href="/akt-learning-disability"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT learning disability guide
              </a>{" "}
              to revise annual health checks, reasonable adjustments,
              diagnostic overshadowing, capacity, safeguarding and medication
              review.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If ADHD, autism or neurodiversity pathways were weak, use the{" "}
              <a
                href="/akt-neurodevelopmental-neurodiversity"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT neurodiversity guide
              </a>{" "}
              to revise recognition, referral, medication monitoring,
              reasonable adjustments and mental health overlap.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If timing and triage were the issue, use the{" "}
              <a
                href="/akt-minor-illness-urgent-care"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT minor illness and urgent care guide
              </a>{" "}
              to practise sepsis, delayed antibiotics and safety-netting
              decisions.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If emergency escalation or OOH triage was weak, use the{" "}
              <a
                href="/akt-urgent-unscheduled-care"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT urgent and unscheduled care guide
              </a>{" "}
              to revise sepsis, NEWS2, acute deterioration, anaphylaxis,
              acute abdomen, chest pain and explicit safety-netting.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If smoking, alcohol or substance misuse was weak, use the{" "}
              <a
                href="/akt-smoking-alcohol-substance-misuse"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT smoking, alcohol and substance misuse guide
              </a>{" "}
              to revise smoking cessation, AUDIT, alcohol withdrawal risk,
              opioid substitution, harm reduction and safeguarding.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If your mistakes were around risk, prescribing or legal
              frameworks, use the{" "}
              <a
                href="/akt-mental-health"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT mental health guide
              </a>{" "}
              to revise depression, suicide risk, SSRIs and Mental Health Act
              basics.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If women&apos;s health was weak, use the{" "}
              <a
                href="/akt-womens-health"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT women&apos;s health guide
              </a>{" "}
              to revise contraception, HRT, abnormal bleeding, breast symptoms
              and cancer red flags.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Use full timed mocks to check whether the problem is knowledge,
              pacing or stamina. Use audio revision for low-energy time, but
              keep the hard work centred on questions, explanations and mistake
              review.
            </p>
          </section>

          <section className="mt-10">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT results and retakes FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-marking-results"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT marking and results
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/exam-applications/appeals"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP appeals policy
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/all-mrcgp-regulations"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP exam regulations
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/further-help-support"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT feedback reports
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/mrcgp-exam-applications"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP exam applications
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary text-center text-[16px]" href="/akt-revision-plan">
              Build a retake plan &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/akt-mock-exam">
              Practise timed mocks
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check the RCGP
            for result, appeal, booking and eligibility rules. Last reviewed
            June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
