import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

// SECURITY: the Neon connection string lives ONLY on the server (process.env.DATABASE_URL).
// It is never exposed to the client. Throws if missing so misconfiguration fails loudly.
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not configured on the server. Add it in the Vercel project settings.');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
export { schema };
