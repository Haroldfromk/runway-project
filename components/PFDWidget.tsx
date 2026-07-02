"use client";

import { useEffect, useRef, useState } from "react";

type GpwsState = "normal" | "sink" | "over" | "minimums";

const GPWS_SEQUENCE: { state: GpwsState; pace: string; hold: number }[] = [
  { state: "normal", pace: "5'12\"", hold: 2600 },
  { state: "sink", pace: "5'48\"", hold: 1800 },
  { state: "normal", pace: "5'15\"", hold: 2400 },
  { state: "over", pace: "4'32\"", hold: 1800 },
  { state: "normal", pace: "5'10\"", hold: 2600 },
  { state: "minimums", pace: "5'11\"", hold: 2000 },
];

const stateMeta: Record<
  GpwsState,
  { label: string; color: string; bg: string }
> = {
  normal: { label: "GLIDE PATH", color: "var(--rw-green)", bg: "transparent" },
  sink: { label: "SINK RATE", color: "#0B0E14", bg: "var(--rw-red)" },
  over: { label: "OVERSPEED", color: "#0B0E14", bg: "var(--rw-red)" },
  minimums: { label: "MINIMUMS", color: "#0B0E14", bg: "var(--rw-amber)" },
};

export default function PFDWidget() {
  const [idx, setIdx] = useState(0);
  const [distance, setDistance] = useState(2.14);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = GPWS_SEQUENCE[idx];
  const meta = stateMeta[current.state];

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % GPWS_SEQUENCE.length);
      setDistance((d) => Math.round((d + 0.08) * 100) / 100);
    }, current.hold);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [idx, current.hold]);

  const isAlert = current.state !== "normal";

  return (
    <div
      className="relative w-full max-w-md overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--rw-border)",
        background: "var(--rw-panel)",
        transition: "background-color 0.4s ease",
      }}
      role="img"
      aria-label={`RunWay 계기판 시뮬레이션, 현재 상태: ${meta.label}`}
    >
      {/* GPWS alert bar */}
      <div
        className="flex items-center justify-center gap-2 py-2 transition-colors duration-300"
        style={{
          background: isAlert ? meta.bg : "var(--rw-panel2)",
          color: isAlert ? meta.color : "var(--rw-muted)",
        }}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${isAlert ? "rw-blink" : ""}`}
          style={{ background: isAlert ? meta.color : "var(--rw-green)" }}
        />
        <span
          className="rw-mono-label text-[11px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {meta.label}
        </span>
      </div>

      <div className="p-5">
        {/* status row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
            MISSION FLIGHT
          </span>
          <span className="rw-mono-label text-[9px]" style={{ color: "var(--rw-muted)" }}>
            CRUISE
          </span>
        </div>

        {/* main pace readout */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div
              className="text-[9px] rw-mono-label mb-1"
              style={{ color: "var(--rw-muted)" }}
            >
              PACE
            </div>
            <div
              className="text-4xl tabular-nums transition-colors duration-300"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: isAlert ? meta.bg : "var(--rw-green)",
              }}
            >
              {current.pace}
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-[9px] rw-mono-label mb-1"
              style={{ color: "var(--rw-muted)" }}
            >
              DIST
            </div>
            <div
              className="text-2xl tabular-nums"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--rw-text)",
              }}
            >
              {distance.toFixed(2)}
              <span className="text-sm ml-1" style={{ color: "var(--rw-muted)" }}>
                km
              </span>
            </div>
          </div>
        </div>

        {/* mini stat cells */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "HR", value: "158", unit: "bpm" },
            { label: "CAD", value: "172", unit: "spm" },
            { label: "FUEL", value: "212", unit: "kcal" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border px-2 py-2 text-center"
              style={{ borderColor: "var(--rw-border)", background: "var(--rw-panel2)" }}
            >
              <div className="text-[8px] rw-mono-label" style={{ color: "var(--rw-muted)" }}>
                {s.label}
              </div>
              <div
                className="text-sm tabular-nums mt-0.5"
                style={{ fontFamily: "var(--font-display)", color: "var(--rw-text)" }}
              >
                {s.value}
                <span className="text-[9px] ml-0.5" style={{ color: "var(--rw-muted)" }}>
                  {s.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
