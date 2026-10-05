import { motion } from "framer-motion";
import RevealLayout from "./RevealLayout";
import RevealBackground from "./RevealBackground";
import { getEvent } from "../../data/experience";
import { themeVisual } from "../../utils/themeClass";

export default function CelebrationScene({ recipientName, eventType, themeName, onComplete }) {
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);

  return (
    <RevealLayout background="bg-black">
      <RevealBackground themeName={themeName} eventEmoji={event.emoji} />
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="grid h-24 w-24 place-items-center rounded-[32px] border border-white/10 bg-white/[.06] text-5xl backdrop-blur-xl"
          style={{ boxShadow: `0 20px 65px ${visual.soft}` }}
        >
          {event.emoji}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mt-6 text-[9px] font-black uppercase tracking-[.26em]" style={{ color: visual.accent2 }}>
          {event.title}
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }} className="mt-3 max-w-[270px] text-[30px] font-black leading-[.98] tracking-[-.05em] text-white">
          This moment belongs to {recipientName || "you"}.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="mt-4 max-w-[260px] text-[12px] leading-5 text-white/50">
          {event.finalNote}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72 }}
          onClick={onComplete}
          className="mt-7 rounded-full bg-white px-5 py-3 text-[11px] font-black text-[#080a13] shadow-xl"
        >
          See the finale ✨
        </motion.button>
      </div>
    </RevealLayout>
  );
}
