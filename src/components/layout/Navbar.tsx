"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/background", label: "Background" },
  { href: "/metrics", label: "Goals" },
  { href: "/scope", label: "Scope" },
  { href: "/stories/expert-flow", label: "Expert Flow", separator: true },
  { href: "/stories/right-panel", label: "Right Panel" },
  { href: "/stories/session-skill", label: "Session → Skill" },
  { href: "/principles", label: "Principles", separator: true },
  { href: "/technical", label: "Technical" },
  { href: "/appendix", label: "Appendix" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-3">
        <Link
          href="/"
          className="mr-4 flex shrink-0 items-center gap-2 font-semibold text-accent"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-white">
            S
          </span>
          Shadow
        </Link>

        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <span key={item.href} className="flex items-center">
              {"separator" in item && item.separator && (
                <span className="mx-1 h-4 w-px bg-border" />
              )}
              <Link
                href={item.href}
                className={`shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-accent-light font-medium text-accent"
                    : "text-muted hover:bg-accent-light/50 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </span>
          );
        })}
      </div>
    </nav>
  );
}
