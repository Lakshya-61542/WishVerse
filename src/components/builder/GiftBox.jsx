import { motion } from "framer-motion";
import { getEvent } from "../../data/experience";
import { themeVisual } from "../../utils/themeClass";

export default function GiftBox({ onOpen, eventType = "Birthday", themeName = "Aurora" }) {
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-8 text-center">
      <div className="absolute h-72 w-72 rounded-full blur-[120px]" style={{ background: visual.soft }} />
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative mb-7 rounded-full border border-white/10 bg-white/[.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.22em] text-white/55 backdrop-blur-xl">
        {event.emoji} {event.title}
      </motion.div>
      <motion.button
        onClick={onOpen}
        whileTap={{ scale: .94 }}
        animate={{ y: [0, -7, 0], rotate: [0, -1.5, 1.5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative grid h-32 w-32 place-items-center rounded-[36px] border border-white/15 bg-white/[.08] text-6xl backdrop-blur-xl"
        style={{ boxShadow: `0 25px 75px rgba(0,0,0,.38), 0 0 55px ${visual.soft}` }}
      >
        🎁
        <span className="absolute -right-2 -top-2 grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-black/35 text-xl backdrop-blur-xl">{event.emoji}</span>
      </motion.button>
      <h2 className="relative mt-7 text-[26px] font-black tracking-[-.04em] text-white">A surprise is waiting</h2>
      <p className="relative mt-2 text-xs leading-5 text-white/45">Tap the gift. Your soundtrack and story begin here.</p>
      <motion.div animate={{ opacity: [.25, .8, .25] }} transition={{ duration: 2.2, repeat: Infinity }} className="relative mt-6 text-[9px] font-bold uppercase tracking-[.18em]" style={{ color: visual.accent2 }}>Tap to open ✦</motion.div>
    </div>
  );
}
