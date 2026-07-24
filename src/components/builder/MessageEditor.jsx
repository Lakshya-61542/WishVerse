export default function MessageEditor({
  message,
  setMessage,
}) {
  return (
    <>
      <h1 className="mb-3 text-4xl font-bold text-white">
        Your Message
      </h1>

      <p className="mb-8 text-gray-400">
        Write a heartfelt message.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={8}
        placeholder="Write your special message here..."
        className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-white outline-none"
      />
    </>
  );
}