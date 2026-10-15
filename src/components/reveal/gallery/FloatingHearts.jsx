import { motion } from "framer-motion";

export default function FloatingHearts() {

  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: 120,
            opacity: 0,
          }}
          animate={{
            y: -450,
            opacity: [0, 1, 0],
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: i,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-pink-300 pointer-events-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            bottom: "-50px",
            fontSize: `${18 + Math.random() * 10}px`,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );

}