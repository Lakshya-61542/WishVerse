import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import LockScreen from "../components/website/LockScreen";
import GiftBox from "../components/builder/GiftBox";
import RevealController from "../components/reveal/RevealController";
import FinalPage from "../components/reveal/FinalPage";

import { getWebsite } from "../services/getWebsite";

export default function PublicReveal() {
const { websiteId } = useParams();

const [website, setWebsite] = useState(null);
const [loading, setLoading] = useState(true);

const audioRef = useRef(null);

const [unlocked, setUnlocked] = useState(false);

const [giftOpened, setGiftOpened] = useState(false);

const [revealFinished, setRevealFinished] = useState(false);

useEffect(() => {

  async function loadWebsite() {

    try {

      const data = await getWebsite(websiteId);

      setWebsite(data);
console.log("WEBSITE DATA:", data);
console.log("LETTER PHOTO:", data.letter_photo);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  loadWebsite();

}, [websiteId]);

if (loading) {

  return (

    <div className="flex h-screen items-center justify-center bg-black text-white">

      Loading Surprise...

    </div>

  );

}

if (!website) {

  return (

    <div className="flex h-screen items-center justify-center bg-black text-white">

      Website Not Found

    </div>

  );

}

  return (

   <div className="fixed inset-0 overflow-hidden bg-black flex items-center justify-center">

      {!unlocked ? (

        <LockScreen
          correctPin={website.password}
          onUnlock={() => setUnlocked(true)}
        />

      ) : !giftOpened ? (

        <GiftBox
          onOpen={() => setGiftOpened(true)}
        />

      ) : !revealFinished ? (

        <RevealController
          recipientName={website.recipient_name}
          message={website.message}
          image={website.cover_image}
          images={website.gallery || []}
          letterPhoto={website.letter_photo}
          onRevealComplete={() => {

    setRevealFinished(true);

    if (audioRef.current) {
        audioRef.current.play().catch(() => {});
    }

}}
        />

      ) : (

        <FinalPage
          image={website.cover_image}
          recipientName={website.recipient_name}
          message={website.message}
          audioRef={audioRef}
        />

      )}

      {website.music && (
    <audio
        ref={audioRef}
        src={website.music}
        loop
    />
)}

    </div>

  );

}