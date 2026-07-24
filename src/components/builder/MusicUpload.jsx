export default function MusicUpload({
  music,
  setMusic,
}) {

  const handleMusic = (e) => {
    const file = e.target.files[0];

    if (file) {
      setMusic({
  name: file.name,
  url: URL.createObjectURL(file),
});
    }
  };

  return (
    <>
      <h1 className="mb-3 text-4xl font-bold text-white">
        Music Selection
      </h1>

      <p className="mb-8 text-gray-400">
        Upload your favorite song.
      </p>

      <input
        type="file"
        accept="audio/*"
        onChange={handleMusic}
        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
      />

      {music && (
  <p className="mt-6 text-green-400">
    Music Uploaded Successfully
  </p>
)}
    </>
  );
}