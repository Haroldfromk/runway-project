const modes = [
  {
    tag: "MODE A",
    title: "Mission Flight",
    desc: "목표 페이스와 거리를 설정하고 운항합니다. 허용 오차를 벗어나면 GPWS가 즉시 경고합니다.",
    points: ["목표 페이스 ± 오차 설정", "빠른 거리 선택 (3K / 5K / 10K / 하프 / 풀)", "목표 거리 50m 전 MINIMUMS 경보"],
  },
  {
    tag: "MODE B",
    title: "Free Flight",
    desc: "목표 없이 자유롭게 달리는 VFR(시계비행) 모드. 수동으로 Touchdown하여 종료합니다.",
    points: ["목표 설정 없음", "GPWS 비활성", "자유로운 페이스 기록"],
  },
];

const gpwsAlerts = [
  { label: "SINK RATE", desc: "목표 페이스보다 느려짐", color: "var(--rw-red)" },
  { label: "OVERSPEED", desc: "목표 페이스보다 빨라짐", color: "var(--rw-red)" },
  { label: "MINIMUMS", desc: "목표 거리 50m 전 진입", color: "var(--rw-amber)" },
];

export default function Concept() {
  return (
    <section id="concept" className="border-b" style={{ borderColor: "var(--rw-border)" }}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-14 max-w-xl">
          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            Flight Operations
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            두 가지 비행 모드
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            항공기 운항 절차에서 착안한 상태 머신으로 러닝 전체를 관리합니다.
            <br /> 
            시작 버튼을 누르면 이륙 시퀀스가, 러닝 중에는 실시간 계기판이 기다립니다.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {modes.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl border p-6 transition-colors hover:border-[var(--rw-green)]/40"
              style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
            >
              <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-green2)" }}>
                {m.tag}
              </span>
              <h3
                className="mt-2 text-xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--rw-text)" }}
              >
                {m.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--rw-muted)" }}>
                {m.desc}
              </p>
              <ul className="mt-5 space-y-2">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs" style={{ color: "var(--rw-muted)" }}>
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "var(--rw-green)" }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* GPWS alerts row */}
        <div className="mt-14">
          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-amber)" }}>
            Ground Proximity Warning System
          </span>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {gpwsAlerts.map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-3 rounded-xl border p-4"
                style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${a.color}1a` }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: a.color }} />
                </div>
                <div>
                  <div
                    className="text-xs"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: a.color }}
                  >
                    {a.label}
                  </div>
                  <div className="mt-0.5 text-[11px]" style={{ color: "var(--rw-muted)" }}>
                    {a.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
