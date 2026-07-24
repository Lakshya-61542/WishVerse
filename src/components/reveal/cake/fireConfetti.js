import confetti from "canvas-confetti";

export default function fireConfetti() {
  confetti({
  particleCount: 120,
  angle: 60,
  spread: 80,
  origin: { x: 0 },
});

confetti({
  particleCount: 120,
  angle: 120,
  spread: 80,
  origin: { x: 1 },
});
}