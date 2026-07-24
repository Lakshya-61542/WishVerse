import { motion } from "framer-motion";

export default function InvitationCard({
  onOpened,
  children,
}) {
  return (
    <div
      className="relative h-[520px] w-[340px]"
      style={{ perspective: "1800px" }}
    >
      {/* Back */}

      <div className="absolute inset-0 rounded-[28px] bg-[#fdf5e6] shadow-2xl">

  {children}

</div>

      {/* Front Cover */}

      <motion.div
        initial={{
          rotateY: 0,
        }}
        animate={{
          rotateY: -165,
        }}
        transition={{
          delay: 1,
          duration: 1.3,
          ease: "easeInOut",
        }}
        onAnimationComplete={onOpened}
        style={{
          transformOrigin: "left",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 rounded-[28px] border border-yellow-400/50 bg-gradient-to-br from-[#3d2507] via-[#241303] to-[#100700] shadow-2xl"
      >
        <div className="flex h-full items-center justify-center">

          <div className="text-center">

            <div className="mb-6 text-6xl">
              💌
            </div>

            <h1 className="text-3xl font-bold text-yellow-300">
              For You
            </h1>

            <p className="mt-3 text-yellow-200/80">
              Open Me
            </p>

          </div>

        </div>
      </motion.div>

    </div>
  );
}