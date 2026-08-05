import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  buildReferralShareUrl,
  REFERRAL_OG_DESCRIPTION,
  REFERRAL_OG_IMAGE_URL,
  REFERRAL_OG_TITLE,
} from "@/lib/marketing/referral-og";
import Home from "../page";

type InvitePageProps = {
  searchParams: Promise<{ ref?: string | string[] }>;
};

async function referralCodeFrom({
  searchParams,
}: InvitePageProps): Promise<string> {
  const params = await searchParams;
  const rawRef = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  return rawRef || "";
}

export async function generateMetadata({
  searchParams,
}: InvitePageProps): Promise<Metadata> {
  const referralCode = await referralCodeFrom({ searchParams });
  if (!referralCode) {
    return {
      alternates: { canonical: "https://medexia-akt.com" },
      robots: { index: false, follow: false },
    };
  }
  const referralUrl = buildReferralShareUrl(referralCode);

  return {
    title: { absolute: REFERRAL_OG_TITLE },
    description: REFERRAL_OG_DESCRIPTION,
    alternates: {
      canonical: "https://medexia-akt.com",
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: REFERRAL_OG_TITLE,
      description: REFERRAL_OG_DESCRIPTION,
      type: "website",
      url: referralUrl,
      siteName: "AKT Navigator by Medexia",
      images: [
        {
          url: REFERRAL_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: "AKT Navigator colleague referral — £10 off Full Audio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: REFERRAL_OG_TITLE,
      description: REFERRAL_OG_DESCRIPTION,
      images: [REFERRAL_OG_IMAGE_URL],
    },
  };
}

// Middleware rewrites /?ref=CODE here without changing the visible URL. Reuse
// the exact homepage so referral visitors and ordinary visitors see the same
// landing experience; only crawler metadata differs.
export default async function InvitePage(props: InvitePageProps) {
  const referralCode = await referralCodeFrom(props);
  if (!referralCode) redirect("/");
  return <Home />;
}
