import { motion } from "framer-motion";
import RevealBackground from "./RevealBackground";
import getImageSrc from "../../utils/getImageSrc";
import { getEvent } from "../../data/experience";
import { themeVisual } from "../../utils/themeClass";

export default function Scene3({ image, images, recipientName, eventType, themeName }) {
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);
  const src = getImageSrc(images?.[1] || images?.[0] || image);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <RevealBackground themeName={themeName} eventEmoji={event.emoji} />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-[252px] overflow-hidden rounded-[30px] border border-white/15 bg-white/[.07] p-2.5 shadow-[0_30px_100px_rgba(0,0,0,.42)] backdrop-blur-xl"
      >
        <div className="relative h-[330px] overflow-hidden rounded-[23px] bg-black/20">
          {src ? <img src={src} alt="Memory" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-6xl">{event.emoji}</div>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-[9px] font-black uppercase tracking-[.22em]" style={{ color: visual.accent2 }}>{event.title}</p>
            <h2 className="mt-2 text-2xl font-black leading-[1.05] tracking-[-.04em] text-white">
              A memory that feels like {recipientName || "you"}.
            </h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
