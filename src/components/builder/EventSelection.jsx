import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { EVENTS } from "../../data/experience";

const accentTile = {
  violet: "from-violet-100 to-fuchsia-100",
  rose: "from-rose-100 to-pink-100",
  pink: "from-pink-100 to-fuchsia-100",
  amber: "from-amber-100 to-orange-100",
  cyan: "from-cyan-100 to-sky-100",
  blue: "from-blue-100 to-indigo-100",
  sky: "from-sky-100 to-cyan-100",
  orange: "from-orange-100 to-rose-100",
  yellow: "from-yellow-100 to-amber-100",
  emerald: "from-emerald-100 to-teal-100",
  purple: "from-purple-100 to-violet-100",
};

export default function EventSelection({ selectedEvent, setSelectedEvent }) {
  return (
    <div>
      <div className="mb-8">
        <div className="builder-kicker"><Sparkles className="h-3.5 w-3.5"/> Start with the moment</div>
        <h1 className="builder-title">What are we celebrating?</h1>
        <p className="builder-subtitle">Choose an occasion. You can still personalise every part of the experience.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {EVENTS.map((event, index) => {
          const selected = selectedEvent === event.title;
          return (
            <motion.button
              key={event.title}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * .025, .18) }}
              onClick={() => setSelectedEvent(event.title)}
              className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 ${selected ? "border-violet-300 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 shadow-[0_18px_48px_rgba(124,58,237,.14)]" : "border-[#eadff1] bg-white/85 shadow-[0_8px_24px_rgba(86,57,105,.05)] hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_16px_36px_rgba(86,57,105,.10)]"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl border border-white bg-gradient-to-br ${accentTile[event.accent] || accentTile.violet} text-2xl shadow-sm`}>{event.emoji}</div>
                {selected && <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md"><Check className="h-4 w-4"/></div>}
              </div>
              <h2 className="mt-5 text-base font-extrabold text-[#2c2038]">{event.title}</h2>
              <p className="mt-1 text-xs font-bold text-violet-600/80">{event.tagline}</p>
              <p className="mt-3 text-xs leading-5 text-[#8a7d93]">{event.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
