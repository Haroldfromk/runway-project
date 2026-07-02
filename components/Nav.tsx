"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sectionIds = ["concept", "screens", "architecture"];

export default function Nav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  const isSectionActive = (id: string) => pathname === "/" && activeSection === id;
  const isPageActive = (path: string) => pathname === path;

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--rw-border)", background: "rgba(11,14,20,0.85)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--rw-green)" }}
          />
          <span
            className="text-sm tracking-[0.2em]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--rw-text)" }}
          >
            RUNWAY
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-xs">
          <Link
            href="/#concept"
            className="rw-mono-label relative pb-1 transition-colors hover:opacity-100"
            style={{ color: isSectionActive("concept") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            Concept
            {isSectionActive("concept") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href="/#screens"
            className="rw-mono-label relative pb-1 transition-colors hover:opacity-100"
            style={{ color: isSectionActive("screens") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            Screens
            {isSectionActive("screens") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href="/#architecture"
            className="rw-mono-label relative pb-1 transition-colors hover:opacity-100"
            style={{ color: isSectionActive("architecture") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            Architecture
            {isSectionActive("architecture") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href="/privacy"
            className="rw-mono-label relative pb-1 transition-colors hover:opacity-100"
            style={{ color: isPageActive("/privacy") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            Privacy
            {isPageActive("/privacy") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href="/support"
            className="rw-mono-label relative pb-1 transition-colors hover:opacity-100"
            style={{ color: isPageActive("/support") ? "var(--rw-green)" : "var(--rw-muted)" }}
          >
            Support
            {isPageActive("/support") && (
              <span
                className="absolute -bottom-[1px] left-0 h-[1.5px] w-full"
                style={{ background: "var(--rw-green)" }}
              />
            )}
          </Link>
          <Link
            href="/troubleshooting"
            className="rw-mono-label rounded-full border px-3 py-1.5 transition-colors"
            style={{
              borderColor: isPageActive("/troubleshooting") ? "var(--rw-green)" : "var(--rw-border)",
              background: isPageActive("/troubleshooting") ? "var(--rw-green)" : "transparent",
              color: isPageActive("/troubleshooting") ? "var(--rw-bg)" : "var(--rw-green)",
            }}
          >
            Maintenance Log
          </Link>
        </nav>
      </div>
    </header>
  );
}
