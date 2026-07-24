import { motion } from "framer-motion";

export default function CameraFlash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 0.6,
      }}
      className="absolute inset-0 z-50 bg-white pointer-events-none"
    />
  );
}