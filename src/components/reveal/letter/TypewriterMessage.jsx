import { useEffect, useState } from "react";

export default function TypewriterMessage({
  recipientName,
  message,
}) {

  const [text, setText] = useState("");

  useEffect(() => {

    let index = 0;

    const interval = setInterval(() => {

      setText(message.slice(0, index + 1));

      index++;

      if (index >= message.length) {
        clearInterval(interval);
      }

    }, 35);

    return () => clearInterval(interval);

  }, [message]);

  return (

    <div className="mt-8">

      <h2
        className="mb-6 text-3xl font-bold text-gray-700"
        style={{
          fontFamily: "Caveat",
        }}
      >
        Dear {recipientName} ❤️,
      </h2>

      <p
        className="whitespace-pre-wrap text-lg leading-8 text-gray-700"
        style={{
          fontFamily: "Caveat",
        }}
      >
        {text}

        <span className="animate-pulse">|</span>

      </p>

    </div>

  );

}