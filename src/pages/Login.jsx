import { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Loader2 } from "lucide-react";

import AuthShell from "../components/auth/AuthShell";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import PasswordField from "../components/auth/PasswordField";

import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { authErrorMessage } from "../utils/authErrors";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();

  /*
   * AUTH SESSION
   */
  const {
    user,
    loading: authLoading,
  } = useAuth();

  /*
   * WHERE SHOULD THE USER GO AFTER LOGIN?
   */

  const requestedNext =
    searchParams.get("next");

  const queryNext =
    requestedNext?.startsWith("/") &&
    !requestedNext.startsWith("//")
      ? requestedNext
      : null;

  const stateNext =
    location.state?.from?.pathname
      ? `${location.state.from.pathname}${
          location.state.from.search || ""
        }`
      : null;

  let nextPath =
    queryNext ||
    stateNext ||
    "/dashboard";

  /*
   * Avoid accidental redirect loops.
   */
  const blockedAuthPaths = [
    "/login",
    "/signup",
    "/auth/callback",
    "/forgot-password",
    "/reset-password",
  ];

  if (
    blockedAuthPaths.some((path) =>
      nextPath.startsWith(path)
    )
  ) {
    nextPath = "/dashboard";
  }

  /*
   * FORM STATE
   */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
   * EMAIL/PASSWORD LOGIN
   */

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const {
        error: signInError,
      } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (signInError) {
        throw signInError;
      }

      navigate(nextPath, {
        replace: true,
      });
    } catch (err) {
      setError(
        authErrorMessage(err)
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * WAIT UNTIL SUPABASE RESTORES
   * THE EXISTING SESSION
   */

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-cyan-50">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100">

            <Loader2 className="h-7 w-7 animate-spin text-violet-600" />

          </div>

          <p className="mt-4 font-bold text-slate-700">
            Loading WishVerse...
          </p>

        </div>

      </div>
    );
  }

  /*
   * ALREADY LOGGED IN?
   *
   * Never show the login page again.
   */

  if (user) {
    return (
      <Navigate
        to={nextPath}
        replace
      />
    );
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to WishVerse"
      subtitle="Your wishes, drafts and published surprises are waiting for you."
    >

      {/* GOOGLE LOGIN */}

      <GoogleAuthButton
        onError={setError}
        nextPath={nextPath}
      />

      {/* DIVIDER */}

      <div className="my-6 flex items-center gap-4">

        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
          or continue with email
        </span>

        <div className="h-px flex-1 bg-slate-200" />

      </div>

      {/* EMAIL LOGIN */}

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

        {/* EMAIL */}

        <div>

          <label
            htmlFor="email"
            className="text-sm font-bold text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            required
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="you@example.com"
            autoComplete="email"
            className="
              mt-2
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3.5
              text-slate-900
              caret-violet-600
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-violet-500
              focus:ring-4
              focus:ring-violet-100
            "
          />

        </div>

        {/* PASSWORD */}

        <div>

          <div className="flex items-center justify-between">

            <span className="text-sm font-bold text-slate-700">
              Password
            </span>

            <Link
              to="/forgot-password"
              className="text-xs font-bold text-violet-600 transition hover:text-violet-800"
            >
              Forgot password?
            </Link>

          </div>

          <PasswordField
            label=""
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            autoComplete="current-password"
          />

        </div>

        {/* ERROR */}

        {error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">
            {error}
          </div>
        )}

        {/* LOGIN BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-500
            py-3.5
            font-black
            text-white
            shadow-lg
            shadow-violet-200
            transition
            hover:-translate-y-0.5
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          {loading && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}

          {loading
            ? "Signing in..."
            : "Sign in"}

        </button>

      </form>

      {/* SIGNUP LINK */}

      <p className="mt-6 text-center text-sm text-slate-500">

        New to WishVerse?{" "}

        <Link
          to="/signup"
          className="font-black text-violet-600 transition hover:text-violet-800"
        >
          Create an account
        </Link>

      </p>

    </AuthShell>
  );
}