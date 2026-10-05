import { useState } from "react";
import { motion } from "framer-motion";
import InvitationCard from "./letter/InvitationCard";
import LetterPaper from "./letter/LetterPaper";
import RevealBackground from "./RevealBackground";
import { getEvent } from "../../data/experience";
import { themeVisual } from "../../utils/themeClass";

export default function LetterScene({ letterPhoto, recipientName, message, eventType, themeName, onContinue }) {
  const [opened, setOpened] = useState(false);
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 pb-16 pt-8">
      <RevealBackground themeName={themeName} eventEmoji={event.emoji} />
      <div className="relative z-20 -mt-4">
        <InvitationCard onOpened={() => setOpened(true)} eventType={eventType} themeName={themeName}>
          {opened && <LetterPaper letterPhoto={letterPhoto} recipientName={recipientName} message={message} eventType={eventType} themeName={themeName} />}
        </InvitationCard>
      </div>

      {opened && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.15 }}
          onClick={onContinue}
          className="absolute bottom-5 z-30 rounded-full border border-white/10 bg-white px-5 py-2.5 text-xs font-black text-[#090b16] shadow-xl"
          style={{ boxShadow: `0 12px 40px ${visual.soft}` }}
        >
          Continue {event.emoji}
        </motion.button>
      )}
    </div>
  );
}
