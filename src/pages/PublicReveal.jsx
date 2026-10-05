import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import LockScreen from "../components/website/LockScreen";
import GiftBox from "../components/builder/GiftBox";
import RevealController from "../components/reveal/RevealController";
import FinalPage from "../components/reveal/FinalPage";
import { getWebsite } from "../services/getWebsite";
import { themeBackground } from "../utils/themeClass";

export default function PublicReveal() {
  const { websiteId } = useParams();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);
  const [unlocked, setUnlocked] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [revealFinished, setRevealFinished] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try { const data = await getWebsite(websiteId); if(active) setWebsite(data); }
      catch { if(active) setError(true); }
      finally { if(active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [websiteId]);

  if (loading) return <div className="fixed inset-0 grid place-items-center bg-[#050816] text-white"><div className="text-center"><Sparkles className="mx-auto h-7 w-7 animate-pulse text-violet-300"/><div className="mt-4 text-sm font-bold">Opening your WishVerse…</div><div className="mt-2 text-xs text-white/30">Preparing the surprise</div></div></div>;
  if (error || !website) return <div className="fixed inset-0 grid place-items-center bg-[#050816] px-6 text-center text-white"><div><div className="text-4xl">🌙</div><h1 className="mt-5 text-2xl font-black">This WishVerse couldn’t be found.</h1><p className="mt-2 text-sm text-white/40">Check the link and try again.</p></div></div>;

  return (
    <div className={`fixed inset-0 flex items-center justify-center overflow-hidden ${themeBackground(website.theme)}`}>
      {!unlocked ? <LockScreen correctPin={website.password} onUnlock={()=>setUnlocked(true)}/> : !giftOpened ? <GiftBox eventType={website.event_type} themeName={website.theme} onOpen={()=>{setGiftOpened(true); if(audioRef.current) audioRef.current.play().catch(()=>{});}}/> : !revealFinished ? <RevealController recipientName={website.recipient_name} message={website.message} image={website.cover_image} images={website.gallery || []} letterPhoto={website.letter_photo} eventType={website.event_type} themeName={website.theme} onRevealComplete={()=>{setRevealFinished(true); if(audioRef.current) audioRef.current.play().catch(()=>{});}}/> : <FinalPage image={website.cover_image} recipientName={website.recipient_name} message={website.message} audioRef={audioRef} eventType={website.event_type} themeName={website.theme}/>} 
      {website.music && <audio ref={audioRef} src={website.music} loop/>}
    </div>
  );
}
