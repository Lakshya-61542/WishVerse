import { motion } from "framer-motion";
import RevealBackground from "./RevealBackground";
import getImageSrc from "../../utils/getImageSrc";
import { getEvent } from "../../data/experience";
import { themeVisual } from "../../utils/themeClass";

export default function Scene1({ image, recipientName, eventType, themeName }) {
  const src = getImageSrc(image);
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <RevealBackground themeName={themeName} eventEmoji={event.emoji} />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute top-8 z-30 rounded-full border border-white/10 bg-black/15 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.2em] text-white/60 backdrop-blur-xl"
      >
        {event.title} • made with WishVerse
      </motion.div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.65, 1.08, 1], opacity: [0, 0.85, 0.6] }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute z-10 h-64 w-64 rounded-full blur-[115px]"
        style={{ background: visual.glow }}
      />

      {src ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.72, rotate: -5, y: 18 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20"
        >
          <div className="absolute -inset-3 rounded-[30px] border border-white/10 bg-white/[.055] backdrop-blur-md" />
          <img src={src} alt="A special memory" className="relative h-[300px] w-[218px] rounded-[24px] border border-white/30 object-cover shadow-[0_30px_90px_rgba(0,0,0,.5)]" />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center backdrop-blur-xl">
            <p className="text-[9px] font-black uppercase tracking-[.2em] text-white/45">A moment for</p>
            <p className="mt-1 text-lg font-black text-white">{recipientName || "Someone special"}</p>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="relative z-20 text-7xl">
          {event.emoji}
        </motion.div>
      )}
    </div>
  );
}
