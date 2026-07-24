import getImageSrc from "../../../utils/getImageSrc";
import { motion } from "framer-motion";

export default function LetterPhoto({ letterPhoto }) {

  if (!letterPhoto) return null;
console.log("LETTER PHOTO:", letterPhoto);
console.log("LETTER SRC:", getImageSrc(letterPhoto));
  return (
    <motion.img
  src={getImageSrc(letterPhoto)}
  alt="Letter Memory"
  onLoad={() => console.log("✅ LETTER IMAGE LOADED")}
  onError={() => console.log("❌ LETTER IMAGE FAILED")}
  className="absolute bottom-8 right-8 h-28 w-28 rounded-xl border-4 border-white object-cover shadow-xl"
/>
  );
}