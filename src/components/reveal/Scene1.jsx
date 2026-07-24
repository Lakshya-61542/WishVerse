import { motion } from "framer-motion";
import RevealBackground from "./RevealBackground";

export default function Scene1({ image }) {
  return (
    <div className="relative h-full w-full overflow-hidden">

      <RevealBackground />

      {/* Background Glow */}
      <motion.div
        initial={{
          scale: 0.3,
          opacity: 0,
        }}
        animate={{
          scale: [0.5, 1.3, 1],
          opacity: [0, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/30 blur-[180px]"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/70"
            style={{
              left: `${10 + i * 7}%`,
              top: `${15 + (i % 5) * 15}%`,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Main Photo */}
      <motion.img
        src={image?.cropped || image?.preview || image}
        initial={{
          opacity: 0,
          scale: 0.55,
          rotate: -12,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
          y: 0,
        }}
        transition={{
          duration: 1.8,
          ease: "easeOut",
        }}
        className="absolute left-1/2 top-1/2 z-20 h-[340px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border-[6px] border-white object-cover shadow-[0_0_60px_rgba(168,85,247,.45)]"
      />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 h-44 w-full bg-gradient-to-t from-black/70 to-transparent" />

    </div>
  );
}