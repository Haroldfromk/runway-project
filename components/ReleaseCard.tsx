import type { ReleaseNote } from "@/lib/i18n/schema";

export default function ReleaseCard({
  release,
  isCurrent,
  currentLabel,
  releasedLabel,
}: {
  release: ReleaseNote;
  isCurrent: boolean;
  currentLabel: string;
  releasedLabel: string;
}) {
  return (
    <div
      className="rounded-2xl border px-5 py-5 sm:px-7 sm:py-6"
      style={{
        borderColor: isCurrent ? "var(--rw-green)55" : "var(--rw-border)",
        background: "var(--rw-panel)",
      }}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <h3
          className="text-lg sm:text-xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-green)" }}
        >
          {release.version}
        </h3>
        {isCurrent && (
          <span
            className="rw-mono-label rounded-full px-2.5 py-0.5 text-[9px]"
            style={{ color: "#0B0E14", background: "var(--rw-green)" }}
          >
            {currentLabel}
          </span>
        )}
        <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-muted)" }}>
          {releasedLabel} {release.date}
        </span>
      </div>

      <ul className="mt-3.5 space-y-1.5">
        {release.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-xs leading-relaxed sm:text-sm"
            style={{ color: "var(--rw-text)" }}
          >
            <span style={{ color: "var(--rw-muted)" }}>-</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
