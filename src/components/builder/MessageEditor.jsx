import { MessageCircleHeart } from "lucide-react";
import AIMessageAssistant from "./AIMessageAssistant";

export default function MessageEditor({ message, setMessage, recipientName, selectedEvent }) {
  return (
    <div>
      <div className="mb-8"><div className="builder-kicker"><MessageCircleHeart className="h-3.5 w-3.5"/> From you, to them</div><h1 className="builder-title">Write something worth keeping</h1><p className="builder-subtitle">Use your own words, or ask WishMuse for a thoughtful starting point.</p></div>
      <div className="relative">
        <textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={7} maxLength={1200} placeholder="Write your special message here…" className="w-full resize-none rounded-3xl border border-violet-100 bg-[#fbf9ff] p-5 text-sm leading-7 text-[#34263f] shadow-inner outline-none placeholder:text-[#b9afc0] focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100/60"/>
        <div className="absolute bottom-4 right-4 text-[10px] font-semibold text-[#a69bad]">{message.length}/1200</div>
      </div>
      <AIMessageAssistant recipientName={recipientName} selectedEvent={selectedEvent} onUse={setMessage}/>
    </div>
  );
}
