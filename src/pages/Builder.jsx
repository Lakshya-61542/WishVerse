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
import PhotoUpload from "../components/builder/UploadPhotos";
import ThemeSelection from "../components/builder/ThemeSelection";
import EventSelection from "../components/builder/EventSelection";
import DetailsForm from "../components/builder/DetailsForm";
import gsap from "gsap";
import PublishSuccess from "../components/builder/PublishSuccess";

import { useState, useRef, useEffect } from "react";
export default function Builder() {
  const [selectedTheme, setSelectedTheme] = useState("Birthday");  
  const [selectedEvent, setSelectedEvent] = useState("Birthday");
    const [activeStep, setActiveStep] = useState("event");
    const [recipientName, setRecipientName] = useState("");
    const [images, setImages] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] =
  useState(null);
  const [croppedImages, setCroppedImages] = useState([]);
  const [message, setMessage] = useState("");
  const [music, setMusic] = useState(null);
  const [password, setPassword] = useState("");
  const [giftOpened, setGiftOpened] = useState(false);
  const [websiteName, setWebsiteName] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const audioRef = useRef(null);
  const contentRef = useRef(null);
  const [published, setPublished] = useState(false);

  const [revealStarted, setRevealStarted] = useState(false);
  const [revealFinished, setRevealFinished] = useState(false);
  const [letterPhoto, setLetterPhoto] = useState(null);
  useEffect(() => {
  if (giftOpened && contentRef.current) {
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );
  }
}, [giftOpened]);
  return (
    <div className="flex h-screen pt-8">

      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-black/20 backdrop-blur-xl p-6">

        <div className="text-center">

  <div className="text-6xl mb-4">
    {selectedEvent === "Birthday" && "🎂"}
    {selectedEvent === "Anniversary" && "💍"}
    {selectedEvent === "Proposal" && "❤️"}
    {selectedEvent === "Graduation" && "🎓"}
    {selectedEvent === "Custom Event" && "🎉"}
  </div>

  <h2 className="text-3xl font-bold text-white">
    {selectedEvent}
  </h2>

  <p className="mt-4 text-white/70">
    Your website preview
  </p>

</div>

        <div className="space-y-3">

  <button
    onClick={() => setActiveStep("event")}
    className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
      activeStep === "event"
        ? "bg-violet-600 text-white"
        : "text-gray-300 hover:bg-white/10"
    }`}
  >
  🎂 Event

  </button>

  <button
    onClick={() => setActiveStep("details")}
    className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
      activeStep === "details"
        ? "bg-violet-600 text-white"
        : "text-gray-300 hover:bg-white/10"
    }`}
  >
    👤 Details
  </button>

  <button
    onClick={() => setActiveStep("photos")}
    className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
      activeStep === "photos"
        ? "bg-violet-600 text-white"
        : "text-gray-300 hover:bg-white/10"
    }`}
  >
    📸 Photos
  </button>

  <button
  onClick={() => setActiveStep("message")}
  className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
    activeStep === "message"
      ? "bg-violet-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
  💌 Message
</button>

<button
  onClick={() => setActiveStep("music")}
  className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
    activeStep === "music"
      ? "bg-violet-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
  🎵 Music
</button>

<button
  onClick={() => setActiveStep("password")}
  className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
    activeStep === "password"
      ? "bg-violet-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
  🔐 Password
</button>

 <button
  onClick={() => setActiveStep("publish")}
  className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
    activeStep === "publish"
      ? "bg-violet-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
  🚀 Publish
</button>

<button
  onClick={async () => {

    console.log("STEP 1");

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

    });

    console.log("STEP 2");

    console.log(result);
if (result.success) {

  alert(`Website Published!

${result.shareLink}`);

}
    setPublished(true);

  }}
  className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-white"
>
  Publish Website
</button>

<button
  onClick={() => setActiveStep("letterPhoto")}
  className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
    activeStep === "letterPhoto"
      ? "bg-violet-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
  💌 Letter Photo
</button>

</div>

      </aside>

      {/* Builder Form */}
      <main className="flex-1 flex items-center justify-center">

        <div className="w-[850px] rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">


  {activeStep === "event" && (
    <EventSelection
      selectedEvent={selectedEvent}
      setSelectedEvent={setSelectedEvent}
    />
  )}

  {activeStep === "theme" && (
    <ThemeSelection
      selectedTheme={selectedTheme}
      setSelectedTheme={setSelectedTheme}
    />
  )}

  {activeStep === "details" && (
  <DetailsForm
    recipientName={recipientName}
    setRecipientName={setRecipientName}
  />
)}

{activeStep === "photos" && (
 <PhotoManager
    images={images}
    setImages={setImages}
    coverImage={coverImage}
    setCoverImage={setCoverImage}
/>
)}

{activeStep === "message" && (
  <MessageEditor
    message={message}
    setMessage={setMessage}
  />
)}

{activeStep === "music" && (
  <MusicUpload
    music={music}
    setMusic={setMusic}
  />
)}

{activeStep === "publish" && (
  published ? (
    <PublishSuccess
      websiteName={websiteName}
    />
  ) : (
    <PublishPage
      websiteName={websiteName}
      setWebsiteName={setWebsiteName}
      setPublished={setPublished}
    />
  )
)}

{activeStep === "password" && (
  <PasswordScreen
    password={password}
    setPassword={setPassword}
  />
)}

{activeStep === "letterPhoto" && (
  <LetterPhotoUpload
  letterPhoto={letterPhoto}
  setLetterPhoto={setLetterPhoto}
/>
)}




</div>

      </main>

      {/* Live Preview */}
<aside className="w-[380px] flex items-center justify-center border-l border-white/10 bg-black/10 backdrop-blur-xl">

  <MobileReveal>

    <div
      className={`
        relative flex h-full w-full items-center justify-center overflow-hidden

        ${
          selectedTheme === "Romantic"
            ? "bg-gradient-to-b from-pink-500 to-rose-900"
            : selectedTheme === "Luxury"
            ? "bg-gradient-to-b from-yellow-500 to-amber-900"
            : selectedTheme === "Dark"
            ? "bg-gradient-to-b from-slate-700 to-black"
            : selectedTheme === "Cute"
            ? "bg-gradient-to-b from-pink-300 to-pink-600"
            : "bg-gradient-to-b from-violet-700 via-slate-900 to-black"
        }
      `}
    >

      {!unlocked ? (

        <LockScreen
          correctPin={password}
          onUnlock={() => setUnlocked(true)}
        />

      ) : !giftOpened ? (

        <GiftBox
          onOpen={() => setGiftOpened(true)}
        />

      ) : !revealFinished ? (

        <RevealController
          recipientName={recipientName}
          message={message}
          image={coverImage}
          images={images}
          letterPhoto={letterPhoto}
          onRevealComplete={() => {
            setRevealFinished(true);

            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
          }}
        />

      ) : (

        <FinalPage
          image={coverImage}
          recipientName={recipientName}
          message={message}
          audioRef={audioRef}
        />

      )}

      {music && revealFinished && (
        <audio
          autoPlay
          loop
          src={music.url}
        />
      )}

    </div>

  </MobileReveal>

</aside>

    </div>
  );
}

