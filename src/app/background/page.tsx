"use client";

import PageHeader from "@/components/layout/PageHeader";
import EditableText from "@/components/layout/EditableText";
import EditableParagraphs from "@/components/layout/EditableParagraphs";
import { background } from "@/data/content";

export default function BackgroundPage() {
  return (
    <>
      <PageHeader
        title="Background"
        description="What Shadow is, the problem it solves, and how it works."
        badge="Section 1"
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-14">
          <h2 className="mb-4 text-2xl font-bold">The Problem</h2>
          <EditableParagraphs
            contentKey="background.problem"
            original={background.problem}
          />
        </div>

        <div className="mb-14">
          <h2 className="mb-4 text-2xl font-bold">What Is Shadow?</h2>
          <EditableParagraphs
            contentKey="background.whatIsShadow"
            original={background.whatIsShadow}
          />
        </div>

        <div className="mb-14">
          <h2 className="mb-6 text-2xl font-bold">
            How It Works: Capture → Interpret → Serve Up
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {background.howItWorks.map((stage, i) => (
              <div
                key={stage.stage}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold">{stage.stage}</h3>
                </div>
                <EditableText
                  contentKey={`background.howItWorks.${stage.stage}`}
                  original={stage.description}
                  className="text-sm leading-relaxed text-muted"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h2 className="mb-4 text-2xl font-bold">
            Enterprise Context & Memory Service
          </h2>
          <EditableText
            contentKey="background.contextMemory.intro"
            original={background.contextMemory.intro}
            className="mb-6 text-lg leading-relaxed text-muted"
            multiline
          />

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            {background.contextMemory.whatItProvides.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border p-5"
              >
                <h4 className="mb-1.5 font-semibold">{item.label}</h4>
                <EditableText
                  contentKey={`background.contextMemory.${item.label}`}
                  original={item.detail}
                  className="text-sm leading-relaxed text-muted"
                  multiline
                />
              </div>
            ))}
          </div>

          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50/30 p-5">
            <h4 className="mb-2 font-semibold text-blue-700">
              How Shadow Integrates
            </h4>
            <EditableText
              contentKey="background.contextMemory.howShadowIntegrates"
              original={background.contextMemory.howShadowIntegrates}
              className="text-sm leading-relaxed"
              multiline
            />
          </div>
        </div>

        <div className="mb-14">
          <h2 className="mb-4 text-2xl font-bold">
            Personalization & Expert Memory
          </h2>
          <EditableText
            contentKey="background.personalization.intro"
            original={background.personalization.intro}
            className="mb-6 text-lg leading-relaxed text-muted"
            multiline
          />

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            {background.personalization.howItLearns.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border p-5"
              >
                <h4 className="mb-1.5 font-semibold">{item.label}</h4>
                <EditableText
                  contentKey={`background.personalization.howItLearns.${item.label}`}
                  original={item.detail}
                  className="text-sm leading-relaxed text-muted"
                  multiline
                />
              </div>
            ))}
          </div>

          <div className="mb-5 rounded-lg border border-accent-light bg-accent-light/20 p-5">
            <h4 className="mb-2 font-semibold text-accent">Expert Profile</h4>
            <EditableText
              contentKey="background.personalization.expertMemory"
              original={background.personalization.expertMemory}
              className="text-sm leading-relaxed"
              multiline
            />
          </div>

          <div className="mb-5">
            <h4 className="mb-2 font-semibold">Personalized Skills</h4>
            <EditableText
              contentKey="background.personalization.personalizedSkills"
              original={background.personalization.personalizedSkills}
              className="text-sm leading-relaxed text-muted"
              multiline
            />
          </div>

          <div className="mb-5">
            <h4 className="mb-2 font-semibold">Path to AI Twin</h4>
            <EditableText
              contentKey="background.personalization.aiTwinPath"
              original={background.personalization.aiTwinPath}
              className="text-sm leading-relaxed text-muted"
              multiline
            />
          </div>

          <div className="rounded-lg border-l-4 border-accent bg-surface p-5">
            <h4 className="mb-2 font-semibold text-accent">
              Chrome Extension: Immediate Value
            </h4>
            <EditableText
              contentKey="background.personalization.phase1Value"
              original={background.personalization.phase1Value}
              className="text-sm leading-relaxed"
              multiline
            />
          </div>
        </div>

        <div className="mb-14 rounded-lg border border-accent-light bg-accent-light/20 p-5">
          <h3 className="mb-2 font-semibold text-accent">
            Connection to AI x HI Platform
          </h3>
          <EditableText
            contentKey="background.platformConnection"
            original={background.platformConnection}
            className="text-sm leading-relaxed"
            multiline
          />
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold">Who It Helps</h2>
          <div className="space-y-4">
            {background.valueProps.map((vp) => (
              <div
                key={vp.role}
                className="rounded-lg border border-border p-5"
              >
                <h3 className="mb-2 font-semibold text-accent">{vp.role}</h3>
                <EditableText
                  contentKey={`background.valueProps.${vp.role}`}
                  original={vp.benefit}
                  className="text-sm leading-relaxed text-muted"
                  multiline
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
