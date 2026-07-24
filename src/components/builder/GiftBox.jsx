export default function GiftBox({ onOpen }) {
  return (
    <div className="text-center">

      <div
        onClick={onOpen}
        className="cursor-pointer text-8xl transition-transform duration-300 hover:scale-110"
      >
        🎁
      </div>

      <p className="mt-4 text-white text-lg">
        Tap To Open Gift
      </p>

    </div>
  );
}