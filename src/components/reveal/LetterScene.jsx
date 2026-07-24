import { useState } from "react";
import { motion } from "framer-motion";
import InvitationCard from "./letter/InvitationCard";
import LetterPaper from "./letter/LetterPaper";

export default function LetterScene({
  letterPhoto,
  recipientName,
  message,
  onContinue,
}) {

  const [opened, setOpened] = useState(false);

  return (

    <div
      className={`relative flex h-full w-full items-center justify-center bg-gradient-to-b from-[#14051f] to-black ${
        opened ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={() => {

        if (!opened) return;

        onContinue?.();

      }}
    >

      <div className="relative">

        <InvitationCard
          onOpened={() => setOpened(true)}
        />

        {opened && (
          <LetterPaper
            letterPhoto={letterPhoto}
            recipientName={recipientName}
            message={message}
          />
        )}

      </div>

      {opened && (

        <motion.div

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 2,
          }}

          className="absolute bottom-8"

        >

          <button
            className="rounded-full bg-pink-500 px-6 py-3 text-white shadow-xl transition hover:scale-105 hover:bg-pink-600"
            onClick={(e) => {

              e.stopPropagation();
              onContinue?.();

            }}
          >
            Continue ❤️
          </button>

        </motion.div>

      )}

    </div>

  );

}