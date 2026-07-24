import CameraFlash from "./gallery/CameraFlash";
import { motion } from "framer-motion";
import PhotoFrame from "./gallery/PhotoFrame";
import Sparkles from "./gallery/Sparkles";
import FloatingHearts from "./gallery/FloatingHearts";

export default function MemoryGallery({ images }) {

  if (!images?.length) return null;

  return (

    <motion.div

      initial={{
  scale: 1.2,
  opacity: 0,
}}

animate={{
  scale: 1,
  opacity: 1,
}}

transition={{
  duration: 1.5,
  ease: "easeOut",
}}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#1d1145] via-[#28135c] to-[#090912]"

    >

{/* Soft Background */}
<div className="absolute inset-0 pointer-events-none opacity-20">

  <div className="absolute left-6 top-10 h-40 w-40 rounded-full bg-pink-400 blur-[120px]" />

  <div className="absolute right-6 bottom-10 h-52 w-52 rounded-full bg-violet-500 blur-[150px]" />

  <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[170px]" />

</div>

<CameraFlash />

      {/* Sparkles */}
      <Sparkles />

      {/* Floating Hearts */}
      <FloatingHearts />

      {/* Background Glow */}

      <div className="absolute -top-24 h-72 w-72 rounded-full bg-pink-500/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />

      {/* Title */}

      <motion.div

        initial={{
  opacity: 0,
  scale: 0.6,
  y: -50,
}}

        animate={{
  opacity: 1,
  scale: 1,
  y: 0,
}}

        transition={{
  duration: 1.4,
  ease: "easeOut",
}}

        className="absolute top-8 left-1/2 z-30 -translate-x-1/2"

      >

        <h2

          className="text-center text-3xl font-bold text-white"

          style={{
            fontFamily: "Caveat",
            textShadow: "0 0 25px rgba(255,255,255,.4)",
          }}

        >

          ✨ Our Beautiful Memories ✨

        </h2>

        <p className="mt-1 text-center text-sm tracking-[4px] text-white/60">

          EVERY MOMENT MATTERS

        </p>

      </motion.div>
{/* Gallery */}

<motion.div
  initial={{
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  }}
  animate={{
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  }}
  transition={{
    duration: 1.2,
    ease: "easeOut",
  }}
  className="
  relative
  z-20
  flex
  h-full
  w-full
  items-center
  justify-center
  px-6
  pt-24
  pb-20
"
>

        <div className="grid w-full max-w-2xl grid-cols-2 gap-8 place-items-center">

          {images.slice(0,4).map((photo,index)=>(

    <PhotoFrame

        key={index}

        photo={photo}

        index={index}

    />

))}

          {images[4] && (

            <div className="col-span-2 flex justify-center">

              <PhotoFrame

                photo={images[4]}

                index={4}

              />

            </div>

          )}

        </div>

      </motion.div>

      {/* Bottom Quote */}

      <motion.p

        initial={{
          opacity:0,
        }}

        animate={{
          opacity:1,
        }}

        transition={{
          delay:5,
        }}

        className="absolute bottom-7 text-center text-white/70"

        style={{
          fontFamily:"Caveat",
          fontSize:"24px",
        }}

      >

        "Some memories never fade ❤️"

      </motion.p>

    </motion.div>

  );

}