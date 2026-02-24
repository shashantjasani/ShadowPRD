"use client";

import { useState, useEffect, useRef } from "react";
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
  tabs = ["Record", "Chat", "Plan", "Skills"],
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
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-[10px] font-bold text-white">S</span>
        <span className="font-semibold text-zinc-700">Shadow</span>
        <span className="ml-auto flex items-center gap-1 text-[11px] text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Connected
        </span>
      </div>
      {showTabs && (
        <div className="flex border-b border-zinc-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange?.(tab)}
              className={`flex-1 px-3 py-2 text-center text-[12px] font-medium transition-colors ${
                activeTab === tab ? "border-b-2 border-accent text-accent" : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Section A: Record Tab
   ═══════════════════════════════════════════════════ */

function MockRecordTab() {
  const [recording, setRecording] = useState(false);
  const [captures, setCaptures] = useState({
    Clicks: true, Types: true, Scrolls: false, Hovers: false, Network: true, Screenshots: true,
  });
  const [triggers, setTriggers] = useState({ Engagement: true, "IEP Login": false, "System Start-up": false });
  const [showPastSessions, setShowPastSessions] = useState(false);

  return (
    <MockRailFrame activeTab="Record" tabs={["Record", "Chat", "Skills"]}>
      <div className="space-y-4">
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
              <button onClick={() => setRecording(false)} className="rounded-lg bg-red-500 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-red-600 transition-colors">
                End Session
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setRecording(true)} className="w-full rounded-lg bg-emerald-500 px-4 py-3 text-[14px] font-semibold text-white hover:bg-emerald-600 transition-colors">
            ⏺ Start Recording
          </button>
        )}
        <div>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Capture Settings</div>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.entries(captures).map(([key, on]) => (
              <button key={key} onClick={() => setCaptures((c) => ({ ...c, [key]: !c[key as keyof typeof c] }))}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-[12px] transition-colors ${on ? "bg-accent/10 text-accent font-medium border border-accent/20" : "bg-zinc-50 text-zinc-400 border border-transparent hover:border-zinc-200"}`}>
                <span>{key}</span>
                <span className={`text-[11px] ${on ? "text-accent" : "text-zinc-300"}`}>{on ? "✓" : "○"}</span>
              </button>
            ))}
          </div>
          <button className="mt-1.5 text-[11px] text-accent hover:underline">+ Full Desktop Capture settings</button>
        </div>
        <div>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Auto-Triggers</div>
          <div className="space-y-1.5">
            {Object.entries(triggers).map(([key, on]) => (
              <div key={key} className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
                <span className="text-[12px] text-zinc-600">{key}</span>
                <button onClick={() => setTriggers((t) => ({ ...t, [key]: !t[key as keyof typeof t] }))}
                  className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-accent" : "bg-zinc-300"}`}>
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "left-[18px]" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button onClick={() => setShowPastSessions((v) => !v)}
            className="mb-2 flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <span>Past Sessions</span>
            <svg className={`h-3.5 w-3.5 transition-transform ${showPastSessions ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showPastSessions && (
            <div className="space-y-1.5">
              {[{ d: "Today, 2:15 PM", dur: "8m 32s", events: 624, reviewed: false }, { d: "Today, 10:01 AM", dur: "3m 12s", events: 218, reviewed: true }, { d: "Yesterday, 4:45 PM", dur: "14m 08s", events: 1203, reviewed: true }].map((s) => (
                <div key={s.d} className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 hover:border-accent/40 transition-colors cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2 text-[12px] font-medium text-zinc-700">
                      {s.d}
                      {!s.reviewed && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600">New</span>}
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
   Section B: Chat Tab
   ═══════════════════════════════════════════════════ */

function MockChatTab() {
  const [messages, setMessages] = useState([
    { role: "user" as const, text: "How do I reconcile a bank account in QBO?" },
    { role: "shadow" as const, text: "I have a Skill for that — qbo-reconcile-account. Want me to build a Plan you can walk through, or should I run it for you?" },
  ]);
  const [showExecution, setShowExecution] = useState(false);
  const [executionState, setExecutionState] = useState<"preview" | "approved" | null>(null);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    if (text.toLowerCase().includes("run") || text.toLowerCase().includes("execute") || text.toLowerCase().includes("do it")) {
      setTimeout(() => { setShowExecution(true); setExecutionState("preview"); }, 400);
    } else if (text.toLowerCase().includes("plan")) {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "shadow", text: "Done — I built a 6-step plan in the Plan tab. It covers reconciliation, matching, and finishing. Check it out and add any steps you want." }]);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "shadow", text: "Got it. Let me know if you'd like me to plan it out in the Plan tab or execute it directly." }]);
      }, 500);
    }
  }

  function handleApprove() {
    setExecutionState("approved");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "shadow", text: "✅ Reconciliation complete. 12 transactions matched, difference is $0.00. The period Jan 1–31 is now closed." }]);
      setShowExecution(false);
    }, 1200);
  }

  return (
    <MockRailFrame activeTab="Chat">
      <div className="space-y-3">
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[12px] leading-relaxed ${msg.role === "user" ? "bg-accent text-white rounded-br-sm" : "bg-zinc-100 text-zinc-700 rounded-bl-sm"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {showExecution && (
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-2">Skill Execution Preview</div>
              <div className="text-[13px] font-semibold text-zinc-800 mb-2">qbo-reconcile-account</div>
              <div className="space-y-1 mb-3">
                {[{ field: "Account", value: "Business Checking (****4521)" }, { field: "Period", value: "Jan 1 – Jan 31, 2026" }, { field: "Match method", value: "Auto-match by amount + date" }].map((f) => (
                  <div key={f.field} className="flex justify-between rounded bg-white px-2 py-1 text-[11px]">
                    <span className="text-zinc-500">{f.field}</span>
                    <span className="font-medium text-zinc-700">{f.value}</span>
                  </div>
                ))}
              </div>
              {executionState === "preview" ? (
                <div className="flex gap-2">
                  <button onClick={handleApprove} className="flex-1 rounded-lg bg-emerald-500 py-1.5 text-[12px] font-semibold text-white hover:bg-emerald-600">Approve & Execute</button>
                  <button className="flex-1 rounded-lg bg-white border border-zinc-200 py-1.5 text-[12px] font-medium text-zinc-600 hover:bg-zinc-50">Review & Edit</button>
                  <button onClick={() => setShowExecution(false)} className="rounded-lg bg-white border border-zinc-200 px-3 py-1.5 text-[12px] text-zinc-400 hover:bg-zinc-50">Skip</button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[12px] text-emerald-600 font-medium">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600" /> Executing…
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
          <button className="text-zinc-300 hover:text-zinc-500 transition-colors text-lg">📎</button>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Shadow anything…" className="flex-1 text-[13px] outline-none placeholder:text-zinc-400" />
          <button onClick={handleSend} className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${input.trim() ? "bg-accent text-white" : "bg-zinc-100 text-zinc-300"}`}>↑</button>
        </div>
      </div>
    </MockRailFrame>
  );
}

/* ═══════════════════════════════════════════════════
   Section C: Plan Tab
   ═══════════════════════════════════════════════════ */

interface PlanItem {
  id: string;
  text: string;
  skill?: string;
  done: boolean;
  addedBy: "shadow" | "expert";
}

const initialPlanItems: PlanItem[] = [
  { id: "p1", text: "Pull customer's reconciliation history from Memory", skill: "ctx-customer-history", done: false, addedBy: "shadow" },
  { id: "p2", text: "Open Bookkeeping → Reconcile in QBO", skill: "qbo-reconcile-account", done: false, addedBy: "shadow" },
  { id: "p3", text: "Select Business Checking (****4521), set period to Jan 1–31", skill: "qbo-reconcile-account", done: false, addedBy: "shadow" },
  { id: "p4", text: "Auto-match transactions by amount + date", skill: "qbo-reconcile-account", done: false, addedBy: "shadow" },
  { id: "p5", text: "Flag unmatched transactions for manual review", skill: "qbo-reconcile-account", done: false, addedBy: "shadow" },
  { id: "p6", text: "Generate reconciliation summary report", skill: "qbo-generate-report", done: false, addedBy: "shadow" },
  { id: "p7", text: "Send confirmation to customer via case notes", skill: "case-wrap-up", done: false, addedBy: "shadow" },
];

const skillLabels: Record<string, string> = {
  "ctx-customer-history": "Customer History",
  "qbo-reconcile-account": "Reconcile Account",
  "qbo-generate-report": "Generate Report",
  "case-wrap-up": "Case Wrap-Up",
  "_custom": "Your additions",
};

function MockPlanTab() {
  const [planItems, setPlanItems] = useState<PlanItem[]>(initialPlanItems);
  const [newItemText, setNewItemText] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [planAccepted, setPlanAccepted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"active" | "history">("active");

  const skillGroups = planItems.reduce<Record<string, PlanItem[]>>((acc, item) => {
    const key = item.skill || "_custom";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const doneCount = planItems.filter((i) => i.done).length;

  function toggleItem(id: string) {
    setPlanItems((items) => items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  }

  function removeItem(id: string) {
    setPlanItems((items) => items.filter((i) => i.id !== id));
  }

  function addItem() {
    if (!newItemText.trim()) return;
    setPlanItems((items) => [...items, { id: `custom-${Date.now()}`, text: newItemText.trim(), done: false, addedBy: "expert" }]);
    setNewItemText("");
    setShowAddInput(false);
  }

  return (
    <MockRailFrame activeTab="Plan">
      <div className="space-y-3">
        {/* Plan selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedPlan("active")}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
              selectedPlan === "active" ? "bg-accent/10 text-accent" : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Active Plan
          </button>
          <button
            onClick={() => setSelectedPlan("history")}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
              selectedPlan === "history" ? "bg-accent/10 text-accent" : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            History
          </button>
          <span className="ml-auto rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
            {doneCount}/{planItems.length}
          </span>
        </div>

        {selectedPlan === "history" ? (
          <div className="space-y-2">
            {[
              { name: "QBO expense categorization", date: "Today, 10:15 AM", steps: 4, status: "completed" },
              { name: "Client invoice from estimate", date: "Yesterday, 3:30 PM", steps: 5, status: "completed" },
              { name: "Payroll adjustment", date: "Feb 18, 11:00 AM", steps: 3, status: "completed" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 hover:border-accent/30 transition-colors cursor-pointer">
                <div>
                  <div className="text-[12px] font-medium text-zinc-700">{p.name}</div>
                  <div className="text-[11px] text-zinc-400">{p.date} · {p.steps} steps</div>
                </div>
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600">Done</span>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${planItems.length > 0 ? (doneCount / planItems.length) * 100 : 0}%` }}
              />
            </div>

            {/* Plan card */}
            <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2">
                <div className="text-[13px] font-semibold text-zinc-800">Jan Reconciliation</div>
                {!planAccepted ? (
                  <button
                    onClick={() => setPlanAccepted(true)}
                    className="rounded-lg bg-accent px-3 py-1 text-[11px] font-semibold text-white hover:bg-accent/90 transition-colors"
                  >
                    Accept Plan
                  </button>
                ) : (
                  <span className="text-[11px] font-medium text-emerald-600">Active</span>
                )}
              </div>

              <div className="max-h-[240px] overflow-y-auto divide-y divide-zinc-50">
                {Object.entries(skillGroups).map(([skillKey, items]) => (
                  <div key={skillKey} className="px-3 py-2">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {skillKey !== "_custom" && (
                        <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-500 uppercase tracking-wide">
                          Skill
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-zinc-600">
                        {skillLabels[skillKey] || skillKey}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`group flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors ${planAccepted ? "hover:bg-zinc-50" : ""} ${item.done ? "opacity-50" : ""}`}
                        >
                          <button
                            onClick={() => planAccepted && toggleItem(item.id)}
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                              item.done
                                ? "border-emerald-400 bg-emerald-400 text-white"
                                : planAccepted
                                  ? "border-zinc-300 hover:border-accent"
                                  : "border-zinc-200"
                            }`}
                          >
                            {item.done && (
                              <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                          <span className={`flex-1 text-[12px] leading-snug ${item.done ? "line-through text-zinc-400" : "text-zinc-700"}`}>
                            {item.text}
                            {item.addedBy === "expert" && (
                              <span className="ml-1.5 rounded bg-amber-50 px-1 py-0.5 text-[9px] font-semibold text-amber-500 align-middle">You</span>
                            )}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="shrink-0 text-zinc-300 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all text-[14px] leading-none mt-0.5"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-100 px-3 py-2">
                {showAddInput ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      autoFocus
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") addItem(); if (e.key === "Escape") { setShowAddInput(false); setNewItemText(""); } }}
                      placeholder="Add a step…"
                      className="flex-1 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-[12px] outline-none focus:border-accent/40 placeholder:text-zinc-400"
                    />
                    <button onClick={addItem} className="rounded-lg bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-accent/90">Add</button>
                    <button onClick={() => { setShowAddInput(false); setNewItemText(""); }} className="text-[12px] text-zinc-400 hover:text-zinc-600">Cancel</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddInput(true)}
                    className="flex items-center gap-1.5 text-[12px] text-zinc-400 hover:text-accent transition-colors"
                  >
                    <span className="text-[16px] leading-none">+</span> Add your own step
                  </button>
                )}
              </div>
            </div>

            {/* Completion */}
            {planAccepted && doneCount === planItems.length && planItems.length > 0 && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5 text-center">
                <div className="text-[12px] font-semibold text-emerald-700">Plan complete!</div>
                <div className="text-[11px] text-emerald-600 mt-0.5">Shadow can handle this automatically next time.</div>
              </div>
            )}
          </>
        )}
      </div>
    </MockRailFrame>
  );
}

/* ═══════════════════════════════════════════════════
   Section D: Skills Tab
   ═══════════════════════════════════════════════════ */

type StepTag = "core" | "yours";
interface SkillStep { label: string; tag: StepTag; }
interface MockSkill { name: string; description: string; steps: SkillStep[]; imports?: string; optional?: string; }

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
        <div className="flex gap-4 text-[12px]">
          <span className="text-zinc-600"><strong className="text-accent">12</strong> Skills</span>
          <span className="text-zinc-600"><strong className="text-amber-500">8</strong> w/ personal steps</span>
          <span className="text-zinc-600"><strong className="text-emerald-500">3</strong> Shared</span>
        </div>

        <div className="flex rounded-lg border border-zinc-200 overflow-hidden">
          <button onClick={() => setView("list")} className={`flex-1 px-3 py-1.5 text-[11px] font-medium transition-colors ${view === "list" ? "bg-accent/10 text-accent" : "bg-zinc-50 text-zinc-400"}`}>List View</button>
          <button onClick={() => setView("workflow")} className={`flex-1 px-3 py-1.5 text-[11px] font-medium transition-colors border-l border-zinc-200 ${view === "workflow" ? "bg-accent/10 text-accent" : "bg-zinc-50 text-zinc-400"}`}>Workflow View</button>
        </div>

        {view === "workflow" && (
          <div className="space-y-3">
            <div className="text-[11px] text-zinc-500 leading-relaxed">Shows how Skills chain together for a complete customer workflow.</div>
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
                    <div className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] ${node.type === "primary" ? "bg-accent/10 border border-accent/20" : node.type === "imported" ? "bg-blue-50 border border-blue-200" : node.type === "conditional" ? "bg-amber-50 border border-amber-200" : "bg-zinc-50 border border-zinc-200 border-dashed"}`}>
                      <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold ${node.type === "primary" ? "bg-accent text-white" : node.type === "imported" ? "bg-blue-500 text-white" : node.type === "conditional" ? "bg-amber-500 text-white" : "bg-zinc-400 text-white"}`}>
                        {node.type === "primary" ? "▶" : node.type === "imported" ? "↓" : node.type === "conditional" ? "?" : "○"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-zinc-700 truncate">{node.name}</div>
                        <div className="text-[10px] text-zinc-400">{node.relation}</div>
                      </div>
                    </div>
                    {i < arr.length - 1 && <div className="flex justify-center py-0.5"><div className="h-3 w-px bg-zinc-300" /></div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[10px] text-zinc-400"><strong className="text-blue-500">■</strong> Imported <strong className="text-accent ml-2">■</strong> Primary <strong className="text-amber-500 ml-2">■</strong> Conditional <strong className="text-zinc-400 ml-2">■</strong> Optional</div>
          </div>
        )}

        {view === "list" && (
          <>
            <div className="flex gap-1 rounded-lg bg-zinc-100 p-0.5">
              {([["all", "All"], ["mine", "Mine"], ["shared", "Shared"]] as const).map(([key, label]) => (
                <button key={key} onClick={() => setFilter(key)} className={`flex-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${filter === key ? "bg-white text-zinc-700 shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}>{label}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-1.5">
              <span className="text-zinc-300">🔍</span>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search skills…" className="flex-1 text-[12px] outline-none placeholder:text-zinc-400" />
            </div>
            <div className="space-y-2">
              {filtered.map((skill) => {
                const isExpanded = expanded === skill.name;
                const coreCount = skill.steps.filter((s) => s.tag === "core").length;
                const personalCount = skill.steps.filter((s) => s.tag === "yours").length;
                const visibleSteps = stepFilter === "all" ? skill.steps : skill.steps.filter((s) => s.tag === stepFilter);
                return (
                  <div key={skill.name} className="rounded-xl border border-zinc-200 overflow-hidden">
                    <button onClick={() => { setExpanded(isExpanded ? null : skill.name); setStepFilter("all"); }} className="w-full px-3 py-2.5 text-left hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[13px] text-zinc-800">{skill.name}</span>
                        <svg className={`h-4 w-4 text-zinc-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                      <div className="text-[12px] text-zinc-500 mt-0.5">{skill.description}</div>
                      <div className="mt-1.5 flex gap-2 text-[10px]">
                        <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-500 font-medium">{coreCount} core</span>
                        {personalCount > 0 && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-amber-600 font-medium">{personalCount} yours</span>}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="border-t border-zinc-100 px-3 py-3 bg-zinc-50/50">
                        <div className="mb-2 flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mr-1">Show:</span>
                          {([["all", "All steps"], ["core", "Core only"], ["yours", "My additions"]] as const).map(([key, label]) => (
                            <button key={key} onClick={() => setStepFilter(key)} className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${stepFilter === key ? key === "yours" ? "bg-amber-100 text-amber-700" : "bg-accent/10 text-accent" : "bg-zinc-100 text-zinc-400 hover:text-zinc-600"}`}>{label}</button>
                          ))}
                        </div>
                        <div className="space-y-1">
                          {visibleSteps.map((step, i) => (
                            <div key={i} className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-[12px] ${step.tag === "yours" ? "bg-amber-50 border-l-2 border-amber-400" : "bg-white border-l-2 border-zinc-200"}`}>
                              <span className="mt-0.5 text-[10px] text-zinc-400 shrink-0 w-4 text-right">{i + 1}.</span>
                              <span className="flex-1 text-zinc-700">{step.label}</span>
                              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold ${step.tag === "yours" ? "bg-amber-100 text-amber-600" : "bg-zinc-100 text-zinc-500"}`}>{step.tag === "yours" ? "Yours" : "Core"}</span>
                            </div>
                          ))}
                        </div>
                        {(skill.imports || skill.optional) && (
                          <div className="mt-3 space-y-1 text-[11px]">
                            {skill.imports && <div className="flex items-center gap-1.5 text-zinc-500"><span className="rounded bg-blue-50 px-1.5 py-0.5 text-blue-600 font-medium text-[10px]">Imports</span><span className="text-zinc-600">{skill.imports}</span></div>}
                            {skill.optional && <div className="flex items-center gap-1.5 text-zinc-500"><span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-500 font-medium text-[10px]">Optional</span><span className="text-zinc-600">{skill.optional}</span></div>}
                          </div>
                        )}
                        <div className="mt-3 flex gap-2">
                          <button className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-50">Edit</button>
                          <button className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-red-500 hover:bg-red-50">Delete</button>
                          <button className="ml-auto rounded-lg bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent hover:bg-accent/20">Propose for Intuit ↗</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </MockRailFrame>
  );
}

/* ═══════════════════════════════════════════════════
   Section D: Proactive Messages
   ═══════════════════════════════════════════════════ */

type ProactiveBadge = "Customer history" | "Skill match" | "Pattern observed";

interface ProactiveMsg {
  id: string;
  role: "shadow" | "expert";
  text: string;
  badge?: ProactiveBadge;
  action?: { label: string; result: string };
  reacted?: boolean;
}

const proactiveThread: ProactiveMsg[] = [
  {
    id: "p1",
    role: "shadow",
    badge: "Customer history",
    text: "Heads up — David called about a $247 discrepancy in Supplies last month. That unmatched \"Office Supplies Co.\" line might be the same thing.",
  },
  { id: "p2", role: "expert", text: "Good catch, let me check that one first." },
  {
    id: "p3",
    role: "shadow",
    badge: "Skill match",
    text: "You're on the reconcile page — I have a Skill for this (qbo-reconcile-account, 6 steps). Want me to plan it out or run it?",
    action: { label: "Plan it", result: "plan" },
  },
  { id: "p4", role: "expert", text: "Plan it — I want to do this one manually." },
  { id: "p5", role: "shadow", text: "Got it. I put together a plan — check the Plan tab when you're ready." },
  {
    id: "p6",
    role: "shadow",
    badge: "Pattern observed",
    text: "I noticed you pull the Transaction Detail report after reconciling — you've done it the last 3 times. Want me to add that as a step in your Skill?",
    action: { label: "Yes, add it", result: "added" },
  },
];

function MockProactiveMessages() {
  const [visibleCount, setVisibleCount] = useState(2);
  const [reactions, setReactions] = useState<Record<string, boolean>>({});
  const [actionResults, setActionResults] = useState<Record<string, string>>({});

  const visible = proactiveThread.slice(0, visibleCount);
  const hasMore = visibleCount < proactiveThread.length;

  function showNext() {
    setVisibleCount((c) => Math.min(c + 2, proactiveThread.length));
  }

  function toggleReaction(id: string) {
    setReactions((r) => ({ ...r, [id]: !r[id] }));
  }

  function handleAction(id: string, result: string) {
    setActionResults((a) => ({ ...a, [id]: result }));
  }

  const badgeColors: Record<ProactiveBadge, string> = {
    "Customer history": "bg-blue-50 text-blue-600 border-blue-200",
    "Skill match": "bg-accent/10 text-accent border-accent/20",
    "Pattern observed": "bg-amber-50 text-amber-600 border-amber-200",
  };

  return (
    <MockRailFrame activeTab="Chat">
      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-lg bg-zinc-50 border border-zinc-200 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-zinc-500">Watching: <strong className="text-zinc-700">Reconcile — Business Checking</strong></span>
        </div>

        <div className="space-y-3 max-h-[380px] overflow-y-auto">
          {visible.map((msg) => (
            <div key={msg.id}>
              {msg.role === "expert" ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-xl px-3 py-2 text-[12px] leading-relaxed bg-accent text-white rounded-br-sm">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div className="max-w-[92%]">
                  {msg.badge && (
                    <div className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold mb-1 ${badgeColors[msg.badge]}`}>
                      <span className="flex h-3 w-3 items-center justify-center rounded bg-current/10 text-[7px]">
                        {msg.badge === "Customer history" ? "📋" : msg.badge === "Skill match" ? "⚡" : "👁"}
                      </span>
                      {msg.badge}
                    </div>
                  )}
                  <div className="rounded-xl bg-zinc-100 text-zinc-700 rounded-bl-sm px-3 py-2 text-[12px] leading-relaxed">
                    {msg.text}

                    {msg.action && !actionResults[msg.id] && (
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleAction(msg.id, msg.action!.result)}
                          className="rounded-lg bg-accent px-3 py-1 text-[11px] font-semibold text-white hover:bg-accent/90 transition-colors"
                        >
                          {msg.action.label}
                        </button>
                        <button className="rounded-lg bg-zinc-200 px-3 py-1 text-[11px] text-zinc-500 hover:bg-zinc-300 transition-colors">
                          Not now
                        </button>
                      </div>
                    )}

                    {actionResults[msg.id] === "plan" && (
                      <div className="mt-2 rounded-lg border border-accent/20 bg-accent/5 px-2.5 py-1.5 text-[11px] text-accent font-medium">
                        Plan created in the <strong>Plan</strong> tab — switch over to review and start working through it.
                      </div>
                    )}
                    {actionResults[msg.id] === "added" && (
                      <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-700 font-medium">
                        Added &quot;Pull Transaction Detail report&quot; as an optional step in your Skill
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1 ml-1">
                    <button
                      onClick={() => toggleReaction(msg.id)}
                      className={`rounded-full px-1.5 py-0.5 text-[11px] transition-colors ${
                        reactions[msg.id] ? "bg-accent/10 text-accent" : "text-zinc-300 hover:text-zinc-500"
                      }`}
                    >
                      👍
                    </button>
                    <span className="text-[10px] text-zinc-300">·</span>
                    <span className="text-[10px] text-zinc-400">just now</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {hasMore ? (
          <button
            onClick={showNext}
            className="w-full rounded-xl bg-accent/10 px-4 py-2 text-[12px] font-medium text-accent hover:bg-accent/20 transition-colors"
          >
            Continue conversation →
          </button>
        ) : (
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="flex gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
            Shadow is watching…
          </div>
        )}

        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
          <input type="text" readOnly placeholder="Reply to Shadow…" className="flex-1 text-[13px] outline-none placeholder:text-zinc-400" />
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-300">↑</div>
        </div>
      </div>
    </MockRailFrame>
  );
}

/* ═══════════════════════════════════════════════════
   Mockup map & helpers
   ═══════════════════════════════════════════════════ */

const sectionMockups: Record<string, React.ReactNode> = {
  "record-tab": <MockRecordTab />,
  "chat-tab": <MockChatTab />,
  "plan-tab": <MockPlanTab />,
  "skills-tab": <MockSkillsTab />,
  "inline-suggestions": <MockProactiveMessages />,
};

function StatesList({ states }: { states: string[] }) {
  return (
    <div className="mt-1.5">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">States</div>
      <div className="space-y-1">
        {states.map((state, i) => (
          <div key={i} className="flex gap-2 rounded bg-zinc-50 px-2 py-1 text-xs leading-relaxed">
            <span className="mt-0.5 shrink-0 text-accent">&#9656;</span>
            <span className="text-zinc-600">{state}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Sticky scroll observer — detects which section is
   in view and updates the floating mockup
   ═══════════════════════════════════════════════════ */

function useActiveSectionId(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    function onScroll() {
      const offset = 140;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          current = id;
        }
      }

      setActiveId(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return activeId;
}

/* ═══════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════ */

export default function ComponentsPage() {
  const sectionIds = componentSections.map((s) => s.id);
  const activeId = useActiveSectionId(sectionIds);

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
            Click any card below to jump to its detailed specification. The mockup on the right updates as you scroll and is fully interactive.
          </p>
        </div>

        {/* Top-level overview grid */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2">
          {componentSections.map((section) => (
            <a key={section.id} href={`#${section.id}`}
              className="group flex gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent hover:shadow-lg">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent text-xl font-bold text-white">{section.letter}</span>
              <div className="min-w-0">
                <h3 className="font-semibold group-hover:text-accent transition-colors">{section.title}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed line-clamp-2">{section.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {section.subSections.map((sub) => (
                    <span key={sub.id} className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500">{sub.title}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Two-column layout: specs on left, sticky mockup on right */}
        <div className="flex gap-8 lg:gap-12">
          {/* Left: spec content */}
          <div className="flex-1 min-w-0">
            {componentSections.map((section) => (
              <div key={section.id} id={section.id} className="mb-24 scroll-mt-24">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-lg font-bold text-white">{section.letter}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <EditableText contentKey={`components.${section.id}.description`} original={section.description} className="mt-1 leading-relaxed text-muted" multiline />
                  </div>
                </div>

                <div className="ml-14 mb-6 flex flex-wrap gap-2">
                  {section.subSections.map((sub) => (
                    <a key={sub.id} href={`#${sub.id}`} className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent">{sub.title}</a>
                  ))}
                </div>

                {/* Show mockup inline on mobile only */}
                <div className="mb-8 lg:hidden">
                  {sectionMockups[section.id]}
                </div>

                {section.subSections.map((sub) => (
                  <div key={sub.id} id={sub.id} className="mb-10 ml-14 scroll-mt-24">
                    <h3 className="mb-2 text-lg font-semibold">{sub.title}</h3>
                    <EditableText contentKey={`components.${sub.id}.description`} original={sub.description} className="mb-4 text-sm leading-relaxed text-muted" multiline />
                    <div className="space-y-4">
                      {sub.specs.map((spec) => (
                        <div key={spec.id} className="rounded-lg border border-border bg-surface p-4">
                          <h4 className="mb-1 font-semibold text-sm">{spec.name}</h4>
                          <EditableText contentKey={`components.${spec.id}.description`} original={spec.description} className="text-sm leading-relaxed text-muted" />
                          {spec.states && spec.states.length > 0 && <StatesList states={spec.states} />}
                          {spec.guidelines && spec.guidelines.length > 0 && (
                            <div className="mt-2">
                              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">Guidelines</div>
                              <EditableBulletList contentKey={`components.${spec.id}.guidelines`} original={spec.guidelines} bulletColor="text-violet-400" className="text-xs leading-relaxed text-zinc-600" />
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

          {/* Right: sticky floating mockup (desktop only) */}
          <div className="hidden lg:block w-[340px] shrink-0">
            <div className="sticky top-24">
              <div className="mb-3 flex items-center gap-2">
                {componentSections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      activeId === s.id ? "bg-accent text-white" : "bg-zinc-100 text-zinc-400 hover:text-zinc-600"
                    }`}
                  >
                    {s.letter}
                  </button>
                ))}
              </div>
              {sectionMockups[activeId]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
