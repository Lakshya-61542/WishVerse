import { useRef, useState } from "react";
import { ArrowLeft, ChevronRight, Eye, Palette, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../components/common/Logo";
import PublishLoader from "../components/publish/PublishLoader";
import PublishSuccessModal from "../components/publish/PublishSuccessModal";
import MobileReveal from "../components/reveal/MobileReveal";
import { publishWebsite } from "../services/publishWebsite";
import LetterPhotoUpload from "../components/builder/LetterPhotoUpload";
import PhotoManager from "../components/builder/photoManager/PhotoManager";
import FinalPage from "../components/reveal/FinalPage";
import RevealController from "../components/reveal/RevealController";
import LockScreen from "../components/website/LockScreen";
import PublishPage from "../components/builder/PublishPage";
import GiftBox from "../components/builder/GiftBox";
import PasswordScreen from "../components/builder/PasswordScreen";
import MusicUpload from "../components/builder/MusicUpload";
import MessageEditor from "../components/builder/MessageEditor";
import ThemeSelection from "../components/builder/ThemeSelection";
import EventSelection from "../components/builder/EventSelection";
import DetailsForm from "../components/builder/DetailsForm";
import { EVENTS, getEvent } from "../data/experience";
import { themeBackground } from "../utils/themeClass";

const steps = [
  ["event", "Occasion", "✦"],
  ["theme", "Theme", "◐"],
  ["details", "Recipient", "◎"],
  ["photos", "Photos", "▧"],
  ["message", "Message", "♡"],
  ["letterPhoto", "Letter photo", "✉"],
  ["music", "Music", "♫"],
  ["password", "Passcode", "⌁"],
  ["publish", "Publish", "↗"],
];

export default function Builder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedEvent = searchParams.get("event");
  const initialEvent = EVENTS.some((item) => item.title === requestedEvent) ? requestedEvent : "Birthday";
  const [selectedTheme, setSelectedTheme] = useState("Aurora");
  const [selectedEvent, setSelectedEvent] = useState(initialEvent);
  const [activeStep, setActiveStep] = useState("event");
  const [recipientName, setRecipientName] = useState("");
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");
  const [music, setMusic] = useState(null);
  const [password, setPassword] = useState("");
  const [giftOpened, setGiftOpened] = useState(false);
  const [websiteName, setWebsiteName] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [revealFinished, setRevealFinished] = useState(false);
  const [letterPhoto, setLetterPhoto] = useState(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [publishError, setPublishError] = useState("");
  const audioRef = useRef(null);

  const event = getEvent(selectedEvent);
  const currentIndex = steps.findIndex(([id]) => id === activeStep);

  function replayPreview() {
    setUnlocked(false);
    setGiftOpened(false);
    setRevealFinished(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function goNext() {
    if (currentIndex < steps.length - 1) setActiveStep(steps[currentIndex + 1][0]);
  }

  async function handlePublish() {
    setPublishError("");
    if (!recipientName.trim()) {
      setActiveStep("details");
      setPublishError("Add the recipient name before publishing.");
      return;
    }
    if (!coverImage) {
      setActiveStep("photos");
      setPublishError("Choose a cover photo so the reveal has a hero memory.");
      return;
    }
    if (password && !/^\d{6}$/.test(password)) {
      setActiveStep("password");
      setPublishError("Your optional passcode must contain exactly 6 digits.");
      return;
    }
    setPublishing(true);
    setProgress(5);
    setStatus("Preparing your files");

    const result = await publishWebsite({
      websiteName,
      recipientName,
      selectedEvent,
      selectedTheme,
      password,
      message,
      coverImage,
      images,
      letterPhoto,
      music,
    }, ({ progress: nextProgress, status: nextStatus }) => {
      setProgress(nextProgress);
      setStatus(nextStatus);
    });

    setPublishing(false);

    if (result.success) {
      setShareLink(result.shareLink);
      setShowPublishModal(true);
    } else {
      console.error("Publishing failed", result.error);
      setStatus("Publishing failed");
      setPublishError(result.error?.message || "WishVerse could not publish this surprise. Please try again.");
    }
  }

  function renderStep() {
    switch (activeStep) {
      case "event": return <EventSelection selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent}/>;
      case "theme": return <ThemeSelection selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} selectedEvent={selectedEvent}/>;
      case "details": return <DetailsForm recipientName={recipientName} setRecipientName={setRecipientName}/>;
      case "photos": return <PhotoManager images={images} setImages={setImages} coverImage={coverImage} setCoverImage={setCoverImage}/>;
      case "message": return <MessageEditor message={message} setMessage={setMessage} recipientName={recipientName} selectedEvent={selectedEvent}/>;
      case "letterPhoto": return <LetterPhotoUpload letterPhoto={letterPhoto} setLetterPhoto={setLetterPhoto}/>;
      case "music": return <MusicUpload music={music} setMusic={setMusic}/>;
      case "password": return <PasswordScreen password={password} setPassword={setPassword}/>;
      case "publish": return <PublishPage websiteName={websiteName} setWebsiteName={setWebsiteName} onPublish={handlePublish} publishing={publishing} recipientName={recipientName} selectedEvent={selectedEvent}/>;
      default: return null;
    }
  }

  return (
    <div className="builder-shell min-h-screen text-[#241a35]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-36 h-[430px] w-[430px] rounded-full bg-violet-300/25 blur-[100px]"/>
        <div className="absolute right-[-120px] top-[18%] h-[400px] w-[400px] rounded-full bg-cyan-200/30 blur-[110px]"/>
        <div className="absolute bottom-[-180px] left-[35%] h-[430px] w-[430px] rounded-full bg-fuchsia-200/25 blur-[120px]"/>
      </div>

      <header className="sticky top-0 z-40 border-b border-violet-100/80 bg-white/78 shadow-[0_8px_30px_rgba(68,41,94,.05)] backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-[1560px] items-center justify-between px-4 sm:px-6">
          <button onClick={() => navigate("/")} className="rounded-2xl p-1 transition hover:bg-violet-50"><Logo variant="light"/></button>
          <div className="hidden items-center gap-2 rounded-full border border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-4 py-2 text-xs text-[#796c86] shadow-sm sm:flex">
            <Sparkles className="h-3.5 w-3.5 text-violet-500"/>Building <span className="font-extrabold text-[#2d203d]">{event.title}</span>
          </div>
          <button onClick={replayPreview} className="flex items-center gap-2 rounded-xl border border-violet-100 bg-white px-3 py-2 text-xs font-bold text-[#74677e] shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-700"><Eye className="h-4 w-4"/> Replay</button>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-[1560px] lg:grid-cols-[236px_minmax(0,1fr)_400px]">
        <aside className="hidden border-r border-violet-100/80 bg-white/50 p-4 backdrop-blur-xl lg:block">
          <div className="mb-5 rounded-3xl border border-violet-100 bg-white/85 p-4 shadow-[0_14px_40px_rgba(75,42,104,.07)]">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 via-fuchsia-50 to-cyan-100 text-2xl shadow-inner">{event.emoji}</div>
              <div><div className="text-sm font-extrabold text-[#2b2037]">{event.title}</div><div className="mt-1 text-[10px] leading-4 text-[#8f8298]">{event.tagline}</div></div>
            </div>
          </div>
          <nav className="space-y-1.5">
            {steps.map(([id,label,icon], index) => {
              const active = activeStep === id;
              return (
                <button key={id} onClick={()=>setActiveStep(id)} className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all ${active ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-[0_10px_30px_rgba(124,58,237,.24)]" : "text-[#756979] hover:bg-white hover:text-[#2d2038] hover:shadow-sm"}`}>
                  <span className={`grid h-8 w-8 place-items-center rounded-xl text-xs ${active ? "bg-white/16 text-white" : "bg-violet-50 text-violet-600 group-hover:bg-violet-100"}`}>{icon}</span>
                  <div className="min-w-0 flex-1"><div className={`text-[10px] font-black uppercase tracking-[.12em] ${active ? "text-white/60" : "text-[#b0a5b7]"}`}>0{index+1}</div><div className="text-xs font-extrabold">{label}</div></div>
                  {active && <ChevronRight className="h-4 w-4"/>}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 flex gap-1 lg:hidden">{steps.map(([id]) => <button key={id} onClick={()=>setActiveStep(id)} className={`h-1.5 flex-1 rounded-full transition ${activeStep === id ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" : "bg-violet-100"}`}/>)}</div>
            <div className="premium-builder-panel-light p-5 sm:p-7 lg:p-8">{renderStep()}</div>
            {activeStep !== "publish" && (
              <div className="mt-4 flex items-center justify-between">
                <button disabled={currentIndex === 0} onClick={()=>currentIndex>0&&setActiveStep(steps[currentIndex-1][0])} className="flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold text-[#887b92] transition hover:bg-white hover:text-violet-700 hover:shadow-sm disabled:opacity-0"><ArrowLeft className="h-4 w-4"/>Back</button>
                <button onClick={goNext} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-xs font-black text-white shadow-[0_12px_28px_rgba(124,58,237,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(124,58,237,.28)]">Continue <ChevronRight className="h-4 w-4"/></button>
              </div>
            )}
          </div>
        </main>

        <aside className="hidden border-l border-violet-100/80 bg-gradient-to-b from-[#f4efff]/85 via-white/70 to-[#edfaff]/80 px-5 py-7 backdrop-blur-xl xl:block">
          <div className="sticky top-28">
            <div className="mb-4 flex items-center justify-between">
              <div><div className="text-[10px] font-black uppercase tracking-[.18em] text-[#9b8fa5]">Live preview</div><div className="mt-1 flex items-center gap-2 text-xs font-extrabold text-[#5c4d68]"><Palette className="h-3.5 w-3.5 text-violet-500"/>{selectedTheme}</div></div>
              <button onClick={replayPreview} className="rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold text-violet-600 shadow-sm transition hover:bg-white hover:shadow">Replay</button>
            </div>
            <div className="rounded-[52px] border border-white/80 bg-white/55 p-4 shadow-[0_28px_70px_rgba(79,50,104,.15)] backdrop-blur-xl">
              <div className="flex justify-center"><MobileReveal><div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${themeBackground(selectedTheme)}`}>
                {!unlocked ? <LockScreen correctPin={password} onUnlock={()=>setUnlocked(true)}/> : !giftOpened ? <GiftBox eventType={selectedEvent} themeName={selectedTheme} onOpen={()=>{setGiftOpened(true); if(audioRef.current) audioRef.current.play().catch(()=>{});}}/> : !revealFinished ? <RevealController recipientName={recipientName} message={message} image={coverImage} images={images} letterPhoto={letterPhoto} eventType={selectedEvent} themeName={selectedTheme} onRevealComplete={()=>{setRevealFinished(true); if(audioRef.current) audioRef.current.play().catch(()=>{});}}/> : <FinalPage image={coverImage} recipientName={recipientName} message={message} audioRef={audioRef} eventType={selectedEvent} themeName={selectedTheme}/>} 
                {music && <audio ref={audioRef} loop src={music.url}/>} 
              </div></MobileReveal></div>
            </div>
            <div className="mt-4 rounded-2xl border border-violet-100 bg-white/70 p-4 text-center shadow-sm">
              <div className="text-[10px] font-black uppercase tracking-[.16em] text-violet-500">Tip</div>
              <p className="mt-1 text-[11px] leading-5 text-[#86798f]">Replay anytime while you build. Your final link opens full-screen on the recipient’s phone.</p>
            </div>
          </div>
        </aside>
      </div>

      {publishing && <PublishLoader progress={progress} status={status}/>} 
      {showPublishModal && <PublishSuccessModal shareLink={shareLink} onClose={()=>setShowPublishModal(false)}/>} 
      {publishError && !publishing && !showPublishModal && (
        <div className="fixed bottom-5 left-1/2 z-[9997] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-rose-200 bg-white/95 px-4 py-3 text-left shadow-[0_20px_60px_rgba(80,40,70,.18)] backdrop-blur-xl">
          <div><div className="text-xs font-black text-rose-600">Couldn’t publish yet</div><div className="mt-1 text-[11px] leading-5 text-[#7f707c]">{publishError}</div></div>
          <button onClick={()=>setPublishError("")} className="rounded-xl bg-rose-50 px-3 py-2 text-[10px] font-bold text-rose-600">Close</button>
        </div>
      )}
    </div>
  );
}
