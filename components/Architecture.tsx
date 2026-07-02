"use client";

import { useState } from "react";

type TabId = "actor" | "phase" | "mirroring";

const tabs: { id: TabId; label: string; eyebrow: string }[] = [
  { id: "actor", label: "RunningCenter Actor", eyebrow: "동시성" },
  { id: "phase", label: "FlightPhase 상태 머신", eyebrow: "상태 관리" },
  { id: "mirroring", label: "Watch 미러링", eyebrow: "기기 간 동기화" },
];

function Node({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "highlight";
}) {
  return (
    <div
      className="rounded-lg border px-4 py-2.5 text-xs whitespace-nowrap"
      style={{
        borderColor: variant === "highlight" ? "var(--rw-green)" : "var(--rw-border)",
        borderWidth: variant === "highlight" ? 2 : 1,
        background: variant === "highlight" ? "var(--rw-bg)" : "var(--rw-panel2)",
        color: variant === "highlight" ? "var(--rw-green)" : "var(--rw-text)",
        fontFamily: variant === "highlight" ? "var(--font-display)" : undefined,
        fontWeight: variant === "highlight" ? 700 : 400,
      }}
    >
      {children}
    </div>
  );
}

function VArrow({ color = "var(--rw-border)" }: { color?: string }) {
  return (
    <svg width="4" height="24" viewBox="0 0 4 24">
      <path d="M2,0 L2,24" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-8 rounded-xl border-l-4 px-5 py-4"
      style={{ borderColor: "var(--rw-green)", background: "var(--rw-panel2)" }}
    >
      <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-green)" }}>
        왜 이렇게 설계했는가
      </span>
      <p
        className="mt-2 text-sm leading-relaxed italic sm:text-base"
        style={{ color: "var(--rw-text)" }}
      >
        &ldquo;{children}&rdquo;
      </p>
    </div>
  );
}

function ActorDiagram() {
  const sources = ["CoreLocation", "HealthKit", "WatchConnectivity"];
  return (
    <>
      <div className="flex min-w-[560px] flex-col items-center gap-5">
        <div className="flex w-full justify-center gap-4">
          {sources.map((s) => (
            <Node key={s}>{s}</Node>
          ))}
        </div>
        <svg width="100%" height="32" viewBox="0 0 400 32" className="max-w-xs">
          <path d="M40,0 L200,26" stroke="var(--rw-border)" strokeWidth="1.5" fill="none" />
          <path d="M200,0 L200,26" stroke="var(--rw-border)" strokeWidth="1.5" fill="none" />
          <path d="M360,0 L200,26" stroke="var(--rw-border)" strokeWidth="1.5" fill="none" />
        </svg>
        <Node variant="highlight">RunningCenter (actor · serial queue)</Node>
        <VArrow color="var(--rw-green)" />
        <Node>AsyncStream&lt;FlightData&gt;</Node>
        <VArrow />
        <Node>ViewModel (@MainActor) → SwiftUI</Node>
      </div>
      <Quote>
        GPS, 심박수, 케이던스가 동시에 들어오므로 상태 무결성을 보장하기
        위해 RunningCenter Actor를 두고 모든 러닝 계산을 단일 격리 영역에서
        처리했습니다.
      </Quote>
    </>
  );
}

function PhaseDiagram() {
  const phases = [
    { id: "preflight", label: "PREFLIGHT" },
    { id: "takeoff", label: "TAKEOFF" },
    { id: "cruise", label: "CRUISE" },
    { id: "approach", label: "APPROACH" },
    { id: "touchdown", label: "TOUCHDOWN" },
  ];
  return (
    <>
      <div className="flex min-w-[640px] flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          {phases.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2">
              <Node variant={p.id === "cruise" ? "highlight" : "default"}>{p.label}</Node>
              {i < phases.length - 1 && (
                <svg width="20" height="4" viewBox="0 0 20 4">
                  <path d="M0,2 L20,2" stroke="var(--rw-border)" strokeWidth="1.5" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <svg width="4" height="24" viewBox="0 0 4 24">
          <path d="M2,0 L2,24" stroke="var(--rw-border)" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="flex gap-4">
          <Node>Dynamic Island</Node>
          <Node>Watch PFD</Node>
          <Node>iPhone PFD</Node>
        </div>
      </div>
      <Quote>
        각 화면이 독립적으로 상태를 판단하면 화면 간 불일치가 생깁니다.
        <br /> 
        항공기 운항 단계에서 착안한 FlightPhase 하나를 앱 전체가 참조하게
        해서, Dynamic Island와 Watch, iPhone PFD가 항상 같은 상태를
        보여주도록 했습니다.
      </Quote>
    </>
  );
}

function MirroringDiagram() {
  return (
    <>
      <div className="flex min-w-[560px] flex-col items-center gap-5">
        <div className="grid w-full grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-2">
            <Node variant="highlight">Watch (startOrigin: .local)</Node>
            <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
              GPS + 계산 담당
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Node>iPhone (startOrigin: .remote)</Node>
            <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
              수신 + 표시만
            </span>
          </div>
        </div>
        <svg width="100%" height="30" viewBox="0 0 300 30" className="max-w-xs">
          <path d="M70,4 L230,4" stroke="var(--rw-green)" strokeWidth="1.5" fill="none" />
          <path d="M220,-2 L230,4 L220,10" stroke="var(--rw-green)" strokeWidth="1.5" fill="none" />
        </svg>
        <Node>FlightData (elapsedTime 포함, 3초 throttle)</Node>
      </div>
      <Quote>
        처음에는 iPhone과 Watch가 미러링 중에도 각자 GPS를 잡고 있었습니다.
        <br /> 
        주도 기기(startOrigin) 하나만 위치를 추적하고 계산 결과를 상대에게
        보내는 구조로 바꾸니, 중복 연산도 없어지고 화면 전환 지연도
        사라졌습니다.
      </Quote>
    </>
  );
}

const stack = [
  { label: "SwiftUI", role: "UI" },
  { label: "@MainActor + @Observable", role: "상태관리" },
  { label: "RunningCenter (Actor)", role: "동시성" },
  { label: "AsyncStream", role: "센서 → ViewModel" },
  { label: "FlightPhase enum", role: "상태 머신" },
  { label: "WatchConnectivity", role: "iPhone ↔ Watch" },
  { label: "SwiftData", role: "저장" },
  { label: "MapKit + MapPolyline", role: "경로 시각화" },
];

export default function Architecture() {
  const [active, setActive] = useState<TabId>("actor");

  return (
    <section id="architecture" className="border-b" style={{ borderColor: "var(--rw-border)" }}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-10 max-w-xl">
          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            Under The Hood
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            설계 결정 세 가지
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            동시성 처리, 상태 관리, 기기 간 동기화 - RunWay를 만들며 가장
            많이 고민한 세 가지 지점입니다.
          </p>
        </div>

        {/* tabs */}
        <div
          className="mb-6 flex gap-2 overflow-x-auto border-b pb-px"
          style={{ borderColor: "var(--rw-border)" }}
        >
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="shrink-0 rounded-t-lg border-b-2 px-4 py-3 text-left transition-colors"
                style={{
                  borderColor: isActive ? "var(--rw-green)" : "transparent",
                  background: isActive ? "var(--rw-panel)" : "transparent",
                }}
              >
                <div
                  className="rw-mono-label text-[9px]"
                  style={{ color: isActive ? "var(--rw-green)" : "var(--rw-muted)" }}
                >
                  {t.eyebrow}
                </div>
                <div
                  className="mt-0.5 text-sm"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    color: isActive ? "var(--rw-text)" : "var(--rw-muted)",
                  }}
                >
                  {t.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* diagram panel */}
        <div
          className="overflow-x-auto rounded-2xl border p-6 sm:p-10"
          style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
        >
          <div className="flex flex-col items-center">
            {active === "actor" && <ActorDiagram />}
            {active === "phase" && <PhaseDiagram />}
            {active === "mirroring" && <MirroringDiagram />}
          </div>
        </div>

        {/* tech stack grid */}
        <div className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((t) => (
            <div
              key={t.label}
              className="flex items-center justify-between rounded-lg border px-4 py-3"
              style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
            >
              <span className="text-xs" style={{ color: "var(--rw-text)" }}>
                {t.label}
              </span>
              <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
                {t.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
