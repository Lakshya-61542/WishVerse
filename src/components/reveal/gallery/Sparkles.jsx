import { motion } from "framer-motion";

const sparkles = Array.from({ length: 16 }, (_, i) => ({
  top: `${5 + ((i * 37) % 90)}%`,
  left: `${4 + ((i * 53) % 92)}%`,
  size: 9 + (i % 4) * 2,
  duration: 2.1 + (i % 5) * 0.3,
  delay: i * 0.12,
}));

export default function Sparkles() {
  return (
    <>
      {sparkles.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.08, 0.5], rotate: [0, 15, 0] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute select-none text-yellow-200/80"
          style={{ top: item.top, left: item.left, fontSize: item.size }}
        >
          ✦
        </motion.div>
      ))}
    </>
  );
}
