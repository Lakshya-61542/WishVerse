import {
  ArrowRight,
  CalendarDays,
  Copy,
  ExternalLink,
  Filter,
  LayoutGrid,
  LogOut,
  Pencil,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

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

  const [search, setSearch] = useState("");

  const [eventFilter, setEventFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [sortOrder, setSortOrder] =
    useState("newest");

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    if (!user) return;

    loadDashboard();
  }, [user]);

  async function loadDashboard() {
    try {
      setLoading(true);

      /*
       * LOAD PROFILE
       */

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "Profile load error:",
          profileError
        );
      }

      if (profileData) {
        setProfile(profileData);
      } else {
        const fallbackName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "Creator";

        const {
          data: newProfile,
          error: createError,
        } = await supabase
          .from("profiles")
          .upsert(
            {
              id: user.id,

              full_name:
                fallbackName,

              avatar_url:
                user.user_metadata?.avatar_url ||
                user.user_metadata?.picture ||
                null,
            },
            {
              onConflict: "id",
            }
          )
          .select()
          .single();

        if (createError) {
          console.error(
            "Profile creation error:",
            createError
          );
        } else {
          setProfile(
            newProfile
          );
        }
      }

      /*
       * LOAD USER WISHES
       */

      const {
        data: websiteData,
        error,
      } = await supabase
        .from("websites")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setWebsites(
        websiteData || []
      );
    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await signOut();

    navigate("/", {
      replace: true,
    });
  }

  async function copyLink(site) {
    const link =
      `${window.location.origin}/wish/${site.slug}`;

    await navigator.clipboard.writeText(
      link
    );

    setCopiedId(site.id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1700);
  }

  async function deleteWebsite() {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      const { error } =
        await supabase
          .from("websites")
          .delete()
          .eq(
            "id",
            deleteTarget.id
          )
          .eq(
            "owner_id",
            user.id
          );

      if (error) {
        throw error;
      }

      setWebsites(
        (current) =>
          current.filter(
            (website) =>
              website.id !==
              deleteTarget.id
          )
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error(
        "Delete Wish error:",
        error
      );
    } finally {
      setDeleting(false);
    }
  }

  /*
   * USER INFO
   */

  const name =
    profile?.full_name ||
    user?.user_metadata
      ?.full_name ||
    user?.user_metadata?.name ||
    "Creator";

  const avatar =
    profile?.avatar_url ||
    user?.user_metadata
      ?.avatar_url ||
    user?.user_metadata?.picture ||
    "";

  const initials = useMemo(() => {
    return name
      .split(" ")
      .filter(Boolean)
      .map(
        (part) => part[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [name]);

  /*
   * STATS
   */

  const publishedCount =
    websites.filter(
      (website) =>
        website.published !== false
    ).length;

  const draftCount =
    websites.length -
    publishedCount;

  /*
   * OCCASION OPTIONS
   */

  const eventOptions =
    useMemo(() => {
      const unique =
        new Set(
          websites
            .map(
              (site) =>
                site.event_type
            )
            .filter(Boolean)
        );

      return Array.from(
        unique
      ).sort();
    }, [websites]);

  /*
   * SEARCH + FILTER + SORT
   */

  const filteredWebsites =
    useMemo(() => {
      let result = [
        ...websites,
      ];

      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      if (
        normalizedSearch
      ) {
        result =
          result.filter(
            (site) => {
              const recipient =
                site.recipient_name
                  ?.toLowerCase() ||
                "";

              const event =
                site.event_type
                  ?.toLowerCase() ||
                "";

              const slug =
                site.slug
                  ?.toLowerCase() ||
                "";

              return (
                recipient.includes(
                  normalizedSearch
                ) ||
                event.includes(
                  normalizedSearch
                ) ||
                slug.includes(
                  normalizedSearch
                )
              );
            }
          );
      }

      if (
        eventFilter !==
        "all"
      ) {
        result =
          result.filter(
            (site) =>
              site.event_type ===
              eventFilter
          );
      }

      if (
        statusFilter ===
        "published"
      ) {
        result =
          result.filter(
            (site) =>
              site.published !==
              false
          );
      }

      if (
        statusFilter ===
        "draft"
      ) {
        result =
          result.filter(
            (site) =>
              site.published ===
              false
          );
      }

      result.sort(
        (a, b) => {
          const aDate =
            new Date(
              a.created_at || 0
            ).getTime();

          const bDate =
            new Date(
              b.created_at || 0
            ).getTime();

          return sortOrder ===
            "oldest"
            ? aDate - bDate
            : bDate - aDate;
        }
      );

      return result;
    }, [
      websites,
      search,
      eventFilter,
      statusFilter,
      sortOrder,
    ]);

  function clearFilters() {
    setSearch("");
    setEventFilter("all");
    setStatusFilter("all");
    setSortOrder("newest");
  }

  const hasFilters =
    search ||
    eventFilter !== "all" ||
    statusFilter !== "all" ||
    sortOrder !== "newest";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbf9ff] via-white to-[#eefbff] text-slate-900">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-violet-100/80 bg-white/85 backdrop-blur-xl">

        <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-7">
          <button
            onClick={() =>
              navigate("/")
            }
            className="inline-flex"
          >
            <Logo variant="light" />
          </button>

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                navigate(
                  "/builder"
                )
              }
              className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 sm:inline-flex"
            >
              <Plus className="h-4 w-4" />

              Create a Wish
            </button>

            {/* PROFILE */}

            <button
              onClick={() =>
                navigate(
                  "/profile"
                )
              }
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 pr-3 text-left shadow-sm transition hover:border-violet-200 hover:shadow-md"
            >

              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="h-9 w-9 rounded-xl object-cover"
                />
              ) : (
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-black text-white">
                  {initials}
                </div>
              )}

              <div className="hidden sm:block">

                <div className="max-w-[130px] truncate text-xs font-black text-slate-900">
                  {name}
                </div>

                <div className="text-[10px] text-slate-400">
                  View profile
                </div>

              </div>

            </button>

            {/* SIGN OUT */}

            <button
              onClick={
                handleLogout
              }
              className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>

          </div>

        </div>

      </header>

      <main className="mx-auto w-full max-w-[1240px] px-5 py-7 sm:px-7 lg:py-9">

        {/* HERO */}

        <motion.section
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="relative overflow-hidden rounded-[30px] border border-violet-400/10 bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 px-7 py-8 text-white shadow-[0_22px_60px_rgba(124,58,237,.16)] sm:px-9 sm:py-9"
        >

          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-100">
                Your creative space
              </div>

              <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.045em] sm:text-5xl">
                Welcome back,{" "}
                {name.split(" ")[0]} ✨
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                Create, manage and share every Wish from one calm, beautiful workspace.
              </p>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/builder"
                )
              }
              className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-white px-6 py-3.5 font-black text-violet-700 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl lg:self-auto"
            >
              Create something magical

              <ArrowRight className="h-4 w-4" />
            </button>

          </div>

        </motion.section>

        {/* STATS */}

        <section className="mx-auto mt-5 grid w-full max-w-[900px] gap-4 sm:grid-cols-3">

          <StatCard
            icon="✨"
            value={websites.length}
            label="Total Wishes"
          />

          <StatCard
            icon="🌍"
            value={
              publishedCount
            }
            label="Published"
          />

          <StatCard
            icon="📝"
            value={draftCount}
            label="Drafts"
          />

        </section>

        {/* MY WISHES */}

        <section className="mx-auto mt-10 w-full max-w-[1120px]">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-600">
                Your creations
              </div>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                My Wishes
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search, manage and share everything you've created.
              </p>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/profile"
                )
              }
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-violet-200 hover:text-violet-700"
            >
              <Settings className="h-4 w-4" />

              Account settings
            </button>

          </div>

          {/* TOOLBAR */}

          {!loading &&
            websites.length >
              0 && (
              <div className="mt-7 rounded-[26px] border border-violet-100 bg-white p-4 shadow-[0_14px_45px_rgba(89,53,119,.06)]">

                <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_180px_160px_150px_auto]">

                  {/* SEARCH */}

                  <div className="relative">

                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      value={
                        search
                      }
                      onChange={(
                        event
                      ) =>
                        setSearch(
                          event
                            .target
                            .value
                        )
                      }
                      placeholder="Search recipient or occasion..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />

                  </div>

                  {/* EVENT */}

                  <div className="relative">

                    <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <select
                      value={
                        eventFilter
                      }
                      onChange={(
                        event
                      ) =>
                        setEventFilter(
                          event
                            .target
                            .value
                        )
                      }
                      className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-slate-600 outline-none focus:border-violet-400"
                    >
                      <option value="all">
                        All occasions
                      </option>

                      {eventOptions.map(
                        (
                          event
                        ) => (
                          <option
                            key={
                              event
                            }
                            value={
                              event
                            }
                          >
                            {
                              event
                            }
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* STATUS */}

                  <select
                    value={
                      statusFilter
                    }
                    onChange={(
                      event
                    ) =>
                      setStatusFilter(
                        event.target
                          .value
                      )
                    }
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 outline-none focus:border-violet-400"
                  >
                    <option value="all">
                      All status
                    </option>

                    <option value="published">
                      Published
                    </option>

                    <option value="draft">
                      Draft
                    </option>

                  </select>

                  {/* SORT */}

                  <select
                    value={
                      sortOrder
                    }
                    onChange={(
                      event
                    ) =>
                      setSortOrder(
                        event.target
                          .value
                      )
                    }
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 outline-none focus:border-violet-400"
                  >
                    <option value="newest">
                      Newest
                    </option>

                    <option value="oldest">
                      Oldest
                    </option>
                  </select>

                  {/* CLEAR */}

                  {hasFilters && (
                    <button
                      onClick={
                        clearFilters
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50"
                    >
                      <X className="h-4 w-4" />

                      Clear
                    </button>
                  )}

                </div>

                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-400">

                  <LayoutGrid className="h-3.5 w-3.5" />

                  Showing{" "}
                  {
                    filteredWebsites.length
                  }{" "}
                  of{" "}
                  {
                    websites.length
                  }{" "}
                  Wishes

                </div>

              </div>
            )}

          {/* LOADING */}

          {loading ? (
            <div className="mt-7 rounded-[28px] border border-violet-100 bg-white p-14 text-center shadow-sm">

              <Sparkles className="mx-auto h-7 w-7 animate-pulse text-violet-500" />

              <p className="mt-4 text-sm font-bold text-slate-500">
                Loading your WishVerse...
              </p>

            </div>
          ) : websites.length ===
            0 ? (

            /* EMPTY */

            <div className="mt-6 flex min-h-[230px] flex-col items-center justify-center rounded-[28px] border border-dashed border-violet-200 bg-white/85 p-8 text-center shadow-[0_16px_45px_rgba(89,53,119,.05)]">

              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-violet-100 text-3xl">
                💌
              </div>

              <h3 className="mt-5 text-xl font-black">
                Your first Wish starts here.
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Turn photos, words and music into a surprise someone will never forget.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/builder"
                  )
                }
                className="mt-6 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 font-black text-white shadow-lg"
              >
                Create my first Wish
              </button>

            </div>
          ) : filteredWebsites.length ===
            0 ? (

            /* NO SEARCH RESULTS */

            <div className="mt-7 flex min-h-[260px] flex-col items-center justify-center rounded-[30px] border border-slate-200 bg-white p-8 text-center">

              <Search className="h-8 w-8 text-slate-300" />

              <h3 className="mt-4 text-xl font-black text-slate-900">
                No Wishes found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={
                  clearFilters
                }
                className="mt-5 rounded-xl bg-violet-50 px-5 py-2.5 text-sm font-black text-violet-700"
              >
                Clear filters
              </button>

            </div>
          ) : (

            /* CARDS */

            <motion.div
              layout
              className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >

              <AnimatePresence>

                {filteredWebsites.map(
                  (site) => (
                    <motion.article
                      layout
                      key={site.id}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.96,
                      }}
                      className="group overflow-hidden rounded-[26px] border border-violet-100 bg-white shadow-[0_16px_48px_rgba(89,53,119,.07)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(89,53,119,.11)]"
                    >

                      {/* COVER */}

                      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-violet-200 to-pink-200">

                        {site.cover_image ? (
                          <img
                            src={
                              site.cover_image
                            }
                            alt={
                              site.recipient_name ||
                              "Wish cover"
                            }
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-6xl">
                            {getEventEmoji(
                              site.event_type
                            )}
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

                        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-slate-700 backdrop-blur">
                          {getEventEmoji(
                            site.event_type
                          )}{" "}
                          {site.event_type ||
                            "Special Moment"}
                        </div>

                        <div
                          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-black text-white ${
                            site.published !==
                            false
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        >
                          {site.published !==
                          false
                            ? "Published"
                            : "Draft"}
                        </div>

                      </div>

                      {/* CONTENT */}

                      <div className="p-5">

                        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-500">
                          Made for
                        </div>

                        <h3 className="mt-1 truncate text-xl font-black text-slate-950">
                          {site.recipient_name ||
                            "Someone special"}
                        </h3>

                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">

                          <CalendarDays className="h-3.5 w-3.5" />

                          {site.created_at
                            ? new Date(
                                site.created_at
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "Recently"}

                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-2">

                          {/* PREVIEW */}

                          <button
                            onClick={() =>
                              window.open(
                                `/wish/${site.slug}`,
                                "_blank"
                              )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-xs font-black text-white transition hover:bg-slate-800"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />

                            Preview
                          </button>

                          {/* COPY */}

                          <button
                            onClick={() =>
                              copyLink(
                                site
                              )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-100 px-3 py-2.5 text-xs font-black text-violet-700 transition hover:bg-violet-200"
                          >
                            <Copy className="h-3.5 w-3.5" />

                            {copiedId ===
                            site.id
                              ? "Copied ✓"
                              : "Copy link"}
                          </button>

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              navigate(
                                `/builder?edit=${site.id}`
                              )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-black text-slate-600 transition hover:border-violet-200 hover:text-violet-700"
                          >
                            <Pencil className="h-3.5 w-3.5" />

                            Edit
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              setDeleteTarget(
                                site
                              )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2.5 text-xs font-black text-rose-500 transition hover:bg-rose-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />

                            Delete
                          </button>

                        </div>

                      </div>

                    </motion.article>
                  )
                )}

              </AnimatePresence>

            </motion.div>
          )}

        </section>

      </main>

      {/* MOBILE CREATE BUTTON */}

      <button
        onClick={() =>
          navigate("/builder")
        }
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-[0_18px_50px_rgba(124,58,237,.35)] sm:hidden"
        aria-label="Create a Wish"
      >
        <Plus className="h-5 w-5" />
      </button>

      {/* DELETE MODAL */}

      <AnimatePresence>

        {deleteTarget && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/50 px-5 backdrop-blur-sm"
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              className="w-full max-w-md rounded-[30px] bg-white p-7 shadow-2xl"
            >

              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-500">
                <Trash2 className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-2xl font-black text-slate-950">
                Delete this Wish?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                The Wish for{" "}
                <span className="font-bold text-slate-700">
                  {deleteTarget.recipient_name ||
                    "this recipient"}
                </span>{" "}
                will be permanently removed.
              </p>

              <p className="mt-2 text-xs font-semibold text-rose-500">
                This action cannot be undone.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">

                <button
                  disabled={
                    deleting
                  }
                  onClick={() =>
                    setDeleteTarget(
                      null
                    )
                  }
                  className="rounded-2xl border border-slate-200 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  disabled={
                    deleting
                  }
                  onClick={
                    deleteWebsite
                  }
                  className="flex items-center justify-center gap-2 rounded-2xl bg-rose-500 py-3 font-black text-white transition hover:bg-rose-600 disabled:opacity-60"
                >
                  {deleting && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}

                  {deleting
                    ? "Deleting..."
                    : "Delete Wish"}
                </button>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}) {
  return (
    <div className="rounded-[22px] border border-violet-100 bg-white/90 p-5 shadow-[0_12px_32px_rgba(89,53,119,.05)] backdrop-blur">

      <div className="text-2xl">
        {icon}
      </div>

      <div className="mt-2 text-3xl font-black text-slate-950">
        {value}
      </div>

      <div className="mt-1 text-xs font-semibold text-slate-400">
        {label}
      </div>

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