// SECURITY: This client entry point deliberately does NOT connect to the database.
// All Neon access now happens server-side in /api. The DATABASE_URL is no longer
// read here, so it can never leak into the client bundle.
//
// The `db` export is kept as null for any legacy reference; real queries run in
// the serverless functions under /api which import from ./api/_lib/db.js.

export const db = null;
export const schema = {};
