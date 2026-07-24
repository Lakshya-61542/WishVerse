export default function MobileReveal({
  children,
  fullscreen = false,
}) {
  if (fullscreen) {
    return (
      <div className="fixed inset-0 overflow-hidden bg-black">
        {children}
      </div>
    );
  }

  return (
    <div className="relative h-[680px] w-[330px] rounded-[55px] border-[8px] border-zinc-800 bg-black shadow-2xl">

      {/* Dynamic Island */}
      <div className="absolute left-1/2 top-3 z-50 h-7 w-36 -translate-x-1/2 rounded-full bg-zinc-900" />

      {/* Screen */}
      <div className="absolute inset-0 overflow-hidden rounded-[45px]">
        {children}
      </div>

    </div>
  );
}