import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import { useAuth } from "../context/AuthContext";

export default function AuthConfirmed() {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const requestedNext = searchParams.get("next");
  const nextPath =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/dashboard";

  return (
    <AuthShell
      eyebrow="Email confirmation"
      title={loading ? "Finishing confirmation..." : "You’re officially in ✨"}
      subtitle={
        loading
          ? "WishVerse is securely restoring your session."
          : "Your email has been verified. Your account is ready."
      }
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-3xl border border-violet-100 bg-violet-50/70 p-6 text-sm font-bold text-violet-700">
          <Loader2 className="h-5 w-5 animate-spin" />
          Verifying your account...
        </div>
      ) : (
        <>
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your email has been verified successfully.
            </p>
          </div>

          <Link
            to={user ? nextPath : `/login?next=${encodeURIComponent(nextPath)}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 font-black text-white"
          >
            {user ? "Continue" : "Sign in"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </>
      )}
    </AuthShell>
  );
}
