# WishVerse ✨

WishVerse is a premium no-code surprise website builder for meaningful moments. It combines photos, music, a private reveal, cinematic scenes and WishMuse AI into a shareable website.

## Included in this build

- Premium branded landing page and responsive multi-step builder
- **19 occasions:** Birthday, Anniversary, Proposal, Wedding, Engagement, Graduation, Friendship, Baby Shower, Farewell, Valentine's Day, Mother's Day, Father's Day, Festival, Achievement, New Job, Retirement, New Year, Thank You and Custom Event
- **9 visual themes:** Aurora, Romantic, Champagne, Midnight, Blossom, Ocean, Sunset, Emerald and Mono
- Event-aware reveal copy from the first polaroid through the finale
- Theme-aware reveal backgrounds across the complete cinematic flow
- Live generic mobile preview
- Cover photo, memory gallery and intimate letter photo
- Background music that starts from the gift-opening gesture
- Optional 6-digit surprise passcode
- Responsive letter scene and compact premium final memory page
- Saveable event-aware memory card
- Real publish progress tied to Supabase upload stages
- Collision-safe public links if a requested name is already taken
- Premium publish success modal with copy, native share and open-site actions
- WishMuse AI message assistant with a built-in fallback writer
- Event-based visual-theme recommendations
- Vercel SPA routing and optional serverless AI endpoint
- SEO/social metadata

## Run locally

```bash
npm install
```

Copy the environment example:

**Windows CMD**
```bash
copy .env.example .env
```

**PowerShell**
```powershell
Copy-Item .env.example .env
```

Put your Supabase values in `.env`, then run:

```bash
npm run dev
```

Before deployment, verify:

```bash
npm run build
```

## Supabase

The app expects a `websites` table containing:

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
- your existing ID/timestamp fields

Storage buckets:

- `cover-images`
- `gallery`
- `letter-photos`
- `music`

Uploads use `upsert: true`, so the Storage policies must allow the operations used by the client, including UPDATE where an existing object can be replaced.

## WishMuse AI

WishMuse works immediately with event-aware built-in drafts. To enable the optional server-side AI endpoint on Vercel, configure:

```env
OPENAI_API_KEY=...
OPENAI_MODEL=...
```

Keep those variables server-side. Do not add `VITE_` to a secret API key.

If the serverless AI route is unavailable, the builder automatically uses its built-in writer instead of failing.

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel Environment Variables.
4. Optionally add `OPENAI_API_KEY` and `OPENAI_MODEL` for server-side WishMuse AI.
5. Deploy.

`vercel.json` already keeps `/builder` and `/wish/*` working with client-side routing while leaving `/api/*` available for serverless functions.

## Production/security note

The current passcode is designed to keep a surprise hidden from casual viewing; it is not strong authentication. Your existing client-side publishing setup also depends on permissive Supabase policies. Before accepting sensitive user content or turning WishVerse into a paid public service, add authenticated ownership, tighter RLS/storage policies, rate limiting and server-side passcode verification.
