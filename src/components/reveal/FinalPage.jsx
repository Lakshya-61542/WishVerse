import MemoryCard from "./final/MemoryCard";
import BackgroundStars from "./final/BackgroundStars";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import html2canvas from "html2canvas";
import getImageSrc from "../../utils/getImageSrc";
import { getEvent } from "../../data/experience";
import { themeVisual } from "../../utils/themeClass";

export default function FinalPage({ image, recipientName, message, audioRef, eventType = "Birthday", themeName = "Aurora" }) {
  const memoryRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [flash, setFlash] = useState(false);
  const [copied, setCopied] = useState(false);
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);
  const imageSrc = getImageSrc(image);

  useEffect(() => {
    if (!audioRef?.current) return;
    const audio = audioRef.current;
    const targetVolume = 0.42;
    audio.volume = Math.min(1, Math.max(audio.volume || 1, targetVolume));
    const interval = setInterval(() => {
      if (audio.volume <= targetVolume + 0.02) {
        audio.volume = targetVolume;
        clearInterval(interval);
      } else {
        audio.volume = Math.max(targetVolume, audio.volume - 0.035);
      }
    }, 110);
    return () => clearInterval(interval);
  }, [audioRef]);

  const saveMemory = async () => {
    if (!memoryRef.current || saving) return;
    setSaving(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 220);
    try {
      const canvas = await html2canvas(memoryRef.current, { scale: 2, useCORS: true, backgroundColor: null });
      const link = document.createElement("a");
      link.download = `${recipientName || "WishVerse"}-${event.title.replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      link.remove();
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } finally {
      setSaving(false);
    }
  };

  const shareMemory = async () => {
    const shareData = {
      title: `${event.title} • WishVerse`,
      text: `A special ${event.title.toLowerCase()} surprise for ${recipientName || "someone special"} ✨`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85 }}
      className="absolute inset-0 overflow-hidden text-white"
      style={{ background: visual.background }}
    >
      <BackgroundStars />
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full blur-[110px]" style={{ background: visual.soft }} />
      <div className="absolute -right-24 bottom-12 h-72 w-72 rounded-full blur-[125px]" style={{ background: `${visual.accent2}20` }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,.12),transparent_31%)]" />

      <AnimatePresence>
        {flash && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] bg-white" />}
      </AnimatePresence>

      <div className="relative z-20 flex h-full w-full flex-col items-center overflow-y-auto px-5 pb-12 pt-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-full border border-white/10 bg-white/[.06] px-3 py-1.5 text-[8px] font-black uppercase tracking-[.22em] text-white/55 backdrop-blur-xl">
          {event.emoji} {event.title} • WishVerse
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.72, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 rounded-full p-[3px]"
          style={{ background: `linear-gradient(135deg,#fff,${visual.accent},${visual.accent2})`, boxShadow: `0 18px 55px ${visual.soft}` }}
        >
          {imageSrc ? (
            <img src={imageSrc} alt={recipientName || "Special memory"} className="h-[112px] w-[112px] rounded-full border-[5px] border-[#120a1d] object-cover" />
          ) : (
            <div className="grid h-[112px] w-[112px] place-items-center rounded-full border-[5px] border-[#120a1d] bg-black/30 text-4xl">{event.emoji}</div>
          )}
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mt-4 text-[21px] font-black tracking-[-.03em] text-white">
          {recipientName || "Someone special"} <span style={{ color: visual.accent }}>♥</span>
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }} className="mt-4 text-center">
          <div className="text-[20px] font-black leading-none tracking-[-.035em] text-white">{event.finalTop}</div>
          <div className="mt-1 text-[29px] font-black leading-none tracking-[.08em]" style={{ color: visual.accent2 }}>{event.finalBottom}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58 }}
          className="mt-5 w-full max-w-[286px] rounded-[22px] border border-white/10 bg-white/[.075] p-4 shadow-[0_18px_50px_rgba(0,0,0,.18)] backdrop-blur-xl"
        >
          <div className="mb-2 flex items-center gap-2 text-[8px] font-black uppercase tracking-[.18em]" style={{ color: visual.accent2 }}>
            <span>💌</span> A note for you
          </div>
          <div className="max-h-[114px] overflow-y-auto pr-1 [scrollbar-width:thin]">
            <TypeAnimation
              sequence={[message || event.finalNote]}
              speed={72}
              cursor={false}
              className="block text-[12px] leading-[1.65] text-white/76"
            />
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-3 max-w-[265px] text-center text-[9px] leading-4 text-white/38">
          {event.finalNote}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92 }} className="mt-5 flex gap-2">
          <button onClick={saveMemory} disabled={saving} className="rounded-full bg-white px-4 py-2.5 text-[10px] font-black text-[#090b16] shadow-lg disabled:opacity-60">
            {saving ? "Preparing…" : "📸 Save memory"}
          </button>
          <button onClick={shareMemory} className="rounded-full border border-white/12 bg-white/[.07] px-4 py-2.5 text-[10px] font-black text-white backdrop-blur-xl">📤 Share</button>
        </motion.div>

        <p className="mt-5 text-[8px] font-semibold uppercase tracking-[.18em] text-white/24">Made with WishVerse</p>
      </div>

      <AnimatePresence>
        {(saved || copied) && (
          <motion.div initial={{ opacity: 0, y: -15, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} className="absolute left-1/2 top-4 z-[150] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-4 py-2 text-[10px] font-bold text-white backdrop-blur-xl">
            {saved ? "📸 Memory saved" : "🔗 Link copied"}
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={memoryRef} style={{ position: "fixed", left: "-99999px", top: 0 }}>
        <MemoryCard image={image} recipientName={recipientName} message={message} eventType={eventType} themeName={themeName} />
      </div>
    </motion.div>
  );
}
