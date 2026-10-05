import Smoke from "./Smoke";
import RealFlame from "./RealFlame";
import { motion } from "framer-motion";

export default function CakePlayer({
  blown,
  makingWish,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
      }}
      animate={{
        opacity: 1,
        y: blown ? [0, -10, 0, -6, 0] : 0,
        scale: makingWish
          ? [1, 1.02, 1.05, 1.08]
          : blown
          ? [1.08, 1.02, 1]
          : 1,
      }}
      transition={{
        duration: 1,
      }}
      className="relative flex items-center justify-center"
    >
      {/* Shadow */}
      <motion.div
        animate={{
          scaleX: [1, 0.95, 1],
          opacity: [0.25, 0.15, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute left-1/2 bottom-0 h-5 w-64 -translate-x-1/2 rounded-full bg-black blur-2xl"
      />

      {/* Glow Wrapper */}
      <motion.div
        animate={{
          boxShadow: makingWish
            ? [
                "0 0 40px rgba(255,120,180,.2)",
                "0 0 90px rgba(255,120,180,.6)",
                "0 0 40px rgba(255,120,180,.2)",
              ]
            : "0 0 20px rgba(255,120,180,.15)",
        }}
        transition={{
          duration: 2,
          repeat: makingWish ? Infinity : 0,
        }}
        className="relative rounded-full"
      >
        {/* Cake Container */}
        <div className="relative h-64 w-72">

          {/* Candles */}
          {[42, 95, 150, 205].map((x, i) => (
            <div key={i}>
              <div
                className="
                  absolute
                  h-15
                  w-[8px]
                  rounded-full
                  border
                  border-pink-200
                  bg-gradient-to-b
                  from-white
                  to-pink-100
                "
                style={{
                  left: x+10,
                  top: 50,
                }}
              />

              {!blown && (
                <div
                  className="absolute"
                  style={{
                    left: x+8,
                    top: 30,
                  }}
                >
                  <RealFlame />
                </div>
              )}
            </div>
          ))}

          {/* Top Icing */}
          <div
            className="
              absolute
              top-24
              h-20
              w-full
              rounded-t-[70px]
              bg-gradient-to-b
              from-pink-100
              via-pink-200
              to-pink-300
            "
          />

          {/* Cake Body */}
          <div
            className="
              absolute
              top-31
              h-40
              w-72
              rounded-[36px]
              border-[5px]
              border-pink-100
              bg-gradient-to-b
              from-pink-300
              via-pink-500
              to-[#d0006f]
              shadow-[0_25px_50px_rgba(255,105,180,.35)]
            "
          />

          {/* Icing Drops */}
          <div className="absolute left-12 top-32 h-15 w-5 rounded-b-full bg-pink-200" />
          <div className="absolute left-24 top-32 h-11 w-5 rounded-b-full bg-pink-200" />
          <div className="absolute left-44 top-32 h-12 w-5 rounded-b-full bg-pink-200" />
          <div className="absolute right-12 top-32 h-9 w-5 rounded-b-full bg-pink-200" />

          {/* Cherries */}
          {[35, 70, 115, 160, 205, 235].map((x) => (
            <div
              key={x}
              className="absolute top-[102px] h-4 w-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(255,0,0,.45)]"
              style={{
                left: x,
              }}
            />
          ))}

          {/* Cream Border */}
          <div className="absolute top-[128px] left-4 right-4 flex justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-6 rounded-b-full bg-pink-100"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Smoke */}
      <Smoke blown={blown} />
    </motion.div>
  );
}