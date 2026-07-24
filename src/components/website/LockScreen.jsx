import { useState } from "react";

export default function LockScreen({
  correctPin,
  onUnlock,
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleNumber = (num) => {
    if (pin.length >= 6) return;

    const newPin = pin + num;
    setPin(newPin);

    if (newPin.length === 6) {
      if (newPin === correctPin) {
        setTimeout(() => {
          onUnlock();
        }, 300);
      } else {
        setError(true);

setTimeout(() => {
  setPin("");
  setError(false);
}, 1000);
      }
    }
  };

  const numbers = [
    "1","2","3",
    "4","5","6",
    "7","8","9",
    "0"
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">

      <h2 className="mb-4 text-3xl font-bold text-white">
        Enter Passcode
      </h2>

      <p className="mb-8 text-white/60">
        Hint: DOB (DDMMYY)
      </p>

      <div
        className={`mb-10 flex gap-3 ${
  error ? "animate-shake" : ""
}`}
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full border border-white ${
              index < pin.length
                ? "bg-white"
                : "bg-transparent"
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">

        {numbers.slice(0, 9).map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num)}
            className="h-16 w-16 rounded-full bg-white/10 text-2xl text-white backdrop-blur-lg"
          >
            {num}
          </button>
        ))}

        <div></div>

        <button
          onClick={() => handleNumber("0")}
          className="h-16 w-16 rounded-full bg-white/10 text-2xl text-white backdrop-blur-lg"
        >
          0
        </button>

        <div
  className={`mb-10 flex gap-3 ${
    error ? "animate-bounce" : ""
  }`}
></div>

      </div>

    </div>
  );
}