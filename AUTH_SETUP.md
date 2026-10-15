# WishVerse authentication launch setup

The code is ready for email/password authentication, password recovery, email confirmation and Google OAuth. These provider settings are configured in Supabase/Google, not in the React bundle.

## 1. Supabase URL configuration

In **Supabase → Authentication → URL Configuration**:

Production Site URL:

```text
https://YOUR_DOMAIN
```

Redirect URLs:

```text
http://localhost:5173/**
https://YOUR_DOMAIN/**
```

## 2. Google sign-in

In **Google Cloud Console / Google Auth Platform** create a **Web application** OAuth client.

Authorized JavaScript origins:

```text
http://localhost:5173
https://YOUR_DOMAIN
```

Authorized redirect URI:

```text
https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback
```

Then copy the Google Client ID and Client Secret into:

**Supabase → Authentication → Providers → Google**

Enable Google and save.

No Google secret belongs in `.env` or in the browser app.

## 3. Email/password

Keep Email provider enabled. For production, email confirmation is recommended.

WishVerse sends confirmations back to:

```text
/auth/confirmed
```

Password reset links return to:

```text
/reset-password
```

## 4. Run the database setup

Open Supabase SQL Editor and run:

```text
supabase/production_setup.sql
```

It creates/repairs:
- profile trigger
- ownership fields/policies
- owner-only website writes
- profile RLS

Review the SQL before running it against an existing production project.

## 5. Vercel

Set these in Vercel Project → Environment Variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Then redeploy.

Optional WishMuse server variables:

```text
OPENAI_API_KEY
OPENAI_MODEL
```
