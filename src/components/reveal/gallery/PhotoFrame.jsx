import getImageSrc from "../../../utils/getImageSrc";
import { motion } from "framer-motion";
import Tape from "./Tape";
const captions = [
  "Best Day ❤️",
  "Forever 📸",
  "Smile 😊",
  "Golden Time ✨",
  "Together 💕",
];

const entrances = [
  { x: -500, y: -200 }, // Left Top
  { x: 500, y: -200 },  // Right Top
  { x: -500, y: 250 },  // Left Bottom
  { x: 500, y: 250 },   // Right Bottom
  { x: 0, y: 450 },     // Bottom Center
];

export default function PhotoFrame({
  photo,
  index,
}) {
console.log(
    "PHOTO:",
    photo,
    typeof photo
);
  return (
    <motion.div
      initial={{
  opacity: 0,
  scale: 0.35,
  x: entrances[index % entrances.length].x,
  y: entrances[index % entrances.length].y,
  rotate: 0,
}}

animate={{
  opacity: 1,
  scale: 1,
  x: 0,
  y: 0,
  rotate: [-8, 6, -4, 9, -6][index % 5],
}}

transition={{
  delay: index * 0.35,
  duration: 1.4,
  type: "spring",
  stiffness: 45,
  damping: 18,
  mass: 1,

  y: {
    duration: 5,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
}}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        y: -6,
      }}
      className="relative"
    >
      <Tape />

      <div className="rounded-xl bg-white p-2 shadow-[0_20px_40px_rgba(0,0,0,.45)]">

        <img
    src={getImageSrc(photo)}
    className="block w-44 h-56 object-cover rounded-xl"
/>

        <p
  className="mt-2 text-center text-gray-600"
  style={{
    fontFamily: "Caveat",
    fontSize: "18px",
  }}
>
  {captions[index % captions.length]}
</p>

      </div>

    </motion.div>
  );
}