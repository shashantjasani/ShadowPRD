"use client";

import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import EditableText from "@/components/layout/EditableText";
import { principles } from "@/data/content";

export default function PrinciplesPage() {
  return (
    <>
      <PageHeader
        title="Principles & Constraints"
        description="What Shadow is not, how we handle privacy, and the rules we follow."
        badge="Section 5"
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EditBanner filePath="src/data/content.ts → principles" />
        <div className="mb-14">
          <h2 className="mb-6 text-2xl font-bold">What Shadow Is Not</h2>
          <div className="space-y-4">
            {principles.notList.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <span className="font-semibold">{item.bold}</span>{" "}
                <EditableText
                  contentKey={`principles.notList.${i}.rest`}
                  original={item.rest}
                  as="span"
                  className="text-muted"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h2 className="mb-6 text-2xl font-bold">Privacy & Trust</h2>
          <ul className="space-y-3">
            {principles.privacy.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed"
              >
                <span className="mt-0.5 shrink-0 text-success">&#10003;</span>
                <EditableText
                  contentKey={`principles.privacy.${i}`}
                  original={item}
                  as="span"
                  className=""
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold">Constraints</h2>
          <ul className="space-y-3">
            {principles.constraints.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4 text-sm leading-relaxed"
              >
                <span className="mt-0.5 shrink-0 text-warning">!</span>
                <EditableText
                  contentKey={`principles.constraints.${i}`}
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
