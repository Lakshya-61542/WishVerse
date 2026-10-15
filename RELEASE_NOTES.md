# WishVerse — Launch Auth & Brand Upgrade

## Account experience
- Added Continue with Google support through Supabase OAuth.
- Added premium split-screen Sign In and Sign Up experiences.
- Added password show/hide eye controls on login, signup, reset-password and builder passcode screens.
- Added password strength feedback during account creation.
- Added email confirmation success flow and resend confirmation action.
- Added Forgot Password and Reset Password pages.
- Added OAuth callback handling and post-auth destination support.
- Added automatic redirect from login/signup for already-authenticated users.
- Added smoother Framer Motion entrance transitions across auth screens.

## Creator account
- Added a dedicated Profile / Account Settings page.
- Google profile images are supported automatically, with initials as a fallback.
- Dashboard header now exposes profile/settings and improved account controls.
- Fixed profile fallback creation logic and removed a duplicate state overwrite.

## Landing / navigation
- Rebuilt the hero into a balanced two-column product presentation.
- Added a real product-style reveal preview in the hero.
- Reworked Navbar spacing, signed-in/signed-out states and mobile menu.
- Simplified the landing-page occasion catalogue to the strongest 8 examples while keeping all 19 in the builder.
- Standardized section widths, spacing and visual hierarchy.
- Added Terms and Privacy routes to the footer and auth flow.

## Builder
- Fixed edit publishing so `editId` reaches the publish service.
- Added an edit-loading state.
- Corrected theme fallback for edited wishes.
- Added show/hide control to the optional reveal passcode field.

## Deployment / setup
- Added `.env.example`.
- Added `AUTH_SETUP.md` with Google Cloud + Supabase configuration.
- Added `supabase/production_setup.sql` for profiles, ownership and RLS.
- Extended Vercel SPA rewrites for all authentication/profile routes.
- Updated README and START_HERE instructions.
