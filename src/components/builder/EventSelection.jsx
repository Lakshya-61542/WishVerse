const events = [
  { emoji: "🎂", title: "Birthday" },
  { emoji: "💍", title: "Anniversary" },
  { emoji: "❤️", title: "Proposal" },
  { emoji: "🎓", title: "Graduation" },
  { emoji: "🎉", title: "Custom Event" },
];

export default function EventSelection({
  selectedEvent,
  setSelectedEvent,
}) { 

  return (
    <>
      <h1 className="text-4xl font-bold text-white mb-3">
        Select Event
      </h1>

      <p className="text-gray-400 mb-8">
        Choose the event for your website.
      </p>

      <div className="grid grid-cols-2 gap-6">

        {events.map((event) => (

          <div
  key={event.title}
  onClick={() => setSelectedEvent(event.title)}
  className={`cursor-pointer rounded-3xl border p-8 text-center transition-all duration-300 hover:scale-105

  ${
    selectedEvent === event.title
      ? "border-violet-500 bg-violet-500/20"
      : "border-white/10 bg-white/5 hover:border-violet-500"
  }`}
>

            <div className="text-6xl">
              {event.emoji}
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              {event.title}
            </h2>

          </div>

        ))}

      </div>
    </>
  );
}