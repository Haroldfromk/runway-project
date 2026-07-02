"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "@formspree/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { faqItems } from "@/lib/faq";

type Category = "bug" | "feature" | "other";

const categories: { id: Category; label: string }[] = [
  { id: "bug", label: "버그 제보" },
  { id: "feature", label: "기능 제안" },
  { id: "other", label: "기타 문의" },
];

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export default function SupportClient() {
  const [category, setCategory] = useState<Category>("bug");
  const [name, setName] = useState("");
  // useForm requires a non-empty key even when unconfigured; guard the
  // actual submission behind the FORMSPREE_ID check in handleSubmit.
  const [formState, formSubmit] = useForm(FORMSPREE_ID || "unconfigured");

  const categoryLabel = categories.find((c) => c.id === category)?.label ?? "기타 문의";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!FORMSPREE_ID) {
      e.preventDefault();
      return;
    }
    // formSubmit reads FormData directly from the form element, so hidden
    // inputs for category/subject just need to be present in the DOM.
    formSubmit(e);
  };

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

          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            Support
          </span>
          <h1
            className="mt-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            지원 및 문의
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            버그를 발견했거나 기능 제안이 있다면 아래 폼으로 알려주세요.
            자주 묻는 질문은 그 아래에서 먼저 확인해보실 수 있습니다.
          </p>
        </div>
      </section>

      {/* contact form */}
      <section className="border-b" style={{ borderColor: "var(--rw-border)" }}>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <div
            className="rounded-2xl border p-6 sm:p-10"
            style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
          >
            {formState.succeeded ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <CheckCircle2 size={40} color="var(--rw-green)" />
                <h3
                  className="text-lg"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--rw-text)" }}
                >
                  문의가 전송되었습니다
                </h3>
                <p className="text-sm" style={{ color: "var(--rw-muted)" }}>
                  확인 후 입력하신 이메일로 답변드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* category */}
                <div>
                  <label className="rw-mono-label mb-2 block text-[10px]" style={{ color: "var(--rw-muted)" }}>
                    문의 유형
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className="rw-mono-label rounded-full border px-4 py-2 text-[11px] transition-colors"
                        style={{
                          borderColor: category === c.id ? "var(--rw-green)" : "var(--rw-border)",
                          background: category === c.id ? "var(--rw-green)" : "transparent",
                          color: category === c.id ? "var(--rw-bg)" : "var(--rw-muted)",
                        }}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                  {/* hidden fields carried along with the visible ones */}
                  <input type="hidden" name="category" value={categoryLabel} />
                  <input
                    type="hidden"
                    name="_subject"
                    value={`[RunWay ${categoryLabel}] ${name ? name + "님의 문의" : "새 문의"}`}
                  />
                </div>

                {/* name */}
                <div>
                  <label htmlFor="name" className="rw-mono-label mb-2 block text-[10px]" style={{ color: "var(--rw-muted)" }}>
                    이름 (선택)
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--rw-green)]"
                    style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)", color: "var(--rw-text)" }}
                    placeholder="홍길동"
                  />
                </div>

                {/* email */}
                <div>
                  <label htmlFor="email" className="rw-mono-label mb-2 block text-[10px]" style={{ color: "var(--rw-muted)" }}>
                    이메일 <span style={{ color: "var(--rw-red)" }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--rw-green)]"
                    style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)", color: "var(--rw-text)" }}
                    placeholder="you@example.com"
                  />
                </div>

                {/* message */}
                <div>
                  <label htmlFor="message" className="rw-mono-label mb-2 block text-[10px]" style={{ color: "var(--rw-muted)" }}>
                    문의 내용 <span style={{ color: "var(--rw-red)" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={5000}
                    className="w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--rw-green)]"
                    style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)", color: "var(--rw-text)" }}
                    placeholder="어떤 상황에서 어떤 문제가 있었는지 자세히 알려주시면 도움이 됩니다."
                  />
                </div>

                {!FORMSPREE_ID && (
                  <div
                    className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm"
                    style={{ borderColor: "var(--rw-amber)", color: "var(--rw-amber)" }}
                  >
                    <AlertCircle size={16} />
                    문의 폼이 아직 설정되지 않았습니다. 아래 이메일로 직접 연락해주세요.
                  </div>
                )}

                {formState.errors && Array.isArray(formState.errors) && formState.errors.length > 0 && (
                  <div
                    className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm"
                    style={{ borderColor: "var(--rw-red)", color: "var(--rw-red)" }}
                  >
                    <AlertCircle size={16} />
                    전송에 실패했습니다. 잠시 후 다시 시도해주세요.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState.submitting || !FORMSPREE_ID}
                  className="rw-mono-label flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-[12px] transition-opacity disabled:opacity-60"
                  style={{ background: "var(--rw-green)", color: "var(--rw-bg)" }}
                >
                  <Send size={14} />
                  {formState.submitting ? "전송 중..." : "문의 보내기"}
                </button>
              </form>
            )}
          </div>

          <div
            className="mt-4 flex items-center justify-center gap-2 text-xs"
            style={{ color: "var(--rw-muted)" }}
          >
            <Mail size={13} />
            직접 이메일을 보내고 싶다면{" "}
            <a href="mailto:dongik369@naver.com" style={{ color: "var(--rw-green)" }}>
              dongik369@naver.com
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <h2
            className="mb-8 text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            자주 묻는 질문
          </h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border px-5 py-4"
                style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
              >
                <summary
                  className="cursor-pointer list-none text-sm font-medium sm:text-base"
                  style={{ color: "var(--rw-text)" }}
                >
                  {item.q}
                </summary>
                <p
                  className="mt-3 text-sm leading-relaxed sm:text-base"
                  style={{ color: "var(--rw-muted)" }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-xs" style={{ color: "var(--rw-muted)" }}>
            개인정보 처리 관련 세부 사항은{" "}
            <Link href="/privacy" style={{ color: "var(--rw-green)" }}>
              개인정보 처리방침
            </Link>{" "}
            페이지를 참고해주세요.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
