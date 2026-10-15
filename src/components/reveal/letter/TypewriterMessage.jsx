import { useEffect, useState } from "react";
import { getEvent } from "../../../data/experience";

export default function TypewriterMessage({ recipientName, message = "", eventType }) {
  const event = getEvent(eventType);
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
    if (!message) return;
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setText(message.slice(0, index));
      if (index >= message.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <div>
      <div className="text-[9px] font-black uppercase tracking-[.2em] text-zinc-400">{event.title}</div>
      <h2 className="mt-2 text-[24px] font-bold leading-none text-zinc-800" style={{ fontFamily: "Caveat, cursive" }}>
        Dear {recipientName || "you"} ♥,
      </h2>
      <div className="mt-4 max-h-[172px] overflow-y-auto pr-1 [scrollbar-width:thin]">
        <p className="whitespace-pre-wrap text-[15px] leading-[1.55] text-zinc-700" style={{ fontFamily: "Caveat, cursive" }}>
          {text || "A little note, made just for this moment."}
          {message && text.length < message.length && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </div>
  );
}
