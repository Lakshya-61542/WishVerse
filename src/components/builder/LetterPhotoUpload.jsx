export default function LetterPhotoUpload({
  letterPhoto,
  setLetterPhoto,
}) {

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLetterPhoto({
    id: crypto.randomUUID(),
    file,
    preview: URL.createObjectURL(file),
    cropped: null,
});
  };

  return (
    <>
      <h1 className="mb-3 text-4xl font-bold text-white">
        Letter Photo
      </h1>

      <p className="mb-8 text-gray-400">
        Choose the photo that will appear inside the letter.
      </p>

      <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-pink-500/40 bg-white/5 transition hover:bg-white/10">

        {letterPhoto ? (
  <div className="flex w-full flex-col items-center">

    <img
      src={letterPhoto.cropped || letterPhoto.preview}
      className="h-44 w-full rounded-3xl object-cover"
    />

    <button
      type="button"
      onClick={() => setLetterPhoto(null)}
      className="mt-4 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
    >
      Replace Photo
    </button>

  </div>
) : (
          <>
            <div className="text-6xl">💌</div>

            <p className="mt-4 text-white">
              Click to Upload Letter Photo
            </p>
          </>
        )}

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

      </label>
    </>
  );
}