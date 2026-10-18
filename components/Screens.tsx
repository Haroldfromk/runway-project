import { PhoneFrame, WatchFrame, ScreenImage } from "./DeviceFrame";
import type { SiteDictionary } from "@/lib/i18n/schema";

const phoneExt: Record<string, string> = {
  "dynamic-island": "jpg",
  "fdr-drag": "gif",
};

function phoneSrc(key: string) {
  return `/screenshots/phone/${key}.${phoneExt[key] ?? "png"}`;
}

function watchSrc(key: string) {
  return `/screenshots/watch/${key}.png`;
}

export default function Screens({ dict }: { dict: SiteDictionary["screens"] }) {
  return (
    <section id="screens" className="border-b" style={{ borderColor: "var(--rw-border)" }}>
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-16 max-w-3xl rw-rise">
          <h2
            className="text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            {dict.title}
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: "var(--rw-muted)" }}>
            {dict.description.map((line, i) => (
              <span key={i}>
                {line}
                {i < dict.description.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        {/* iPhone: horizontal scroll carousel */}
        <div className="mb-4 flex items-center justify-between rw-rise">
          <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-muted)" }}>
            {dict.phoneLabel}
          </span>
        </div>
        <div
          className="flex gap-6 overflow-x-auto pb-6 pt-2 sm:gap-8"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {dict.phoneShots.map((shot) => (
            <div key={shot.key} className="shrink-0" style={{ scrollSnapAlign: "start" }}>
              <PhoneFrame label={shot.label} showNotch={false}>
                <ScreenImage src={phoneSrc(shot.key)} alt={shot.label} />
              </PhoneFrame>
            </div>
          ))}
        </div>

        {/* Watch: static row */}
        <div className="mb-4 mt-14">
          <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-muted)" }}>
            {dict.watchLabel}
          </span>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-10 sm:justify-start sm:gap-14">
          {dict.watchShots.map((shot) => (
            <WatchFrame key={shot.key} label={shot.label}>
              <ScreenImage src={watchSrc(shot.key)} alt={shot.label} />
            </WatchFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
