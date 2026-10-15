import getImageSrc from "../../../utils/getImageSrc";
import { motion } from "framer-motion";

export default function LetterPhoto({ letterPhoto }) {
  const src = getImageSrc(letterPhoto);
  if (!src) return null;
  return (
    <motion.img
      src={src}
      alt="Letter memory"
      initial={{ opacity: 0, rotate: 5, scale: 0.88 }}
      animate={{ opacity: 1, rotate: 3, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.65 }}
      className="h-[78px] w-[66px] shrink-0 rounded-[10px] border-[3px] border-white object-cover shadow-[0_10px_24px_rgba(0,0,0,.22)]"
    />
  );
}
