export default function DetailsForm({
  recipientName,
  setRecipientName,
}) {
  return (
    <>
      <h1 className="mb-3 text-4xl font-bold text-white">
        Recipient Details
      </h1>

      <p className="mb-8 text-gray-400">
        Enter details for the surprise.
      </p>

      <input
        type="text"
        placeholder="Recipient Name"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
      />
    </>
  );
}