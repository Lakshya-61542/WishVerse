import { motion } from "framer-motion";

export default function RealFlame() {
  return (
    <motion.div
      animate={{
        scale: [1, 0.88, 1.08, 0.95, 1],
        rotate: [-3, 2, -2, 3, 0],
        y: [0, -2, 0],
      }}
      transition={{
        duration: 0.35,
        repeat: Infinity,
      }}
      className="relative flex items-center justify-center"
    >
      {/* Outer Glow */}
      <div className="absolute h-7 w-7 rounded-full bg-yellow-300/40 blur-md" />

      {/* Flame */}
      <div
        className="
          h-5
          w-3
          rounded-full
          bg-gradient-to-t
          from-orange-500
          via-yellow-300
          to-white
        "
        style={{
          clipPath:
            "polygon(50% 0%,100% 40%,70% 100%,30% 100%,0% 40%)",
        }}
      />

      {/* Core */}
      <div className="absolute h-2 w-2 rounded-full bg-white" />
    </motion.div>
  );
}