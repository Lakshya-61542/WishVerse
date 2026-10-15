import { motion } from "framer-motion";
import { themeVisual } from "../../utils/themeClass";

export default function RevealBackground({ themeName = "Aurora", eventEmoji = "✨" }) {
  const visual = themeVisual(themeName);
  const particles = Array.from({ length: 14 }, (_, index) => ({
    left: `${8 + ((index * 31) % 84)}%`,
    top: `${6 + ((index * 47) % 88)}%`,
    delay: (index % 6) * 0.22,
    duration: 2.8 + (index % 5) * 0.55,
    size: 2 + (index % 3),
  }));

  return (
    <>
      <div className="absolute inset-0" style={{ background: visual.background }} />
      <div
        className="absolute -left-24 -top-20 h-80 w-80 rounded-full blur-[120px]"
        style={{ background: visual.soft }}
      />
      <div
        className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full blur-[130px]"
        style={{ background: `${visual.accent2}22` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,.13),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 14px ${visual.accent2}`,
          }}
          animate={{ opacity: [0.12, 0.8, 0.12], scale: [0.7, 1.35, 0.7] }}
          transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        className="absolute right-5 top-8 text-lg opacity-20"
        animate={{ y: [0, -8, 0], rotate: [0, 7, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {eventEmoji}
      </motion.div>
    </>
  );
}
