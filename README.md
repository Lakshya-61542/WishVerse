# WishVerse ✨

WishVerse is a premium no-code surprise website builder for meaningful moments. Creators can sign in, build personalized experiences with photos/music/messages, publish a shareable reveal, return later to edit it, and manage everything from a personal dashboard.

## What is included

### Account experience
- Email/password sign up and sign in
- Continue with Google
- Show/hide password eye controls
- Password strength feedback on sign up
- Email confirmation flow
- Forgot password and reset password
- Smooth Framer Motion auth transitions
- Automatic redirect away from login/signup when already signed in
- Post-auth return path support (for example, choose an occasion → sign up → continue into that builder)
- Personal dashboard and profile/settings page
- Google profile avatar support with initials fallback
- Terms and Privacy pages

### WishVerse product
- 19 occasions
- 9 visual themes
- Premium responsive landing page
- Multi-step light builder workspace
- Live mobile reveal preview
- Cover photo, gallery, letter photo and background music
- Optional 6-digit reveal passcode
- WishMuse AI assistant with built-in fallback writing
- Publish progress and share modal
- Supabase publishing with per-user ownership
- Dashboard cards with Preview, Copy Link, Edit and Delete
- Edit existing Wish without changing the public URL
- Vercel client-side routing

## Local setup

Requirements:
- Node.js 20+ recommended
- npm

Install:

```bash
npm install
```

Create `.env`:

**Windows CMD**
```bat
copy .env.example .env
```

**PowerShell**
```powershell
Copy-Item .env.example .env
```

Fill in:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Optional server-side WishMuse AI:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5-mini
```

Then:

```bash
npm run dev
```

Production test:

```bash
npm run build
npm run preview
```

## Authentication / Google setup

Read:

```text
AUTH_SETUP.md
```

It contains the exact Google Cloud + Supabase OAuth configuration.

For Google OAuth, WishVerse expects the Supabase callback URL:

```text
https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback
```

and returns users to:

```text
/auth/callback
```

inside WishVerse.

## Supabase database

Run and review:

```text
supabase/production_setup.sql
```

It provides:
- profile table/columns
- automatic profile creation trigger
- profile RLS
- `owner_id` and `updated_at` support for websites
- owner-only create/update/delete policies
- public read access for published reveal pages

### Expected website fields

The current app expects the `websites` table to include at least:

- `id`
- `slug`
- `website_name`
- `recipient_name`
- `event_type`
- `theme`
- `password`
- `message`
- `cover_image`
- `gallery`
- `letter_photo`
- `music`
- `published`
- `owner_id`
- `created_at`
- `updated_at`

Storage buckets:
- `cover-images`
- `gallery`
- `letter-photos`
- `music`

## Vercel deployment

1. Push the project to GitHub.
2. Connect the repository to Vercel.
3. In Vercel → Project Settings → Environment Variables, add:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

4. Optionally add server-only:

```text
OPENAI_API_KEY
OPENAI_MODEL
```

5. Deploy.
6. In Supabase Authentication → URL Configuration, set your production Site URL and add both local + production redirect URLs.

`vercel.json` includes rewrites for all SPA routes used by the app.

## Before public launch

- Enable Google provider in Supabase and configure the Google OAuth client.
- Keep email confirmation enabled in production.
- Review Terms and Privacy copy for your actual business/legal requirements.
- Test sign up, Google sign in, email confirmation, password reset, publishing, editing, deletion and public reveal on both desktop and mobile.
- Review Supabase Storage write policies so anonymous users cannot upload or overwrite creator files.
- The current 6-digit reveal passcode is meant for surprise privacy, not for protecting highly sensitive information. Do not present it as strong security without moving verification server-side.
- Add your final custom domain and update Supabase redirect URLs before launch.

## Important secret handling

Never commit:
- `.env`
- Supabase service-role keys
- Google OAuth client secret
- OpenAI API keys

The browser should only receive the Supabase publishable/anon key.

---

WishVerse — Moments, made magical.
