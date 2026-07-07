// Re-export the application schema so API routes share one source of truth.
// This avoids duplicating the Drizzle table definitions between client and server.
export * from '../../src/db/schema.js';
