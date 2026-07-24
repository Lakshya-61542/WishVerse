import MemoryGallery from "./MemoryGallery";

export default function Scene5({ images }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#4f0cc8] via-[#2a225c] to-[#070b18]">

      <MemoryGallery images={images} />

    </div>
  );
}