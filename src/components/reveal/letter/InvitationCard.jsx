import { motion } from "framer-motion";
import { getEvent } from "../../../data/experience";
import { themeVisual } from "../../../utils/themeClass";

export default function InvitationCard({ onOpened, eventType, themeName, children }) {
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);

  return (
    <div className="relative h-[458px] w-[286px]" style={{ perspective: "1600px" }}>
      <div className="absolute inset-0 overflow-hidden rounded-[26px] bg-[#fffaf2] shadow-[0_30px_100px_rgba(0,0,0,.45)]">{children}</div>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -166 }}
        transition={{ delay: 0.9, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={onOpened}
        style={{
          transformOrigin: "left",
          transformStyle: "preserve-3d",
          background: `linear-gradient(145deg, ${visual.glow}66, #140b1e 46%, #050608)`,
        }}
        className="absolute inset-0 rounded-[26px] border border-white/15 shadow-2xl"
      >
        <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_75%_15%,rgba(255,255,255,.16),transparent_30%)]" />
        <div className="relative flex h-full flex-col items-center justify-center px-7 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/[.08] text-3xl shadow-xl backdrop-blur-xl">💌</div>
          <div className="mt-6 text-[9px] font-black uppercase tracking-[.23em]" style={{ color: visual.accent2 }}>{event.title}</div>
          <h1 className="mt-2 text-3xl font-black tracking-[-.04em] text-white">A letter for you</h1>
          <p className="mt-3 text-xs leading-5 text-white/45">Some things deserve more than a quick message.</p>
          <div className="mt-6 rounded-full border border-white/10 bg-white/[.06] px-4 py-2 text-[10px] font-bold text-white/60">Opening…</div>
        </div>
      </motion.div>
    </div>
  );
}
