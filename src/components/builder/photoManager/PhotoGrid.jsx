import PhotoCard from "./PhotoCard";

export default function PhotoGrid({
  photos,
  coverImage,
  onCover,
  onCrop,
  onDelete,
}) {
  if (!photos.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 py-16 text-center text-gray-400">
        No memories uploaded yet 📷
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5">

      {photos.map((photo) => (

        <PhotoCard
          key={typeof photo === "string" ? photo : photo.id}
          photo={photo}
          isCover={coverImage?.id === photo.id}
          onCover={() => onCover(photo)}
          onCrop={() => onCrop(photo.id)}
          onDelete={() => onDelete(photo.id)}
        />

      ))}

    </div>
  );
}