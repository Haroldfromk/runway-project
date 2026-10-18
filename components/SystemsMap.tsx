"use client";

import { useMemo, useState } from "react";
import type { SiteDictionary } from "@/lib/i18n/schema";
import { nodes, edges, bands, bandLabelY, VIEWBOX } from "@/lib/systemsMapLayout";
import { systemsMapCode } from "@/lib/systemsMapCode";

const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

const kindLabel: Record<string, string> = {
  actor: "ACTOR",
  service: "SERVICE",
  view: "VIEW",
  model: "MODEL",
};

export default function SystemsMap({
  dict,
  mapDict,
}: {
  dict: SiteDictionary["architecturePage"];
  mapDict: SiteDictionary["systemsMapNodes"];
}) {
  const [selected, setSelected] = useState("core");

  const byId = useMemo(() => {
    const m = new Map(mapDict.map((n) => [n.id, n]));
    return m;
  }, [mapDict]);

  const active = byId.get(selected);
  const activeCode = systemsMapCode[selected] ?? [];

  const activeEdges = edges.filter((e) => e.from === selected || e.to === selected);

  return (
    <section className="border-b" style={{ borderColor: "var(--rw-border)" }}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-10 max-w-2xl">
          <span className="rw-mono-label text-[11px]" style={{ color: "var(--rw-green)" }}>
            {dict.mapEyebrow}
          </span>
          <h2
            className="mt-4 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            {dict.mapTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "var(--rw-muted)" }}>
            {dict.mapDescription.map((line, i) => (
              <span key={i}>
                {line}
                {i < dict.mapDescription.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div
            className="mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px]"
            style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)", color: "var(--rw-muted)" }}
          >
            {dict.mapHint}
          </div>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[1.55fr_1fr]">
          {/* diagram */}
          <div className="min-w-0 overflow-hidden rounded-2xl border" style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}>
            <div className="overflow-x-auto p-3">
              <svg
                viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
                className="w-full"
                style={{ minWidth: 640 }}
                role="img"
                aria-label={dict.mapTitle}
              >
                <defs>
                  <marker id="sm-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 z" fill="var(--rw-muted)" />
                  </marker>
                  <marker id="sm-ar-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 z" fill="var(--rw-green)" />
                  </marker>
                </defs>

                {bands.map((b, i) => (
                  <rect key={i} x={0} y={b.y} width={VIEWBOX.w} height={b.h} fill="var(--rw-bg)" />
                ))}
                {dict.bands.map((label, i) => (
                  <text key={i} x={30} y={bandLabelY[i]} fontSize={10.5} fontFamily={MONO} letterSpacing="0.06em" fill="var(--rw-muted)">
                    {label}
                  </text>
                ))}

                {edges.map((e) => {
                  const isActive = e.from === selected || e.to === selected;
                  return (
                    <path
                      key={e.id}
                      id={`sm-${e.id}`}
                      d={e.d}
                      fill="none"
                      stroke={isActive ? "var(--rw-green)" : "var(--rw-border)"}
                      strokeWidth={isActive ? 2.2 : 1.4}
                      opacity={isActive ? 1 : 0.8}
                      markerEnd={`url(#${e.bi ? "sm-ar-a" : "sm-ar"})`}
                      markerStart={e.bi ? "url(#sm-ar-a)" : undefined}
                      style={{ transition: "stroke .15s ease, stroke-width .15s ease" }}
                    />
                  );
                })}

                {nodes.map((n) => {
                  const d = byId.get(n.id);
                  const isSelected = n.id === selected;
                  const cx = n.x + n.w / 2;
                  return (
                    <g
                      key={n.id}
                      tabIndex={0}
                      role="button"
                      aria-label={d?.name}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelected(n.id)}
                      onMouseEnter={() => setSelected(n.id)}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter" || ev.key === " ") {
                          ev.preventDefault();
                          setSelected(n.id);
                        }
                      }}
                    >
                      <rect
                        x={n.x}
                        y={n.y}
                        width={n.w}
                        height={n.h}
                        rx={n.core ? 12 : 10}
                        fill={n.core ? "var(--rw-bg-elevated)" : "var(--rw-panel2)"}
                        stroke={isSelected ? "var(--rw-green)" : n.core ? "var(--rw-green)" : "var(--rw-border)"}
                        strokeWidth={isSelected ? 2.2 : n.core ? 1.6 : 1.4}
                        style={{ transition: "stroke .12s ease" }}
                      />
                      <text
                        x={cx}
                        y={n.y + (n.core ? 30 : 27)}
                        textAnchor="middle"
                        fontSize={n.core ? 15 : 12.5}
                        fontWeight={700}
                        fill={isSelected ? "var(--rw-green)" : "var(--rw-text)"}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {d?.name}
                      </text>
                      <text
                        x={cx}
                        y={n.y + (n.core ? 50 : 46)}
                        textAnchor="middle"
                        fontSize={9.5}
                        letterSpacing="0.08em"
                        fill="var(--rw-muted)"
                        fontFamily={MONO}
                      >
                        {kindLabel[n.kind]}
                      </text>
                    </g>
                  );
                })}

                {activeEdges.map((e) => (
                  <circle key={e.id} r={4} fill="var(--rw-green)">
                    <animateMotion dur="1.4s" repeatCount="indefinite">
                      <mpath href={`#sm-${e.id}`} />
                    </animateMotion>
                  </circle>
                ))}
                {activeEdges
                  .filter((e) => e.bi)
                  .map((e) => (
                    <circle key={`${e.id}-r`} r={4} fill="var(--rw-green)">
                      <animateMotion dur="1.4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                        <mpath href={`#sm-${e.id}`} />
                      </animateMotion>
                    </circle>
                  ))}
              </svg>
            </div>
          </div>

          {/* detail panel */}
          {active && (
            <div className="flex min-w-0 flex-col gap-4">
              <div className="min-w-0 rounded-2xl border" style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}>
                <div className="border-b px-4 py-3" style={{ borderColor: "var(--rw-border)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--rw-text)" }}>
                    {active.name}
                  </div>
                  <div className="mt-1 text-[11px]" style={{ fontFamily: MONO, color: "var(--rw-muted)" }}>
                    {active.path}
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: "var(--rw-muted)" }}>
                    {active.desc}
                  </p>
                </div>
                <div className="max-h-[380px] overflow-auto px-0 py-3">
                  <pre className="m-0" style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.6 }}>
                    <code>
                      {activeCode.map((line, i) => (
                        <span
                          key={i}
                          className="block"
                          style={{ padding: "0 16px 0 46px", textIndent: "-30px", whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
                        >
                          <span
                            className="mr-2.5 inline-block text-right"
                            style={{ width: 20, textIndent: 0, color: "var(--rw-muted)", opacity: 0.5 }}
                          >
                            {i + 1}
                          </span>
                          <span dangerouslySetInnerHTML={{ __html: line }} />
                        </span>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border" style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel)" }}>
                <div className="border-b px-4 py-3" style={{ borderColor: "var(--rw-border)" }}>
                  <span className="rw-mono-label text-[10px]" style={{ color: "var(--rw-muted)" }}>
                    {dict.respLabel}
                  </span>
                </div>
                <ul className="flex flex-col gap-2 px-4 py-3">
                  {active.resp.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed" style={{ color: "var(--rw-text)" }}>
                      <span style={{ color: "var(--rw-green)", flex: "none" }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {active.intent && (
                <div
                  className="rounded-xl border-l-4 px-5 py-4"
                  style={{ borderColor: "var(--rw-green)", background: "var(--rw-panel2)" }}
                >
                  <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-green)" }}>
                    {dict.intentLabel}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--rw-text)" }}>
                    {active.intent}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
