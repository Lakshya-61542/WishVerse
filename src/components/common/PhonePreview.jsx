import { Smartphone } from "lucide-react";

export default function PhonePreview() {
  return (
    <div className="hidden lg:flex justify-center items-center">

      <div className="relative h-[620px] w-[320px] rounded-[45px] border border-white/10 bg-black/40 p-3 shadow-2xl backdrop-blur-xl">

        <div className="absolute left-1/2 top-3 h-6 w-32 -translate-x-1/2 rounded-full bg-black"></div>

        <div className="flex h-full flex-col items-center justify-center rounded-[35px] bg-gradient-to-b from-violet-700 to-slate-900">

          <Smartphone size={70} className="text-white opacity-80"/>

          <h2 className="mt-5 text-2xl font-bold text-white">
            Live Preview
          </h2>

          <p className="mt-3 w-4/5 text-center text-gray-300">
            Your surprise website will appear here while you build it.
          </p>

        </div>

      </div>

    </div>
  );
}