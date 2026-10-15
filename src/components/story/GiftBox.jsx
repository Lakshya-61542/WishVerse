import confetti from "canvas-confetti";

export default function GiftBox({ onOpen }) {
  return (
    <div className="text-center">

      <div
        onClick={() => {
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
          });

          onOpen();
        }}
        className="cursor-pointer text-8xl transition-transform duration-300 hover:scale-110"
      >
        🎁
      </div>

      <p className="mt-4 text-lg text-white">
        Tap To Open Gift
      </p>

    </div>
  );
}