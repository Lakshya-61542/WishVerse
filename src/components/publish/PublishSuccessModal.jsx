import { motion } from "framer-motion";

export default function PublishSuccessModal({
  shareLink,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-[90%] max-w-lg rounded-3xl bg-[#15141c] p-8 text-white shadow-2xl"
      >

        <h1 className="text-3xl font-bold text-center">
          🎉 Website Published!
        </h1>

        <p className="mt-3 text-center text-white/70">
          Your surprise website is now live.
        </p>

        <div className="mt-8 rounded-xl bg-black/30 p-4 break-all">
          {shareLink}
        </div>

        <div className="mt-8 grid gap-3">

          <button
            onClick={() => navigator.clipboard.writeText(shareLink)}
            className="rounded-xl bg-violet-600 py-3 hover:bg-violet-700"
          >
            📋 Copy Link
          </button>

          <button
            onClick={() => window.open(shareLink)}
            className="rounded-xl bg-pink-600 py-3 hover:bg-pink-700"
          >
            🌍 Open Website
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/20 py-3"
          >
            Close
          </button>

        </div>

      </motion.div>

    </div>
  );
}