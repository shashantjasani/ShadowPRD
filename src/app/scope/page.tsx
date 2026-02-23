"use client";

import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import EditableText from "@/components/layout/EditableText";
import { scope } from "@/data/content";

export default function ScopePage() {
  return (
    <>
      <PageHeader
        title="Product Scope"
        description="Two clients, one product. How the Chrome extension and desktop client divide the work."
        badge="Section 2"
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EditBanner filePath="src/data/content.ts → scope" />
        <EditableText
          contentKey="scope.intro"
          original={scope.intro}
          className="mb-12 text-lg leading-relaxed text-muted"
        />

        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-accent bg-surface p-6">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
              Browser
            </div>
            <h3 className="mb-2 text-xl font-bold">
              {scope.chromeExtension.name}
            </h3>
            <EditableText
              contentKey="scope.chromeExtension.owns"
              original={scope.chromeExtension.owns}
              className="mb-4 text-sm text-muted"
            />
            <ul className="space-y-2">
              {scope.chromeExtension.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-1 shrink-0 text-accent">&#8226;</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
              Desktop
            </div>
            <h3 className="mb-2 text-xl font-bold">
              {scope.desktopClient.name}
            </h3>
            <EditableText
              contentKey="scope.desktopClient.owns"
              original={scope.desktopClient.owns}
              className="mb-4 text-sm text-muted"
            />
            <ul className="space-y-2">
              {scope.desktopClient.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-1 shrink-0 text-muted">&#8226;</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-12 rounded-lg border border-accent-light bg-accent-light/30 p-5">
          <h3 className="mb-1 font-semibold text-accent">
            Lock-Step Principle
          </h3>
          <EditableText
            contentKey="scope.lockStep"
            original={scope.lockStep}
            className="text-sm leading-relaxed"
          />
        </div>

        <h3 className="mb-4 text-xl font-bold">Capability Matrix</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left font-semibold">
                  Capability
                </th>
                <th className="px-4 py-3 text-center font-semibold">Chrome</th>
                <th className="px-4 py-3 text-center font-semibold">
                  Desktop
                </th>
              </tr>
            </thead>
            <tbody>
              {scope.matrix.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i % 2 === 0 ? "bg-surface" : "bg-background"
                  }
                >
                  <td className="px-4 py-2.5">
                    {row.capability}
                    {row.note && (
                      <span className="ml-2 text-xs text-muted">
                        ({row.note})
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {row.chrome ? (
                      <span className="text-success">&#10003;</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {row.desktop ? (
                      <span className="text-success">&#10003;</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
