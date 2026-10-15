import getImageSrc from "../../utils/getImageSrc";
import { motion } from "framer-motion";
import RevealBackground from "./RevealBackground";
import { getEvent } from "../../data/experience";
import { themeVisual } from "../../utils/themeClass";

export default function Scene4({ image, images, recipientName, eventType, themeName }) {
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);
  const src = getImageSrc(images?.[2] || images?.[1] || image);
  const particles = Array.from({ length: 12 }, (_, i) => ({ left: `${7 + ((i * 37) % 86)}%`, delay: (i % 5) * 0.5, duration: 4.2 + (i % 4) * 0.7 }));

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <RevealBackground themeName={themeName} eventEmoji={event.emoji} />

      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-white/55"
          style={{ left: particle.left, boxShadow: `0 0 12px ${visual.accent}` }}
          animate={{ opacity: [0, 0.8, 0], y: [20, -290] }}
          transition={{ repeat: Infinity, duration: particle.duration, delay: particle.delay, ease: "easeOut" }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 rounded-[34px] border border-white/15 bg-white/[.07] p-2.5 backdrop-blur-xl"
        style={{ boxShadow: `0 0 80px ${visual.soft}` }}
      >
        {src ? (
          <motion.img
            src={src}
            alt={recipientName || "Special memory"}
            className="h-[342px] w-[238px] rounded-[27px] object-cover"
            animate={{ scale: [1, 1.018, 1] }}
            transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
          />
        ) : (
          <div className="grid h-[342px] w-[238px] place-items-center rounded-[27px] bg-white/[.04] text-6xl">{event.emoji}</div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="absolute bottom-16 z-30 rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-center backdrop-blur-xl"
      >
        <p className="text-[9px] font-black uppercase tracking-[.22em]" style={{ color: visual.accent2 }}>One of many reasons</p>
        <p className="mt-1 text-lg font-black text-white">{recipientName || "You"} {event.emoji}</p>
      </motion.div>
    </div>
  );
}
