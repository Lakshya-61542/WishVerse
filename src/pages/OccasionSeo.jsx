import {
  ArrowRight,
  Camera,
  LockKeyhole,
  Music2,
  Sparkles,
} from "lucide-react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Background from "../components/common/Background";
import Logo from "../components/common/Logo";
import { SEO_OCCASIONS } from "../data/seoOccasions";

export default function OccasionSeo({ slug }) {
  const navigate = useNavigate();

  const page = SEO_OCCASIONS[slug];

useEffect(() => {
  if (!page) return;

  const pageUrl =
    `${window.location.origin}/${slug}`;

  /*
   * PAGE TITLE
   */
  document.title = page.metaTitle;

  /*
   * META DESCRIPTION
   */
  let description =
    document.querySelector(
      'meta[name="description"]'
    );

  if (!description) {
    description =
      document.createElement("meta");

    description.setAttribute(
      "name",
      "description"
    );

    document.head.appendChild(
      description
    );
  }

  description.setAttribute(
    "content",
    page.metaDescription
  );

  /*
   * CANONICAL
   */
  let canonical =
    document.querySelector(
      'link[rel="canonical"]'
    );

  if (!canonical) {
    canonical =
      document.createElement("link");

    canonical.setAttribute(
      "rel",
      "canonical"
    );

    document.head.appendChild(
      canonical
    );
  }

  canonical.setAttribute(
    "href",
    pageUrl
  );

  /*
   * OPEN GRAPH
   */
  function setMeta(
    selector,
    attribute,
    value
  ) {
    let element =
      document.querySelector(
        selector
      );

    if (!element) {
      element =
        document.createElement(
          "meta"
        );

      const [
        attrName,
        attrValue,
      ] =
        attribute.split("=");

      element.setAttribute(
        attrName,
        attrValue
      );

      document.head.appendChild(
        element
      );
    }

    element.setAttribute(
      "content",
      value
    );
  }

  setMeta(
    'meta[property="og:title"]',
    "property=og:title",
    page.metaTitle
  );

  setMeta(
    'meta[property="og:description"]',
    "property=og:description",
    page.metaDescription
  );

  setMeta(
    'meta[property="og:url"]',
    "property=og:url",
    pageUrl
  );

  setMeta(
    'meta[property="og:type"]',
    "property=og:type",
    "website"
  );

  /*
   * TWITTER / X
   */
  setMeta(
    'meta[name="twitter:title"]',
    "name=twitter:title",
    page.metaTitle
  );

  setMeta(
    'meta[name="twitter:description"]',
    "name=twitter:description",
    page.metaDescription
  );

  /*
   * STRUCTURED DATA
   */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        "@type": "WebPage",

        "@id":
          `${pageUrl}#webpage`,

        url: pageUrl,

        name:
          page.metaTitle,

        description:
          page.metaDescription,

        isPartOf: {
          "@type":
            "WebSite",

          name:
            "WishVerse",

          url:
            window.location.origin,
        },

        about: {
          "@type": "Thing",

          name:
            page.event,
        },
      },

      {
        "@type":
          "BreadcrumbList",

        itemListElement: [
          {
            "@type":
              "ListItem",

            position: 1,

            name:
              "WishVerse",

            item:
              `${window.location.origin}/`,
          },

          {
            "@type":
              "ListItem",

            position: 2,

            name:
              page.title,

            item:
              pageUrl,
          },
        ],
      },

      {
        "@type":
          "FAQPage",

        mainEntity: [
          {
            "@type":
              "Question",

            name:
              "Does the recipient need an account?",

            acceptedAnswer: {
              "@type":
                "Answer",

              text:
                "No. You simply share the published Wish link with them.",
            },
          },

          {
            "@type":
              "Question",

            name:
              "Can I add my own photos?",

            acceptedAnswer: {
              "@type":
                "Answer",

              text:
                "Yes. WishVerse is designed around your own memories and photographs.",
            },
          },

          {
            "@type":
              "Question",

            name:
              "Can I add music?",

            acceptedAnswer: {
              "@type":
                "Answer",

              text:
                "Yes. You can add a soundtrack to make the reveal more personal.",
            },
          },

          {
            "@type":
              "Question",

            name:
              "Can I keep the surprise private?",

            acceptedAnswer: {
              "@type":
                "Answer",

              text:
                "Yes. WishVerse supports passcode-protected reveals.",
            },
          },
        ],
      },
    ],
  };

  let script =
    document.getElementById(
      "wishverse-structured-data"
    );

  if (!script) {
    script =
      document.createElement(
        "script"
      );

    script.type =
      "application/ld+json";

    script.id =
      "wishverse-structured-data";

    document.head.appendChild(
      script
    );
  }

  script.textContent =
    JSON.stringify(
      structuredData
    );

  /*
   * CLEANUP
   */
  return () => {
    document.title =
      "WishVerse — Moments, made magical";

    const structuredScript =
      document.getElementById(
        "wishverse-structured-data"
      );

    if (
      structuredScript
    ) {
      structuredScript.remove();
    }
  };
}, [page, slug]);

  if (!page) return null;

  const builderPath =
    `/builder?event=${encodeURIComponent(
      page.event
    )}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      <Background />

      {/* NAVBAR */}

      <header className="relative z-20 border-b border-white/[0.07]">

        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8">

          <button
            onClick={() =>
              navigate("/")
            }
          >
            <Logo />
          </button>

          <button
            onClick={() =>
              navigate(
                builderPath
              )
            }
            className="rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-[#080a13]"
          >
            Create a Wish
          </button>

        </div>

      </header>

      {/* HERO */}

      <main className="relative z-10">

        <section className="mx-auto max-w-[1240px] px-5 pb-24 pt-20 sm:px-8 sm:pt-28">

          <div className="mx-auto max-w-4xl text-center">

            <div className="text-5xl sm:text-6xl">
              {page.emoji}
            </div>

            <div className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-violet-300">
              {page.title}
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {page.heading}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
              {page.intro}
            </p>

            <button
              onClick={() =>
                navigate(
                  builderPath
                )
              }
              className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-4 font-black text-white shadow-xl shadow-violet-950/30 transition hover:-translate-y-0.5"
            >
              Create your{" "}
              {page.event} Wish

              <ArrowRight className="h-4 w-4" />
            </button>

          </div>

        </section>

        {/* FEATURES */}

        <section className="border-y border-white/[0.07] bg-white/[0.02] py-20">

          <div className="mx-auto max-w-[1100px] px-5 sm:px-8">

            <div className="grid gap-4 md:grid-cols-3">

              <Feature
                icon={Camera}
                title="Your memories"
                text="Turn meaningful photographs into animated galleries and reveal scenes."
              />

              <Feature
                icon={Music2}
                title="Their song"
                text="Add music that makes the experience feel personal from the first moment."
              />

              <Feature
                icon={LockKeyhole}
                title="Private reveal"
                text="Protect the surprise with a private passcode before sharing the link."
              />

            </div>

          </div>

        </section>

        {/* IDEAS */}

        <section className="py-24">

          <div className="mx-auto grid max-w-[1100px] gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">

            <div>

              <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">
                Inspiration
              </div>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em]">
                Ways to make it personal.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/45">
                WishVerse isn't just another digital card. Build an experience around the memories and details that actually mean something.
              </p>

            </div>

            <div className="grid gap-3">

              {page.ideas.map(
                (idea) => (
                  <div
                    key={idea}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4"
                  >
                    <Sparkles className="h-4 w-4 shrink-0 text-violet-300" />

                    <span className="text-sm font-bold text-white/75">
                      {idea}
                    </span>
                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* HOW IT WORKS */}

        <section className="border-y border-white/[0.07] bg-white/[0.02] py-24">

          <div className="mx-auto max-w-[1100px] px-5 sm:px-8">

            <div className="mx-auto max-w-2xl text-center">

              <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">
                How it works
              </div>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em]">
                Build it in minutes.
              </h2>

            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {[
                [
                  "01",
                  "Choose",
                  `Select ${page.event}.`,
                ],
                [
                  "02",
                  "Personalize",
                  "Add memories, photos, words and music.",
                ],
                [
                  "03",
                  "Protect",
                  "Choose a private passcode.",
                ],
                [
                  "04",
                  "Share",
                  "Send one link when the moment feels right.",
                ],
              ].map(
                ([
                  number,
                  title,
                  text,
                ]) => (
                  <div
                    key={number}
                    className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6"
                  >
                    <div className="text-xs font-black tracking-[0.2em] text-violet-300">
                      {number}
                    </div>

                    <h3 className="mt-6 text-lg font-black">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {text}
                    </p>
                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* FAQ */}

        <section className="py-24">

          <div className="mx-auto max-w-3xl px-5 sm:px-8">

            <div className="text-center">

              <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">
                Frequently asked
              </div>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em]">
                A few things to know.
              </h2>

            </div>

            <div className="mt-10 space-y-3">

              <Faq
                question="Does the recipient need an account?"
                answer="No. You simply share the published Wish link with them."
              />

              <Faq
                question="Can I add my own photos?"
                answer="Yes. WishVerse is designed around your own memories and photographs."
              />

              <Faq
                question="Can I add music?"
                answer="Yes. You can add a soundtrack to make the reveal more personal."
              />

              <Faq
                question="Can I keep the surprise private?"
                answer="Yes. WishVerse supports passcode-protected reveals."
              />

            </div>

          </div>

        </section>

        {/* FINAL CTA */}

        <section className="pb-24">

          <div className="mx-auto max-w-[1100px] px-5 sm:px-8">

            <div className="rounded-[36px] border border-violet-300/15 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-400/10 px-6 py-16 text-center sm:px-12">

              <Sparkles className="mx-auto h-7 w-7 text-violet-200" />

              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-[-0.045em] sm:text-5xl">
                Make their next moment unforgettable.
              </h2>

              <button
                onClick={() =>
                  navigate(
                    builderPath
                  )
                }
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-[#090b16]"
              >
                Create with WishVerse

                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

          </div>

        </section>

      </main>

      <footer className="relative z-10 border-t border-white/[0.07] py-8">

        <div className="mx-auto flex max-w-[1100px] flex-col gap-4 px-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-8">

          <Logo />

          <div className="flex gap-5">

            <button
              onClick={() =>
                navigate(
                  "/privacy"
                )
              }
            >
              Privacy Policy
            </button>

            <button
              onClick={() =>
                navigate(
                  "/terms"
                )
              }
            >
              Terms of Use
            </button>

          </div>

        </div>

      </footer>

    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-7">

      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-500/15 text-violet-200">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-6 text-lg font-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/40">
        {text}
      </p>

    </div>
  );
}

function Faq({
  question,
  answer,
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6">

      <h3 className="font-black">
        {question}
      </h3>

      <p className="mt-2 text-sm leading-6 text-white/45">
        {answer}
      </p>

    </div>
  );
}