import { motion } from "framer-motion";

export default function Sparkles() {
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-yellow-300 pointer-events-none select-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${10 + Math.random() * 10}px`,
          }}
        >
          ✨
        </motion.div>
      ))}
    </>
  );
}