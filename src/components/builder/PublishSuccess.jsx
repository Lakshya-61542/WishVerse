export default function PublishSuccess({
  websiteName,
}) {

  const link =
    "wishverse.app/" +
    (websiteName
      ? websiteName
          .toLowerCase()
          .replace(/\s+/g, "-")
      : "my-surprise");

  return (
    <div className="text-center">

      <div className="mb-4 text-7xl">
        🎉
      </div>

      <h2 className="mb-4 text-4xl font-bold text-white">
        Website Published
      </h2>

      <div className="rounded-2xl bg-white/5 p-4 text-violet-400">
        {link}
      </div>

      <button
        onClick={() => navigator.clipboard.writeText(link)}
        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-white"
      >
        Copy Link
      </button>

    </div>
  );
}