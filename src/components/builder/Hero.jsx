import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Button from "../common/Button";

export default function Hero() {

  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      heroRef.current.children,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="max-w-2xl text-5xl font-bold leading-tight text-white md:text-7xl">
        Every Memory
        <span className="text-violet-500"> Deserves </span>
        Its Own Website
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-gray-400">
        Create stunning interactive websites for birthdays,
        anniversaries, proposals and every special moment.
      </p>

      <Button
        onClick={() => navigate("/builder")}
      >
        Begin Creating →
      </Button>

    </section>
  );
}