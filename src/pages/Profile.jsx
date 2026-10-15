import {
  ArrowLeft,
  CalendarDays,
  Camera,
  Globe2,
  Loader2,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { motion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const navigate = useNavigate();

  const { user, signOut } = useAuth();

  const avatarInputRef = useRef(null);

  const [fullName, setFullName] =
    useState("");

  const [avatarUrl, setAvatarUrl] =
    useState("");

  const [memberSince, setMemberSince] =
    useState(null);

  const [totalWishes, setTotalWishes] =
    useState(0);

  const [publishedWishes, setPublishedWishes] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadingAvatar, setUploadingAvatar] =
    useState(false);

  const [sendingReset, setSendingReset] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("success");

  useEffect(() => {
    if (!user) return;

    loadProfile();
  }, [user]);

  async function loadProfile() {
    setLoading(true);

    try {
      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select(
          "full_name, avatar_url, created_at"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "Profile load error:",
          profileError
        );
      }

      const resolvedName =
        profileData?.full_name ||
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        "";

      const resolvedAvatar =
        profileData?.avatar_url ||
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        "";

      setFullName(resolvedName);
      setAvatarUrl(resolvedAvatar);

      setMemberSince(
        profileData?.created_at ||
          user.created_at ||
          null
      );

      const {
        data: wishes,
        error: wishesError,
      } = await supabase
        .from("websites")
        .select("id, published")
        .eq("owner_id", user.id);

      if (wishesError) {
        console.error(
          "Wish stats error:",
          wishesError
        );
      }

      const safeWishes =
        wishes || [];

      setTotalWishes(
        safeWishes.length
      );

      setPublishedWishes(
        safeWishes.filter(
          (wish) =>
            wish.published !== false
        ).length
      );
    } catch (error) {
      console.error(
        "Profile error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const initials = useMemo(() => {
    const source =
      fullName ||
      user?.email ||
      "WV";

    return source
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [
    fullName,
    user?.email,
  ]);

  const provider = useMemo(() => {
    const currentProvider =
      user?.app_metadata?.provider;

    if (
      currentProvider === "google"
    ) {
      return "Google";
    }

    return "Email";
  }, [user]);

  async function saveProfile(event) {
    event.preventDefault();

    if (!fullName.trim()) {
      setMessageType("error");
      setMessage(
        "Please enter your name."
      );
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const {
        error: profileError,
      } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            full_name:
              fullName.trim(),
            avatar_url:
              avatarUrl || null,
          },
          {
            onConflict: "id",
          }
        );

      if (profileError) {
        throw profileError;
      }

      const {
        error: authError,
      } =
        await supabase.auth.updateUser({
          data: {
            full_name:
              fullName.trim(),
            avatar_url:
              avatarUrl || null,
          },
        });

      if (authError) {
        throw authError;
      }

      setMessageType("success");

      setMessage(
        "Profile updated successfully."
      );
    } catch (error) {
      console.error(error);

      setMessageType("error");

      setMessage(
        error.message ||
          "Could not update your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarUpload(
    event
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith("image/")
    ) {
      setMessageType("error");
      setMessage(
        "Please choose an image file."
      );
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setMessageType("error");
      setMessage(
        "Profile photo must be below 5 MB."
      );
      return;
    }

    setUploadingAvatar(true);
    setMessage("");

    try {
      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() ||
        "jpg";

      const filePath =
        `${user.id}/avatar.${extension}`;

      const {
        error: uploadError,
      } =
        await supabase.storage
          .from("avatars")
          .upload(
            filePath,
            file,
            {
              upsert: true,
            }
          );

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: publicData,
      } =
        supabase.storage
          .from("avatars")
          .getPublicUrl(
            filePath
          );

      const newAvatarUrl =
        `${publicData.publicUrl}?v=${Date.now()}`;

      setAvatarUrl(
        newAvatarUrl
      );

      const {
        error: profileError,
      } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            full_name:
              fullName.trim(),
            avatar_url:
              newAvatarUrl,
          },
          {
            onConflict: "id",
          }
        );

      if (profileError) {
        throw profileError;
      }

      await supabase.auth.updateUser({
        data: {
          avatar_url:
            newAvatarUrl,
        },
      });

      setMessageType("success");

      setMessage(
        "Profile photo updated."
      );
    } catch (error) {
      console.error(
        "Avatar upload error:",
        error
      );

      setMessageType("error");

      setMessage(
        error.message ||
          "Could not upload profile photo."
      );
    } finally {
      setUploadingAvatar(false);

      if (
        avatarInputRef.current
      ) {
        avatarInputRef.current.value =
          "";
      }
    }
  }

  async function sendPasswordReset() {
    if (!user?.email) return;

    setSendingReset(true);
    setMessage("");

    try {
      const {
        error,
      } =
        await supabase.auth
          .resetPasswordForEmail(
            user.email,
            {
              redirectTo:
                `${window.location.origin}/reset-password`,
            }
          );

      if (error) {
        throw error;
      }

      setMessageType("success");

      setMessage(
        `Password reset link sent to ${user.email}.`
      );
    } catch (error) {
      console.error(error);

      setMessageType("error");

      setMessage(
        error.message ||
          "Could not send reset email."
      );
    } finally {
      setSendingReset(false);
    }
  }

  async function handleSignOut() {
    await signOut();

    navigate("/", {
      replace: true,
    });
  }

  const formattedDate =
    memberSince
      ? new Date(
          memberSince
        ).toLocaleDateString(
          "en-IN",
          {
            month: "long",
            year: "numeric",
          }
        )
      : "Recently";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#faf8ff] via-white to-[#eefbff]">

        <div className="text-center">

          <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-600" />

          <p className="mt-4 font-bold text-slate-600">
            Loading your profile...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-white to-[#eefbff] text-slate-900">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">

          <button
            onClick={() =>
              navigate("/")
            }
          >
            <Logo variant="light" />
          </button>

          <button
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />

            Dashboard
          </button>

        </div>

      </header>

      <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-14">

        {/* PAGE HEADING */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >

          <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-600">
            Your WishVerse
          </div>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Profile & account
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Manage your creator identity,
            security and WishVerse activity.
          </p>

        </motion.div>

        {/* PROFILE GRID */}

        <div className="mt-10 grid gap-7 lg:grid-cols-[340px_minmax(0,1fr)]">

          {/* LEFT SIDE */}

          <motion.aside
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="h-fit rounded-[32px] border border-violet-100 bg-white p-7 shadow-[0_24px_70px_rgba(76,45,108,.09)]"
          >

            <div className="flex flex-col items-center text-center">

              {/* AVATAR */}

              <div className="group relative">

                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="h-28 w-28 rounded-[30px] object-cover shadow-xl ring-4 ring-violet-50"
                  />
                ) : (
                  <div className="grid h-28 w-28 place-items-center rounded-[30px] bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 text-3xl font-black text-white shadow-xl">
                    {initials}
                  </div>
                )}

                <button
                  type="button"
                  disabled={
                    uploadingAvatar
                  }
                  onClick={() =>
                    avatarInputRef.current?.click()
                  }
                  className="absolute -bottom-2 -right-2 grid h-10 w-10 place-items-center rounded-2xl border-4 border-white bg-slate-950 text-white shadow-lg transition hover:scale-105 disabled:opacity-60"
                >
                  {uploadingAvatar ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </button>

                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={
                    handleAvatarUpload
                  }
                  className="hidden"
                />

              </div>

              <h2 className="mt-6 text-2xl font-black tracking-[-0.03em] text-slate-950">
                {fullName ||
                  "WishVerse Creator"}
              </h2>

              <p className="mt-1 max-w-full break-all text-sm text-slate-400">
                {user?.email}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                <ShieldCheck className="h-3.5 w-3.5" />

                {provider} account
              </div>

            </div>

            {/* MEMBER INFO */}

            <div className="mt-7 border-t border-slate-100 pt-6">

              <div className="flex items-center gap-3 text-sm text-slate-500">

                <CalendarDays className="h-4 w-4 text-violet-500" />

                Member since{" "}
                <span className="font-bold text-slate-700">
                  {formattedDate}
                </span>

              </div>

            </div>

            {/* SIGN OUT */}

            <button
              onClick={
                handleSignOut
              }
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3.5 text-sm font-black text-white transition hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />

              Sign out
            </button>

          </motion.aside>

          {/* RIGHT */}

          <div className="space-y-7">

            {/* STATS */}

            <motion.section
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.05,
              }}
              className="grid gap-4 sm:grid-cols-3"
            >

              <StatCard
                icon={
                  <Sparkles />
                }
                value={
                  totalWishes
                }
                label="Total Wishes"
              />

              <StatCard
                icon={
                  <Globe2 />
                }
                value={
                  publishedWishes
                }
                label="Published"
              />

              <StatCard
                icon={
                  <UserRound />
                }
                value={
                  provider
                }
                label="Sign-in method"
                smaller
              />

            </motion.section>

            {/* ACCOUNT SETTINGS */}

            <motion.section
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.1,
              }}
              className="rounded-[32px] border border-violet-100 bg-white p-7 shadow-[0_24px_70px_rgba(76,45,108,.09)] sm:p-9"
            >

              <div className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">
                Account settings
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Your profile
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Keep your WishVerse identity
                up to date.
              </p>

              <form
                onSubmit={
                  saveProfile
                }
                className="mt-8 space-y-6"
              >

                {/* NAME */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">

                    <UserRound className="h-4 w-4 text-violet-500" />

                    Full name

                  </label>

                  <input
                    value={
                      fullName
                    }
                    onChange={(
                      event
                    ) =>
                      setFullName(
                        event.target
                          .value
                      )
                    }
                    placeholder="Your name"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 caret-violet-600 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">

                    <Mail className="h-4 w-4 text-violet-500" />

                    Email

                  </label>

                  <input
                    value={
                      user?.email ||
                      ""
                    }
                    readOnly
                    className="mt-2 w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-500"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Your email is
                    managed by your
                    authentication
                    provider.
                  </p>

                </div>

                {/* MESSAGE */}

                {message && (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      messageType ===
                      "success"
                        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                        : "border-rose-100 bg-rose-50 text-rose-700"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <button
                  disabled={
                    saving
                  }
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 font-black text-white shadow-lg shadow-violet-100 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save changes"}

                </button>

              </form>

            </motion.section>

            {/* SECURITY */}

            <motion.section
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.15,
              }}
              className="rounded-[32px] border border-violet-100 bg-white p-7 shadow-[0_24px_70px_rgba(76,45,108,.07)] sm:p-9"
            >

              <div className="flex items-start gap-4">

                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-50 text-violet-600">

                  <ShieldCheck className="h-5 w-5" />

                </div>

                <div className="flex-1">

                  <h3 className="text-xl font-black text-slate-950">
                    Password & security
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    We'll send a secure
                    password-reset link to
                    your account email.
                  </p>

                  <button
                    type="button"
                    disabled={
                      sendingReset
                    }
                    onClick={
                      sendPasswordReset
                    }
                    className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-3 text-sm font-black text-violet-700 transition hover:bg-violet-100 disabled:opacity-60"
                  >

                    {sendingReset && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}

                    {sendingReset
                      ? "Sending..."
                      : "Send password reset link"}

                  </button>

                </div>

              </div>

            </motion.section>

          </div>

        </div>

      </main>

    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  smaller = false,
}) {
  return (
    <div className="rounded-[26px] border border-violet-100 bg-white p-6 shadow-[0_18px_50px_rgba(76,45,108,.06)]">

      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </div>

      <div
        className={`mt-5 font-black text-slate-950 ${
          smaller
            ? "text-xl"
            : "text-4xl"
        }`}
      >
        {value}
      </div>

      <p className="mt-1 text-sm font-semibold text-slate-400">
        {label}
      </p>

    </div>
  );
}