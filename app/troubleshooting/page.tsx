import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TroubleshootCard from "@/components/TroubleshootCard";
import { troubleshootCases } from "@/lib/data";

export const metadata = {
  title: "Maintenance Log - RunWay",
  description: "RunWay 개발 중 발생한 이슈와 해결 과정 (정비 로그)",
};

export default function TroubleshootingPage() {
  const resolvedCount = troubleshootCases.filter((c) => c.status === "RESOLVED").length;
  const limitationCount = troubleshootCases.length - resolvedCount;

  return (
    <main>
      <Nav />

      <section
        className="border-b rw-panel-grid"
        style={{ borderColor: "var(--rw-border)" }}
      >
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--rw-muted)" }}
          >
            <ArrowLeft size={14} />
            RunWay 홈으로
          </Link>

          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            Maintenance Log
          </span>
          <h1
            className="mt-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            정비 기록
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            개발 중 실제로 마주친 문제와 원인 추적, 해결 과정을 정비 로그
            형식으로 정리했습니다. 모든 것이 해결되지는 않았고, 구조적
            한계는 한계라고 정직하게 남겨두었습니다.
          </p>

          <div className="mt-8 flex gap-6">
            <div>
              <div
                className="text-2xl tabular-nums"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-green)" }}
              >
                {resolvedCount}
              </div>
              <div className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
                Resolved
              </div>
            </div>
            <div>
              <div
                className="text-2xl tabular-nums"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-amber)" }}
              >
                {limitationCount}
              </div>
              <div className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
                Known Limitation
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <div className="space-y-4">
            {troubleshootCases.map((item) => (
              <TroubleshootCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
