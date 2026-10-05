import MemoryGallery from "./MemoryGallery";

export default function Scene5({ images, eventType, themeName }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <MemoryGallery images={images} eventType={eventType} themeName={themeName} />
    </div>
  );
}
