import { useEffect, useMemo, useState } from "react";
import { getRevealScenes } from "./scenes";

export default function RevealController({ image, images, letterPhoto, recipientName, message, eventType, themeName, onRevealComplete }) {
  const revealScenes = useMemo(() => getRevealScenes(eventType), [eventType]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const currentScene = revealScenes[sceneIndex];

  useEffect(() => { setSceneIndex(0); }, [eventType]);

  useEffect(() => {
    if (!currentScene || currentScene.mode !== "auto") return;
    const timer = setTimeout(() => {
      if (sceneIndex < revealScenes.length - 1) setSceneIndex((index) => index + 1);
      else onRevealComplete?.();
    }, currentScene.duration);
    return () => clearTimeout(timer);
  }, [sceneIndex, currentScene, revealScenes, onRevealComplete]);

  if (!currentScene) return null;
  const Scene = currentScene.component;
  const advance = () => {
    if (sceneIndex < revealScenes.length - 1) setSceneIndex((index) => index + 1);
    else onRevealComplete?.();
  };

  return (
    <Scene
      image={image}
      images={images}
      letterPhoto={letterPhoto}
      recipientName={recipientName}
      message={message}
      eventType={eventType}
      themeName={themeName}
      onContinue={advance}
      onComplete={advance}
    />
  );
}
