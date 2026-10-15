import { motion, AnimatePresence } from "framer-motion";

const positions = [32, 80, 144, 192];

export default function Smoke({ blown }) {
  return (
    <AnimatePresence>
      {blown &&
        positions.map((x, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0.2,
              y: 0,
            }}
            animate={{
              opacity: [0.5, 0.25, 0],
              scale: [0.4, 1.2, 1.8],
              y: -80,
              x: i % 2 ? 12 : -12,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.2,
              delay: i * 0.08,
            }}
            className="absolute"
            style={{
              left: x - 8,
              top: 8,
            }}
          >
            <div className="h-6 w-6 rounded-full bg-gray-300 blur-md" />
          </motion.div>
        ))}
    </AnimatePresence>
  );
}