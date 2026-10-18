import type { SiteDictionary } from "@/lib/i18n/schema";

const gpwsColor: Record<string, string> = {
  "SINK RATE": "var(--rw-red)",
  OVERSPEED: "var(--rw-red)",
  MINIMUMS: "var(--rw-amber)",
};

export default function Concept({ dict }: { dict: SiteDictionary["concept"] }) {
  return (
    <section id="concept" className="border-b" style={{ borderColor: "var(--rw-border)" }}>
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-20 max-w-3xl rw-rise">
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

        <div className="grid gap-5 rw-rise sm:grid-cols-2">
          {dict.modes.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl border p-8 transition-colors hover:border-[var(--rw-green)]/40"
              style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
            >
              <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-green2)" }}>
                {m.tag}
              </span>
              <h3
                className="mt-3 text-3xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--rw-text)" }}
              >
                {m.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--rw-muted)" }}>
                {m.desc}
              </p>
              <ul className="mt-7 space-y-3">
                {m.points.map((p) => (
                  <li key={p} className="text-sm leading-relaxed" style={{ color: "var(--rw-muted)" }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* GPWS alerts row */}
        <div className="mt-20 rw-rise">
          <h3
            className="text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--rw-text)" }}
          >
            {dict.gpwsEyebrow}
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {dict.gpwsAlerts.map((a) => {
              const color = gpwsColor[a.label] ?? "var(--rw-amber)";
              return (
                <div
                  key={a.label}
                  className="flex items-center gap-3 rounded-xl border p-4"
                  style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${color}1a` }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                  </div>
                  <div>
                    <div
                      className="text-xs"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 700, color }}
                    >
                      {a.label}
                    </div>
                    <div className="mt-0.5 text-[11px]" style={{ color: "var(--rw-muted)" }}>
                      {a.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
