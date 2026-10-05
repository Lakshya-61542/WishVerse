import { ArrowRight, Camera, LockKeyhole, Music2, Sparkles, WandSparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Background from "../components/common/Background";
import Navbar from "../components/common/Navbar";
import Hero from "../components/builder/Hero";
import Logo from "../components/common/Logo";
import { EVENTS } from "../data/experience";

const features = [
  { icon: WandSparkles, title: "WishMuse AI", text: "Generate warm, romantic, playful or elegant messages from a few details." },
  { icon: Camera, title: "Memory-first design", text: "Turn your photos into animated galleries, polaroids and cinematic reveals." },
  { icon: Music2, title: "Soundtrack the moment", text: "Add a favourite song and make every reveal feel more personal." },
  { icon: LockKeyhole, title: "Private by design", text: "Add a passcode so the surprise stays a surprise until the right moment." },
];

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Background /><Navbar /><Hero />
      <main>
        <section id="features" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="mb-12 max-w-2xl"><div className="brand-kicker">Built for emotion, not templates</div><h2 className="brand-section-title">Everything you need to make someone feel <span>seen.</span></h2></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{features.map(({icon:Icon,title,text}) => <div key={title} className="premium-card group p-6"><div className="mb-8 grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:bg-violet-500/20"><Icon className="h-5 w-5 text-violet-200"/></div><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/45">{text}</p></div>)}</div>
        </section>

        <section id="occasions" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-2xl"><div className="brand-kicker">For every chapter</div><h2 className="brand-section-title">One brand. <span>Every meaningful moment.</span></h2></div><button onClick={()=>navigate('/builder')} className="text-sm font-bold text-violet-200">Explore all occasions →</button></div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{EVENTS.map(event=><button key={event.title} onClick={()=>navigate(`/builder?event=${encodeURIComponent(event.title)}`)} className="premium-card group p-5 text-left"><div className="text-3xl">{event.emoji}</div><div className="mt-6 font-bold">{event.title}</div><div className="mt-1 text-xs text-white/35">{event.tagline}</div></button>)}</div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-24 sm:px-8"><div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[.06] to-white/[.02] p-7 sm:p-12"><div className="brand-kicker">Simple by design</div><h2 className="brand-section-title max-w-2xl">From idea to shareable link in <span>four steps.</span></h2><div className="mt-12 grid gap-8 md:grid-cols-4">{[['01','Choose the moment','Pick an occasion and visual direction.'],['02','Add your story','Photos, message, music and a letter.'],['03','Make it yours','Use WishMuse AI and preview in real time.'],['04','Publish & share','Get a private, shareable surprise link.']].map(([n,t,d])=><div key={n}><div className="text-xs font-black tracking-[.25em] text-violet-300">{n}</div><h3 className="mt-4 font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-white/40">{d}</p></div>)}</div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8"><div className="relative overflow-hidden rounded-[40px] border border-violet-300/15 bg-violet-600/10 px-6 py-20 text-center"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,.18),transparent_45%)]"/><Sparkles className="relative mx-auto h-7 w-7 text-violet-200"/><h2 className="relative mx-auto mt-5 max-w-3xl text-4xl font-black tracking-[-.04em] sm:text-6xl">Some moments deserve more than a message.</h2><p className="relative mx-auto mt-5 max-w-xl text-white/50">Make the next birthday, proposal, anniversary or celebration impossible to forget.</p><button onClick={()=>navigate('/builder')} className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-[#090b16]">Create with WishVerse <ArrowRight className="h-4 w-4"/></button></div></section>
      </main>
      <footer className="border-t border-white/10 px-5 py-10"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row"><Logo/><p className="text-xs text-white/30">© {new Date().getFullYear()} WishVerse. Crafted for meaningful moments.</p></div></footer>
    </div>
  );
}
