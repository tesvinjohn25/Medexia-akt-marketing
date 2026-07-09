import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata = {
  title: "Cookie Policy | Medexia AKT Navigator",
  description: "How Medexia AKT Navigator uses cookies, local storage, analytics, and marketing tags on the marketing site.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      <section className="container-x py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">
            Medexia AKT Navigator
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Cookie policy</h1>
          <p className="mt-5 text-base leading-7 text-white/68">
            This page explains how the marketing site uses cookies and similar
            browser storage. You can change optional choices at any time from
            Cookie settings in the footer.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-white/70">
            <section>
              <h2 className="text-xl font-semibold text-white">Strictly necessary</h2>
              <p className="mt-2">
                These are always on because the site needs them to operate and
                remember your cookie choices.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong>mx_consent_v1</strong>: stores your cookie and tracking choices for about 6 months. Provider: Medexia.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Functional</h2>
              <p className="mt-2">
                Optional. Used to remember non-essential preferences and preserve
                a referral-code journey across marketing-site pages where needed.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong>mx_referral</strong>: stores referral-code continuity for up to 90 days when functional storage is allowed. Provider: Medexia.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Analytics</h2>
              <p className="mt-2">
                Optional. Used for first-party landing events and source/campaign
                measurement so we can understand which pages help GP trainees.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong>mx_visitor_id</strong> and <strong>mx_session_id</strong>: anonymous site and session identifiers, up to 90 days for visitor ID and 12 hours for session ID.</li>
                <li><strong>mx_first_touch</strong>, <strong>mx_last_touch</strong>, and <strong>mx_offer_context</strong>: source, campaign, page, and offer context, up to 90 days.</li>
                <li><strong>Vercel Analytics</strong>: only rendered after analytics consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Marketing</h2>
              <p className="mt-2">
                Optional. Used only after marketing consent and only when the
                relevant environment variables are configured.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><strong>Meta Pixel</strong>: campaign measurement and retargeting. Provider: Meta.</li>
                <li><strong>Google tag, GA4, and Google Ads</strong>: ad measurement and retargeting. Provider: Google.</li>
                <li><strong>Reddit Pixel</strong>: campaign measurement and retargeting. Provider: Reddit.</li>
                <li><strong>gclid, gbraid, wbraid, fbclid, ttclid, msclkid, rdt_cid</strong>: ad click IDs handled only after marketing consent.</li>
              </ul>
              <p className="mt-3">
                Third-party providers control some cookie durations once their
                scripts are loaded. We do not send deanery, clinical learning
                data, question performance, or sensitive app data to ad platforms.
              </p>
            </section>
          </div>
        </div>
      </section>
      <MinimalFooter />
    </main>
  );
}
