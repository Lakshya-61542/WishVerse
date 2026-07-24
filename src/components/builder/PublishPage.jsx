export default function PublishPage({
  websiteName,
  setWebsiteName,
  setPublished,
}) {
  return (
    <>
      <h1 className="mb-3 text-4xl font-bold text-white">
        Publish Website
      </h1>

      <p className="mb-8 text-gray-400">
        Configure your website before publishing.
      </p>

      <input
        type="text"
        placeholder="Website Name"
        value={websiteName}
        onChange={(e) => setWebsiteName(e.target.value)}
        className="mb-6 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
      />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

        <p className="text-white/70">
          Generated Link
        </p>

        <p className="mt-2 text-violet-400">
          wishverse.app/
          {websiteName
            ? websiteName
                .toLowerCase()
                .replace(/\s+/g, "-")
            : "my-surprise"}
        </p>

      </div>

      

    </>
  );
}