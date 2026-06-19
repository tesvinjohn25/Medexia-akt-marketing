"use client";

const RESOURCE_LINKS = [
  { href: "/demo", label: "Demo" },
  { href: "/topics", label: "Topics" },
  { href: "/how-to-pass-the-akt", label: "How to pass" },
  { href: "/akt-revision-plan", label: "Revision plan" },
  { href: "/akt-audio-revision", label: "Audio revision" },
  { href: "/akt-mock-exam", label: "Mock exams" },
  { href: "/best-akt-question-bank", label: "Question banks" },
  { href: "/akt-exam-dates", label: "Exam dates" },
  { href: "/akt-exam-format", label: "Exam format" },
  { href: "/akt-exam-day", label: "Exam day" },
  { href: "/akt-pass-rate", label: "Pass rate" },
  { href: "/akt-results-and-retakes", label: "Results" },
  { href: "/akt-feedback-reports", label: "Feedback reports" },
  { href: "/akt-statistics", label: "Statistics" },
  { href: "/akt-syllabus", label: "Syllabus" },
  { href: "/akt-exam-fee", label: "Fees" },
  { href: "/faq", label: "FAQ" },
];

const SOURCE_LINKS = [
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test",
    label: "RCGP AKT",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/clinical-topic-guides",
    label: "RCGP curriculum",
  },
  {
    href: "https://cks.nice.org.uk/",
    label: "NICE CKS",
  },
  {
    href: "https://bnf.nice.org.uk/",
    label: "BNF",
  },
];

export function MinimalFooter() {
  return (
    <footer
      className="border-t py-8"
      style={{ borderColor: "rgba(255,255,255,.06)" }}
    >
      <div className="container-x">
        {/* Resource links */}
        <nav
          aria-label="Site resources"
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] mb-6"
          style={{ color: "rgba(232,236,255,.55)" }}
        >
          {RESOURCE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white/80"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Independence disclaimer — exam-prep sites should be explicit
            that they are not the exam body. */}
        <p
          className="mx-auto mb-6 max-w-[640px] text-center text-[12px] leading-[1.6]"
          style={{ color: "rgba(232,236,255,.42)" }}
        >
          AKT Navigator is an independent revision resource from Medexia Ltd.
          It is not affiliated with, or endorsed by, the Royal College of
          General Practitioners. &ldquo;AKT&rdquo; and &ldquo;MRCGP&rdquo;
          refer to examinations administered by the RCGP.
        </p>

        <nav
          aria-label="Reference sources"
          className="mx-auto mb-6 flex max-w-[640px] flex-wrap justify-center gap-x-4 gap-y-2 text-[12px]"
          style={{ color: "rgba(232,236,255,.42)" }}
        >
          <span>Sources:</span>
          {SOURCE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Brand + legal row */}
        <div
          className="flex flex-col items-center gap-4 border-t pt-6 md:flex-row md:justify-between"
          style={{ borderColor: "rgba(255,255,255,.04)" }}
        >
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 overflow-hidden rounded-xl border"
              style={{ borderColor: "rgba(255,255,255,.08)" }}
            >
              <img
                src="/app-icon.png"
                alt="AKT Navigator"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>
            <span
              className="text-[14px] font-semibold"
              style={{ letterSpacing: "-0.01em" }}
            >
              AKT Navigator
            </span>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-5 text-[13px]" style={{ color: "rgba(232,236,255,.45)" }}>
            <a
              href="https://app.medexia-akt.com/privacy"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-white/70"
            >
              Privacy
            </a>
            <a
              href="https://app.medexia-akt.com/terms"
              target="_blank"
              rel="noopener"
              className="transition-colors hover:text-white/70"
            >
              Terms
            </a>
            <a
              href="mailto:support@medexia-akt.com"
              className="transition-colors hover:text-white/70"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div
            className="text-[12px]"
            style={{ color: "rgba(232,236,255,.35)" }}
          >
            &copy; 2026 Medexia Ltd.
          </div>
        </div>
      </div>
    </footer>
  );
}
