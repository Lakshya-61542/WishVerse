import { useRef } from "react";
import { gsap } from "gsap";
import { launchConfetti } from "../../utils/confetti";

export default function CakeCuttingPage({
  recipientName,
  onCakeCut,
}) {
  const cakeRef = useRef();

  const cutCake = () => {
    gsap.to(cakeRef.current, {
      rotation: 5,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        launchConfetti();

        setTimeout(() => {
          onCakeCut();
        }, 1800);
      },
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">

      <h2 className="mb-4 text-3xl font-bold text-white">
        🎉 Birthday Surprise 🎉
      </h2>

      <p className="mb-8 text-white/70">
        Tap the cake to cut it
      </p>

      <div
        ref={cakeRef}
        onClick={cutCake}
        className="cursor-pointer select-none text-[120px] transition-transform hover:scale-110"
      >
        🎂
      </div>

      <p className="mt-6 text-xl text-white">
        Happy Birthday {recipientName} ❤️
      </p>

    </div>
  );
}