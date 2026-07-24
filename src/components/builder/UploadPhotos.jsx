import ImageCropper from "./ImageCropper";

export default function PhotoUpload({
  images,
  setImages,
  coverImage,
  setCoverImage,
}) {

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
  id: crypto.randomUUID(),
  file,
  preview: URL.createObjectURL(file),
}));

setImages((prev) => [...prev, ...newImages]);

    if (!coverImage && newImages.length > 0) {
  setCoverImage(newImages[0]);
}
  };

  return (
    <>
      <h1 className="mb-3 text-4xl font-bold text-white">
        Upload Photos
      </h1>

      <p className="mb-8 text-gray-400">
        Upload multiple memories for your surprise.
      </p>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="mb-8 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
      />

      <div className="grid grid-cols-3 gap-5">

        {images.map((img, index) => (

          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl border-2 bg-white/5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/30 ${
  coverImage?.id === img.id
    ? "border-yellow-400"
    : "border-white/20"
}`}
          >

            <img
  src={img.preview}
              alt=""
              className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
            />

            <button
              onClick={() => setCoverImage(img)}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-lg bg-violet-600 px-2 py-1 text-xs text-white"
            >
             {coverImage?.id === img.id
  ? "⭐ Cover Photo"
  : "Set as Cover"}
            </button>

            <button
  onClick={() => {
    const updated = images.filter((_, i) => i !== index);

    setImages(updated);

    if (coverImage?.id === img.id) {
      setCoverImage(updated.length ? updated[0] : null);
    }
  }}
  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white hover:bg-red-700"
>
  ×
</button>

          </div>

        ))}

      </div>
    </>
  );
}