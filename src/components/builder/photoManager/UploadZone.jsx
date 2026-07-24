export default function UploadZone({ onUpload }) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    onUpload(files);
  };

  return (
    <label className="mb-8 flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-violet-500/40 bg-white/5 transition hover:border-violet-400 hover:bg-white/10">

      <div className="text-6xl">
        📸
      </div>

      <h3 className="mt-4 text-xl font-semibold text-white">
        Upload Memories
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Click here to upload multiple photos
      </p>

      <input
        hidden
        multiple
        accept="image/*"
        type="file"
        onChange={handleChange}
      />

    </label>
  );
}