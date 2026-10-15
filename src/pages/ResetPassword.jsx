import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import PasswordField from "../components/auth/PasswordField";
import { supabase } from "../lib/supabase";
import { authErrorMessage } from "../utils/authErrors";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function prepareRecoverySession() {
      try {
        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (active) setValidSession(Boolean(session));
      } catch (err) {
        if (active) setError(authErrorMessage(err));
      } finally {
        if (active) setReady(true);
      }
    }

    prepareRecoverySession();
    return () => {
      active = false;
    };
  }, []);

  async function handleReset(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The two passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(authErrorMessage(updateError));
    } else {
      setComplete(true);
      setTimeout(() => navigate("/dashboard", { replace: true }), 1400);
    }
    setLoading(false);
  }

  return (
    <AuthShell
      eyebrow="Secure your account"
      title={complete ? "Password updated" : "Choose a new password"}
      subtitle={complete ? "Your WishVerse account is ready again." : "Use a new password you have not used elsewhere."}
    >
      {!ready ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-violet-50 py-6 text-sm font-bold text-violet-700">
          <Loader2 className="h-4 w-4 animate-spin" />
          Verifying reset link...
        </div>
      ) : complete ? (
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 text-center">
          <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-600" />
          <p className="mt-3 text-sm text-slate-600">Taking you back to your dashboard...</p>
        </div>
      ) : !validSession ? (
        <div>
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm leading-6 text-rose-700">
            This reset link is invalid or has expired.
          </div>
          <Link
            to="/forgot-password"
            className="mt-4 flex w-full justify-center rounded-2xl bg-slate-950 py-3.5 font-black text-white"
          >
            Request a new link
          </Link>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-5">
          <PasswordField
            label="New password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
          />

          <PasswordField
            label="Confirm new password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat your password"
            autoComplete="new-password"
            minLength={8}
            name="confirmPassword"
          />

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
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
