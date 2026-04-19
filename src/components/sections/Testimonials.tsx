import {
  ANNA_AUDIO_QUOTE,
  getPublicTestimonials,
} from "@/lib/testimonials";
import { TestimonialsView } from "./TestimonialsView";

export async function Testimonials() {
  const all = await getPublicTestimonials();

  const annaIds = new Set(
    all.filter((t) => t.quote.trim() === ANNA_AUDIO_QUOTE).map((t) => t.id),
  );
  const filtered = all.filter((t) => !annaIds.has(t.id));

  if (filtered.length < 2) return null;

  return (
    <TestimonialsView hero={filtered[0]} supporting={filtered.slice(1, 3)} />
  );
}
