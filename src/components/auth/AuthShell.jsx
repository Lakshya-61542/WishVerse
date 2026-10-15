import { ArrowLeft, Heart, Images, LockKeyhole, Music2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import AuthPageTransition from "./AuthPageTransition";

export default function AuthShell({ children, eyebrow, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#f8f7fc] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[1.04fr_.96fr]">
        <aside className="relative hidden overflow-hidden bg-[#07091a] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/25 blur-[110px]" />
          <div className="absolute -bottom-40 right-0 h-[430px] w-[430px] rounded-full bg-fuchsia-500/20 blur-[120px]" />
          <div className="absolute right-14 top-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-[110px]" />

          <div className="relative">
            <Link to="/" className="inline-flex">
              <Logo />
            </Link>
          </div>

          <div className="relative max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
              <Sparkles className="h-3.5 w-3.5" />
              Your creative space
            </div>

            <h2 className="text-5xl font-black leading-[0.98] tracking-[-0.055em] xl:text-6xl">
              Make someone feel{" "}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                unforgettable.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/55">
              Turn photos, music and words into a private surprise website they can open anywhere.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-3">
              {[
                [Images, "Memory-first", "Photos become part of the story"],
                [Music2, "Soundtracked", "Add the song that means something"],
                [LockKeyhole, "Private reveal", "Keep the surprise protected"],
                [Heart, "Made for them", "Every detail can feel personal"],
              ].map(([Icon, heading, copy]) => (
                <div key={heading} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
                  <Icon className="h-5 w-5 text-violet-300" />
                  <div className="mt-4 text-sm font-extrabold">{heading}</div>
                  <div className="mt-1 text-xs leading-5 text-white/40">{copy}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-white/30">
            Moments, made magical.
          </p>
        </aside>

        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-violet-200/45 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-cyan-100/55 blur-[100px]" />

          <div className="relative w-full max-w-[480px]">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link to="/" className="inline-flex">
                <Logo variant="light" />
              </Link>
              <Link to="/" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            <AuthPageTransition>
              <div className="rounded-[32px] border border-violet-100/90 bg-white/88 p-7 shadow-[0_28px_80px_rgba(76,45,108,.13)] backdrop-blur-2xl sm:p-9">
                {eyebrow && (
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">
                    {eyebrow}
                  </div>
                )}
                <h1 className="mt-3 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-[42px]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {subtitle}
                  </p>
                )}

                <div className="mt-8">{children}</div>
              </div>
            </AuthPageTransition>

            <p className="mt-5 text-center text-xs text-slate-400">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="font-semibold text-slate-600 hover:text-violet-700">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-semibold text-slate-600 hover:text-violet-700">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
