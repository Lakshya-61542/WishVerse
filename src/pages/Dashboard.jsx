import {
  ArrowRight,
  Copy,
  ExternalLink,
  LogOut,
  Pencil,
  Plus,
  Settings,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [profile, setProfile] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (!user) return;
    loadDashboard();
  }, [user]);

  async function loadDashboard() {
    try {
      setLoading(true);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) console.error("Profile load error:", profileError);

      if (profileData) {
        setProfile(profileData);
      } else {
        const fallbackName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "Creator";

        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .upsert(
            {
              id: user.id,
              full_name: fallbackName,
              avatar_url:
                user.user_metadata?.avatar_url ||
                user.user_metadata?.picture ||
                null,
            },
            { onConflict: "id" }
          )
          .select()
          .single();

        if (createError) console.error("Profile creation error:", createError);
        else setProfile(newProfile);
      }

      const { data: websiteData, error } = await supabase
        .from("websites")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWebsites(websiteData || []);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await signOut();
    navigate("/", { replace: true });
  }

  async function copyLink(site) {
    const link = `${window.location.origin}/wish/${site.slug}`;
    await navigator.clipboard.writeText(link);
    setCopiedId(site.id);
    setTimeout(() => setCopiedId(null), 1700);
  }

  async function deleteWebsite(id) {
    const confirmed = window.confirm("Delete this Wish? This cannot be undone.");
    if (!confirmed) return;

    const { error } = await supabase
      .from("websites")
      .delete()
      .eq("id", id)
      .eq("owner_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    setWebsites((current) => current.filter((website) => website.id !== id));
  }

  const name =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "Creator";

  const avatar =
    profile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    "";

  const initials = useMemo(
    () =>
      name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [name]
  );

  const publishedCount = websites.filter((website) => website.published !== false).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbf9ff] via-white to-[#eefbff] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-violet-100/80 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button onClick={() => navigate("/")} className="inline-flex">
            <Logo variant="light" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/builder")}
              className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 sm:inline-flex"
            >
              <Plus className="h-4 w-4" />
              Create a Wish
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 pr-3 text-left shadow-sm transition hover:border-violet-200"
            >
              {avatar ? (
                <img src={avatar} alt="" className="h-9 w-9 rounded-xl object-cover" />
              ) : (
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-black text-white">
                  {initials}
                </div>
              )}
              <div className="hidden sm:block">
                <div className="max-w-[130px] truncate text-xs font-black text-slate-900">{name}</div>
                <div className="text-[10px] text-slate-400">Profile</div>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-rose-200 hover:text-rose-500"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 p-8 text-white shadow-[0_28px_80px_rgba(124,58,237,.18)] sm:p-10 lg:p-12">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-100">
                Your creative space
              </div>
              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Welcome back, {name.split(" ")[0]} ✨
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
                Create something unforgettable for someone who matters, then manage every Wish from one place.
              </p>
            </div>

            <button
              onClick={() => navigate("/builder")}
              className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-white px-6 py-3.5 font-black text-violet-700 shadow-xl transition hover:-translate-y-0.5 lg:self-auto"
            >
              Create something magical
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard icon="✨" value={websites.length} label="Total Wishes" />
          <StatCard icon="🌍" value={publishedCount} label="Published" />
          <StatCard icon="💜" value={name} label="WishVerse Creator" text />
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-600">Your creations</div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">My Wishes</h2>
              <p className="mt-1 text-sm text-slate-500">Everything you have created lives here.</p>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-violet-200 hover:text-violet-700"
            >
              <Settings className="h-4 w-4" />
              Account settings
            </button>
          </div>

          {loading ? (
            <div className="mt-7 rounded-[28px] border border-violet-100 bg-white p-14 text-center shadow-sm">
              <Sparkles className="mx-auto h-7 w-7 animate-pulse text-violet-500" />
              <p className="mt-4 text-sm font-bold text-slate-500">Loading your WishVerse...</p>
            </div>
          ) : websites.length === 0 ? (
            <div className="mt-7 flex min-h-[330px] flex-col items-center justify-center rounded-[32px] border border-dashed border-violet-200 bg-white/80 p-10 text-center shadow-xl shadow-violet-50">
              <div className="grid h-20 w-20 place-items-center rounded-3xl bg-violet-100 text-4xl">💌</div>
              <h3 className="mt-6 text-2xl font-black">Your first Wish starts here.</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Turn photos, words and music into a surprise someone will never forget.
              </p>
              <button
                onClick={() => navigate("/builder")}
                className="mt-6 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 font-black text-white shadow-lg"
              >
                Create my first Wish
              </button>
            </div>
          ) : (
            <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {websites.map((site) => (
                <article
                  key={site.id}
                  className="group overflow-hidden rounded-[28px] border border-violet-100 bg-white shadow-[0_18px_55px_rgba(89,53,119,.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(89,53,119,.12)]"
                >
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-violet-200 to-pink-200">
                    {site.cover_image ? (
                      <img
                        src={site.cover_image}
                        alt={site.recipient_name || "Wish cover"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-6xl">
                        {getEventEmoji(site.event_type)}
                      </div>
                    )}

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-slate-700 backdrop-blur">
                      {getEventEmoji(site.event_type)} {site.event_type || "Special Moment"}
                    </div>

                    <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white">
                      Published
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-500">Made for</div>
                    <h3 className="mt-1 truncate text-2xl font-black text-slate-950">
                      {site.recipient_name || "Someone special"}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400">
                      {site.created_at
                        ? `Created ${new Date(site.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}`
                        : "Created recently"}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => window.open(`/wish/${site.slug}`, "_blank")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-xs font-black text-white"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Preview
                      </button>

                      <button
                        onClick={() => copyLink(site)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-100 px-3 py-2.5 text-xs font-black text-violet-700"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copiedId === site.id ? "Copied" : "Copy link"}
                      </button>

                      <button
                        onClick={() => navigate(`/builder?edit=${site.id}`)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-black text-slate-600"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteWebsite(site.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2.5 text-xs font-black text-rose-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <button
        onClick={() => navigate("/builder")}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-[0_18px_50px_rgba(124,58,237,.35)] sm:hidden"
        aria-label="Create a Wish"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
}

function StatCard({ icon, value, label, text = false }) {
  return (
    <div className="rounded-[24px] border border-violet-100 bg-white/86 p-5 shadow-[0_14px_40px_rgba(89,53,119,.06)] backdrop-blur">
      <div className="text-2xl">{icon}</div>
      <div className={`mt-3 font-black text-slate-950 ${text ? "truncate text-lg" : "text-3xl"}`}>
        {value}
      </div>
      <div className="mt-1 text-xs font-semibold text-slate-400">{label}</div>
    </div>
  );
}

function getEventEmoji(event) {
  const emojis = {
    Birthday: "🎂",
    Anniversary: "💍",
    Proposal: "💖",
    Wedding: "💒",
    Engagement: "💎",
    Graduation: "🎓",
    Friendship: "🫶",
    "Baby Shower": "🍼",
    Farewell: "🌅",
    "Valentine's Day": "💘",
    "Mother's Day": "🌷",
    "Father's Day": "🧡",
    Festival: "✨",
    Achievement: "🏆",
    "New Job": "💼",
    Retirement: "🌴",
    "New Year": "🎆",
    "Thank You": "🤍",
    "Custom Event": "🌟",
  };

  return emojis[event] || "✨";
}
