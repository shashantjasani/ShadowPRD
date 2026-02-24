import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import { architecture, intelligencePipeline, eventSchema, apiEndpoints, dataModels } from "@/data/technical";

export default function TechnicalPage() {
  return (
    <>
      <PageHeader
        title="Technical Specifications"
        description="Architecture, API reference, event schema, and data models. This section is owned by engineering — edit freely."
        badge="Engineering"
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EditBanner filePath="src/data/technical.ts" />

        <div className="mb-6 rounded-lg border border-warning/30 bg-warning/5 p-4 text-sm">
          <span className="font-semibold">For engineers:</span> This section is
          a starting point. Replace or extend any part — architecture diagrams,
          API specs, data models — as the implementation evolves. The data lives
          in{" "}
          <code className="rounded bg-border/50 px-1 py-0.5 font-mono text-xs">
            src/data/technical.ts
          </code>{" "}
          and this page in{" "}
          <code className="rounded bg-border/50 px-1 py-0.5 font-mono text-xs">
            src/app/technical/page.tsx
          </code>
          . Treat it like a wiki.
        </div>

        {/* Architecture */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">Architecture Overview</h2>
          <p className="mb-6 leading-relaxed text-muted">
            {architecture.overview}
          </p>

          <div className="mb-8 overflow-hidden rounded-xl border border-border">
            <div className="bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
              System Layers
            </div>
            {architecture.layers.map((layer, i) => (
              <div
                key={layer.name}
                className={`border-t border-border p-4 ${
                  i % 2 === 0 ? "bg-surface" : "bg-background"
                }`}
              >
                <h3 className="mb-2 font-semibold">{layer.name}</h3>
                <ul className="space-y-1">
                  {layer.components.map((c, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm text-muted"
                    >
                      <span className="shrink-0 text-accent">&#8226;</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Diagram placeholder */}
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-background text-sm text-muted">
            <div className="text-center">
              <p className="font-medium">Architecture Diagram</p>
              <p className="mt-1 text-xs">
                Replace this with a C4 model, Mermaid diagram, or embedded image.
              </p>
              <p className="mt-1 text-xs">
                e.g.{" "}
                <code className="rounded bg-border/50 px-1 py-0.5 font-mono">
                  public/diagrams/architecture.svg
                </code>
              </p>
            </div>
          </div>
        </div>

        {/* Intelligence Pipeline */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">Shadow Intelligence Pipeline</h2>
          <p className="mb-6 leading-relaxed text-muted">
            {intelligencePipeline.description}
          </p>

          <div className="space-y-0">
            {intelligencePipeline.stages.map((stage, i) => (
              <div key={stage.name} className="relative">
                <div className="flex items-stretch gap-4">
                  {/* Step number + connector */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    {i < intelligencePipeline.stages.length - 1 && (
                      <div className="w-px flex-1 bg-accent/20" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-4 flex-1 rounded-lg border border-border bg-surface p-4">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold">{stage.name}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        stage.location.includes("Edge")
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {stage.location}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-muted leading-relaxed">{stage.description}</p>
                    <div className="text-xs text-zinc-500">
                      <span className="font-medium text-zinc-600">Output:</span> {stage.output}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Schema */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">Event Schema</h2>
          <p className="mb-6 leading-relaxed text-muted">
            {eventSchema.description}
          </p>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="px-4 py-2.5 text-left font-semibold">Field</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Type</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {eventSchema.fields.map((f, i) => (
                  <tr
                    key={f.name}
                    className={i % 2 === 0 ? "bg-surface" : "bg-background"}
                  >
                    <td className="px-4 py-2 font-mono text-xs text-accent">
                      {f.name}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs">{f.type}</td>
                    <td className="px-4 py-2 text-muted">{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Models */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">Data Models</h2>
          <div className="space-y-6">
            {dataModels.map((model) => (
              <div
                key={model.name}
                className="overflow-hidden rounded-lg border border-border"
              >
                <div className="border-b border-border bg-background px-4 py-2.5">
                  <span className="font-mono text-sm font-semibold text-accent">
                    {model.name}
                  </span>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {model.fields.map((f, i) => (
                      <tr
                        key={f.name}
                        className={`border-t border-border ${
                          i % 2 === 0 ? "bg-surface" : "bg-background"
                        }`}
                      >
                        <td className="w-1/4 px-4 py-2 font-mono text-xs text-accent">
                          {f.name}
                        </td>
                        <td className="px-4 py-2 font-mono text-xs text-muted">
                          {f.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        {/* API Reference */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
          <p className="mb-6 leading-relaxed text-muted">
            REST endpoints for the Shadow backend. All requests require an Intuit
            SSO bearer token. Replace with your actual OpenAPI/Swagger spec as it
            evolves.
          </p>

          <div className="space-y-6">
            {apiEndpoints.map((ep, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-border"
              >
                <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3">
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-xs font-bold text-white ${
                      ep.method === "GET"
                        ? "bg-blue-500"
                        : ep.method === "POST"
                          ? "bg-green-600"
                          : ep.method === "PUT"
                            ? "bg-orange-500"
                            : ep.method === "PATCH"
                              ? "bg-yellow-600"
                              : ep.method === "DELETE"
                                ? "bg-red-500"
                                : "bg-gray-500"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <code className="font-mono text-sm">{ep.path}</code>
                  <span className="ml-auto text-xs text-muted">
                    {ep.status}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <p className="mb-3 text-sm">{ep.summary}</p>

                  {ep.requestBody && (
                    <div className="mb-3">
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                        Request Body
                      </div>
                      <pre className="overflow-x-auto rounded-md bg-background p-3 font-mono text-xs leading-relaxed">
                        {ep.requestBody}
                      </pre>
                    </div>
                  )}

                  <div>
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                      Response
                    </div>
                    <pre className="overflow-x-auto rounded-md bg-background p-3 font-mono text-xs leading-relaxed">
                      {ep.responseBody}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extensibility note */}
        <div className="rounded-lg border border-dashed border-border bg-background p-6 text-center text-sm text-muted">
          <p className="font-medium">This section is intentionally extensible.</p>
          <p className="mt-1">
            Add sequence diagrams, deployment topology, infrastructure specs,
            auth flows, or anything else the engineering team needs. Data lives in{" "}
            <code className="rounded bg-border/50 px-1 py-0.5 font-mono text-xs">
              src/data/technical.ts
            </code>
            ; page layout in{" "}
            <code className="rounded bg-border/50 px-1 py-0.5 font-mono text-xs">
              src/app/technical/page.tsx
            </code>
            .
          </p>
        </div>
      </div>
    </>
  );
}
