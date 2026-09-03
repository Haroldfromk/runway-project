import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Architecture from "@/components/Architecture";
import SystemsMap from "@/components/SystemsMap";
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
    title: `${dict.architecture.eyebrow} - RunWay`,
    description: dict.architecture.description.join(" "),
  };
}

export default async function ArchitecturePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDictionary(lang);

  return (
    <main>
      <Nav lang={lang} dict={dict.nav} />

      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <Link
          href={`/${lang}`}
          className="flex w-fit items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
          style={{ color: "var(--rw-muted)" }}
        >
          <ArrowLeft size={14} />
          {dict.architecturePage.backLabel}
        </Link>
      </div>

      <Architecture dict={dict.architecture} />
      <SystemsMap dict={dict.architecturePage} mapDict={dict.systemsMapNodes} />

      <Footer dict={dict.footer} />
    </main>
  );
}
