import { Link } from "react-router-dom";
import Logo from "../components/common/Logo";

export default function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <p>WishVerse lets creators build and share personalized surprise websites. Use the service only for content you have permission to upload and share.</p>
      <h2>Accounts</h2>
      <p>You are responsible for keeping your account secure and for activity performed through it.</p>
      <h2>Uploaded content</h2>
      <p>You retain responsibility for photos, music, messages and other material you upload. Do not upload illegal, abusive or rights-infringing content.</p>
      <h2>Availability</h2>
      <p>WishVerse may change, improve or temporarily interrupt features as the product evolves.</p>
      <h2>Contact</h2>
      <p>For account or product questions, use the contact details published by the WishVerse operator.</p>
    </LegalPage>
  );
}

function LegalPage({ title, children }) {
  return (
    <div className="min-h-screen bg-[#f8f7fc] text-slate-700">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5">
          <Link to="/"><Logo variant="light" /></Link>
          <Link to="/" className="text-sm font-bold text-violet-700">Back home</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-4xl font-black tracking-[-0.04em] text-slate-950">{title}</h1>
        <div className="legal-copy mt-8 space-y-5 leading-7">{children}</div>
      </main>
    </div>
  );
}
