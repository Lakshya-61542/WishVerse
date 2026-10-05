import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-[22px] border border-white/10 bg-[#090b16]/70 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-6">
        <button onClick={() => navigate("/")} aria-label="WishVerse home"><Logo /></button>
        <div className="hidden items-center gap-7 text-sm font-medium text-white/60 md:flex">
          <a className="transition hover:text-white" href="#features">Features</a>
          <a className="transition hover:text-white" href="#occasions">Occasions</a>
          <a className="transition hover:text-white" href="#how-it-works">How it works</a>
        </div>
        <button
          onClick={() => navigate("/builder")}
          className="group flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#090b16] transition hover:scale-[1.02]"
        >
          Create a Wish <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </nav>
  );
}
