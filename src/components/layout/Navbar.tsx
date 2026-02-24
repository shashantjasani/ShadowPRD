"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const leftNav = [
  { href: "/", label: "Home" },
  { href: "/background", label: "Background" },
  { href: "/metrics", label: "Goals" },
  { href: "/scope", label: "Scope" },
  { href: "/components", label: "Components" },
  { href: "/day-in-the-life", label: "Day in the Life" },
] as const;

const prototypeNav = [
  { href: "/stories/expert-flow", label: "Expert Flow" },
  { href: "/stories/right-panel", label: "Right Panel" },
  { href: "/stories/session-skill", label: "Session → Skill" },
] as const;

const rightNav = [
  { href: "/principles", label: "Principles" },
  { href: "/technical", label: "Technical" },
  { href: "/appendix", label: "Appendix" },
] as const;

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors ${
        isActive
          ? "bg-accent-light font-medium text-accent"
          : "text-muted hover:bg-accent-light/50 hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [prototypesOpen, setPrototypesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const prototypeActive = prototypeNav.some((p) =>
    pathname.startsWith(p.href)
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setPrototypesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: logo + main nav + prototypes dropdown */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="mr-4 flex shrink-0 items-center gap-2 font-semibold text-accent"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-white">
              S
            </span>
            Shadow
          </Link>

          {leftNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={isActive(item.href)}
            />
          ))}

          <span className="mx-1 h-4 w-px bg-border" />

          {/* Prototypes dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPrototypesOpen((prev) => !prev)}
              className={`flex shrink-0 items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
                prototypeActive
                  ? "bg-accent-light font-medium text-accent"
                  : "text-muted hover:bg-accent-light/50 hover:text-foreground"
              }`}
            >
              Prototypes
              <svg
                className={`h-3.5 w-3.5 transition-transform ${
                  prototypesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {prototypesOpen && (
              <div className="absolute left-0 top-full z-[60] mt-1 w-52 rounded-lg border border-border bg-surface shadow-lg">
                {prototypeNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setPrototypesOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      isActive(item.href)
                        ? "bg-accent-light font-medium text-accent"
                        : "text-muted hover:bg-accent-light/50 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Principles, Technical, Appendix */}
        <div className="flex items-center gap-1">
          {rightNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={isActive(item.href)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
