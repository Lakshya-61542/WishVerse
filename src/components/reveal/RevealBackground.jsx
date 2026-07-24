export default function RevealBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#13002d] via-[#2d106b] to-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#8b5cf655,transparent_60%)]" />

      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />
    </>
  );
}