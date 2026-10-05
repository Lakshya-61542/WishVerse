import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Sparkles, WandSparkles } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(heroRef.current?.children || [], { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .12, ease: "power3.out" });
  }, []);

  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-40 sm:px-8 sm:pt-48">
      <div className="absolute left-1/2 top-20 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
      <div ref={heroRef} className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.2em] text-violet-200">
          <Sparkles className="h-3.5 w-3.5" /> Digital surprises, reimagined
        </div>

        <h1 className="max-w-5xl text-balance text-5xl font-black leading-[.98] tracking-[-0.055em] text-white sm:text-7xl lg:text-[88px]">
          Turn a special moment into a <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">world of its own.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-white/55 sm:text-lg">
          Build a cinematic, interactive surprise website with photos, music, private reveals and AI-assisted writing — no design skills needed.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <button onClick={() => navigate("/builder")} className="group flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-[#090b16] shadow-[0_15px_50px_rgba(255,255,255,.12)] transition hover:-translate-y-0.5">
            Start creating free <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
          <a href="#how-it-works" className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white/75 backdrop-blur-xl transition hover:bg-white/10 hover:text-white">
            <Play className="h-4 w-4" /> See how it works
          </a>
        </div>

        <div className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[['No-code builder','Create in minutes'],['Private reveals','Passcode protected'],['WishMuse AI','Write with a little magic']].map(([title,sub], index) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5 text-left backdrop-blur-xl">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">{index === 2 ? <WandSparkles className="h-4 w-4 text-fuchsia-300"/> : <Sparkles className="h-4 w-4 text-violet-300"/>}</div>
              <div className="font-bold text-white">{title}</div><div className="mt-1 text-sm text-white/40">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
