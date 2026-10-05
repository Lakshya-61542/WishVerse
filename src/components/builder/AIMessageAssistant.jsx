import { useState } from "react";
import { LoaderCircle, Sparkles, WandSparkles } from "lucide-react";

const tones = ["Warm", "Romantic", "Playful", "Elegant"];

function fallbackMessage(recipientName, selectedEvent, tone, detail) {
  const name = recipientName?.trim() || "you";
  const extra = detail?.trim() ? ` ${detail.trim()}` : "";
  const starters = {
    Warm: `Dear ${name}, some people make ordinary moments feel much more meaningful.`,
    Romantic: `${name}, somehow the world feels softer, brighter and more beautiful with you in it.`,
    Playful: `${name}, you are officially one of my favourite reasons to smile far too much.`,
    Elegant: `${name}, this moment deserves to be remembered with the same grace and meaning you bring to it.`,
  };
  return `${starters[tone] || starters.Warm}\n\nToday is about celebrating ${selectedEvent?.toLowerCase() || "this beautiful moment"} and all the memories that made it special.${extra}\n\nHere’s to the moments already lived, the ones still ahead, and the kind of magic that is impossible to put into just one message.`;
}

export default function AIMessageAssistant({ recipientName, selectedEvent, onUse }) {
  const [tone, setTone] = useState("Warm");
  const [detail, setDetail] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const response = await fetch("/api/ai-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientName, selectedEvent, tone, detail }),
      });
      if (!response.ok) throw new Error("AI endpoint unavailable");
      const data = await response.json();
      setGenerated(data.message || fallbackMessage(recipientName, selectedEvent, tone, detail));
    } catch {
      setGenerated(fallbackMessage(recipientName, selectedEvent, tone, detail));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-fuchsia-50/60 to-cyan-50 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div><div className="flex items-center gap-2 text-sm font-extrabold text-[#2d2039]"><WandSparkles className="h-4 w-4 text-fuchsia-500"/>WishMuse AI</div><div className="mt-1 text-xs leading-5 text-[#86798f]">Give it a tone and one detail. Keep, edit or replace anything it writes.</div></div>
        <span className="rounded-full border border-fuchsia-200 bg-white/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-fuchsia-600">AI assist</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{tones.map(item=><button key={item} type="button" onClick={()=>setTone(item)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${tone===item ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-sm" : "border border-violet-100 bg-white text-[#756879] hover:border-violet-200"}`}>{item}</button>)}</div>
      <input value={detail} onChange={(e)=>setDetail(e.target.value)} placeholder="One detail to include, e.g. our Goa trip…" className="mt-4 w-full rounded-2xl border border-violet-100 bg-white px-4 py-3 text-sm text-[#34263f] outline-none placeholder:text-[#b5aabb] focus:border-violet-300 focus:ring-4 focus:ring-violet-100/60"/>
      <button type="button" disabled={loading} onClick={generate} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#241a35] px-4 py-3 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-violet-800 disabled:opacity-60">{loading ? <LoaderCircle className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4"/>}{loading ? "Writing…" : "Generate with WishMuse"}</button>
      {generated && <div className="mt-4 rounded-2xl border border-violet-100 bg-white/85 p-4 shadow-sm"><p className="whitespace-pre-wrap text-sm leading-6 text-[#62566b]">{generated}</p><button type="button" onClick={()=>onUse(generated)} className="mt-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2 text-xs font-bold text-white shadow-sm">Use this message</button></div>}
    </div>
  );
}
