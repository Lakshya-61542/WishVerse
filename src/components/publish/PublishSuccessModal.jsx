import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ExternalLink, Share2, Sparkles, X } from "lucide-react";

export default function PublishSuccessModal({ shareLink, onClose }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title: "A WishVerse for you", text: "I made something special for you ✨", url: shareLink }); } catch {}
    } else {
      await copyLink();
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-[#050816]/80 px-5 backdrop-blur-xl">
      <motion.div initial={{ scale: .92, opacity: 0, y: 18 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative w-full max-w-lg overflow-hidden rounded-[34px] border border-white/10 bg-[#0c0e1a] p-7 text-white shadow-[0_35px_110px_rgba(0,0,0,.65)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,.25),transparent_70%)]"/>
        <button onClick={onClose} className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/[.06] text-white/50 transition hover:bg-white/10 hover:text-white"><X className="h-4 w-4"/></button>
        <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-emerald-300/20 bg-emerald-400/10"><Check className="h-7 w-7 text-emerald-300"/></div>
        <h2 className="relative mt-5 text-center text-2xl font-black tracking-[-.03em]">Your surprise is live.</h2>
        <p className="relative mt-2 text-center text-sm text-white/40">Share the link when the moment feels right.</p>
        <div className="relative mt-7 rounded-2xl border border-white/10 bg-black/20 p-4"><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-violet-200"><Sparkles className="h-3 w-3"/> Private reveal link</div><p className="break-all text-sm leading-6 text-white/65">{shareLink}</p></div>
        <div className="relative mt-5 grid gap-3 sm:grid-cols-2"><button onClick={copyLink} className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-extrabold text-[#090b16]">{copied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}{copied ? "Copied" : "Copy link"}</button><button onClick={share} className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3.5 text-sm font-bold text-white"><Share2 className="h-4 w-4"/>Share</button></div>
        <button onClick={() => window.open(shareLink, "_blank", "noopener,noreferrer")} className="relative mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-300/15 bg-violet-500/10 px-4 py-3.5 text-sm font-bold text-violet-100 transition hover:bg-violet-500/15">Open published WishVerse <ExternalLink className="h-4 w-4"/></button>
      </motion.div>
    </div>
  );
}
