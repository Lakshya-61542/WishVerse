import { Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { authErrorMessage } from "../../utils/authErrors";

export default function GoogleAuthButton({ onError, nextPath = "/dashboard" }) {
  const [loading, setLoading] = useState(false);

  async function continueWithGoogle() {
    try {
      setLoading(true);
      onError?.("");

      const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
      nextPath
    )}`,
  },
});

      if (error) throw error;
    } catch (error) {
      setLoading(false);
      onError?.(authErrorMessage(error));
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={continueWithGoogle}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-violet-600" />
      ) : (
        <GoogleIcon />
      )}
      {loading ? "Connecting..." : "Continue with Google"}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.38Z"/>
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.39l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.59A10 10 0 0 0 12 22Z"/>
      <path fill="#FBBC05" d="M6.39 13.93A6.02 6.02 0 0 1 6.07 12c0-.67.12-1.32.32-1.93V7.48H3.04A10 10 0 0 0 2 12c0 1.61.38 3.13 1.04 4.52l3.35-2.59Z"/>
      <path fill="#EA4335" d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.48l3.35 2.59C7.18 7.7 9.39 5.94 12 5.94Z"/>
    </svg>
  );
}
