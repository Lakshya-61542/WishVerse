import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Background() {
  const bg = useRef();

  useEffect(() => {
    gsap.to(".blob1", {
      x: 120,
      y: 60,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".blob2", {
      x: -100,
      y: -80,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".blob3", {
      y: 100,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div ref={bg} className="fixed inset-0 -z-10 overflow-hidden bg-[#050816]">

      <div className="blob1 absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-600 opacity-30 blur-[150px]" />

      <div className="blob2 absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-600 opacity-20 blur-[150px]" />

      <div className="blob3 absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 opacity-20 blur-[150px]" />

    </div>
  );
}