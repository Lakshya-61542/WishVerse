import TypewriterMessage from "./TypewriterMessage";
import LetterPhoto from "./LetterPhoto";
import { motion } from "framer-motion";

export default function LetterPaper({
    letterPhoto,
    recipientName,
    message,
}) {
  return (
    <motion.div
      initial={{
    y:280,
    opacity:0,
    scale:.7,
}}
      animate={{
    y:0,
    opacity:1,
    scale:1,
}}
      transition={{
        delay: 2.1,
        duration: 1,
        ease: "easeOut",
      }}
      className="absolute inset-x-0 top-8 mx-auto h-[430px] w-[290px] rounded-2xl bg-[#fffdf7] shadow-2xl"
    >
      <div className="p-8">

       <TypewriterMessage
    recipientName={recipientName}
    message={message}
/>

      </div>
<LetterPhoto
  letterPhoto={letterPhoto}
/>

<motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
        delay: 5,
        duration: .8,
    }}
    className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[4px] text-gray-500"
>



</motion.p>

    </motion.div>
  );
}