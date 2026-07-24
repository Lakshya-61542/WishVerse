import MemoryCard from "./final/MemoryCard";
import BackgroundStars from "./final/BackgroundStars";
import FloatingStars from "./final/FloatingStars";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import html2canvas from "html2canvas";

export default function FinalPage({
  image,
  recipientName,
  message,
  audioRef,
}) {
  const pageRef = useRef(null);
  const memoryRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [flash, setFlash] = useState(false);
  const [copied, setCopied] = useState(false);

  // Music Fade
  useEffect(() => {
    if (!audioRef?.current) return;

    const audio = audioRef.current;

    audio.volume = 1;

    const targetVolume = 0.45;
    const duration = 3000;
    const interval = 100;
    const steps = duration / interval;
    const decrement = (1 - targetVolume) / steps;

    const fade = setInterval(() => {
      if (audio.volume <= targetVolume) {
        audio.volume = targetVolume;
        clearInterval(fade);
        return;
      }

      audio.volume = Math.max(
        targetVolume,
        audio.volume - decrement
      );
    }, interval);

    return () => clearInterval(fade);
  }, [audioRef]);

  // Save Memory
  const saveMemory = async () => {
    if (!memoryRef.current || saving) return;

    setSaving(true);

    setFlash(true);

    setTimeout(() => {
      setFlash(false);
    }, 250);

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    const canvas = await html2canvas(memoryRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#16072b",
    });

    const link = document.createElement("a");

    link.download = `${
      recipientName || "WishVerse"
    }-Memory.png`;

    link.href = canvas.toDataURL("image/png");

    link.click();

    link.remove();

    setSaving(false);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // Share Memory
  const shareMemory = async () => {
    const shareData = {
      title: "WishVerse",
      text: `A special surprise for ${recipientName} ❤️`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  };

  return (
    <motion.div
      ref={pageRef}
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1.2,
      }}
      className="absolute inset-0 flex flex-col items-center overflow-hidden bg-gradient-to-b from-[#0F0628] via-[#27104E] to-black px-8"
    >
      <BackgroundStars />
      <FloatingStars />

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-[100] bg-white"
          />
        )}
      </AnimatePresence>

            {/* Background Glow */}
      <div className="absolute top-20 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[180px]" />
      <div className="absolute bottom-20 h-64 w-64 rounded-full bg-pink-500/10 blur-[120px]" />

      {/* Floating Decorations */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [-8, 8, -8],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="absolute left-8 top-48 text-4xl"
      >
        💜
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 25, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute right-10 top-56 text-3xl"
      >
        ✨
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-8">

        {/* Profile Photo */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(255,255,255,.25)",
              "0 0 45px rgba(236,72,153,.55)",
              "0 0 25px rgba(168,85,247,.55)",
              "0 0 20px rgba(255,255,255,.25)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="rounded-full"
        >
          <motion.img
            src={image?.cropped || image?.preview || image}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              scale: [1, 1.03, 1],
              rotate: [0, 0.5, -0.5, 0],
            }}
            transition={{
              opacity: {
                duration: 1,
              },
              scale: {
                duration: 8,
                repeat: Infinity,
              },
              rotate: {
                duration: 8,
                repeat: Infinity,
              },
            }}
            className="h-48 w-48 rounded-full border-[6px] border-white object-cover object-center"
          />
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
          className="mt-7 text-3xl font-semibold text-white"
        >
          {recipientName} ❤️
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: 150,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="mt-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-pink-400 to-transparent"
        />

        {/* Happy Birthday */}
        <div className="mt-8 text-center">

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1,
            }}
            className="text-5xl font-black text-white"
          >
            HAPPY
          </motion.h1>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.35,
            }}
            className="mt-2 text-4xl font-black tracking-[8px] text-pink-300"
          >
            BIRTHDAY
          </motion.h1>

        </div>

        {/* Message Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.8,
            duration: 0.8,
          }}
          className="mt-10 w-[82%] rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,.05)]"
        >

          <motion.div
            animate={{
              rotate: [-6, 6, -6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="mb-4 text-center text-3xl"
          >
            💌
          </motion.div>

          <TypeAnimation
            sequence={[
              message || "Stay Happy Always! ❤️",
            ]}
            speed={60}
            cursor={false}
            className="text-center text-lg leading-8 text-white/90"
          />

        </motion.div>

        {/* Action Buttons */}
        <div className="mt-10 flex gap-4">

          <motion.button
            onClick={saveMemory}
            disabled={saving}
            whileHover={!saving ? { scale: 1.05 } : {}}
            whileTap={!saving ? { scale: 0.96 } : {}}
            className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(236,72,153,.45)]"
          >
            {saving
              ? "✨ Preparing Memory..."
              : "📸 Save"}
          </motion.button>

          <motion.button
            onClick={shareMemory}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="rounded-full border border-pink-400/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl"
          >
            📤 Share
          </motion.button>

        </div>

      </div>

            {/* Success Toast */}
      <AnimatePresence>

        {saved && (
          <motion.div
            initial={{
              opacity: 0,
              y: -50,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -50,
              scale: 0.9,
            }}
            transition={{
              duration: 0.45,
            }}
            className="absolute top-6 z-[150] rounded-3xl border border-white/10 bg-black/60 px-8 py-6 backdrop-blur-xl shadow-2xl"
          >
            <div className="text-center">

              <div className="text-4xl">
                📸
              </div>

              <h2 className="mt-3 text-xl font-bold text-white">
                Memory Saved
              </h2>

              <p className="mt-2 text-white/70">
                Thank you for using WishVerse ❤️
              </p>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Copy Toast */}
      <AnimatePresence>

        {copied && (
          <motion.div
            initial={{
              opacity: 0,
              y: -50,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -50,
              scale: 0.9,
            }}
            transition={{
              duration: 0.45,
            }}
            className="absolute top-24 z-[150] rounded-full bg-sky-500 px-6 py-3 text-white font-semibold shadow-2xl"
          >
            🔗 Link Copied Successfully
          </motion.div>
        )}

      </AnimatePresence>

      {/* Footer */}
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        transition={{
          delay: 3.5,
        }}
        className="absolute bottom-4 text-sm text-white/60"
      >
        Made with ❤️ using WishVerse ~ LP
      </motion.p>

      {/* Hidden Memory Card */}
      <div
        ref={memoryRef}
        style={{
          position: "fixed",
          left: "-99999px",
          top: 0,
        }}
      >
        <MemoryCard
          image={image}
          recipientName={recipientName}
          message={message}
        />
      </div>

    </motion.div>
  );
}