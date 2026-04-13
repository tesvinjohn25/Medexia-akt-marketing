import { Pool } from "pg";

let _pool: Pool | null = null;

export function getNeonPool(): Pool {
  if (_pool) return _pool;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing DATABASE_URL for Neon");
  }

  _pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    max: 3,
  });

  return _pool;
}
