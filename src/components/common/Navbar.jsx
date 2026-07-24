export default function Navbar() {
  return (
    <nav className="fixed top-4 left-0 w-full z-50">
      <div className="mx-auto mt-5 flex w-[95%] max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">

        <h1 className="text-2xl font-bold text-white">
          Wish<span className="text-violet-500">Verse</span>
        </h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#">Features</a>
          <a href="#">Templates</a>
          <a href="#">Pricing</a>
        </div>

        <button className="rounded-xl bg-violet-600 px-5 py-2 text-white transition hover:bg-violet-500">
          Sign In
        </button>

      </div>
    </nav>
  );
}