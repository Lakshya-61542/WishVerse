import getImageSrc from "../../../utils/getImageSrc";
import { getEvent } from "../../../data/experience";
import { themeVisual } from "../../../utils/themeClass";

export default function MemoryCard({ image, recipientName, message, eventType = "Birthday", themeName = "Aurora" }) {
  const event = getEvent(eventType);
  const visual = themeVisual(themeName);
  const src = getImageSrc(image);

  return (
    <div style={{ width: 700, padding: 54, background: visual.background, color: "white", borderRadius: 36, fontFamily: "system-ui, sans-serif", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 320, height: 320, left: -100, top: -120, borderRadius: "50%", background: visual.soft, filter: "blur(70px)" }} />
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 18, letterSpacing: 4, opacity: .6, fontWeight: 800, textTransform: "uppercase" }}>{event.emoji} {event.title}</div>
        {src ? <img src={src} style={{ width: 180, height: 180, borderRadius: "50%", objectFit: "cover", border: "6px solid white", margin: "30px auto 0", display: "block" }} /> : <div style={{ width: 180, height: 180, borderRadius: "50%", border: "6px solid white", margin: "30px auto 0", display: "grid", placeItems: "center", fontSize: 70 }}>{event.emoji}</div>}
        <h2 style={{ marginTop: 24, fontSize: 36, fontWeight: 850 }}>{recipientName || "Someone special"} ♥</h2>
        <div style={{ marginTop: 30, fontSize: 28, fontWeight: 900 }}>{event.finalTop}</div>
        <div style={{ marginTop: 4, color: visual.accent2, fontSize: 48, letterSpacing: 5, fontWeight: 950 }}>{event.finalBottom}</div>
        <div style={{ marginTop: 32, padding: 28, background: "rgba(255,255,255,.09)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 26 }}>
          <div style={{ fontSize: 34, marginBottom: 14 }}>💌</div>
          <p style={{ lineHeight: 1.7, fontSize: 22, whiteSpace: "pre-wrap" }}>{message || event.finalNote}</p>
        </div>
        <p style={{ marginTop: 36, opacity: .5, fontSize: 16 }}>Made with WishVerse</p>
      </div>
    </div>
  );
}
