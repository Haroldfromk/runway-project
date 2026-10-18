import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReleaseCard from "@/components/ReleaseCard";
import { getDictionary } from "@/lib/i18n";
import { isValidLang, DEFAULT_LANG, type Lang } from "@/lib/i18n/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDictionary(lang);
  return {
    title: `${dict.updatesPage.eyebrow} - RunWay`,
    description: dict.updatesPage.description.join(" "),
  };
}

export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDictionary(lang);
  const releases = dict.releases;
  const currentVersion = releases[0]?.version;

  return (
    <main>
      <Nav lang={lang} dict={dict.nav} />

      <section
        className="border-b rw-panel-grid"
        style={{ borderColor: "var(--rw-border)" }}
      >
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href={`/${lang}`}
            className="mb-8 flex w-fit items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={14} />
            {dict.updatesPage.backLabel}
          </Link>

          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            {dict.updatesPage.eyebrow}
          </span>
          <h1
            className="mt-4 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            {dict.updatesPage.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            {dict.updatesPage.description.map((line, i) => (
              <span key={i}>
                {line}
                {i < dict.updatesPage.description.length - 1 && <br />}
              </span>
            ))}
          </p>

          {currentVersion && (
            <div className="mt-8">
              <div
                className="text-2xl tabular-nums"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-green)" }}
              >
                {currentVersion}
              </div>
              <div className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
                {dict.updatesPage.currentLabel}
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <div className="space-y-4">
            {releases.map((release, i) => (
              <ReleaseCard
                key={release.version}
                release={release}
                isCurrent={i === 0}
                currentLabel={dict.updatesPage.currentLabel}
                releasedLabel={dict.updatesPage.releasedLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  );
}
