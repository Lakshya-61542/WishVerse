import RevealBackground from "./RevealBackground";
import PolaroidCard from "./PolaroidCard";

export default function Scene3({
  image,
  recipientName,
}) {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-b from-violet-900 via-slate-950 to-black">

      <PolaroidCard
        image={image}
        recipientName={recipientName}
      />

    </div>
  );
}