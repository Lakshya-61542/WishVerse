import Scene1 from "./Scene1";
import Scene2 from "./Scene2";
import Scene3 from "./Scene3";
import Scene4 from "./Scene4";
import Scene5 from "./Scene5";
import LetterScene from "./LetterScene";
import CakeScene from "./cake/CakeScene";
import CelebrationScene from "./CelebrationScene";

const baseScenes = [
  { component: Scene1, mode: "auto", duration: 2600 },
  { component: Scene2, mode: "auto", duration: 3800 },
  { component: Scene3, mode: "auto", duration: 3800 },
  { component: Scene4, mode: "auto", duration: 4300 },
  { component: Scene5, mode: "auto", duration: 7200 },
  { component: LetterScene, mode: "manual" },
];

export function getRevealScenes(eventType) {
  return [
    ...baseScenes,
    {
      component: eventType === "Birthday" ? CakeScene : CelebrationScene,
      mode: "manual",
    },
  ];
}
