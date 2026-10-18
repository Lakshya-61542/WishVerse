import { useEffect, useState } from "react";
import {
  Loader2,
  LockKeyhole,
} from "lucide-react";

export default function LockScreen({
  onVerifyPin,
  correctPin,
  onUnlock,
}) {
  const [pin, setPin] =
    useState("");

  const [error, setError] =
    useState(false);

  const [checking, setChecking] =
    useState(false);

  /*
   * VERIFY COMPLETE 6-DIGIT PIN
   */
async function verifyPin(enteredPin) {
  if (
    checking ||
    enteredPin.length !== 6
  ) {
    return;
  }

  setChecking(true);
  setError(false);

  try {
    let valid = false;

    /*
     * PUBLIC WEBSITE
     *
     * Uses secure Supabase RPC through PublicReveal.
     */
    if (onVerifyPin) {
      valid =
        await onVerifyPin(
          enteredPin
        );
    }

    /*
     * BUILDER PREVIEW
     *
     * The Wish hasn't been published yet,
     * so compare against the temporary
     * Builder password state locally.
     */
    else if (correctPin) {
      valid =
        String(enteredPin) ===
        String(correctPin).trim();

      if (valid) {
        onUnlock?.();
      }
    }

    /*
     * SUCCESS
     */
    if (valid) {
      return;
    }

    /*
     * WRONG PIN
     */
    setError(true);

    setTimeout(() => {
      setPin("");
      setError(false);
    }, 900);
  } catch (error) {
    console.error(
      "PIN verification error:",
      error
    );

    setError(true);

    setTimeout(() => {
      setPin("");
      setError(false);
    }, 900);
  } finally {
    setChecking(false);
  }
}

  /*
   * NUMBER BUTTON
   */
  function handleNumber(num) {
    if (
      checking ||
      pin.length >= 6
    ) {
      return;
    }

    const newPin =
      pin + num;

    setPin(newPin);
    setError(false);

    if (
      newPin.length === 6
    ) {
      verifyPin(newPin);
    }
  }

  /*
   * DELETE LAST DIGIT
   */
  function handleBackspace() {
    if (checking) return;

    setError(false);

    setPin((current) =>
      current.slice(0, -1)
    );
  }

  /*
   * SUPPORT PHYSICAL KEYBOARD
   */
  useEffect(() => {
    function handleKeyDown(event) {
      if (checking) return;

      if (
        /^[0-9]$/.test(
          event.key
        )
      ) {
        handleNumber(
          event.key
        );
      }

      if (
        event.key ===
        "Backspace"
      ) {
        handleBackspace();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    pin,
    checking,
  ]);

  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-violet-400/15 blur-[110px]" />

      {/* LOCK ICON */}

      <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl">

        {checking ? (
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        ) : (
          <LockKeyhole className="h-6 w-6 text-white" />
        )}

      </div>

      {/* TITLE */}

      <h2 className="relative mt-5 text-2xl font-black text-white">
        Private surprise
      </h2>

      <p className="relative mt-2 text-xs text-white/45">
        {checking
          ? "Checking your passcode…"
          : "Enter the 6-digit passcode"}
      </p>

      {/* PIN DOTS */}

      <div
        className={`relative my-7 flex gap-3 ${
          error
            ? "animate-shake"
            : ""
        }`}
      >

        {[...Array(6)].map(
          (_, index) => (
            <div
              key={index}
              className={`h-2.5 w-2.5 rounded-full border transition-all duration-200 ${
                index <
                pin.length
                  ? error
                    ? "border-rose-300 bg-rose-300"
                    : "border-white bg-white"
                  : "border-white/60 bg-transparent"
              }`}
            />
          )
        )}

      </div>

      {/* NUMBER PAD */}

      <div
        className={`relative grid grid-cols-3 gap-3 transition ${
          checking
            ? "pointer-events-none opacity-45"
            : ""
        }`}
      >

        {numbers.map(
          (num) => (
            <button
              key={num}
              type="button"
              disabled={
                checking
              }
              onClick={() =>
                handleNumber(
                  num
                )
              }
              className="h-14 w-14 rounded-full border border-white/10 bg-white/[.08] text-lg font-bold text-white backdrop-blur-lg transition hover:bg-white/[.13] active:scale-95 disabled:cursor-not-allowed"
            >
              {num}
            </button>
          )
        )}

        {/* BOTTOM LEFT SPACER */}

        <div />

        {/* ZERO */}

        <button
          type="button"
          disabled={checking}
          onClick={() =>
            handleNumber("0")
          }
          className="h-14 w-14 rounded-full border border-white/10 bg-white/[.08] text-lg font-bold text-white backdrop-blur-lg transition hover:bg-white/[.13] active:scale-95 disabled:cursor-not-allowed"
        >
          0
        </button>

        {/* BACKSPACE */}

        <button
          type="button"
          disabled={
            checking ||
            pin.length === 0
          }
          onClick={
            handleBackspace
          }
          className="grid h-14 w-14 place-items-center text-lg text-white/45 transition hover:text-white disabled:opacity-20"
          aria-label="Delete last digit"
        >
          ⌫
        </button>

      </div>

      {/* ERROR */}

      <div className="relative mt-5 h-5">

        {error && (
          <p className="text-xs font-bold text-rose-300">
            That passcode didn’t match. Try again.
          </p>
        )}

        {checking && (
          <p className="flex items-center justify-center gap-2 text-xs font-bold text-violet-200">

            <Loader2 className="h-3 w-3 animate-spin" />

            Verifying securely…

          </p>
        )}

      </div>

      {/* SECURITY NOTE */}

      <p className="relative mt-3 max-w-[240px] text-center text-[10px] leading-4 text-white/25">
        This surprise is protected with a private passcode.
      </p>

    </div>
  );
}