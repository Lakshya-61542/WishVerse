const themes = [
  {
    name: "Romantic",
    emoji: "❤️",
    color: "from-pink-500 to-rose-700",
  },
  {
    name: "Birthday",
    emoji: "🎂",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Luxury",
    emoji: "✨",
    color: "from-yellow-500 to-amber-700",
  },
  {
    name: "Dark",
    emoji: "🌙",
    color: "from-slate-700 to-black",
  },
  {
    name: "Cute",
    emoji: "🌸",
    color: "from-pink-300 to-pink-500",
  },
];

export default function ThemeSelection({
  selectedTheme,
  setSelectedTheme,
}) {
  return (
    <>
      <h1 className="mb-3 text-4xl font-bold text-white">
        Select Theme
      </h1>

      <p className="mb-8 text-gray-400">
        Choose a theme for your website.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {themes.map((theme) => (
          <div
            key={theme.name}
            onClick={() => setSelectedTheme(theme.name)}
            className={`cursor-pointer rounded-3xl p-8 text-center transition-all duration-300 hover:scale-105 ${
              selectedTheme === theme.name
                ? "ring-2 ring-violet-500"
                : ""
            }`}
          >
            <div
              className={`h-32 rounded-2xl bg-gradient-to-r ${theme.color}`}
            />

            <h2 className="mt-4 text-2xl font-semibold text-white">
              {theme.emoji} {theme.name}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}