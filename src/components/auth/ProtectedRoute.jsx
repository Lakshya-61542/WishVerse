import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  const location = useLocation();

  /*
   * DO NOT redirect while Supabase
   * is checking the OAuth session.
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-cyan-50">

        <div className="text-center">

          <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-600" />

          <p className="mt-4 font-bold text-slate-600">
            Opening WishVerse...
          </p>

        </div>

      </div>
    );
  }

  /*
   * Only redirect AFTER loading is finished.
   */
  if (!user) {
    const destination =
      `${location.pathname}${location.search}`;

    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(
          destination
        )}`}
        replace
      />
    );
  }

  return children;
}