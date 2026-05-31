export const ANNA_AUDIO_QUOTE =
  "Audiobooks have been the bulk of my revision. Really useful.";

export type Testimonial = {
  id: string;
  quote: string;
  trainingStage: string | null;
  deanery: string | null;
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
  return quote
    .replace(restrictedAudioPhrase, "Audio-first revision")
    .replace(/\brecommend\s+ot\b/gi, "recommend it");
}

function cleanPart(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function formatTestimonialAttribution(t: Testimonial) {
  let name = cleanPart(t.name);
  const trainingStage = cleanPart(t.trainingStage);
  const deanery = cleanPart(t.deanery);

  if (name && deanery) {
    const deanerySuffix = `, ${deanery}`;
    if (name.toLowerCase().endsWith(deanerySuffix.toLowerCase())) {
      name = name.slice(0, -deanerySuffix.length).trim();
    }
  }

  return [name, trainingStage, deanery].filter(Boolean).join(" · ");
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
