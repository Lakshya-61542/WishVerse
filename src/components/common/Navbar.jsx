import { ArrowUpRight, LayoutDashboard, LogIn, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const createPath = user ? "/builder" : "/signup";

  function go(path) {
    setOpen(false);
    navigate(path);
  }

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-white/10 bg-[#050816]/86 backdrop-blur-2xl">
      <div className="mx-auto flex h-[74px] w-full max-w-[1680px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button onClick={() => go("/")} className="shrink-0">
          <Logo />
        </button>

        <div className="hidden items-center gap-9 lg:flex">
          <a href="#features" className="text-sm font-semibold text-white/55 transition hover:text-white">
            Features
          </a>
          <a href="#occasions" className="text-sm font-semibold text-white/55 transition hover:text-white">
            Occasions
          </a>
          <a href="#how-it-works" className="text-sm font-semibold text-white/55 transition hover:text-white">
            How it works
          </a>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <button
              onClick={() => go("/dashboard")}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => go("/login")}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </button>
          )}

          {user && (
            <button
              onClick={() => go("/profile")}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Profile"
            >
              <UserRound className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={() => go(createPath)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#080b18] shadow-[0_10px_30px_rgba(255,255,255,.1)] transition hover:-translate-y-0.5"
          >
            Create a Wish
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => setOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#080b1b]/98 px-5 py-5 md:hidden">
          <div className="mx-auto flex max-w-[1680px] flex-col gap-2">
            {[
              ["Features", "#features"],
              ["Occasions", "#occasions"],
              ["How it works", "#how-it-works"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold text-white/70 hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}

            <div className="my-2 h-px bg-white/10" />

            <button
              onClick={() => go(user ? "/dashboard" : "/login")}
              className="rounded-xl px-3 py-3 text-left text-sm font-bold text-white/70 hover:bg-white/5"
            >
              {user ? "Dashboard" : "Sign in"}
            </button>

            <button
              onClick={() => go(createPath)}
              className="mt-1 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#080b18]"
            >
              Create a Wish
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
