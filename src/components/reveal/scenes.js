import Scene1 from "./Scene1";
import Scene2 from "./Scene2";
import Scene3 from "./Scene3";
import Scene4 from "./Scene4";
import Scene5 from "./Scene5";
import LetterScene from "./LetterScene";
import CakeScene from "./cake/CakeScene";

export const revealScenes = [
  {
    component: Scene1,
    mode: "auto",
    duration: 1500,
  },

  {
    component: Scene2,
    mode: "auto",
    duration: 3000,
  },

  {
    component: Scene3,
    mode: "auto",
    duration: 3500,
  },

  {
    component: Scene4,
    mode: "auto",
    duration: 7000,
  },

  {
    component: Scene5,
    mode: "auto",
    duration: 10000,
  },

  {
    component: LetterScene,
    mode: "manual",
  },

  {
    component:CakeScene,
    mode:"manual",
},
];
