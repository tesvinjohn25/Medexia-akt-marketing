// Twitter uses its own og-style image. Next.js file-based convention:
// a `twitter-image.tsx` adjacent to `opengraph-image.tsx` at the app root
// wires the generated image to the `twitter:image` meta tag.
// We share the same composition as OpenGraph — re-export everything.
export {
  default,
  alt,
  size,
  contentType,
  runtime,
} from "./opengraph-image";
