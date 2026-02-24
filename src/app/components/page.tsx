"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import EditableText from "@/components/layout/EditableText";
import EditableBulletList from "@/components/layout/EditableBulletList";
import { componentSections } from "@/data/components";

/* ═══════════════════════════════════════════════════
   Shared mockup chrome
   ═══════════════════════════════════════════════════ */

function MockRailFrame({
  children,
  activeTab,
  onTabChange,
  tabs = ["Record", "Chat", "Skills"],
  showTabs = true,
}: {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  tabs?: string[];
  showTabs?: boolean;
}) {
  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden text-[13px]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-[10px] font-bold text-white">
          S
        </span>
        <span className="font-semibold text-zinc-700">Shadow</span>
        <span className="ml-auto flex items-center gap-1 text-[11px] text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Connected
        </span>
      </div>
      {/* Tab bar */}
      {showTabs && (
        <div className="flex border-b border-zinc-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange?.(tab)}
              className={`flex-1 px-3 py-2 text-center text-[12px] font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-accent text-accent"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      {/* Body */}
      <div className="p-4">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Section A: Not Logged In
   ═══════════════════════════════════════════════════ */

function MockNotLoggedIn() {
  const [authState, setAuthState] = useState<"idle" | "loading" | "error">("idle");

  function handleSignIn() {
    setAuthState("loading");
    setTimeout(() => setAuthState("error"), 1800);
  }

  return (
    <MockRailFrame showTabs={false}>
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <span className="text-2xl text-accent font-bold">S</span>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-zinc-800">Welcome to Shadow</div>
          <div className="mt-1 text-[13px] text-zinc-500 leading-relaxed">
            Your AI assistant that learns how you work.
          </div>
        </div>

        <div className="w-full space-y-2 text-[13px]">
          {[
            { icon: "⚡", text: "Personalized Skills from your workflows" },
            { icon: "🎯", text: "Session capture & intelligent context" },
            { icon: "💬", text: "In-context chat assistance" },
            { icon: "🔄", text: "Automated wrap-up & follow-ups" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-2.5 rounded-lg bg-zinc-50 px-3 py-2">
              <span>{f.icon}</span>
              <span className="text-zinc-600">{f.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleSignIn}
          disabled={authState === "loading"}
          className="mt-2 w-full rounded-lg bg-accent px-4 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
        >
          {authState === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Signing in…
            </span>
          ) : (
            "Sign in with Intuit"
          )}
        </button>

        {authState === "error" && (
          <div className="w-full rounded-md bg-red-50 border border-red-200 px-3 py-2 text-[12px] text-red-600">
            Unable to authenticate. Please try again or check your network connection.
            <button
              onClick={() => setAuthState("idle")}
              className="ml-2 font-medium text-red-700 underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="mt-1 text-center text-[11px] text-zinc-400 leading-relaxed">
          Shadow only records when you start a session.
          <br />
          You review everything before it&apos;s shared.
        </div>
      </div>
    </MockRailFrame>
  );
}

/* ═══════════════════════════════════════════════════
   Section B: Record Tab
   ═══════════════════════════════════════════════════ */

function MockRecordTab() {
  const [recording, setRecording] = useState(false);
  const [captures, setCaptures] = useState({
    Clicks: true,
    Types: true,
    Scrolls: false,
    Hovers: false,
    Network: true,
    Screenshots: true,
  });
  const [triggers, setTriggers] = useState({
    Engagement: true,
    "IEP Login": false,
    "System Start-up": false,
  });
  const [showPastSessions, setShowPastSessions] = useState(false);

  return (
    <MockRailFrame activeTab="Record" tabs={["Record", "Chat", "Skills"]}>
      <div className="space-y-4">
        {/* Session control */}
        {recording ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-emerald-700">Recording Active</span>
                </div>
                <div className="mt-1 text-[12px] text-emerald-600">12:34 elapsed · 847 events</div>
              </div>
              <button
                onClick={() => setRecording(false)}
                className="rounded-lg bg-red-500 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-red-600 transition-colors"
              >
                End Session
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setRecording(true)}
            className="w-full rounded-lg bg-emerald-500 px-4 py-3 text-[14px] font-semibold text-white hover:bg-emerald-600 transition-colors"
          >
            ⏺ Start Recording
          </button>
        )}

        {/* Capture settings */}
        <div>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Capture Settings
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.entries(captures).map(([key, on]) => (
              <button
                key={key}
                onClick={() => setCaptures((c) => ({ ...c, [key]: !c[key as keyof typeof c] }))}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-[12px] transition-colors ${
                  on
                    ? "bg-accent/10 text-accent font-medium border border-accent/20"
                    : "bg-zinc-50 text-zinc-400 border border-transparent hover:border-zinc-200"
                }`}
              >
                <span>{key}</span>
                <span className={`text-[11px] ${on ? "text-accent" : "text-zinc-300"}`}>
                  {on ? "✓" : "○"}
                </span>
              </button>
            ))}
          </div>
          <button className="mt-1.5 text-[11px] text-accent hover:underline">
            + Full Desktop Capture settings
          </button>
        </div>

        {/* Auto-triggers */}
        <div>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Auto-Triggers
          </div>
          <div className="space-y-1.5">
            {Object.entries(triggers).map(([key, on]) => (
              <div key={key} className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
                <span className="text-[12px] text-zinc-600">{key}</span>
                <button
                  onClick={() => setTriggers((t) => ({ ...t, [key]: !t[key as keyof typeof t] }))}
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    on ? "bg-accent" : "bg-zinc-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      on ? "left-[18px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Past sessions */}
        <div>
          <button
            onClick={() => setShowPastSessions((v) => !v)}
            className="mb-2 flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            <span>Past Sessions</span>
            <svg
              className={`h-3.5 w-3.5 transition-transform ${showPastSessions ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showPastSessions && (
            <div className="space-y-1.5">
              {[
                { d: "Today, 2:15 PM", dur: "8m 32s", events: 624, reviewed: false },
                { d: "Today, 10:01 AM", dur: "3m 12s", events: 218, reviewed: true },
                { d: "Yesterday, 4:45 PM", dur: "14m 08s", events: 1203, reviewed: true },
              ].map((s) => (
                <div key={s.d} className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 hover:border-accent/40 transition-colors cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2 text-[12px] font-medium text-zinc-700">
                      {s.d}
                      {!s.reviewed && (
                        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-400">{s.dur} · {s.events} events</div>
                  </div>
                  <span className="text-accent">→</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MockRailFrame>
  );
}

/* ═══════════════════════════════════════════════════
   Section C: Chat Tab
   ═══════════════════════════════════════════════════ */

function MockChatTab() {
  const [mode, setMode] = useState<"Plan" | "Agent">("Agent");
  const [messages, setMessages] = useState([
    { role: "user" as const, text: "How do I reconcile a bank account in QBO?" },
    { role: "shadow" as const, text: "I found a Skill for that: qbo-reconcile-account. It has 6 steps. Want me to walk you through it, or execute it for you?" },
  ]);
  const [showExecution, setShowExecution] = useState(false);
  const [executionState, setExecutionState] = useState<"preview" | "approved" | null>(null);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    if (text.toLowerCase().includes("execute") || text.toLowerCase().includes("run") || text.toLowerCase().includes("do it")) {
      setTimeout(() => {
        setShowExecution(true);
        setExecutionState("preview");
      }, 400);
    } else {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "shadow", text: "Got it! Let me know if you want me to execute the skill or walk through it step by step." }]);
      }, 600);
    }
  }

  function handleApprove() {
    setExecutionState("approved");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "shadow", text: "✅ Skill executed successfully. The reconciliation is complete — 12 transactions matched, 0 discrepancies." }]);
      setShowExecution(false);
    }, 1200);
  }

  return (
    <MockRailFrame activeTab="Chat" tabs={["Record", "Chat", "Skills"]}>
      <div className="space-y-3">
        {/* Mode selector */}
        <div className="flex rounded-lg border border-zinc-200 overflow-hidden">
          {(["Plan", "Agent"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 px-3 py-2 text-[12px] font-medium transition-colors ${
                mode === m
                  ? "bg-accent/10 text-accent"
                  : "bg-zinc-50 text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {m} Mode
            </button>
          ))}
        </div>
        <div className="text-[11px] text-zinc-400 leading-relaxed">
          {mode === "Plan"
            ? "Shadow will explain steps but won't execute actions."
            : "Shadow can execute Skills on your behalf — with your approval."}
        </div>

        {/* Chat messages */}
        <div className="space-y-2.5 max-h-[280px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-[12px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent text-white rounded-br-sm"
                    : "bg-zinc-100 text-zinc-700 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Skill execution preview */}
          {showExecution && mode === "Agent" && (
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-2">
                Skill Execution Preview
              </div>
              <div className="text-[13px] font-semibold text-zinc-800 mb-2">qbo-reconcile-account</div>
              <div className="space-y-1 mb-3">
                {[
                  { field: "Account", value: "Business Checking (****4521)" },
                  { field: "Period", value: "Jan 1 – Jan 31, 2026" },
                  { field: "Match method", value: "Auto-match by amount + date" },
                ].map((f) => (
                  <div key={f.field} className="flex justify-between rounded bg-white px-2 py-1 text-[11px]">
                    <span className="text-zinc-500">{f.field}</span>
                    <span className="font-medium text-zinc-700">{f.value}</span>
                  </div>
                ))}
              </div>
              {executionState === "preview" ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleApprove}
                    className="flex-1 rounded-lg bg-emerald-500 py-1.5 text-[12px] font-semibold text-white hover:bg-emerald-600"
                  >
                    Approve & Execute
                  </button>
                  <button className="flex-1 rounded-lg bg-white border border-zinc-200 py-1.5 text-[12px] font-medium text-zinc-600 hover:bg-zinc-50">
                    Review & Edit
                  </button>
                  <button
                    onClick={() => setShowExecution(false)}
                    className="rounded-lg bg-white border border-zinc-200 px-3 py-1.5 text-[12px] text-zinc-400 hover:bg-zinc-50"
                  >
                    Skip
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[12px] text-emerald-600 font-medium">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600" />
                  Executing…
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
          <button className="text-zinc-300 hover:text-zinc-500 transition-colors text-lg">📎</button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Shadow anything…"
            className="flex-1 text-[13px] outline-none placeholder:text-zinc-400"
          />
          <button
            onClick={handleSend}
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
              input.trim() ? "bg-accent text-white" : "bg-zinc-100 text-zinc-300"
            }`}
          >
            ↑
          </button>
        </div>
      </div>
    </MockRailFrame>
  );
}

/* ═══════════════════════════════════════════════════
   Section D: Skills Tab
   ═══════════════════════════════════════════════════ */

type StepTag = "core" | "yours";

interface SkillStep {
  label: string;
  tag: StepTag;
}

interface MockSkill {
  name: string;
  description: string;
  steps: SkillStep[];
  imports?: string;
  optional?: string;
}

const mockSkills: MockSkill[] = [
  {
    name: "qbo-reconcile-account",
    description: "Reconcile a bank account in QuickBooks Online",
    steps: [
      { label: "Navigate to Bookkeeping → Reconcile", tag: "core" },
      { label: "Select bank account from dropdown", tag: "core" },
      { label: "Start with largest discrepancies first", tag: "yours" },
      { label: "Match transactions by amount + date", tag: "core" },
      { label: "Add personal note: 'Reviewed by [name]'", tag: "yours" },
      { label: "Click 'Finish reconciliation'", tag: "core" },
    ],
    imports: "qbo-navigate-to-bookkeeping",
    optional: "qbo-generate-reconciliation-report",
  },
  {
    name: "qbo-create-expense",
    description: "Create an expense transaction in QBO",
    steps: [
      { label: "Go to Expenses (left menu)", tag: "core" },
      { label: "Click 'New transaction' → Expense", tag: "core" },
      { label: "Enter Payee, Payment method, Date", tag: "core" },
      { label: "Use keyboard shortcut Cmd+S to save", tag: "yours" },
    ],
    optional: "qbo-attach-receipt",
  },
];

function MockSkillsTab() {
  const [view, setView] = useState<"list" | "workflow">("list");
  const [filter, setFilter] = useState<"all" | "mine" | "shared">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [stepFilter, setStepFilter] = useState<"all" | "core" | "yours">("all");
  const [search, setSearch] = useState("");

  const filtered = mockSkills.filter(
    (s) => !search || s.name.includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MockRailFrame activeTab="Skills" tabs={["Record", "Chat", "Skills"]}>
      <div className="space-y-3">
        {/* Stats */}
        <div className="flex gap-4 text-[12px]">
          <span className="text-zinc-600"><strong className="text-accent">12</strong> Skills</span>
          <span className="text-zinc-600"><strong className="text-amber-500">8</strong> w/ personal steps</span>
          <span className="text-zinc-600"><strong className="text-emerald-500">3</strong> Shared</span>
        </div>

        {/* View toggle: List vs Workflow */}
        <div className="flex rounded-lg border border-zinc-200 overflow-hidden">
          <button
            onClick={() => setView("list")}
            className={`flex-1 px-3 py-1.5 text-[11px] font-medium transition-colors ${
              view === "list" ? "bg-accent/10 text-accent" : "bg-zinc-50 text-zinc-400"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView("workflow")}
            className={`flex-1 px-3 py-1.5 text-[11px] font-medium transition-colors border-l border-zinc-200 ${
              view === "workflow" ? "bg-accent/10 text-accent" : "bg-zinc-50 text-zinc-400"
            }`}
          >
            Workflow View
          </button>
        </div>

        {/* Workflow view */}
        {view === "workflow" && (
          <div className="space-y-3">
            <div className="text-[11px] text-zinc-500 leading-relaxed">
              Shows how Skills chain together for a complete customer workflow.
            </div>

            {/* Workflow: Reconciliation */}
            <div className="rounded-xl border border-zinc-200 p-3">
              <div className="mb-2 text-[12px] font-semibold text-zinc-700">Reconciliation Workflow</div>
              <div className="space-y-0">
                {[
                  { name: "qbo-navigate-to-bookkeeping", type: "imported", relation: "Required first" },
                  { name: "qbo-reconcile-account", type: "primary", relation: "Primary Skill" },
                  { name: "qbo-resolve-discrepancy", type: "conditional", relation: "If discrepancy found" },
                  { name: "qbo-generate-reconciliation-report", type: "optional", relation: "Optional follow-up" },
                ].map((node, i, arr) => (
                  <div key={node.name}>
                    <div className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] ${
                      node.type === "primary"
                        ? "bg-accent/10 border border-accent/20"
                        : node.type === "imported"
                          ? "bg-blue-50 border border-blue-200"
                          : node.type === "conditional"
                            ? "bg-amber-50 border border-amber-200"
                            : "bg-zinc-50 border border-zinc-200 border-dashed"
                    }`}>
                      <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                        node.type === "primary" ? "bg-accent text-white"
                          : node.type === "imported" ? "bg-blue-500 text-white"
                            : node.type === "conditional" ? "bg-amber-500 text-white"
                              : "bg-zinc-400 text-white"
                      }`}>
                        {node.type === "primary" ? "▶" : node.type === "imported" ? "↓" : node.type === "conditional" ? "?" : "○"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-zinc-700 truncate">{node.name}</div>
                        <div className="text-[10px] text-zinc-400">{node.relation}</div>
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <div className="h-3 w-px bg-zinc-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow: Expense */}
            <div className="rounded-xl border border-zinc-200 p-3">
              <div className="mb-2 text-[12px] font-semibold text-zinc-700">Expense Workflow</div>
              <div className="space-y-0">
                {[
                  { name: "qbo-create-expense", type: "primary", relation: "Primary Skill" },
                  { name: "qbo-attach-receipt", type: "optional", relation: "Optional: attach receipt image" },
                  { name: "qbo-categorize-expense", type: "optional", relation: "Optional: re-categorize" },
                ].map((node, i, arr) => (
                  <div key={node.name}>
                    <div className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] ${
                      node.type === "primary"
                        ? "bg-accent/10 border border-accent/20"
                        : "bg-zinc-50 border border-zinc-200 border-dashed"
                    }`}>
                      <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                        node.type === "primary" ? "bg-accent text-white" : "bg-zinc-400 text-white"
                      }`}>
                        {node.type === "primary" ? "▶" : "○"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-zinc-700 truncate">{node.name}</div>
                        <div className="text-[10px] text-zinc-400">{node.relation}</div>
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <div className="h-3 w-px bg-zinc-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-zinc-400 leading-relaxed">
              <strong className="text-blue-500">■</strong> Imported (required) &nbsp;
              <strong className="text-accent">■</strong> Primary &nbsp;
              <strong className="text-amber-500">■</strong> Conditional &nbsp;
              <strong className="text-zinc-400">■</strong> Optional
            </div>
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <>
            {/* Filter tabs */}
            <div className="flex gap-1 rounded-lg bg-zinc-100 p-0.5">
              {([["all", "All"], ["mine", "Mine"], ["shared", "Shared"]] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`flex-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                    filter === key ? "bg-white text-zinc-700 shadow-sm" : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-1.5">
              <span className="text-zinc-300">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills…"
                className="flex-1 text-[12px] outline-none placeholder:text-zinc-400"
              />
            </div>
          </>
        )}

        {view === "list" && (
        <div className="space-y-2">
          {filtered.map((skill) => {
            const isExpanded = expanded === skill.name;
            const coreCount = skill.steps.filter((s) => s.tag === "core").length;
            const personalCount = skill.steps.filter((s) => s.tag === "yours").length;
            const visibleSteps =
              stepFilter === "all"
                ? skill.steps
                : skill.steps.filter((s) => s.tag === stepFilter);

            return (
              <div key={skill.name} className="rounded-xl border border-zinc-200 overflow-hidden">
                {/* Card header */}
                <button
                  onClick={() => { setExpanded(isExpanded ? null : skill.name); setStepFilter("all"); }}
                  className="w-full px-3 py-2.5 text-left hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[13px] text-zinc-800">{skill.name}</span>
                    <svg
                      className={`h-4 w-4 text-zinc-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="text-[12px] text-zinc-500 mt-0.5">{skill.description}</div>
                  <div className="mt-1.5 flex gap-2 text-[10px]">
                    <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-500 font-medium">
                      {coreCount} core
                    </span>
                    {personalCount > 0 && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-600 font-medium">
                        {personalCount} yours
                      </span>
                    )}
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-zinc-100 px-3 py-3 bg-zinc-50/50">
                    {/* Step filter */}
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mr-1">Show:</span>
                      {([["all", "All steps"], ["core", "Core only"], ["yours", "My additions"]] as const).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setStepFilter(key)}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                            stepFilter === key
                              ? key === "yours" ? "bg-amber-100 text-amber-700" : "bg-accent/10 text-accent"
                              : "bg-zinc-100 text-zinc-400 hover:text-zinc-600"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Steps */}
                    <div className="space-y-1">
                      {visibleSteps.map((step, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-[12px] ${
                            step.tag === "yours"
                              ? "bg-amber-50 border-l-2 border-amber-400"
                              : "bg-white border-l-2 border-zinc-200"
                          }`}
                        >
                          <span className="mt-0.5 text-[10px] text-zinc-400 shrink-0 w-4 text-right">{i + 1}.</span>
                          <span className="flex-1 text-zinc-700">{step.label}</span>
                          <span
                            className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                              step.tag === "yours"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-zinc-100 text-zinc-500"
                            }`}
                          >
                            {step.tag === "yours" ? "Yours" : "Core"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Related skills */}
                    {(skill.imports || skill.optional) && (
                      <div className="mt-3 space-y-1 text-[11px]">
                        {skill.imports && (
                          <div className="flex items-center gap-1.5 text-zinc-500">
                            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-blue-600 font-medium text-[10px]">Imports</span>
                            <span className="text-zinc-600">{skill.imports}</span>
                          </div>
                        )}
                        {skill.optional && (
                          <div className="flex items-center gap-1.5 text-zinc-500">
                            <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-500 font-medium text-[10px]">Optional</span>
                            <span className="text-zinc-600">{skill.optional}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-3 flex gap-2">
                      <button className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-50">
                        Edit
                      </button>
                      <button className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-red-500 hover:bg-red-50">
                        Delete
                      </button>
                      <button className="ml-auto rounded-lg bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent hover:bg-accent/20">
                        Propose for Intuit ↗
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        )}
      </div>
    </MockRailFrame>
  );
}

/* ═══════════════════════════════════════════════════
   Mockup map & States list helper
   ═══════════════════════════════════════════════════ */

function MockInlineSuggestions() {
  const [nudgeVisible, setNudgeVisible] = useState(true);
  const [pulseClicked, setPulseClicked] = useState(false);

  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden text-[13px]">
      {/* Simulated page header */}
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2">
        <span className="text-[11px] text-zinc-400">qbo.intuit.com/app/reconcile</span>
        <span className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => setPulseClicked(!pulseClicked)}
            className="relative flex h-6 w-6 items-center justify-center rounded bg-accent text-[9px] font-bold text-white"
          >
            S
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse border border-white" />
          </button>
        </span>
      </div>

      <div className="relative p-4">
        {/* Simulated page content */}
        <div className="space-y-3">
          <div className="text-[14px] font-semibold text-zinc-800">Reconcile — Business Checking</div>
          <div className="flex gap-3 text-[11px] text-zinc-500">
            <span>Period: Jan 1 – Jan 31</span>
            <span>Statement balance: $24,817.50</span>
          </div>
          <div className="rounded-lg border border-zinc-200 p-2.5">
            <div className="mb-1.5 text-[11px] font-medium text-zinc-600">Transactions to match (14)</div>
            <div className="space-y-1">
              {[
                { desc: "Office Supplies Co.", amt: "$247.00", status: "unmatched" },
                { desc: "Cloud Software Inc.", amt: "$89.99", status: "matched" },
                { desc: "Business Insurance", amt: "$1,200.00", status: "unmatched" },
              ].map((tx) => (
                <div key={tx.desc} className="flex items-center justify-between rounded bg-zinc-50 px-2 py-1 text-[11px]">
                  <span className="text-zinc-600">{tx.desc}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-700 font-medium">{tx.amt}</span>
                    <span className={`rounded px-1 py-0.5 text-[9px] font-medium ${
                      tx.status === "matched" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inline nudge — floating overlay */}
          {nudgeVisible && (
            <div className="absolute right-3 top-[90px] w-[220px] rounded-lg border border-accent/30 bg-white shadow-lg p-2.5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1 text-[9px] font-semibold text-accent">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded bg-accent text-[7px] text-white">S</span>
                  From customer history
                </div>
                <button
                  onClick={() => setNudgeVisible(false)}
                  className="text-zinc-300 hover:text-zinc-500 text-[12px] leading-none"
                >
                  ×
                </button>
              </div>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                David had a $247 discrepancy in Supplies last time — the unmatched &quot;Office Supplies Co.&quot; transaction may be related.
              </p>
              <button
                onClick={() => setNudgeVisible(false)}
                className="mt-1.5 text-[10px] font-medium text-accent hover:underline"
              >
                Show in Right Panel →
              </button>
            </div>
          )}

          {/* Skill match indicator */}
          <div className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-accent">⚡</span>
              <span className="text-zinc-600">Skill match: <strong className="text-accent">qbo-reconcile-account</strong></span>
            </div>
            <button className="rounded bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent hover:bg-accent/20">
              Open
            </button>
          </div>

          {/* Pulse insight (if clicked) */}
          {pulseClicked && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-zinc-600">
              <span className="font-medium text-amber-700">Shadow noticed:</span> You checked the Transaction Detail report during the last 3 reconciliations. Want me to add it as a step to your Skill?
              <div className="mt-1.5 flex gap-2">
                <button
                  onClick={() => setPulseClicked(false)}
                  className="rounded bg-accent px-2 py-0.5 text-[10px] font-medium text-white"
                >
                  Yes, add it
                </button>
                <button
                  onClick={() => setPulseClicked(false)}
                  className="rounded bg-zinc-200 px-2 py-0.5 text-[10px] text-zinc-600"
                >
                  Not now
                </button>
              </div>
            </div>
          )}
        </div>

        {!nudgeVisible && (
          <button
            onClick={() => setNudgeVisible(true)}
            className="mt-3 text-[11px] text-accent hover:underline"
          >
            ↻ Show nudge again
          </button>
        )}
      </div>
    </div>
  );
}

const sectionMockups: Record<string, React.ReactNode> = {
  "not-logged-in": <MockNotLoggedIn />,
  "record-tab": <MockRecordTab />,
  "chat-tab": <MockChatTab />,
  "skills-tab": <MockSkillsTab />,
  "inline-suggestions": <MockInlineSuggestions />,
};

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

/* ═══════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════ */

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        title="Component Specifications"
        description="Every UI component, interaction pattern, and guideline for the Chrome Extension — defined before the prototypes show how they come together."
        badge="Section 4"
      />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <EditBanner filePath="src/data/components.ts" />

        <div className="mb-10 rounded-lg border border-accent-light bg-accent-light/20 p-5">
          <p className="text-sm leading-relaxed">
            This section specifies each component of Shadow&apos;s Chrome Extension Right Rail — its purpose, states, and guidelines.
            Click any card below to jump to its detailed specification. The interactive mockups are functional — try clicking buttons, toggling settings, and typing in inputs.
          </p>
        </div>

        {/* ── Top-level overview grid ── */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2">
          {componentSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent hover:shadow-lg"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent text-xl font-bold text-white">
                {section.letter}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  {section.title}
                </h3>
                <p className="mt-1 text-sm text-muted leading-relaxed line-clamp-2">
                  {section.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {section.subSections.map((sub) => (
                    <span
                      key={sub.id}
                      className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500"
                    >
                      {sub.title}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ── Detailed sections ── */}
        {componentSections.map((section) => (
          <div key={section.id} id={section.id} className="mb-24 scroll-mt-24">
            {/* Section letter + title */}
            <div className="flex items-start gap-4 mb-4">
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

            {/* Sub-section quick nav */}
            <div className="ml-14 mb-6 flex flex-wrap gap-2">
              {section.subSections.map((sub) => (
                <a
                  key={sub.id}
                  href={`#${sub.id}`}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {sub.title}
                </a>
              ))}
            </div>

            {/* Interactive mockup — full width */}
            <div className="mb-10 mx-auto max-w-md">
              {sectionMockups[section.id]}
            </div>

            {/* Sub-sections */}
            {section.subSections.map((sub) => (
              <div key={sub.id} id={sub.id} className="mb-10 ml-14 scroll-mt-24">
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
