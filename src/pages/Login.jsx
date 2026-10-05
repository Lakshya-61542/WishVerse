import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) throw error;

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-[32px] border border-violet-100 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">

        <Link
          to="/"
          className="text-xl font-black text-violet-700"
        >
          ✦ WishVerse
        </Link>

        <h1 className="mt-8 text-4xl font-black text-slate-900">
          Welcome back
        </h1>

        <p className="mt-2 text-slate-500">
          Continue creating unforgettable moments.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />

          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 font-bold text-white shadow-lg disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to WishVerse?{" "}
          <Link
            to="/signup"
            className="font-bold text-violet-600"
          >
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}