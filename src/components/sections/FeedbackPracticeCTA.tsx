import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";

export function FeedbackPracticeCTA() {
  return (
    <section className="section-padding">
      <div className="container-x max-w-[760px] text-center">
        <h2
          className="text-[28px] md:text-[36px] leading-[1.15]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Find your next revision priority
        </h2>
        <p
          className="mt-4 text-[16px] leading-[1.7]"
          style={{ color: "var(--fg-mid)" }}
        >
          Start with free questions, review what you missed, then try audio
          revision. Questions, mocks and explanations are free, with your first
          2 hours of audio included.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <TrackedAppLink className="btn-primary" href="/join/free" intent="start_free">
            Start free practice &rarr;
          </TrackedAppLink>
          <a className="btn-secondary" href="/free-akt-questions">
            Try sample questions
          </a>
        </div>
      </div>
    </section>
  );
}
