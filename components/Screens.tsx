import { PhoneFrame, WatchFrame, ScreenImage } from "./DeviceFrame";

const phoneShots: { src: string; label: string }[] = [
  { src: "/screenshots/phone/homeview.png", label: "HOME · 대시보드" },
  { src: "/screenshots/phone/missionflight.png", label: "MISSION FLIGHT · 설정" },
  { src: "/screenshots/phone/takeoff.png", label: "TAKEOFF · 사전 점검" },
  { src: "/screenshots/phone/missionrunning.png", label: "MISSION FLIGHT · CRUISE" },
  { src: "/screenshots/phone/freerunning.png", label: "FREE FLIGHT · CRUISE" },
  { src: "/screenshots/phone/touchdown.png", label: "TOUCHDOWN" },
  { src: "/screenshots/phone/summary.png", label: "FLIGHT SUMMARY · MAP ROUTE" },
  { src: "/screenshots/phone/logbook.png", label: "LOGBOOK" },
  { src: "/screenshots/phone/alerts.png", label: "ALERTS · GPWS 기록" },
  { src: "/screenshots/phone/chart.png", label: "FLIGHT CALENDAR" },
  { src: "/screenshots/phone/dynamic-island.jpg", label: "DYNAMIC ISLAND" },
];

const watchShots: { src: string; label: string }[] = [
  { src: "/screenshots/watch/home.png", label: "WATCH · MODE SELECT" },
  { src: "/screenshots/watch/running.png", label: "WATCH · PFD" },
  { src: "/screenshots/watch/summary.png", label: "WATCH · SUMMARY" },
];

export default function Screens() {
  return (
    <section id="screens" className="border-b" style={{ borderColor: "var(--rw-border)" }}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-10 max-w-xl">
          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            iPhone &amp; Apple Watch
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            두 화면, 하나의 비행
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            Watch가 주도하든 iPhone이 주도하든, 두 기기는 같은 FlightData를 공유합니다.
            <br />
            이륙 준비부터 착륙 후 기록까지, 실제 화면으로 확인해보세요.
          </p>
        </div>

        {/* iPhone: horizontal scroll carousel */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-muted)" }}>
            iPhone · 좌우로 스크롤
          </span>
        </div>
        <div
          className="flex gap-6 overflow-x-auto pb-6 pt-2 sm:gap-8"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {phoneShots.map((shot) => (
            <div key={shot.src} className="shrink-0" style={{ scrollSnapAlign: "start" }}>
              <PhoneFrame label={shot.label} showNotch={false}>
                <ScreenImage src={shot.src} alt={shot.label} />
              </PhoneFrame>
            </div>
          ))}
        </div>

        {/* Watch: static row */}
        <div className="mb-4 mt-14">
          <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-muted)" }}>
            Apple Watch
          </span>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-10 sm:justify-start sm:gap-14">
          {watchShots.map((shot) => (
            <WatchFrame key={shot.src} label={shot.label}>
              <ScreenImage src={shot.src} alt={shot.label} />
            </WatchFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
