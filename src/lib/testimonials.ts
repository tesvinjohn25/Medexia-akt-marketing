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

export async function getPublicTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(ENDPOINT, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { testimonials?: unknown };
    const items = Array.isArray(data?.testimonials)
      ? (data.testimonials as Testimonial[])
      : [];
    return items.slice().sort((a, b) => {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch {
    return [];
  }
}
