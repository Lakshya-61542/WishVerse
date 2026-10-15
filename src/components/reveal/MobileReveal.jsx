export default function MobileReveal({ children, fullscreen = false }) {
  if (fullscreen) return <div className="fixed inset-0 overflow-hidden bg-black">{children}</div>;
  return (
    <div className="relative h-[660px] w-[320px] rounded-[44px] border border-white/15 bg-[#090a0f] p-[7px] shadow-[0_35px_90px_rgba(0,0,0,.6),0_0_0_1px_rgba(255,255,255,.04)]">
      <div className="absolute left-1/2 top-3 z-50 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/20"/>
      <div className="relative h-full w-full overflow-hidden rounded-[37px] bg-black">{children}</div>
    </div>
  );
}
