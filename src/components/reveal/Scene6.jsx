import { motion } from "framer-motion";

export default function Scene6() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
      }}
      className="flex h-full items-center justify-center"
    >
      <div className="h-40 w-40 rounded-full bg-violet-500/30 blur-3xl" />
    </motion.div>
  );
}