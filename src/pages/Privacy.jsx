import { Link } from "react-router-dom";
import Logo from "../components/common/Logo";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#f8f7fc] text-slate-700">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5">
          <Link to="/"><Logo variant="light" /></Link>
          <Link to="/" className="text-sm font-bold text-violet-700">Back home</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-4xl font-black tracking-[-0.04em] text-slate-950">Privacy Policy</h1>
        <div className="legal-copy mt-8 space-y-5 leading-7">
          <p>WishVerse uses account information to authenticate creators and associate published wishes with the correct profile.</p>
          <h2>Information you provide</h2>
          <p>This may include your name, email address, uploaded photos, messages, music and other content used to create a Wish.</p>
          <h2>Infrastructure</h2>
          <p>Authentication, database records and uploaded files are handled through the configured Supabase project. Hosting is handled through the configured deployment provider.</p>
          <h2>Sharing</h2>
          <p>Published Wish links are intended to be shareable with recipients. Creators should avoid uploading sensitive information that should not be accessible through a shared experience.</p>
          <h2>Your choices</h2>
          <p>You can edit or delete your own creations from your WishVerse dashboard, subject to the permissions configured for your account.</p>
        </div>
      </main>
    </div>
  );
}
