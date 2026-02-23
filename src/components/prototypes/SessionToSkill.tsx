"use client";

import { useState, useEffect } from "react";
import { sampleSession, type EventType } from "@/data/sessions";

const eventColors: Record<EventType, string> = {
  click: "bg-red-500",
  type: "bg-green-500",
  hover: "bg-orange-400",
  navigate: "bg-blue-500",
  network: "bg-purple-500",
  scroll: "bg-gray-400",
};

const eventLabels: Record<EventType, string> = {
  click: "Click",
  type: "Type",
  hover: "Hover",
  navigate: "Navigate",
  network: "Network",
  scroll: "Scroll",
};

const generatedSkill = {
  name: "quickbooks-online-create-expense-transaction",
  description:
    "Create an expense transaction in QuickBooks Online, from login through saving the entry.",
  steps: [
    "Sign in to QuickBooks Online.",
    'Navigate to Expenses in the left menu.',
    'Click "New transaction" → "Expense".',
    "Enter the Payee name (e.g. Office Depot).",
    "Select the Payment account (e.g. Checking).",
    "Enter the Category (e.g. Office Supplies).",
    "Enter the Amount (e.g. $340.00).",
    "Add a Description (e.g. Monthly office supply order).",
    'Click "Save and close".',
  ],
};

export default function SessionToSkill() {
  const [filters, setFilters] = useState<Record<EventType, boolean>>({
    click: true,
    type: true,
    hover: false,
    navigate: true,
    network: false,
    scroll: false,
  });
  const [includeScreenshots, setIncludeScreenshots] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [skillGenerated, setSkillGenerated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editSteps, setEditSteps] = useState(generatedSkill.steps);

  const allTypes = Object.keys(
    sampleSession.events.reduce(
      (acc, e) => ({ ...acc, [e.type]: true }),
      {} as Record<string, boolean>
    )
  ) as EventType[];

  const typeCounts = sampleSession.events.reduce(
    (acc, e) => ({ ...acc, [e.type]: (acc[e.type] || 0) + 1 }),
    {} as Record<string, number>
  );

  const filteredEvents = sampleSession.events.filter((e) => filters[e.type]);

  const toggleFilter = (type: EventType) => {
    setFilters((f) => ({ ...f, [type]: !f[type] }));
  };

  const selectAll = () => {
    const newFilters = { ...filters };
    allTypes.forEach((t) => (newFilters[t] = true));
    setFilters(newFilters);
  };

  const selectNone = () => {
    const newFilters = { ...filters };
    allTypes.forEach((t) => (newFilters[t] = false));
    setFilters(newFilters);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setSkillGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setSkillGenerated(true);
    }, 2500);
  };

  useEffect(() => {
    setSkillGenerated(false);
    setGenerating(false);
    setEditing(false);
    setEditSteps(generatedSkill.steps);
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* Create Skill bar */}
      <div className="rounded-lg border border-accent bg-accent-light/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Create Skill</h3>
            <p className="text-sm text-muted">
              Generate an Agent Skill from the {filteredEvents.length} filtered
              actions below.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating || filteredEvents.length === 0}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Skill"}
          </button>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeScreenshots}
            onChange={(e) => setIncludeScreenshots(e.target.checked)}
            className="accent-accent"
          />
          Include screenshots{" "}
          <span className="text-xs text-muted">
            Lets the LLM reference captured screenshots when generating the
            skill
          </span>
        </label>
      </div>

      {/* Generating state */}
      {generating && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-surface py-12">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="font-medium">Analyzing session and creating skill...</p>
          <p className="text-sm text-muted">
            This may take a minute depending on the session complexity.
          </p>
        </div>
      )}

      {/* Generated skill */}
      {skillGenerated && !generating && (
        <div className="rounded-lg border border-success bg-success/5 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="mb-1 inline-block rounded bg-success/20 px-2 py-0.5 text-xs font-medium text-success">
                Generated
              </span>
              <h4 className="font-mono text-sm font-semibold">
                {generatedSkill.name}
              </h4>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent-light"
            >
              {editing ? "Done Editing" : "Edit Skill"}
            </button>
          </div>
          <p className="mb-3 text-sm text-muted">
            {generatedSkill.description}
          </p>
          {editing ? (
            <div className="space-y-2">
              {editSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-2 w-5 shrink-0 text-right text-xs text-muted">
                    {i + 1}.
                  </span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => {
                      const next = [...editSteps];
                      next[i] = e.target.value;
                      setEditSteps(next);
                    }}
                    className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
                  />
                </div>
              ))}
            </div>
          ) : (
            <ol className="space-y-1.5 pl-5 text-sm">
              {editSteps.map((step, i) => (
                <li key={i} className="list-decimal text-muted">
                  {step}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* Audio & Transcript */}
      {sampleSession.transcript && (
        <details className="rounded-lg border border-border bg-surface">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
            Audio & Transcript
          </summary>
          <div className="border-t border-border px-4 py-4">
            <div className="mb-3">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                Call Recording
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-background p-3">
                <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  &#9654;
                </button>
                <div className="h-1.5 flex-1 rounded-full bg-border">
                  <div className="h-1.5 w-1/3 rounded-full bg-accent" />
                </div>
                <span className="text-xs text-muted">
                  0:00 / {Math.floor(sampleSession.durationSeconds / 60)}:
                  {(sampleSession.durationSeconds % 60)
                    .toString()
                    .padStart(2, "0")}
                </span>
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                Transcript
              </div>
              <div className="rounded-lg bg-background p-3 text-sm leading-relaxed whitespace-pre-line text-muted">
                {sampleSession.transcript}
              </div>
            </div>
          </div>
        </details>
      )}

      {/* Filter events */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Filter Events
          </h3>
          <div className="flex gap-2 text-xs">
            <button
              onClick={selectAll}
              className="rounded border border-border px-2 py-1 transition-colors hover:bg-accent-light"
            >
              All
            </button>
            <button
              onClick={selectNone}
              className="rounded border border-border px-2 py-1 transition-colors hover:bg-accent-light"
            >
              None
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                filters[type]
                  ? "bg-foreground text-surface"
                  : "bg-background text-muted"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${eventColors[type]}`}
              />
              {eventLabels[type]} {typeCounts[type] || 0}
            </button>
          ))}
        </div>
      </div>

      {/* Session recording header */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider">
              Session Recording
            </h3>
            <p className="font-mono text-xs text-muted">
              {sampleSession.id}
            </p>
          </div>
          <div className="text-right text-lg font-bold text-accent">
            {Math.floor(sampleSession.durationSeconds / 60)}m{" "}
            {sampleSession.durationSeconds % 60}s
          </div>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-muted">
          <span>
            <span className="font-medium">Date:</span> {sampleSession.date}
          </span>
          <span>
            <span className="font-medium">Start:</span>{" "}
            {sampleSession.startTime}
          </span>
          <span>
            <span className="font-medium">End:</span> {sampleSession.endTime}
          </span>
          <span>
            <span className="font-medium">Total actions:</span>{" "}
            {sampleSession.totalActions}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Timeline
          </h3>
          <span className="text-xs text-muted">
            {filteredEvents.length} of {sampleSession.events.length} actions
          </span>
        </div>
        <div className="space-y-0">
          {filteredEvents.map((event, i) => (
            <div key={event.id} className="flex gap-3 pb-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                    eventColors[event.type]
                  }`}
                >
                  {event.type[0].toUpperCase()}
                </div>
                {i < filteredEvents.length - 1 && (
                  <div className="mt-1 w-px grow bg-border" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-muted">
                    {event.timestamp.toFixed(1)}s
                  </span>
                  <span className="rounded bg-background px-1.5 py-0.5 text-xs font-medium uppercase">
                    {eventLabels[event.type]}
                  </span>
                </div>
                <p className="mt-0.5 text-sm">{event.label}</p>
                {event.element && (
                  <p className="text-xs text-muted">
                    Element: <code className="text-accent">{event.element}</code>
                    {event.selector && (
                      <>
                        {" "}
                        &middot; Selector:{" "}
                        <code className="text-accent">{event.selector}</code>
                      </>
                    )}
                  </p>
                )}
                {event.text && (
                  <p className="text-xs text-muted">
                    Text: {event.text}
                  </p>
                )}
                {event.url && (
                  <p className="truncate text-xs text-muted">
                    URL: {event.url}
                  </p>
                )}
                {event.screenshotPlaceholder && includeScreenshots && (
                  <div className="mt-2 flex h-20 items-center justify-center rounded-md border border-dashed border-border bg-background text-xs text-muted">
                    Screenshot captured at this moment
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <p className="py-8 text-center text-sm text-muted">
            No events match the current filters.
          </p>
        )}
      </div>
    </div>
  );
}
