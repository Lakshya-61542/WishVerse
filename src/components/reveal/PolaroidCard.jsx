import { motion } from "framer-motion";

export default function PolaroidCard({
  image,
  recipientName,
}) {
  return (
   <motion.div
  initial={{
    y: -350,
    opacity: 0,
    rotate: -15,
    scale: 0.8,
  }}
  animate={{
    y: [0, -4, 0],
    rotate: [-4, -2, -4],
    scale: 1,
    opacity: 1,
  }}
  transition={{
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
    rotate: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
    scale: {
      duration: 1.8,
      type: "spring",
      stiffness: 70,
      damping: 12,
    },
    opacity: {
      duration: 1.2,
    },
  }}
>

      {/* Shadow */}

      <div className="absolute inset-0 rounded-xl bg-black/40 blur-xl translate-y-6 scale-95"></div>

      {/* Card */}

      <div className="relative w-72 rounded-md bg-white p-4 shadow-2xl">

        <div className="relative h-72 w-full overflow-hidden bg-white">

  <motion.img
    src={image?.cropped || image?.preview || image}
    alt=""
    initial={{
      opacity: 0,
      scale: 1.08,
      filter: "blur(12px) brightness(1.5)",
    }}
    animate={{
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
    }}
    transition={{
      duration: 2,
      delay: 0.5,
    }}
    className="h-full w-full object-cover"
  />

  <motion.div
    initial={{ x: -60, opacity: 0 }}
    animate={{ x: 320, opacity: [0, 0.8, 0] }}
    transition={{
      duration: 1,
      delay: 2,
    }}
    className="absolute top-0 h-full w-10 bg-white/60 blur-md"
  />

</div>
        <div className="pt-5 text-center">

          <p
            className="text-2xl text-gray-700"
            style={{
  fontFamily: "Caveat",
}}
          >
            Happy Birthday
          </p>

          <p
            className="text-xl text-gray-600"
            style={{
  fontFamily: "Caveat",
}}
          >
            {recipientName} ❤️
          </p>

        </div>

      </div>

      {/* Ribbon */}

      <div className="absolute -left-2 -top-2 text-4xl">
        🎀
      </div>

    </motion.div>
  );
}