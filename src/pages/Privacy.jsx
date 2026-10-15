import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";

export default function Privacy() {
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
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-violet-200 hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <div className="rounded-[32px] border border-violet-100 bg-white p-7 shadow-[0_24px_70px_rgba(76,45,108,.08)] sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-violet-600">
            WishVerse
          </div>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Effective: October 16, 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-slate-600">
            <PolicySection title="1. Information we collect">
              When you create a WishVerse account, we may process information
              such as your name, email address, profile image and authentication
              information. When you create a Wish, the service may also store
              the content you choose to provide, including recipient names,
              messages, photos, music, event information and other uploaded
              content.
            </PolicySection>

            <PolicySection title="2. How we use information">
              We use this information to provide account authentication, save
              and publish Wishes, display your creator dashboard, operate shared
              Wish links, improve the service, prevent abuse and maintain the
              security of WishVerse.
            </PolicySection>

            <PolicySection title="3. Authentication">
              WishVerse uses Supabase for authentication and backend services.
              Depending on the sign-in method you choose, authentication may
              also involve services such as Google.
            </PolicySection>

            <PolicySection title="4. Uploaded content">
              Content that you upload to a published Wish may be accessible to
              people who receive or obtain its public link. You should only
              upload content that you have permission to use and share.
            </PolicySection>

            <PolicySection title="5. Passcodes">
              Wish passcodes are designed to be stored as hashed values rather
              than as readable plaintext. Passcodes provide an additional
              access layer, but users should still avoid placing highly
              sensitive information inside a shared Wish.
            </PolicySection>

            <PolicySection title="6. Data sharing">
              WishVerse does not sell your personal information to advertisers.
              Information may be processed by infrastructure and service
              providers that are required to operate the application.
            </PolicySection>

            <PolicySection title="7. Data security">
              WishVerse uses authentication, database access controls and
              owner-scoped storage permissions to help protect account data.
              No internet service can guarantee absolute security.
            </PolicySection>

            <PolicySection title="8. Your choices">
              You may update profile information from your WishVerse account.
              You may also delete Wishes that you have created. Additional
              account-data controls may be introduced as the service evolves.
            </PolicySection>

            <PolicySection title="9. Children's privacy">
              WishVerse is not intended to knowingly collect personal
              information from children in violation of applicable law.
            </PolicySection>

            <PolicySection title="10. Changes to this policy">
              This Privacy Policy may be updated as WishVerse changes. The
              effective date at the top of this page will be updated when
              material revisions are made.
            </PolicySection>

            <PolicySection title="11. Contact">
              Questions about privacy or data handling can be sent through the
              official WishVerse contact channel provided by the service.
            </PolicySection>
          </div>
        </div>
      </main>
    </div>
  );
}

function PolicySection({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-black text-slate-900">{title}</h2>
      <p className="mt-2">{children}</p>
    </section>
  );
}