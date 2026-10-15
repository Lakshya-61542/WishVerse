import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import { supabase } from "../lib/supabase";
import { authErrorMessage } from "../utils/authErrors";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) throw resetError;
      setSent(true);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={
        sent
          ? `If an account exists for ${email}, a secure reset link is on its way.`
          : "Enter the email you use for WishVerse and we will send you a secure reset link."
      }
    >
      {sent ? (
        <>
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 text-center">
            <MailCheck className="mx-auto h-8 w-8 text-emerald-600" />
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Open the email on the same device if possible, then choose a new password.
            </p>
          </div>
          <Link
            to="/login"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3.5 font-black text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="resetEmail" className="text-sm font-bold text-slate-700">
              Email
            </label>
            <input
              id="resetEmail"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 font-black text-white disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Sending..." : "Send reset link"}
          </button>

          <Link to="/login" className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-violet-700">
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </form>
      )}
    </AuthShell>
  );
}
