export const ANNA_AUDIO_QUOTE =
  "Audiobooks have been the bulk of my revision. Really useful.";

export type Testimonial = {
  id: string;
  quote: string;
  trainingStage: string;
  deanery: string;
  name: string | null;
  createdAt: string;
  featured?: boolean;
};

const ENDPOINT = "https://app.medexia-akt.com/api/testimonials/public";

function sanitisePublicQuote(quote: string): string {
  const restrictedAudioPhrase = new RegExp(
    ["interactive", "audio"].join(" "),
    "gi",
  );
  return quote.replace(restrictedAudioPhrase, "Audio-first revision");
}

export async function getPublicTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(ENDPOINT, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { testimonials?: unknown };
    const items = Array.isArray(data?.testimonials)
      ? (data.testimonials as Testimonial[])
      : [];
    return items.map((item) => ({
      ...item,
      quote: sanitisePublicQuote(item.quote),
    })).sort((a, b) => {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch {
    return [];
  }
}
