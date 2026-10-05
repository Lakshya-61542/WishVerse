import { useState } from "react";
import { LockKeyhole, Sparkles } from "lucide-react";

export default function LockScreen({ correctPin, onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const openReveal = !correctPin;

  const handleNumber = (num) => {
    if (pin.length >= 6) return;
    const newPin = pin + num;
    setPin(newPin);
    if (newPin.length === 6) {
      if (newPin === correctPin) setTimeout(onUnlock, 220);
      else {
        setError(true);
        setTimeout(() => { setPin(""); setError(false); }, 800);
      }
    }
  };

  if (openReveal) {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-8 text-center">
        <div className="absolute h-72 w-72 rounded-full bg-violet-400/20 blur-[110px]"/>
        <div className="relative grid h-16 w-16 place-items-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl"><Sparkles className="h-7 w-7 text-white"/></div>
        <h2 className="relative mt-6 text-3xl font-black tracking-[-.04em] text-white">Something special is waiting.</h2>
        <p className="relative mt-3 max-w-xs text-sm leading-6 text-white/50">A little corner of the internet was made just for you.</p>
        <button onClick={onUnlock} className="relative mt-8 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-[#080a13]">Open your surprise ✨</button>
      </div>
    );
  }

  const numbers = ["1","2","3","4","5","6","7","8","9","0"];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute h-72 w-72 rounded-full bg-violet-400/15 blur-[110px]"/>
      <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/10"><LockKeyhole className="h-6 w-6 text-white"/></div>
      <h2 className="relative mt-5 text-2xl font-black text-white">Private surprise</h2>
      <p className="relative mt-2 text-xs text-white/45">Enter the 6-digit passcode</p>
      <div className={`relative my-7 flex gap-3 ${error ? "animate-shake" : ""}`}>{[...Array(6)].map((_,i)=><div key={i} className={`h-2.5 w-2.5 rounded-full border border-white/60 ${i<pin.length ? 'bg-white' : 'bg-transparent'}`}/>)}</div>
      <div className="relative grid grid-cols-3 gap-3">{numbers.slice(0,9).map(num=><button key={num} onClick={()=>handleNumber(num)} className="h-14 w-14 rounded-full border border-white/10 bg-white/[.08] text-lg font-bold text-white backdrop-blur-lg transition active:scale-95">{num}</button>)}<div/><button onClick={()=>handleNumber('0')} className="h-14 w-14 rounded-full border border-white/10 bg-white/[.08] text-lg font-bold text-white backdrop-blur-lg transition active:scale-95">0</button><button onClick={()=>setPin(pin.slice(0,-1))} className="text-xs text-white/35">⌫</button></div>
      {error && <p className="relative mt-5 text-xs font-bold text-rose-300">That passcode didn’t match. Try again.</p>}
    </div>
  );
}
