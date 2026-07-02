import { ReactNode } from "react";

export function PhoneFrame({
  children,
  label,
  size = "md",
}: {
  children: ReactNode;
  label?: string;
  size?: "sm" | "md";
}) {
  const width = size === "sm" ? 190 : 220;
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative shrink-0 rounded-[2.2rem] border-[6px] p-1.5 shadow-2xl"
        style={{
          borderColor: "#1a1d24",
          background: "#000",
          width,
          boxShadow: "0 20px 60px -20px rgba(100, 255, 218, 0.15)",
        }}
      >
        <div
          className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full"
          style={{ background: "#000" }}
        />
        <div
          className="relative overflow-hidden rounded-[1.6rem]"
          style={{ aspectRatio: "9 / 19.5", background: "var(--rw-bg)" }}
        >
          {children}
        </div>
      </div>
      {label && (
        <span
          className="rw-mono-label text-center text-[10px] leading-tight"
          style={{ color: "var(--rw-muted)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export function WatchFrame({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative shrink-0 rounded-[2.6rem] border-[6px] p-1"
        style={{
          borderColor: "#1a1d24",
          background: "#000",
          width: 148,
          boxShadow: "0 20px 60px -20px rgba(100, 255, 218, 0.15)",
        }}
      >
        {/* crown */}
        <div
          className="absolute -right-[9px] top-10 h-6 w-2 rounded-sm"
          style={{ background: "#1a1d24" }}
        />
        <div
          className="relative overflow-hidden rounded-[2rem]"
          style={{ aspectRatio: "1 / 1.22", background: "var(--rw-bg)" }}
        >
          {children}
        </div>
      </div>
      {label && (
        <span
          className="rw-mono-label text-center text-[10px] leading-tight"
          style={{ color: "var(--rw-muted)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/** Fills a device frame with a real screenshot. */
export function ScreenImage({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  );
}

/** Placeholder inner-screen content until real screenshots are uploaded. */
export function ScreenPlaceholder({
  title,
  accent = "var(--rw-green)",
}: {
  title: string;
  accent?: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rw-panel-grid px-4 text-center">
      <div
        className="h-8 w-8 rounded-full border-2"
        style={{ borderColor: accent, opacity: 0.6 }}
      />
      <span
        className="rw-mono-label text-[9px] leading-relaxed"
        style={{ color: "var(--rw-muted)" }}
      >
        {title}
      </span>
      <span className="text-[8px]" style={{ color: "var(--rw-border)" }}>
        SCREENSHOT PENDING
      </span>
    </div>
  );
}
