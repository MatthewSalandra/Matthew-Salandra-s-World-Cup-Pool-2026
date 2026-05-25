# Matthew Salandra's World Cup Pool

A private FIFA World Cup pool for friends and family.

## Decisions

- Login: email and password through Supabase.
- Join method: private pool code, defaulting to `SALANDRA2026`.
- Entries: one entry per account.
- Picks: editable until the deadline.
- Visibility: other players' picks stay hidden until picks lock.
- Payments: tracked by the admin only.
- Tiebreakers: exact final score and Golden Boot winner.
- Results: pulled server-side from a sports data API so the API key is not exposed.

## App Structure

- `app/page.tsx`: home page.
- `app/group-stage/page.tsx`: group-stage picks and tiebreakers.
- `app/knockout/page.tsx`: March Madness style knockout bracket.
- `app/leaderboard/page.tsx`: public leaderboard.
- `app/admin/page.tsx`: admin controls for deadlines, payments, and result sync.
- `lib/scoring.ts`: scoring rules.
- `lib/supabase.ts`: Supabase setup.
- `lib/database.ts`: shared database helpers.
- `app/api/matches/route.ts`: server-side results API route.
- `supabase-schema.sql`: database tables and access policies.

## Setup

1. Create a Supabase project.
2. In Supabase, go to Authentication and make sure Email signups are enabled.
3. In Supabase, open SQL Editor.
4. Paste the contents of `supabase-schema.sql`.
5. Replace `REPLACE_WITH_ADMIN_EMAIL` with your admin email before running it.
6. Run the SQL.
7. Copy `.env.example` to `.env.local`.
8. Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase Project Settings.
9. Add your admin email to `NEXT_PUBLIC_ADMIN_EMAIL`.
10. Add a football data API key to `FOOTBALL_DATA_API_KEY` when you are ready for live results.
11. Run `npm install`.
12. Run `npm run dev`.

## Supabase Values

In Supabase, find these under Project Settings, then API:

- Project URL goes into `NEXT_PUBLIC_SUPABASE_URL`.
- Anon public key goes into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

The anon key is safe to use in the browser when Row Level Security is enabled, which the schema does.

## Scoring

- Group stage: 1 point per correct result.
- Round of 32: 2 points.
- Round of 16: 3 points.
- Quarterfinals: 4 points.
- Semifinals: 5 points.
- Final: 6 points.

The old `index.html`, `styles.css`, and `app.js` files are the first local prototype. The deployable version is the Next.js app in the `app`, `components`, and `lib` folders.
