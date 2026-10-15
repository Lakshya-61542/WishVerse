import getImageSrc from "../../../utils/getImageSrc";
import { motion } from "framer-motion";
import Tape from "./Tape";

const captions = ["Favourite", "Forever", "Golden", "Pure Joy"];
const rotations = [-4.5, 3.5, -3, 4.5];
const entrances = [
  { x: -110, y: -55 },
  { x: 110, y: -55 },
  { x: -105, y: 75 },
  { x: 105, y: 75 },
];

export default function PhotoFrame({ photo, index, accent = "#f9a8d4" }) {
  const src = getImageSrc(photo);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.72, ...entrances[index % entrances.length], rotate: 0 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: rotations[index % rotations.length] }}
      transition={{ delay: index * 0.2, duration: 0.8, type: "spring", stiffness: 76, damping: 18 }}
      whileHover={{ scale: 1.04, rotate: 0, y: -4 }}
      className="relative w-[112px]"
    >
      <Tape />
      <div className="rounded-[13px] bg-[#fffaf1] p-1.5 pb-2.5 shadow-[0_14px_32px_rgba(0,0,0,.34)]">
        {src ? (
          <img src={src} alt="Memory" className="block h-[132px] w-full rounded-[9px] object-cover" />
        ) : (
          <div className="grid h-[132px] place-items-center rounded-[9px] bg-zinc-100 text-2xl">✨</div>
        )}
        <p className="mt-1.5 text-center text-[12px] font-semibold text-zinc-600" style={{ fontFamily: "Caveat, cursive" }}>
          {captions[index % captions.length]} <span style={{ color: accent }}>♥</span>
        </p>
      </div>
    </motion.div>
  );
}
