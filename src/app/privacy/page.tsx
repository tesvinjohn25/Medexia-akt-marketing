import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata = {
  title: "Privacy | Medexia AKT Navigator",
  description: "Privacy summary for the Medexia AKT Navigator marketing site.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      <section className="container-x py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Medexia AKT Navigator
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Privacy</h1>
          <div className="mt-6 space-y-6 text-sm leading-7 text-white/70">
            <p>
              This marketing site collects only the information needed to run
              the site, honour referral journeys, and, with your consent,
              understand which pages and campaigns lead to useful product
              journeys.
            </p>
            <p>
              Optional analytics and marketing tracking are off until you choose
              to enable them. You can withdraw consent at any time from Cookie
              settings in the footer.
            </p>
            <p>
              We do not send deanery, clinical learning data, question
              performance, learning weaknesses, or other sensitive app data to
              advertising platforms.
            </p>
            <p>
              For account, payment, and in-app privacy terms, the app privacy
              notice continues to apply after you sign in to AKT Navigator.
            </p>
          </div>
        </div>
      </section>
      <MinimalFooter />
    </main>
  );
}
