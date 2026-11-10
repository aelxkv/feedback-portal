# Feedback Portal

Next.js (App Router) feedback app. Server Actions handle create / edit / delete.
Validation runs on client (`onSubmit`) and server (`lib/validate.js`, shared).

## Run
    npm install
    npm run dev

## Before submit
1. Set `SEED_NAME` in `lib/store.js` to your uid.
2. Push to GitHub, import repo in Vercel, deploy.

## Note
Store is in-memory (`lib/store.js`). Data resets on restart/cold start.
For durable data swap the store functions for a DB (Vercel KV, Postgres, etc).
