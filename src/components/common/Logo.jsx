import { Sparkles } from "lucide-react";

export default function Logo({ compact = false, variant = "dark" }) {
  const light = variant === "light";
  return (
    <div className="flex items-center gap-3">
      <div className={`grid h-10 w-10 place-items-center rounded-2xl border shadow-[0_8px_28px_rgba(124,58,237,.16)] backdrop-blur-xl ${light ? "border-violet-200/80 bg-gradient-to-br from-violet-100 to-fuchsia-100" : "border-white/10 bg-white/10"}`}>
        <Sparkles className={`h-5 w-5 ${light ? "text-violet-600" : "text-violet-300"}`} />
      </div>
      {!compact && (
        <div className="text-left leading-none">
          <div className={`text-xl font-black tracking-[-0.04em] ${light ? "text-[#241a35]" : "text-white"}`}>
            Wish<span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">Verse</span>
          </div>
          <div className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] ${light ? "text-[#776b82]" : "text-white/35"}`}>Moments, made magical</div>
        </div>
      )}
    </div>
  );
}
