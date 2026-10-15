import { ArrowLeft, Loader2, LogOut, Mail, Save, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut, refreshUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      setLoading(true);
      const { data } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      setFullName(
        data?.full_name ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          ""
      );
      setAvatarUrl(
        data?.avatar_url ||
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          ""
      );
      setLoading(false);
    }

    loadProfile();
  }, [user]);

  const initials = useMemo(() => {
    const source = fullName || user?.email || "WV";
    return source
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [fullName, user?.email]);

  async function saveProfile(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          full_name: fullName.trim(),
          avatar_url: avatarUrl || null,
        },
        { onConflict: "id" }
      );

    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: fullName.trim(),
        avatar_url: avatarUrl || null,
      },
    });

    if (profileError || authError) {
      setMessage(profileError?.message || authError?.message || "Could not update profile.");
    } else {
      await refreshUser();
      setMessage("Profile updated.");
    }

    setSaving(false);
  }

  async function handleSignOut() {
    await signOut();
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-white to-[#eefbff] text-slate-900">
      <header className="border-b border-violet-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
          <button onClick={() => navigate("/dashboard")} className="inline-flex">
            <Logo variant="light" />
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:border-violet-200 hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-[30px] border border-violet-100 bg-white p-6 shadow-[0_24px_70px_rgba(76,45,108,.09)]">
            <div className="flex flex-col items-center text-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt=""
                  className="h-24 w-24 rounded-3xl object-cover shadow-lg"
                />
              ) : (
                <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-2xl font-black text-white shadow-lg">
                  {initials}
                </div>
              )}

              <h1 className="mt-5 text-xl font-black">
                {fullName || "WishVerse Creator"}
              </h1>
              <p className="mt-1 break-all text-sm text-slate-400">{user?.email}</p>
            </div>

            <div className="mt-6 space-y-2 border-t border-slate-100 pt-6">
              <button
                onClick={() => navigate("/forgot-password")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-black text-slate-600 transition hover:border-violet-200 hover:text-violet-700"
              >
                Change password
              </button>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3 text-sm font-black text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </aside>

          <section className="rounded-[30px] border border-violet-100 bg-white p-7 shadow-[0_24px_70px_rgba(76,45,108,.09)] sm:p-9">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">
              Account settings
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Your profile</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep your creator identity up to date. Your email is managed securely by Supabase Auth.
            </p>

            {loading ? (
              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-violet-700">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading profile...
              </div>
            ) : (
              <form onSubmit={saveProfile} className="mt-8 space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <UserRound className="h-4 w-4 text-violet-500" />
                    Full name
                  </label>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Mail className="h-4 w-4 text-violet-500" />
                    Email
                  </label>
                  <input
                    value={user?.email || ""}
                    readOnly
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-500"
                  />
                </div>

                <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-4 text-sm leading-6 text-slate-600">
                  {avatarUrl
                    ? "Your profile photo is synced from your connected account."
                    : "WishVerse will use your initials as your profile image. Google sign-in can supply a profile photo automatically."}
                </div>

                {message && (
                  <div className={`rounded-2xl px-4 py-3 text-sm ${
                    message === "Profile updated."
                      ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                      : "border border-rose-100 bg-rose-50 text-rose-700"
                  }`}>
                    {message}
                  </div>
                )}

                <button
                  disabled={saving}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 font-black text-white shadow-lg disabled:opacity-60"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
