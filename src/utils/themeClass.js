const visuals = {
  Aurora: {
    background: "linear-gradient(180deg,#2b0a63 0%,#190f46 45%,#050816 100%)",
    glow: "#a855f7",
    accent: "#e879f9",
    accent2: "#67e8f9",
    soft: "rgba(168,85,247,.16)",
  },
  Romantic: {
    background: "linear-gradient(180deg,#5f0a31 0%,#2d0b2e 48%,#09040a 100%)",
    glow: "#ec4899",
    accent: "#fb7185",
    accent2: "#f9a8d4",
    soft: "rgba(236,72,153,.17)",
  },
  Champagne: {
    background: "linear-gradient(180deg,#4b3511 0%,#241a0b 48%,#090704 100%)",
    glow: "#f59e0b",
    accent: "#facc15",
    accent2: "#fde68a",
    soft: "rgba(245,158,11,.16)",
  },
  Midnight: {
    background: "linear-gradient(180deg,#18233b 0%,#0c1221 48%,#020306 100%)",
    glow: "#64748b",
    accent: "#cbd5e1",
    accent2: "#94a3b8",
    soft: "rgba(148,163,184,.13)",
  },
  Blossom: {
    background: "linear-gradient(180deg,#6f205f 0%,#3f1852 48%,#100713 100%)",
    glow: "#f472b6",
    accent: "#f9a8d4",
    accent2: "#d8b4fe",
    soft: "rgba(244,114,182,.17)",
  },
  Ocean: {
    background: "linear-gradient(180deg,#075985 0%,#173475 48%,#050816 100%)",
    glow: "#22d3ee",
    accent: "#67e8f9",
    accent2: "#93c5fd",
    soft: "rgba(34,211,238,.15)",
  },
  Sunset: {
    background: "linear-gradient(180deg,#7c2d12 0%,#7f1d4e 46%,#24103f 100%)",
    glow: "#fb7185",
    accent: "#fdba74",
    accent2: "#f9a8d4",
    soft: "rgba(251,113,133,.16)",
  },
  Emerald: {
    background: "linear-gradient(180deg,#064e3b 0%,#0f3e46 47%,#071014 100%)",
    glow: "#34d399",
    accent: "#6ee7b7",
    accent2: "#5eead4",
    soft: "rgba(52,211,153,.14)",
  },
  Mono: {
    background: "linear-gradient(180deg,#3f3f46 0%,#18181b 48%,#050505 100%)",
    glow: "#d4d4d8",
    accent: "#f4f4f5",
    accent2: "#a1a1aa",
    soft: "rgba(212,212,216,.11)",
  },
};

export function themeVisual(theme) {
  return visuals[theme] || visuals.Aurora;
}

export function themeBackground(theme) {
  switch (theme) {
    case "Romantic": return "bg-gradient-to-b from-rose-500 via-pink-800 to-[#16040d]";
    case "Champagne": return "bg-gradient-to-b from-amber-300 via-amber-800 to-[#120d03]";
    case "Midnight": return "bg-gradient-to-b from-slate-700 via-slate-950 to-black";
    case "Blossom": return "bg-gradient-to-b from-pink-300 via-fuchsia-600 to-purple-950";
    case "Ocean": return "bg-gradient-to-b from-cyan-400 via-blue-700 to-indigo-950";
    case "Sunset": return "bg-gradient-to-b from-orange-300 via-rose-600 to-purple-950";
    case "Emerald": return "bg-gradient-to-b from-emerald-300 via-teal-800 to-slate-950";
    case "Mono": return "bg-gradient-to-b from-zinc-500 via-zinc-900 to-black";
    default: return "bg-gradient-to-b from-violet-600 via-fuchsia-900 to-[#050816]";
  }
}
