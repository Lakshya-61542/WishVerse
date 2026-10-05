import { motion } from "framer-motion";

export default function RevealLayout({
  background,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`absolute inset-0 overflow-hidden ${background}`}
    >
      <div
        className="
          relative
          flex
          h-full
          w-full
          flex-col
          items-center
          justify-center

          px-6

          pt-[max(env(safe-area-inset-top),32px)]
          pb-[max(env(safe-area-inset-bottom),32px)]
        "
      >
        {children}
      </div>
    </motion.div>
  );
}