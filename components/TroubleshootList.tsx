"use client";

import { useState } from "react";
import TroubleshootCard from "@/components/TroubleshootCard";
import type { TroubleshootCase } from "@/lib/i18n/schema";

type Filter = "ALL" | "RESOLVED" | "KNOWN LIMITATION";

/**
 * 정비 기록 목록. 상태별로 걸러 볼 수 있다.
 *
 * 걸러내기는 열어둔 카드를 건드리지 않는다. 펼친 상태는 각 카드가 들고 있고,
 * 이 컴포넌트는 어떤 카드를 그릴지만 정한다.
 */
export default function TroubleshootList({
  cases,
  verdictLabel,
  allLabel,
  resolvedLabel,
  limitationLabel,
  emptyLabel,
}: {
  cases: TroubleshootCase[];
  verdictLabel: string;
  allLabel: string;
  resolvedLabel: string;
  limitationLabel: string;
  emptyLabel: string;
}) {
  const [filter, setFilter] = useState<Filter>("ALL");

  const options: { value: Filter; label: string; count: number }[] = [
    { value: "ALL", label: allLabel, count: cases.length },
    {
      value: "RESOLVED",
      label: resolvedLabel,
      count: cases.filter((c) => c.status === "RESOLVED").length,
    },
    {
      value: "KNOWN LIMITATION",
      label: limitationLabel,
      count: cases.filter((c) => c.status !== "RESOLVED").length,
    },
  ];

  const shown = filter === "ALL" ? cases : cases.filter((c) => c.status === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={active}
              className="rw-mono-label rounded-full border px-3.5 py-1.5 text-[10px] transition-colors"
              style={{
                borderColor: active ? "var(--rw-green)" : "var(--rw-border)",
                color: active ? "var(--rw-green)" : "var(--rw-muted)",
                backgroundColor: active ? "color-mix(in srgb, var(--rw-green) 10%, transparent)" : "transparent",
              }}
            >
              {option.label}
              <span className="ml-1.5 tabular-nums opacity-60">{option.count}</span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="py-10 text-center text-sm" style={{ color: "var(--rw-muted)" }}>
          {emptyLabel}
        </p>
      ) : (
        <div className="space-y-4">
          {shown.map((item) => (
            <TroubleshootCard key={item.id} item={item} verdictLabel={verdictLabel} />
          ))}
        </div>
      )}
    </div>
  );
}
