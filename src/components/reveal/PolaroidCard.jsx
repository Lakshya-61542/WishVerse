import { motion } from "framer-motion";
import { getEvent } from "../../data/experience";
import getImageSrc from "../../utils/getImageSrc";
import { themeVisual } from "../../utils/themeClass";

export default function PolaroidCard({ image, recipientName, eventType = "Birthday", themeName = "Aurora" }) {
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);
  const src = getImageSrc(image);

  return (
    <motion.div
      initial={{ y: -260, opacity: 0, rotate: -9, scale: 0.82 }}
      animate={{ y: [0, -4, 0], rotate: [-3.5, -1.5, -3.5], scale: 1, opacity: 1 }}
      transition={{
        y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 5.3, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 1.4, type: "spring", stiffness: 72, damping: 13 },
        opacity: { duration: 0.9 },
      }}
      className="relative w-[248px]"
    >
      <div className="absolute inset-0 translate-y-5 scale-95 rounded-2xl bg-black/45 blur-2xl" />
      <div className="relative rounded-[20px] bg-[#fffaf1] p-3 pb-5 shadow-[0_30px_80px_rgba(0,0,0,.38)]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-zinc-200">
          {src ? (
            <motion.img
              src={src}
              alt={`Memory for ${recipientName || "someone special"}`}
              initial={{ opacity: 0, scale: 1.08, filter: "blur(10px) brightness(1.3)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
              transition={{ duration: 1.6, delay: 0.25 }}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center text-5xl">{event.emoji}</div>
          )}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 300, opacity: [0, 0.55, 0] }}
            transition={{ duration: 0.95, delay: 1.65 }}
            className="absolute top-0 h-full w-10 bg-white/55 blur-md"
          />
        </div>

        <div className="pt-4 text-center">
          <p className="text-[20px] font-semibold leading-tight text-zinc-800" style={{ fontFamily: "Caveat, cursive" }}>
            {event.polaroidTitle}
          </p>
          <p className="mt-1 text-[16px] text-zinc-500" style={{ fontFamily: "Caveat, cursive" }}>
            {recipientName || "Someone special"} <span style={{ color: visual.accent }}>♥</span>
          </p>
        </div>
      </div>

      <div
        className="absolute -left-3 -top-3 grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-black/25 text-xl shadow-lg backdrop-blur-xl"
        style={{ boxShadow: `0 10px 30px ${visual.soft}` }}
      >
        {event.emoji}
      </div>
    </motion.div>
  );
}
