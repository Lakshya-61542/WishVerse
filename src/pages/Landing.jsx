import {
  ArrowRight,
  Camera,
  LockKeyhole,
  Music2,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Background from "../components/common/Background";
import Hero from "../components/builder/Hero";
import Logo from "../components/common/Logo";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";
import { EVENTS } from "../data/experience";

const features = [
  {
    icon: WandSparkles,
    title: "WishMuse AI",
    text: "Shape a warm, playful, romantic or elegant message from a few details.",
  },
  {
    icon: Camera,
    title: "Memory-first",
    text: "Turn your photos into animated galleries, polaroids and cinematic reveals.",
  },
  {
    icon: Music2,
    title: "Soundtracked",
    text: "Add a favourite song so the reveal feels unmistakably personal.",
  },
  {
    icon: LockKeyhole,
    title: "Private reveal",
    text: "Add a passcode and share the surprise only when the moment is right.",
  },
];

const steps = [
  ["01", "Choose the moment", "Pick the occasion and visual direction."],
  ["02", "Make it personal", "Add photos, a message, music and an intimate letter."],
  ["03", "Preview the story", "Watch the reveal take shape live while you build."],
  ["04", "Publish & share", "Send one private link they can open on any device."],
];

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createPath = user ? "/builder" : "/signup";
  const visibleEvents = EVENTS.slice(0, 8);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <Background />
      <Navbar />
      <Hero />

      <main>
        <section id="features" className="relative border-y border-white/[0.06] bg-white/[0.018] py-24 sm:py-28">
          <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="brand-kicker">Built for emotion, not templates</div>
              <h2 className="brand-section-title">
                Everything you need to make someone feel <span>seen.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
                WishVerse keeps the technology out of the way so the memories stay at the centre.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {features.map(({ icon: Icon, title, text }) => (
                <article key={title} className="premium-card group min-h-[220px] p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:bg-violet-500/20">
                    <Icon className="h-5 w-5 text-violet-200" />
                  </div>
                  <h3 className="mt-8 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/42">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="occasions" className="py-24 sm:py-28">
          <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="brand-kicker">For every chapter</div>
                <h2 className="brand-section-title">
                  One brand. <span>Every meaningful moment.</span>
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
                  Start with one of the most-loved occasions, then personalise every detail.
                </p>
              </div>

              <button
                onClick={() => navigate(createPath)}
                className="group inline-flex items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-violet-100 transition hover:border-violet-300/25 hover:bg-violet-500/10"
              >
                Explore all {EVENTS.length} occasions
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visibleEvents.map((event) => (
                <button
                  key={event.title}
                  onClick={() => {
                    const builderPath = `/builder?event=${encodeURIComponent(event.title)}`;
                    navigate(
                      user
                        ? builderPath
                        : `/signup?next=${encodeURIComponent(builderPath)}`
                    );
                  }}
                  className="premium-card group min-h-[190px] p-6 text-left"
                >
                  <div className="text-4xl">{event.emoji}</div>
                  <div className="mt-7 text-lg font-black">{event.title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/38">{event.tagline}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-white/[0.06] bg-white/[0.018] py-24 sm:py-28">
          <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="brand-kicker">Simple by design</div>
              <h2 className="brand-section-title">
                From idea to shareable link in <span>four steps.</span>
              </h2>
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-4">
              {steps.map(([number, title, copy]) => (
                <div
                  key={number}
                  className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.025] p-7"
                >
                  <div className="text-xs font-black tracking-[0.22em] text-violet-300">{number}</div>
                  <h3 className="mt-8 text-lg font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/40">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-28">
          <div className="mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12">
            <div className="relative overflow-hidden rounded-[42px] border border-violet-300/15 bg-gradient-to-br from-violet-600/16 via-fuchsia-500/8 to-cyan-400/8 px-6 py-20 text-center sm:px-12 lg:py-24">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,.24),transparent_48%)]" />
              <Sparkles className="relative mx-auto h-8 w-8 text-violet-200" />
              <h2 className="relative mx-auto mt-6 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Some moments deserve more than a message.
              </h2>
              <p className="relative mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                Make the next birthday, proposal, anniversary or celebration impossible to forget.
              </p>
              <button
                onClick={() => navigate(createPath)}
                className="relative mt-9 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-[#090b16] transition hover:-translate-y-0.5"
              >
                Create with WishVerse
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <Logo />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/35">
            <button onClick={() => navigate("/privacy")} className="transition hover:text-white">Privacy</button>
            <button onClick={() => navigate("/terms")} className="transition hover:text-white">Terms</button>
            <button onClick={() => navigate(user ? "/dashboard" : "/login")} className="transition hover:text-white">
              {user ? "Dashboard" : "Sign in"}
            </button>
            <span>© {new Date().getFullYear()} WishVerse</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
