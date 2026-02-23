"use client";

import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import EditableText from "@/components/layout/EditableText";
import EditableBulletList from "@/components/layout/EditableBulletList";
import { componentSections } from "@/data/components";

function StatesList({ states }: { states: string[] }) {
  return (
    <div className="mt-1.5">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
        States
      </div>
      <div className="space-y-1">
        {states.map((state, i) => (
          <div
            key={i}
            className="flex gap-2 rounded bg-zinc-50 px-2 py-1 text-xs leading-relaxed"
          >
            <span className="mt-0.5 shrink-0 text-accent">&#9656;</span>
            <span className="text-zinc-600">{state}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        title="Component Specifications"
        description="Every UI component, interaction pattern, and guideline for the Chrome Extension — defined before the prototypes show how they come together."
        badge="Section 4"
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EditBanner filePath="src/data/components.ts" />

        <div className="mb-8 rounded-lg border border-accent-light bg-accent-light/20 p-5">
          <p className="text-sm leading-relaxed">
            This section specifies each component of Shadow&apos;s Chrome Extension UI — its purpose, states, and guidelines.
            The <strong>Prototypes</strong> that follow show how these components come together in real user flows.
          </p>
        </div>

        {componentSections.map((section) => (
          <div key={section.id} className="mb-16">
            {/* Section header */}
            <div className="mb-6 flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-lg font-bold text-white">
                {section.letter}
              </span>
              <div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <EditableText
                  contentKey={`components.${section.id}.description`}
                  original={section.description}
                  className="mt-1 leading-relaxed text-muted"
                  multiline
                />
              </div>
            </div>

            {/* Sub-sections */}
            {section.subSections.map((sub) => (
              <div key={sub.id} className="mb-10 ml-14">
                <h3 className="mb-2 text-lg font-semibold">{sub.title}</h3>
                <EditableText
                  contentKey={`components.${sub.id}.description`}
                  original={sub.description}
                  className="mb-4 text-sm leading-relaxed text-muted"
                  multiline
                />

                <div className="space-y-4">
                  {sub.specs.map((spec) => (
                    <div
                      key={spec.id}
                      className="rounded-lg border border-border bg-surface p-4"
                    >
                      <h4 className="mb-1 font-semibold text-sm">
                        {spec.name}
                      </h4>
                      <EditableText
                        contentKey={`components.${spec.id}.description`}
                        original={spec.description}
                        className="text-sm leading-relaxed text-muted"
                      />

                      {spec.states && spec.states.length > 0 && (
                        <StatesList states={spec.states} />
                      )}

                      {spec.guidelines && spec.guidelines.length > 0 && (
                        <div className="mt-2">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                            Guidelines
                          </div>
                          <EditableBulletList
                            contentKey={`components.${spec.id}.guidelines`}
                            original={spec.guidelines}
                            bulletColor="text-violet-400"
                            className="text-xs leading-relaxed text-zinc-600"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
