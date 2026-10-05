import { motion } from "framer-motion";

const stars = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 4,
}));

export default function BackgroundStars() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {stars.map((star) => (

        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"

          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}

          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}

          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: star.delay,
          }}

        />

      ))}

    </div>
  );
}