import { motion } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";

export default function PublishLoader({ progress, status }) {
  return (
    <div className="fixed inset-0 z-[9998] grid place-items-center bg-[#050816]/85 px-5 backdrop-blur-xl">
      <motion.div initial={{ scale: .94, opacity: 0, y: 18 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#0c0e1a] p-7 shadow-[0_30px_100px_rgba(0,0,0,.55)]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-violet-300/20 bg-violet-500/10"><Rocket className="h-6 w-6 text-violet-200" /></div>
        <div className="mt-5 text-center text-xl font-black text-white">Publishing your WishVerse</div>
        <p className="mt-2 text-center text-sm text-white/40">Keep this tab open while we prepare your surprise.</p>
        <div className="mt-7 flex items-center justify-between text-xs"><span className="font-semibold text-violet-200">{status}</span><span className="font-black text-white">{progress}%</span></div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[.07]"><motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300" animate={{ width: `${progress}%` }} transition={{ duration: .35, ease: "easeOut" }}/></div>
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[.18em] text-white/25"><Sparkles className="h-3 w-3"/> Moments, made magical</div>
      </motion.div>
    </div>
  );
}
