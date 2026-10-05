import { Check, Palette, Sparkles } from "lucide-react";
import { THEMES } from "../../data/experience";

const recommendedTheme = {
  Birthday: "Aurora", Anniversary: "Romantic", Proposal: "Romantic", Wedding: "Champagne",
  Engagement: "Champagne", Graduation: "Midnight", Friendship: "Ocean", "Baby Shower": "Blossom",
  Farewell: "Sunset", "Valentine's Day": "Romantic", "Mother's Day": "Blossom", "Father's Day": "Champagne",
  Festival: "Champagne", Achievement: "Midnight", "New Job": "Emerald", Retirement: "Sunset",
  "New Year": "Aurora", "Thank You": "Ocean", "Custom Event": "Aurora",
};

export default function ThemeSelection({ selectedTheme, setSelectedTheme, selectedEvent }) {
  const recommendation = recommendedTheme[selectedEvent] || "Aurora";
  return (
    <div>
      <div className="mb-8">
        <div className="builder-kicker"><Palette className="h-3.5 w-3.5"/> Visual direction</div>
        <h1 className="builder-title">Choose your atmosphere</h1>
        <p className="builder-subtitle">Every reveal scene follows this palette, from the opening gift to the final memory.</p>
      </div>

      <button type="button" onClick={() => setSelectedTheme(recommendation)} className="mb-5 flex w-full items-center justify-between gap-4 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50/70 to-cyan-50 px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm"><Sparkles className="h-4 w-4 text-violet-600"/></div>
          <div><div className="text-xs font-extrabold text-[#2d2139]">Recommended for {selectedEvent || "this moment"}</div><div className="mt-0.5 text-[10px] text-[#8d8195]">{recommendation} gives this occasion a polished starting point.</div></div>
        </div>
        <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-1.5 text-[10px] font-black text-white shadow-sm">Use {recommendation}</span>
      </button>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((theme) => {
          const selected = selectedTheme === theme.name;
          const recommended = recommendation === theme.name;
          return (
            <button key={theme.name} onClick={() => setSelectedTheme(theme.name)} className={`overflow-hidden rounded-3xl border bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${selected ? "border-violet-300 ring-2 ring-violet-100" : "border-[#eadff1] hover:border-violet-200"}`}>
              <div className={`relative h-28 overflow-hidden rounded-2xl bg-gradient-to-br ${theme.preview}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,.35),transparent_30%)]"/>
                <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-lg">{theme.emoji} {theme.name}</div>
                {recommended && <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/25 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-white backdrop-blur">Recommended</div>}
                {selected && <div className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white text-violet-700 shadow"><Check className="h-4 w-4"/></div>}
              </div>
              <p className="px-2 pb-2 pt-3 text-xs leading-5 text-[#81748b]">{theme.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
