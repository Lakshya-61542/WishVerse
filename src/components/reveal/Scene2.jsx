import PolaroidCard from "./PolaroidCard";
import RevealBackground from "./RevealBackground";

export default function Scene2({
  image,
  images,
  recipientName,
}) {

  const photo =
    image ||
    images?.[0];
console.log("Scene2 image:", image);
console.log("Scene2 images:", images);
console.log("Photo selected:", photo);
  console.log("Photo used:", photo);

  return (
    <div className="relative h-full w-full overflow-hidden">

      <RevealBackground />

      <div className="flex h-full items-center justify-center">

        <PolaroidCard
          image={photo}
          recipientName={recipientName}
        />

      </div>

    </div>
  );
}