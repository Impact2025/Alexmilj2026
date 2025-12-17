import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Get database URL from environment variable
const databaseUrl = import.meta.env.VITE_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is not set. Please add it to your .env.local file.\n' +
    'Get your connection string from: https://console.neon.tech'
  );
}

// Create Neon HTTP connection
const sql = neon(databaseUrl);

// Create Drizzle instance
export const db = drizzle(sql, { schema });

// Export schema for use in queries
export { schema };
