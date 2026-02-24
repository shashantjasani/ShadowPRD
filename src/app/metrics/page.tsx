"use client";

import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import EditableText from "@/components/layout/EditableText";
import EditableBulletList from "@/components/layout/EditableBulletList";
import { metrics } from "@/data/content";

export default function MetricsPage() {
  return (
    <>
      <PageHeader
        title="Goals & Pilot"
        description="What we're trying to achieve and how we'll know it's working."
        badge="Section 2"
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EditBanner filePath="src/data/content.ts → metrics" />

        <div className="mb-14 space-y-8">
          {metrics.goals.map((goal, i) => (
            <div
              key={goal.id}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                Goal {i + 1}
              </div>
              <h2 className="mb-3 text-xl font-bold">{goal.title}</h2>
              <EditableText
                contentKey={`metrics.goals.${goal.id}.description`}
                original={goal.description}
                className="mb-4 leading-relaxed text-muted"
                multiline
              />
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                How we&apos;ll measure it
              </div>
              <ul className="space-y-1.5">
                {goal.signals.map((signal, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm leading-relaxed"
                  >
                    <span className="mt-0.5 shrink-0 text-accent">&#8226;</span>
                    <EditableText
                      contentKey={`metrics.goals.${goal.id}.signals.${j}`}
                      original={signal}
                      as="span"
                      className=""
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-14">
          <h2 className="mb-4 text-xl font-bold">Reference Expert Panel</h2>
          <EditableText
            contentKey="metrics.referenceExperts.intro"
            original={metrics.referenceExperts.intro}
            className="mb-6 leading-relaxed text-muted"
            multiline
          />

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
              Why this matters
            </h3>
            <EditableBulletList
              contentKey="metrics.referenceExperts.why"
              original={metrics.referenceExperts.why}
            />
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
              Panel composition (6–8 people)
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {metrics.referenceExperts.roles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-lg border border-border bg-surface p-4"
                >
                  <h4 className="mb-1 font-semibold text-sm">{role.title}</h4>
                  <EditableText
                    contentKey={`metrics.referenceExperts.roles.${role.title}`}
                    original={role.detail}
                    as="span"
                    className="text-xs leading-relaxed text-muted"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border-l-4 border-accent bg-surface p-5">
            <h4 className="mb-2 font-semibold text-accent">Cadence</h4>
            <EditableText
              contentKey="metrics.referenceExperts.cadence"
              original={metrics.referenceExperts.cadence}
              className="text-sm leading-relaxed"
              multiline
            />
          </div>
        </div>

        {/* Adoption Curve */}
        <div className="mb-14">
          <h2 className="mb-2 text-xl font-bold">Adoption Curve</h2>
          <p className="mb-6 text-sm text-muted leading-relaxed">
            Shadow&apos;s value compounds over time. Here&apos;s how the expert&apos;s experience evolves from first install to three months in.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {metrics.adoptionCurve.map((stage, i) => (
              <div
                key={stage.period}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {stage.period}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold">{stage.title}</h3>
                <EditableText
                  contentKey={`metrics.adoptionCurve.${i}.description`}
                  original={stage.description}
                  className="text-sm leading-relaxed text-muted"
                  multiline
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-surface p-5">
          <h3 className="mb-2 font-semibold">Pilot Scope</h3>
          <EditableText
            contentKey="metrics.pilotScope"
            original={metrics.pilotScope}
            className="text-sm leading-relaxed text-muted"
          />
        </div>

        <h2 className="mb-6 text-xl font-bold">Pilot Timeline</h2>
        <div className="mb-12 relative space-y-0">
          {metrics.pilotPhases.map((phase, i) => (
            <div key={i} className="flex gap-4 pb-6">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {i + 1}
                </div>
                {i < metrics.pilotPhases.length - 1 && (
                  <div className="mt-1 w-px grow bg-border" />
                )}
              </div>
              <EditableText
                contentKey={`metrics.pilotPhases.${i}`}
                original={phase}
                className="pt-1 text-sm leading-relaxed"
              />
            </div>
          ))}
        </div>

        {/* Where This Goes */}
        <div className="mb-14">
          <h2 className="mb-4 text-xl font-bold">Where This Goes</h2>
          <EditableText
            contentKey="metrics.whereThisGoes.intro"
            original={metrics.whereThisGoes.intro}
            className="mb-6 text-sm leading-relaxed text-muted"
            multiline
          />
          <div className="space-y-4">
            {metrics.whereThisGoes.items.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-dashed border-accent/30 bg-accent-light/10 p-5"
              >
                <h3 className="mb-2 font-semibold text-accent">{item.title}</h3>
                <EditableText
                  contentKey={`metrics.whereThisGoes.${item.title}`}
                  original={item.description}
                  className="text-sm leading-relaxed text-muted"
                  multiline
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">Not in Pilot</h2>
          <ul className="space-y-2">
            {metrics.notInPilot.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg border border-border bg-surface p-3 text-sm leading-relaxed text-muted"
              >
                <span className="mt-0.5 shrink-0">&#10005;</span>
                <EditableText
                  contentKey={`metrics.notInPilot.${i}`}
                  original={item}
                  as="span"
                  className=""
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
