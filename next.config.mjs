/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Marketing pixels (incl. Reddit) load only when this is "true" AND the
    // visitor has granted marketing consent. A Vercel/host env var of the same
    // name takes precedence over these committed defaults.
    NEXT_PUBLIC_ENABLE_MARKETING_PIXELS:
      process.env.NEXT_PUBLIC_ENABLE_MARKETING_PIXELS || "true",
    // Reddit Pixel ID for the marketing landing site. A Vercel/host env var of
    // the same name takes precedence; this committed default guarantees the id
    // is present in the build when the host env var is not set.
    NEXT_PUBLIC_REDDIT_PIXEL_ID:
      process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID || "a2_jblgfmfklr4a",
  },
};

export default nextConfig;
