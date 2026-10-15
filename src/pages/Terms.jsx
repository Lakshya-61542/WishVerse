import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] via-white to-[#eefbff] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">
          <button onClick={() => navigate("/")}>
            <Logo variant="light" />
          </button>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <div className="rounded-[32px] border border-violet-100 bg-white p-7 shadow-[0_24px_70px_rgba(76,45,108,.08)] sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <FileText className="h-5 w-5" />
          </div>

          <div className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-violet-600">
            WishVerse
          </div>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">
            Terms of Use
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Effective: October 16, 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-slate-600">
            <Term title="1. Using WishVerse">
              WishVerse allows users to create and share personalized digital
              experiences for celebrations and special occasions. By using the
              service, you agree to use it lawfully and responsibly.
            </Term>

            <Term title="2. Your account">
              You are responsible for activity performed through your account
              and for maintaining access to your authentication method.
            </Term>

            <Term title="3. Your content">
              You retain responsibility for the photos, music, text and other
              material that you upload. You must have the necessary rights or
              permission to upload and share that content.
            </Term>

            <Term title="4. Prohibited use">
              You may not use WishVerse to distribute unlawful, abusive,
              deceptive, malicious, infringing or harmful material, interfere
              with the service, attempt unauthorized access, or misuse another
              person's account or content.
            </Term>

            <Term title="5. Shared links">
              Published Wish links may be shared with other people. A passcode
              can reduce casual access but should not be treated as a guarantee
              that highly sensitive information will remain confidential.
            </Term>

            <Term title="6. Availability">
              WishVerse may change, improve, suspend or discontinue features as
              the product evolves. Continuous or error-free availability cannot
              be guaranteed.
            </Term>

            <Term title="7. Third-party services">
              WishVerse may depend on third-party infrastructure or
              authentication providers. Their services may be subject to their
              own terms and policies.
            </Term>

            <Term title="8. Limitation of responsibility">
              Users are responsible for deciding what content they create,
              upload and share. WishVerse is provided on an as-available basis
              to the extent permitted by applicable law.
            </Term>

            <Term title="9. Changes">
              These Terms may be updated as WishVerse develops. Continued use
              after an updated version becomes effective constitutes acceptance
              of the revised Terms where permitted by law.
            </Term>
          </div>
        </div>
      </main>
    </div>
  );
}

function Term({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-black text-slate-900">{title}</h2>
      <p className="mt-2">{children}</p>
    </section>
  );
}