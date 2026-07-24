export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-10 rounded-2xl bg-violet-600 px-12 py-5 text-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-violet-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.7)]"
    >
      {children}
    </button>
  );
}

