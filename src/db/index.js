import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Get database URL from environment variable
const databaseUrl = import.meta.env.VITE_DATABASE_URL || process.env.DATABASE_URL;

let db = null;

// Check if database URL is valid (not a placeholder)
const isValidUrl = databaseUrl &&
                   databaseUrl !== 'your_neon_connection_string_here' &&
                   databaseUrl.startsWith('postgres');

if (!isValidUrl) {
  console.warn(
    '⚠️ DATABASE_URL is not configured. Running in local-only mode.\n' +
    'To enable cloud sync, add your Neon connection string to .env.local\n' +
    'Get your connection string from: https://console.neon.tech'
  );
  db = null;
} else {
  try {
    // Create Neon HTTP connection
    const sql = neon(databaseUrl);
    // Create Drizzle instance
    db = drizzle(sql, { schema });
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    db = null;
  }
}

// Export db (will be null if not configured)
export { db, schema };
