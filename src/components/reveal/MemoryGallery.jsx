import { motion } from "framer-motion";
import PhotoFrame from "./gallery/PhotoFrame";
import Sparkles from "./gallery/Sparkles";
import RevealBackground from "./RevealBackground";
import { getEvent } from "../../data/experience";
import { themeVisual } from "../../utils/themeClass";
import getImageSrc from "../../utils/getImageSrc";

export default function MemoryGallery({ images = [], eventType, themeName }) {
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);
  const visibleImages = images.filter(Boolean).slice(0, 5);
  const mainImages = visibleImages.slice(0, 4);
  const extraImage = visibleImages[4];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative h-full w-full overflow-hidden"
    >
      <RevealBackground themeName={themeName} eventEmoji={event.emoji} />
      <Sparkles />

      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.65 }}
        className="absolute inset-x-5 top-7 z-30 text-center"
      >
        <div className="text-[8px] font-black uppercase tracking-[.22em]" style={{ color: visual.accent2 }}>{event.gallerySubtitle}</div>
        <h2 className="mx-auto mt-2 max-w-[270px] text-[23px] font-black leading-[1.02] tracking-[-.04em] text-white">{event.galleryTitle}</h2>
      </motion.div>

      {mainImages.length ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.75 }}
          className="absolute left-1/2 top-[116px] z-20 grid w-[256px] -translate-x-1/2 grid-cols-2 place-items-center gap-x-3 gap-y-3"
        >
          {mainImages.map((photo, index) => (
            <PhotoFrame key={typeof photo === "string" ? photo : photo.id || index} photo={photo} index={index} accent={visual.accent} />
          ))}
        </motion.div>
      ) : (
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-white/[.06] px-7 py-8 text-center backdrop-blur-xl">
          <div className="text-4xl">{event.emoji}</div>
          <p className="mt-3 whitespace-nowrap text-sm font-bold text-white">Your memories will live here.</p>
        </div>
      )}

      {extraImage && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/30 py-1.5 pl-1.5 pr-3 backdrop-blur-xl"
        >
          <img src={getImageSrc(extraImage)} alt="One more memory" className="h-8 w-8 rounded-full border border-white/20 object-cover" />
          <span className="whitespace-nowrap text-[9px] font-bold text-white/65">One more favourite ✦</span>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.48 }}
        transition={{ delay: 1.6 }}
        className="absolute inset-x-5 bottom-5 z-30 text-center text-[9px] font-semibold tracking-wide text-white"
      >
        Some moments are too good to leave in the camera roll.
      </motion.p>
    </motion.div>
  );
}
