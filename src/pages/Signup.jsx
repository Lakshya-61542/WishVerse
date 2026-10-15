import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import GoogleAuthButton from "../components/auth/GoogleAuthButton";
import PasswordField from "../components/auth/PasswordField";
import { supabase } from "../lib/supabase";
import { authErrorMessage } from "../utils/authErrors";

function strengthFor(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedNext = searchParams.get("next");
  const nextPath = requestedNext?.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/dashboard";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);

  const strength = useMemo(() => strengthFor(password), [password]);

  async function handleSignup(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (password.length < 8) {
        throw new Error("Use a password with at least 8 characters.");
      }

      const { data, error: signupError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirmed?next=${encodeURIComponent(nextPath)}`,
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (signupError) throw signupError;

      if (data.session) {
        // Useful when email confirmation is disabled in development.
        await supabase
          .from("profiles")
          .upsert(
            {
              id: data.user.id,
              full_name: fullName.trim(),
              avatar_url:
                data.user.user_metadata?.avatar_url ||
                data.user.user_metadata?.picture ||
                null,
            },
            { onConflict: "id" }
          );
        navigate(nextPath, { replace: true });
        return;
      }

      setConfirmationSent(true);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function resendConfirmation() {
    if (!email) return;
    setResending(true);
    setError("");

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirmed?next=${encodeURIComponent(nextPath)}`,
      },
    });

    if (resendError) setError(authErrorMessage(resendError));
    setResending(false);
  }

  if (confirmationSent) {
    return (
      <AuthShell
        eyebrow="One quick step"
        title="Check your inbox"
        subtitle={`We sent a confirmation link to ${email}. Confirm your email and WishVerse will bring you back.`}
      >
        <div className="rounded-3xl border border-violet-100 bg-violet-50/70 p-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-violet-600 shadow-sm">
            <Mail className="h-6 w-6" />
          </div>
          <div className="mt-4 font-black text-slate-900">Confirmation email sent</div>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            If you do not see it, check spam or promotions. The link will return you to WishVerse.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={resendConfirmation}
          disabled={resending}
          className="mt-5 w-full rounded-2xl border border-slate-200 bg-white py-3.5 font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-700 disabled:opacity-50"
        >
          {resending ? "Resending..." : "Resend confirmation email"}
        </button>

        <Link
          to={`/login?next=${encodeURIComponent(nextPath)}`}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 font-black text-white"
        >
          <CheckCircle2 className="h-4 w-4" />
          I already confirmed it
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Create your account"
      title="Start your WishVerse"
      subtitle="Save your creations, edit them later and keep every published surprise in one place."
    >
      <GoogleAuthButton onError={setError} nextPath={nextPath} />

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
          or continue with email
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleSignup} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="text-sm font-bold text-slate-700">
            Full name
          </label>
          <input
            id="fullName"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 caret-violet-600 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-bold text-slate-700">
            Email
          </label>
          <input
            id="email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 caret-violet-600 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div>
          <PasswordField
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
          />

          <div className="mt-3 grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-1.5 rounded-full transition ${
                  strength >= level
                    ? strength <= 1
                      ? "bg-rose-400"
                      : strength === 2
                      ? "bg-amber-400"
                      : "bg-emerald-400"
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Use 8+ characters. A mix of letters, numbers and symbols is stronger.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 font-black text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-black text-violet-600 hover:text-violet-800">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
