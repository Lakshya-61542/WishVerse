import TypewriterMessage from "./TypewriterMessage";
import LetterPhoto from "./LetterPhoto";
import { motion } from "framer-motion";
import { getEvent } from "../../../data/experience";
import { themeVisual } from "../../../utils/themeClass";

export default function LetterPaper({ letterPhoto, recipientName, message, eventType, themeName }) {
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);

  return (
    <motion.div
      initial={{ y: 210, opacity: 0, scale: 0.78 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 1.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-[13px] top-[16px] h-[426px] overflow-hidden rounded-[20px] bg-[#fffdf8] shadow-[0_18px_45px_rgba(0,0,0,.28)]"
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg,${visual.accent},${visual.accent2})` }} />
      <div className="p-6 pb-3">
        <TypewriterMessage recipientName={recipientName} message={message} eventType={eventType} />
      </div>
      <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[8px] font-black uppercase tracking-[.18em] text-zinc-400">Made for this moment</div>
          <div className="mt-1 text-xl">{event.emoji}</div>
        </div>
        <LetterPhoto letterPhoto={letterPhoto} />
      </div>
    </motion.div>
  );
}
