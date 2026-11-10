# Feedback Portal

Next.js (App Router) feedback app. Server Actions handle create / edit / delete.
Validation runs on client (`onSubmit`) and server (`lib/validate.js`, shared).


## Note
Store is in-memory (`lib/store.js`). Data resets on restart/cold start.
For durable data swap the store functions for a DB (Vercel KV, Postgres, etc).
