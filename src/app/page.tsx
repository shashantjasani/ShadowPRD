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
      "An agent opens the Shadow panel on any page and asks for help. Shadow finds the right Skill and walks them through it step by step.",
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
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-surface px-4 text-center">
        <span className="mb-6 inline-block rounded-full bg-accent-light px-4 py-1.5 text-sm font-medium text-accent">
          Interactive PRD
        </span>
        <h1 className="mb-4 text-6xl font-bold tracking-tight">
          {hero.headline}
        </h1>
        <p className="mb-2 text-2xl font-medium text-muted">
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
            href="/stories/expert-flow"
            className="rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-accent-light"
          >
            See the Prototypes
          </Link>
        </div>
      </div>

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

      <div className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-16 md:grid-cols-5">
          {[
            { href: "/background", label: "Background", desc: "Problem, what Shadow is, how it works" },
            { href: "/metrics", label: "Goals & Pilot", desc: "What we're trying to achieve" },
            { href: "/scope", label: "Product Scope", desc: "Chrome ext. vs Desktop client" },
            { href: "/principles", label: "Principles", desc: "Privacy, trust, constraints" },
            { href: "/technical", label: "Technical Specs", desc: "Architecture, API, data models" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg border border-border p-5 transition-all hover:border-accent hover:shadow-md"
            >
              <h4 className="mb-1 font-semibold group-hover:text-accent">
                {item.label}
              </h4>
              <p className="text-sm text-muted">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
