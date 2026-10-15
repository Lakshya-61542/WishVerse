import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-6 text-white">
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" />

      <div className="relative max-w-lg text-center">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mx-auto mt-12 grid h-20 w-20 place-items-center rounded-[26px] border border-white/10 bg-white/[0.06]">
          <Sparkles className="h-8 w-8 text-violet-300" />
        </div>

        <div className="mt-7 text-sm font-black uppercase tracking-[0.25em] text-violet-300">
          Error 404
        </div>

        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
          This Wish has wandered away.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/50">
          The page you're looking for doesn't exist or may have moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-950"
          >
            <Home className="h-4 w-4" />
            Go home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-black text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}