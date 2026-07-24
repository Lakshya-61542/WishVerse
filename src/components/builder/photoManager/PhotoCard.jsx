export default function PhotoCard({
  photo,
  isCover,
  onCover,
  onCrop,
  onDelete,
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg">

      <img
        src={photo.cropped || photo.preview}
        alt=""
        className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="flex justify-between p-3">

        <button
          onClick={onCover}
          className={`rounded-lg px-3 py-1 text-xs ${
            isCover
              ? "bg-yellow-500 text-black"
              : "bg-violet-600 text-white"
          }`}
        >
          {isCover ? "⭐ Cover" : "Cover"}
        </button>

        <button
          onClick={onCrop}
          className="rounded-lg bg-blue-600 px-3 py-1 text-xs text-white"
        >
          ✂ Crop
        </button>

        <button
          onClick={onDelete}
          className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white"
        >
          🗑
        </button>

      </div>

    </div>
  );
}