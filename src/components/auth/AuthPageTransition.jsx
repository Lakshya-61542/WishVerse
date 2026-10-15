import { motion } from "framer-motion";

export default function AuthPageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.988 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.992 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
