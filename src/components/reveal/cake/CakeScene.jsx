import RevealLayout from "../RevealLayout";
import { motion, AnimatePresence } from "framer-motion";
import { fireFireworks } from "./Fireworks";
import { useState } from "react";
import CakePlayer from "./CakePlayer";
import fireConfetti from "./fireConfetti";
export default function CakeScene({
  recipientName,
  onComplete,
}) {

const [blown, setBlown] = useState(false);
const [makingWish, setMakingWish] = useState(false);
const [flash, setFlash] = useState(false);

  const handleBlow = () => {

  if (makingWish || blown) return;

  setMakingWish(true);

  // Blow candles
  setTimeout(() => {
    setBlown(true);
  }, 1800);

  // Confetti
  setTimeout(() => {
    fireConfetti();
  }, 2200);

  // Fireworks
  setTimeout(() => {
    fireFireworks();
  }, 2800);

  // White flash
  setTimeout(() => {
    setFlash(true);
  }, 4700);

  // Next scene
  setTimeout(() => {
    onComplete?.();
  }, 5200);

};
  return (

    <RevealLayout background="bg-gradient-to-b from-[#14051f] via-[#2a1447] to-black">

      {/* Spotlight */}

      <div
        className="
          absolute
          left-1/2
          top-[-120px]
          h-[620px]
          w-[360px]
          -translate-x-1/2
          rounded-full
          bg-yellow-200/10
          blur-[160px]
        "
      />

      {/* Purple Glow */}

      <motion.div
  animate={{
    scale: makingWish
      ? [1, 1.15, 1.3]
      : 1,

    opacity: makingWish
      ? [0.12, 0.22, 0.35]
      : 0.12,
  }}
  transition={{
    duration: 2,
  }}
  className="
    absolute
    left-1/2
    top-36
    h-[420px]
    w-[420px]
    -translate-x-1/2
    rounded-full
    bg-pink-500
    blur-[180px]
  "
/>

      <motion.div
  animate={{
    scale: makingWish ? 1.03 : 1,
  }}
  transition={{
    duration:2,
  }}
  className="relative z-20 flex h-full w-full flex-col"
>

  {/* ---------- HEADER ---------- */}

  <div className="flex-[0.18] flex flex-col items-center justify-end">

    <AnimatePresence mode="wait">

<motion.h1
    key={blown ? "granted" : "wish"}
      initial={{ opacity: 0, y: -25 }}
      animate={{
  opacity:1,
  y:0,
  scale: makingWish ? [1,1.03,1] : 1,
}}
      transition={{
    duration:.6,
}}
      className="text-[38px] font-bold leading-none text-white"
      style={{
        fontFamily: "Caveat",
      }}
    >
      {blown ? "✨ Wish Granted ✨" : "✨ Make a Wish ✨"}
    </motion.h1>

    </AnimatePresence>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .35 }}
      className="mt-2 text-xl text-pink-300"
    >
      {recipientName} ❤️
    </motion.p>

  </div>

  {/* ---------- CAKE ---------- */}

  <div className="flex-[0.56] flex items-center justify-center">

    <CakePlayer
      blown={blown}
      makingWish={makingWish}
    />

  </div>

  {/* ---------- BUTTON ---------- */}

  <div className="flex-[0.18] flex items-start justify-center">

    {!blown && (

      <motion.button

        whileHover={{ scale: 1.04 }}

        whileTap={{ scale: .96 }}

        disabled={makingWish}

        onClick={handleBlow}

        className="
          rounded-full
          bg-gradient-to-r
          from-pink-500
          via-fuchsia-500
          to-violet-600
          px-8
          py-4
          text-lg
          font-semibold
          text-white
          shadow-[0_0_35px_rgba(236,72,153,.55)]
        "

      >

        {makingWish
          ? "✨ Making your wish..."
          : "🎂 Blow Candles"}

      </motion.button>

    )}

  </div>

  {/* ---------- SAFE SPACE ---------- */}

  <div className="flex-[0.08]" />

</motion.div>
<AnimatePresence>

  {flash && (

    <motion.div

      initial={{ opacity:0 }}

      animate={{ opacity:1 }}

      exit={{ opacity:0 }}

      transition={{ duration:.35 }}

      className="absolute inset-0 z-[300] bg-white"

    />

  )}

</AnimatePresence>
    </RevealLayout>

  );

}