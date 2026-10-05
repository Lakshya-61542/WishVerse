import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error: signupError } =
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
      data: {
        full_name: fullName,
      },
    },
  });

      if (signupError) throw signupError;

      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            id: data.user.id,
            full_name: fullName,
          });

        if (profileError) {
          console.error("Profile error:", profileError);
        }
      }

      if (data.session) {
        navigate("/dashboard");
      } else {
        setMessage(
          "Account created! Check your email to confirm your account."
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-[32px] border border-violet-100 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">

        <Link
          to="/"
          className="text-xl font-black text-violet-700"
        >
          ✦ WishVerse
        </Link>

        <h1 className="mt-8 text-4xl font-black text-slate-900">
          Create your account
        </h1>

        <p className="mt-2 text-slate-500">
          Start creating moments worth remembering.
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Full name
            </label>

            <input
  required
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  placeholder="Your full name"
  className="
    mt-2 w-full rounded-2xl
    border border-slate-200
    bg-white
    px-4 py-3
    text-slate-900
    caret-violet-600
    placeholder:text-slate-400
    outline-none
    transition
    focus:border-violet-500
    focus:ring-4
    focus:ring-violet-100
  "
/>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
  required
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="you@example.com"
  className="
    mt-2 w-full rounded-2xl
    border border-slate-200
    bg-white
    px-4 py-3
    text-slate-900
    caret-violet-600
    placeholder:text-slate-400
    outline-none
    transition
    focus:border-violet-500
    focus:ring-4
    focus:ring-violet-100
  "
/>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
  required
  minLength={6}
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Minimum 6 characters"
  className="
    mt-2 w-full rounded-2xl
    border border-slate-200
    bg-white
    px-4 py-3
    text-slate-900
    caret-violet-600
    placeholder:text-slate-400
    outline-none
    transition
    focus:border-violet-500
    focus:ring-4
    focus:ring-violet-100
  "
/>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3.5 font-bold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-violet-600"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}