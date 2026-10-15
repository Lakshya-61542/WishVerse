import { ArrowRight, Check, Images, LockKeyhole, Music2, Sparkles, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createPath = user ? "/builder" : "/signup";

  return (
    <section className="relative overflow-hidden pb-20 pt-[118px] sm:pb-24 sm:pt-[132px] lg:pb-28 lg:pt-[150px]">
      <div className="pointer-events-none absolute left-[8%] top-28 h-[440px] w-[440px] rounded-full bg-violet-600/18 blur-[120px]" />
      <div className="pointer-events-none absolute right-[7%] top-32 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[125px]" />

      <div className="relative mx-auto grid w-full max-w-[1680px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:px-12 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[800px]"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
            <Sparkles className="h-3.5 w-3.5" />
            Digital surprises, reimagined
          </div>

          <h1 className="mt-7 text-[clamp(3.5rem,6.3vw,7.4rem)] font-black leading-[0.9] tracking-[-0.065em] text-white">
            Turn memories into{" "}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              something unforgettable.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            Build a cinematic surprise website with photos, music, a private reveal and AI-assisted writing — then share it with one beautiful link.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => navigate(createPath)}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-[#090b16] shadow-[0_15px_50px_rgba(255,255,255,.12)] transition hover:-translate-y-0.5"
            >
              Start creating free
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-white/70 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/45">
            {["No design skills", "Private share links", "Edit anytime"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[620px]"
        >
          <div className="absolute -inset-6 rounded-[54px] bg-gradient-to-br from-violet-500/20 via-fuchsia-400/10 to-cyan-400/10 blur-2xl" />

          <div className="relative rounded-[42px] border border-white/10 bg-white/[0.055] p-4 shadow-[0_35px_100px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:p-5">
            <div className="mb-4 flex items-center justify-between px-1">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Live experience</div>
                <div className="mt-1 text-sm font-bold text-white/80">Birthday · Aurora</div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-violet-200">
                Preview
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
              <div className="relative min-h-[390px] overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-violet-700 via-fuchsia-700 to-[#11152f] p-6">
                <div className="absolute -right-10 -top-8 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-fuchsia-300/20 blur-3xl" />

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-xl">🎂</div>
                    <Sparkles className="h-5 w-5 text-white/55" />
                  </div>

                  <div className="py-10 text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl border border-white/15 bg-white/10">
                      <WandSparkles className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mx-auto mt-6 max-w-xs text-3xl font-black leading-tight">
                      Something special is waiting.
                    </h3>
                    <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-white/55">
                      A little corner of the internet was made just for you.
                    </p>
                    <div className="mx-auto mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-black text-violet-700">
                      Open your surprise ✨
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[Images, Music2, LockKeyhole].map((Icon, index) => (
                      <div key={index} className="grid h-12 place-items-center rounded-2xl border border-white/10 bg-black/10">
                        <Icon className="h-4 w-4 text-white/55" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden flex-col gap-3 sm:flex">
                {[
                  ["01", "Choose", "Occasion"],
                  ["02", "Personalise", "Photos & story"],
                  ["03", "Publish", "Share the magic"],
                ].map(([n, title, copy]) => (
                  <div key={n} className="flex-1 rounded-[24px] border border-white/10 bg-black/10 p-4">
                    <div className="text-[10px] font-black tracking-[0.2em] text-violet-300">{n}</div>
                    <div className="mt-4 text-sm font-black">{title}</div>
                    <div className="mt-1 text-xs leading-5 text-white/35">{copy}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
