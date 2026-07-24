import confetti from "canvas-confetti";

export function fireFireworks() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 35,
    spread: 360,
    ticks: 80,
    zIndex: 999,
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    confetti({
      ...defaults,
      particleCount: 12,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.5,
      },
      colors: [
        "#ff4d6d",
        "#ffd166",
        "#06d6a0",
        "#4cc9f0",
        "#c77dff",
        "#ffffff",
      ],
    });

  }, 250);
}