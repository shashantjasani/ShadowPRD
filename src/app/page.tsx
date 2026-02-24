import Link from "next/link";
import { hero } from "@/data/content";

const stories = [
  {
    href: "/stories/expert-flow",
    title: "Expert Pre-Call / Call / Post-Call",
    description:
      "Shadow fetches personalized Skills before the call, observes during, then proposes Skills tuned to the expert's style for collaborative refinement.",
    badge: "Prototype A",
  },
  {
    href: "/stories/right-panel",
    title: "Right Panel Chat",
    description:
      "An expert asks Shadow for help. Shadow offers to execute the Skill on their behalf — with a full preview and expert approval before anything happens.",
    badge: "Prototype B",
  },
  {
    href: "/stories/session-skill",
    title: "Session → Skill Creation",
    description:
      "An expert reviews a captured session, filters to the actions that matter, and generates a reusable Skill with one click.",
    badge: "Prototype C",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-surface px-4 text-center">
        <span className="mb-6 inline-block rounded-full bg-accent-light px-4 py-1.5 text-sm font-medium text-accent">
          Interactive PRD
        </span>
        <h1 className="mb-2 text-6xl font-bold tracking-tight">
          {hero.headline}
        </h1>
        <p className="mb-4 text-2xl font-semibold text-accent">
          {hero.subline}
        </p>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted">
          {hero.description}
        </p>
        <div className="flex gap-4">
          <Link
            href="/background"
            className="rounded-lg bg-accent px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Read the PRD
          </Link>
          <Link
            href="/day-in-the-life"
            className="rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-accent-light"
          >
            See a Day in the Life
          </Link>
        </div>
      </div>

      {/* Analogy table */}
      <div className="border-t border-border bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-accent">
            The Analogy
          </h2>
          <p className="mb-8 text-center text-2xl font-bold tracking-tight">
            If Cursor is for Developers, Shadow is for Experts
          </p>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-2 bg-zinc-50 text-sm font-semibold text-zinc-600">
              <div className="border-b border-r border-border px-4 py-3">Cursor (Developers)</div>
              <div className="border-b border-border px-4 py-3">Shadow (Intuit Experts)</div>
            </div>
            {hero.analogy.map((row, i) => (
              <div key={i} className="grid grid-cols-2 text-sm">
                <div className={`border-r border-border px-4 py-2.5 text-zinc-500 ${i < hero.analogy.length - 1 ? "border-b" : ""}`}>
                  {row.cursor}
                </div>
                <div className={`px-4 py-2.5 font-medium text-zinc-800 ${i < hero.analogy.length - 1 ? "border-b border-border" : ""}`}>
                  {row.shadow}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prototypes */}
      <div className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-accent">
          User Stories & Prototypes
        </h2>
        <p className="mb-12 text-center text-3xl font-bold tracking-tight">
          Key Experiences
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.href}
              href={story.href}
              className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent hover:shadow-lg"
            >
              <span className="mb-3 inline-block rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">
                {story.badge}
              </span>
              <h3 className="mb-2 text-lg font-semibold group-hover:text-accent">
                {story.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {story.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom nav grid */}
      <div className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-16 md:grid-cols-4 lg:grid-cols-7">
          {[
            { href: "/background", label: "Background", desc: "Problem & how Shadow works" },
            { href: "/metrics", label: "Goals & Pilot", desc: "What we're proving" },
            { href: "/scope", label: "Scope", desc: "Chrome ext. vs Desktop" },
            { href: "/components", label: "Components", desc: "UI specs & interactions" },
            { href: "/day-in-the-life", label: "Day in the Life", desc: "Full expert shift" },
            { href: "/principles", label: "Principles", desc: "Privacy & trust" },
            { href: "/technical", label: "Technical", desc: "Architecture & APIs" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg border border-border p-4 transition-all hover:border-accent hover:shadow-md"
            >
              <h4 className="mb-1 text-sm font-semibold group-hover:text-accent">
                {item.label}
              </h4>
              <p className="text-xs text-muted">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
