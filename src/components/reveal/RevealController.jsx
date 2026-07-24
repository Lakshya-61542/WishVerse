import { useEffect, useState } from "react";
import { revealScenes } from "./scenes";

export default function RevealController({

  image,
  images,
  letterPhoto,
  recipientName,
  message,
  onRevealComplete,

}) {

  const [sceneIndex, setSceneIndex] = useState(0);

  const currentScene = revealScenes[sceneIndex];

  useEffect(() => {

    if (currentScene.mode !== "auto") return;

    const timer = setTimeout(() => {

      if (sceneIndex < revealScenes.length - 1) {

        setSceneIndex(sceneIndex + 1);

      } else {

        onRevealComplete();

      }

    }, currentScene.duration);

    return () => clearTimeout(timer);

  }, [sceneIndex]);

console.log(
  "Scene:",
  sceneIndex,
  currentScene.component.name,
  currentScene.mode
);

  const Scene = currentScene.component;

  return (

    <Scene
  image={image}
  images={images}
  letterPhoto={letterPhoto}
  recipientName={recipientName}
  message={message}

  onContinue={() => {
    if (sceneIndex < revealScenes.length - 1) {
      setSceneIndex(sceneIndex + 1);
    } else {
      onRevealComplete();
    }
  }}

  onComplete={() => {
    if (sceneIndex < revealScenes.length - 1) {
      setSceneIndex(sceneIndex + 1);
    } else {
      onRevealComplete();
    }
  }}
/>

  );

}