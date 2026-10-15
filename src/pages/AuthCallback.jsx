import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  const hasRun = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Prevent React StrictMode from exchanging
    // the same OAuth code twice.
    if (hasRun.current) return;

    hasRun.current = true;

    async function completeLogin() {
      try {
        const params = new URLSearchParams(
          window.location.search
        );

        /*
         * Google / Supabase may return an OAuth error
         */
        const oauthError =
          params.get("error_description") ||
          params.get("error");

        if (oauthError) {
          throw new Error(oauthError);
        }

        const code = params.get("code");

        const requestedNext =
          params.get("next") || "/dashboard";

        const nextPath =
          requestedNext.startsWith("/") &&
          !requestedNext.startsWith("//")
            ? requestedNext
            : "/dashboard";

        let session = null;

        /*
         * PKCE FLOW
         *
         * If Supabase returned ?code=...
         * exchange it for an actual session.
         */
        if (code) {
          const {
            data,
            error: exchangeError,
          } =
            await supabase.auth.exchangeCodeForSession(
              code
            );

          if (exchangeError) {
            throw exchangeError;
          }

          session = data?.session ?? null;
        }

        /*
         * If Supabase already restored the session,
         * retrieve it normally.
         */
        if (!session) {
          const {
            data,
            error: sessionError,
          } =
            await supabase.auth.getSession();

          if (sessionError) {
            throw sessionError;
          }

          session = data?.session ?? null;
        }

        /*
         * Give Supabase one small opportunity to finish
         * browser session persistence if necessary.
         */
        if (!session) {
          await new Promise((resolve) =>
            setTimeout(resolve, 500)
          );

          const {
            data,
            error: retryError,
          } =
            await supabase.auth.getSession();

          if (retryError) {
            throw retryError;
          }

          session = data?.session ?? null;
        }

        if (!session?.user) {
          throw new Error(
            "Google sign-in completed, but WishVerse could not create your session."
          );
        }

        console.log(
          "GOOGLE LOGIN SUCCESS:",
          session.user.email
        );

        /*
         * IMPORTANT:
         *
         * Use a real page reload instead of React navigate().
         *
         * This gives AuthContext a clean startup where
         * getSession() reads the newly persisted Supabase
         * session BEFORE ProtectedRoute decides anything.
         */
        window.location.replace(nextPath);

      } catch (err) {
        console.error(
          "Google callback error:",
          err
        );

        setError(
          err?.message ||
            "Unable to complete Google sign-in."
        );
      }
    }

    completeLogin();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-6">

        <div className="w-full max-w-md rounded-[30px] border border-rose-100 bg-white p-8 text-center shadow-2xl">

          <div className="text-4xl">
            ⚠️
          </div>

          <h1 className="mt-4 text-2xl font-black text-slate-900">
            Sign-in couldn't be completed
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.replace("/login")
            }
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 font-bold text-white shadow-lg"
          >
            Back to Sign In
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-cyan-50">

      <div className="text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100">

          <Loader2 className="h-8 w-8 animate-spin text-violet-600" />

        </div>

        <h1 className="mt-5 text-2xl font-black text-slate-900">
          Welcome to WishVerse ✨
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Finishing your Google sign-in...
        </p>

      </div>

    </div>
  );
}