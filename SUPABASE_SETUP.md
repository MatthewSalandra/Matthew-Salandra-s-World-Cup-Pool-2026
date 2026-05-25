# Supabase Setup

Follow this after creating a Supabase account.

## Create The Project

1. Go to `https://supabase.com`.
2. Sign up or sign in.
3. Create a new project.
4. Name it `Matthew Salandra World Cup Pool`.
5. Choose a database password and save it somewhere private.
6. Pick the closest region.
7. Create the project.

## Enable Login

1. Go to Authentication.
2. Go to Providers.
3. Make sure Email is enabled.
4. For the easiest family/friends setup, allow email/password signups.

## Create Tables

1. Go to SQL Editor.
2. Open `supabase-schema.sql` from this project.
3. Replace `REPLACE_WITH_ADMIN_EMAIL` with your email address.
4. Run the SQL.

## Copy App Keys

1. Go to Project Settings.
2. Go to API.
3. Copy the Project URL.
4. Copy the anon public key.
5. Put those values in `.env.local`.

Use this format:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
NEXT_PUBLIC_POOL_CODE=SALANDRA2026
NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
FOOTBALL_DATA_API_KEY=
FOOTBALL_DATA_COMPETITION=WC
```
