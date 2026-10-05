import PolaroidCard from "./PolaroidCard";
import RevealBackground from "./RevealBackground";
import { getEvent } from "../../data/experience";

export default function Scene2({ image, images, recipientName, eventType, themeName }) {
  const event = getEvent(eventType);
  const featured = images?.[0] || image;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <RevealBackground themeName={themeName} eventEmoji={event.emoji} />
      <PolaroidCard image={featured} recipientName={recipientName} eventType={eventType} themeName={themeName} />
    </div>
  );
}
