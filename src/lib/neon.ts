import { neon } from "@neondatabase/serverless";

export function getNeonQuery() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing DATABASE_URL for Neon");
  }
  return neon(url);
}
