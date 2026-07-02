"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { privacyContentKo, privacyContentEn, privacyContentJa } from "@/lib/privacy";

type Lang = "ko" | "en" | "ja";

export default function PrivacyClient() {
  const [lang, setLang] = useState<Lang>("ko");
  const content =
    lang === "ko" ? privacyContentKo : lang === "en" ? privacyContentEn : privacyContentJa;

  return (
    <main>
      <Nav />

      <section className="border-b" style={{ borderColor: "var(--rw-border)" }}>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--rw-muted)" }}
          >
            <ArrowLeft size={14} />
            RunWay 홈으로
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
                Privacy Policy
              </span>
              <h1
                className="mt-3 text-3xl sm:text-4xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
              >
                개인정보 처리방침
              </h1>
            </div>

            {/* language toggle */}
            <div
              className="flex shrink-0 gap-1 rounded-full border p-1"
              style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
              role="tablist"
              aria-label="Language"
            >
              {(["ko", "en", "ja"] as Lang[]).map((l) => (
                <button
                  key={l}
                  role="tab"
                  aria-selected={lang === l}
                  onClick={() => setLang(l)}
                  className="rw-mono-label rounded-full px-3.5 py-1.5 text-[11px] transition-colors"
                  style={{
                    background: lang === l ? "var(--rw-green)" : "transparent",
                    color: lang === l ? "var(--rw-bg)" : "var(--rw-muted)",
                  }}
                >
                  {l === "ko" ? "한국어" : l === "en" ? "English" : "日本語"}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs" style={{ color: "var(--rw-muted)" }}>
            {content.lastUpdated}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <div
            className="rounded-2xl border p-6 sm:p-10"
            style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
          >
            <div className="space-y-8">
              {content.sections.map((section) => (
                <div key={section.heading}>
                  <h2
                    className="text-base sm:text-lg"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--rw-green)" }}
                  >
                    {section.heading}
                  </h2>
                  {section.body && (
                    <div className="mt-2.5 space-y-3">
                      {section.body.split("\n\n").map((para, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed sm:text-base"
                          style={{ color: "var(--rw-text)" }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                  {section.list && (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm leading-relaxed sm:text-base"
                          style={{ color: "var(--rw-text)" }}
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: "var(--rw-green)" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div
              className="mt-10 flex items-center gap-3 rounded-xl border px-5 py-4"
              style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)" }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--rw-green)1a", border: "1px solid var(--rw-border)" }}
              >
                <Mail size={16} color="var(--rw-green)" />
              </div>
              <div>
                <div className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
                  {content.contactLabel}
                </div>
                <a
                  href={`mailto:${content.contactEmail}`}
                  className="text-sm sm:text-base"
                  style={{ color: "var(--rw-text)" }}
                >
                  {content.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
