"use client";

import { useState, type ReactNode } from "react";
import PageHeader from "@/components/layout/PageHeader";
import ShadowRightRail, { type ShadowTab } from "@/components/prototypes/ShadowRightRail";

/* ═══════════════════════════════════════════════════
   Right Rail visual mockups for key timeline moments
   ═══════════════════════════════════════════════════ */

function RailFrame({ defaultTab, children }: { defaultTab: ShadowTab; children: (tab: ShadowTab) => ReactNode }) {
  const [tab, setTab] = useState(defaultTab);
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden text-[13px]">
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-600 text-[9px] font-bold text-white">S</span>
        <span className="text-[11px] font-semibold text-zinc-800">Shadow</span>
        <span className="ml-auto flex items-center gap-1 text-[9px] text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Connected
        </span>
      </div>
      <div className="flex border-b border-zinc-200">
        {(["Record", "Chat", "Plan", "Skills"] as ShadowTab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-1.5 text-[11px] font-medium transition-colors ${tab === t ? "border-b-2 border-violet-600 text-violet-600" : "text-zinc-400 hover:text-zinc-700"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="h-[380px] overflow-y-auto p-3">
        {children(tab)}
      </div>
    </div>
  );
}

function ChatBubble({ role, children }: { role: "shadow" | "expert"; children: ReactNode }) {
  return (
    <div className={`flex ${role === "expert" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[90%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${
        role === "expert" ? "bg-violet-600 text-white rounded-br-sm" : "bg-zinc-100 text-zinc-700 rounded-bl-sm"
      }`}>
        {children}
      </div>
    </div>
  );
}

function Badge({ children, color = "violet" }: { children: ReactNode; color?: "violet" | "blue" | "amber" | "emerald" }) {
  const colors = {
    violet: "bg-violet-100 text-violet-600",
    blue: "bg-blue-100 text-blue-600",
    amber: "bg-amber-100 text-amber-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };
  return <span className={`rounded px-1.5 py-0.5 text-[8px] font-semibold ${colors[color]}`}>{children}</span>;
}

function ReasoningBlock({ steps, label, collapsed: initCollapsed = false }: { steps: { text: string; done: boolean }[]; label: string; collapsed?: boolean }) {
  const [collapsed, setCollapsed] = useState(initCollapsed);
  return (
    <div>
      <button onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-1.5 text-[9px] text-zinc-400 hover:text-zinc-600 transition-colors mb-0.5">
        <svg className={`h-2.5 w-2.5 transition-transform ${collapsed ? "" : "rotate-90"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="flex h-3 w-3 items-center justify-center rounded bg-zinc-200 text-[6px] font-bold text-zinc-500">S</span>
        <span className="italic">{collapsed ? label : "Shadow is thinking…"}</span>
      </button>
      {!collapsed && (
        <div className="ml-4 rounded-lg border-l-2 border-zinc-200 bg-zinc-50/80 px-2.5 py-1.5 space-y-0.5">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-1 text-[9px] leading-relaxed text-zinc-500 italic">
              <span className="mt-0.5 shrink-0 text-[8px]">{s.done ? "✓" : "…"}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Step 1: Login — 8:58 AM */
function VisualLogin() {
  return (
    <RailFrame defaultTab="Chat">
      {(tab) => tab === "Chat" ? (
        <div className="space-y-3">
          <ChatBubble role="shadow">
            Good morning, Asha. I&apos;ve loaded your profile — 14 Skills, 247 sessions.
          </ChatBubble>
          <ChatBubble role="shadow">
            <div className="mb-1 font-semibold text-zinc-800">Today&apos;s Queue</div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]"><span>Scheduled contacts</span><span className="font-semibold">12</span></div>
              <div className="flex justify-between text-[10px]"><span>Returning customers</span><span className="font-semibold">3</span></div>
              <div className="flex justify-between text-[10px]"><span>Top topics</span><span className="font-semibold">Reconciliation, Bookkeeping</span></div>
            </div>
          </ChatBubble>
          <ChatBubble role="shadow">
            3 returning customers today — I&apos;ve preloaded their history from the Memory Service.
          </ChatBubble>
          <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[7px] font-bold text-white">AP</span>
              <span className="font-semibold text-zinc-800">Asha Patel</span>
              <Badge>14 Skills</Badge>
              <Badge color="emerald">74% Profile</Badge>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">{tab}</div>
      )}
    </RailFrame>
  );
}

/* Step 2: Pre-call prep — 9:02 AM */
function VisualPreCall() {
  return (
    <RailFrame defaultTab="Chat">
      {(tab) => tab === "Chat" ? (
        <div className="space-y-3">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-semibold uppercase text-amber-600">Incoming Contact</span>
              <span className="font-mono text-[12px] font-bold text-amber-600">1:48</span>
            </div>
            <div className="text-[11px] font-semibold text-zinc-800">Reconciliation discrepancy</div>
          </div>

          <ReasoningBlock
            collapsed
            label="Shadow prepared for David Park"
            steps={[
              { text: "Incoming contact: David Park — topic: reconciliation", done: true },
              { text: "Querying Context & Memory Service...", done: true },
              { text: "Found 1 previous interaction (Feb 1, handled by Marcus)", done: true },
              { text: "Open item: $247 discrepancy in Supplies", done: true },
              { text: "Matching topic to your Skills library...", done: true },
              { text: "2 Skills matched: qbo-reconcile-account, qbo-resolve-discrepancy", done: true },
            ]}
          />

          <div className="rounded-lg border border-blue-200 bg-blue-50/50 px-3 py-2">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[9px] font-semibold uppercase text-blue-600">Customer History</span>
              <Badge color="blue">Memory Service</Badge>
            </div>
            <div className="text-[10px] font-semibold text-zinc-700">David Park</div>
            <div className="text-[10px] text-zinc-500">Last contact: Feb 1 — reconciliation help, resolved by Marcus</div>
            <div className="mt-1 rounded bg-amber-50 border border-amber-200 px-2 py-1 text-[9px] text-amber-700">
              Open item: David mentioned he&apos;d call back about January close
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 px-3 py-2">
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-[9px] font-semibold uppercase text-violet-600">Your Skills</span>
              <Badge>Personalized</Badge>
            </div>
            <div className="space-y-1.5">
              <div className="rounded bg-zinc-50 px-2 py-1.5">
                <div className="font-mono text-[10px] text-violet-600">qbo-reconcile-account</div>
                <div className="text-[9px] text-zinc-400">4 core + 2 yours · v4</div>
              </div>
              <div className="rounded bg-zinc-50 px-2 py-1.5">
                <div className="font-mono text-[10px] text-violet-600">qbo-resolve-discrepancy</div>
                <div className="text-[9px] text-zinc-400">6 core + 1 yours · v2</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">{tab}</div>
      )}
    </RailFrame>
  );
}

/* Step 3: Call begins — 9:04 AM */
function VisualDuringCall() {
  return (
    <RailFrame defaultTab="Chat">
      {(tab) => tab === "Chat" ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[10px] font-medium text-emerald-700">Active call · Capturing</span>
            </div>
            <span className="font-mono text-[11px] font-bold text-emerald-700">0:42</span>
          </div>

          <ChatBubble role="shadow">
            Detected: Bookkeeping → Reconcile. This matches Step 1 of your <strong>qbo-reconcile-account</strong> Skill.
          </ChatBubble>

          <ReasoningBlock
            collapsed
            label="Shadow recalled relevant customer history"
            steps={[
              { text: "Navigation: Bookkeeping → Reconcile → Business Checking", done: true },
              { text: "Matches Step 1 of qbo-reconcile-account", done: true },
              { text: "Checking customer memory for relevant context...", done: true },
              { text: "Found: $247 discrepancy in Supplies (Feb 1 call)", done: true },
            ]}
          />

          <div className="rounded-lg border-l-2 border-violet-400 bg-violet-50 px-3 py-2">
            <div className="flex items-center gap-1 mb-1">
              <Badge color="blue">Customer history</Badge>
            </div>
            <div className="text-[11px] text-zinc-700 leading-relaxed">
              Heads up — David&apos;s last reconciliation had a <strong>$247 discrepancy in Supplies</strong>. Might be relevant here.
            </div>
          </div>

          <div className="rounded bg-zinc-50 px-3 py-2 text-[10px] text-zinc-400">
            Shadow is observing · Learning your approach to this case type
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">{tab}</div>
      )}
    </RailFrame>
  );
}

/* Step 5: Wrap-up — 9:26 AM */
function VisualWrapUp() {
  return (
    <RailFrame defaultTab="Chat">
      {(tab) => tab === "Chat" ? (
        <div className="space-y-3">
          <ChatBubble role="shadow">
            Call complete. Here&apos;s the wrap-up:
          </ChatBubble>

          <div className="rounded-lg border border-zinc-200 px-3 py-2">
            <div className="text-[9px] font-semibold uppercase text-zinc-500 mb-1.5">Auto-Generated Summary</div>
            <div className="text-[11px] text-zinc-700 leading-relaxed space-y-1">
              <p>Customer reported a reconciliation discrepancy on Business Checking for January. Identified 3 uncleared transactions (45+ days). Cross-referenced with bank statement. Difference resolved to $0.00.</p>
            </div>
            <div className="mt-2 flex gap-1">
              <button className="rounded bg-violet-600 px-2.5 py-1 text-[9px] font-medium text-white">Submit</button>
              <button className="rounded border border-zinc-200 px-2.5 py-1 text-[9px] text-zinc-500">Edit</button>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 px-3 py-2">
            <div className="text-[9px] font-semibold uppercase text-zinc-500 mb-1">Follow-up</div>
            <div className="text-[11px] text-zinc-700">David wants to check in after month-end close</div>
            <div className="mt-1 flex items-center gap-2 text-[10px]">
              <span className="text-zinc-400">Suggested:</span>
              <span className="font-medium text-violet-600">March 3, 2026</span>
              <button className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] text-emerald-600 font-medium">Confirm</button>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50/50 px-3 py-2">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[9px] font-semibold uppercase text-blue-600">Memory Updated</span>
              <Badge color="blue">Context Service</Badge>
            </div>
            <div className="space-y-0.5 text-[10px] text-zinc-500">
              <div className="flex items-center gap-1"><span className="text-emerald-500">&#10003;</span> Summary saved</div>
              <div className="flex items-center gap-1"><span className="text-emerald-500">&#10003;</span> Resolution: Discrepancy resolved</div>
              <div className="flex items-center gap-1"><span className="text-emerald-500">&#10003;</span> Follow-up scheduled</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">{tab}</div>
      )}
    </RailFrame>
  );
}

/* Step 6: Skill update — 9:27 AM */
function VisualSkillUpdate() {
  const steps = [
    { label: "Select account from dropdown", tag: "core" as const },
    { label: "Enter statement ending date & balance", tag: "core" as const },
    { label: "Pull Transaction Detail by Account report (filtered by date + category)", tag: "new" as const },
    { label: "Match transactions by amount + date", tag: "core" as const },
    { label: "Click 'Finish reconciliation'", tag: "core" as const },
  ];

  return (
    <RailFrame defaultTab="Skills">
      {(tab) => tab === "Skills" ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[11px] font-semibold text-violet-600">qbo-reconcile-account</div>
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[8px] font-semibold text-amber-700">v3 → v4</span>
          </div>

          <div className="space-y-1">
            {steps.map((s, i) => (
              <div key={i} className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-[11px] ${
                s.tag === "new" ? "border border-emerald-300 bg-emerald-50" : "bg-zinc-50"
              }`}>
                <span className="text-zinc-400 mt-0.5 shrink-0">{i + 1}.</span>
                <span className={s.tag === "new" ? "text-emerald-800" : "text-zinc-700"}>{s.label}</span>
                {s.tag === "new" ? (
                  <span className="ml-auto shrink-0 rounded bg-emerald-200 px-1 py-0.5 text-[7px] font-bold text-emerald-700">NEW</span>
                ) : (
                  <span className="ml-auto shrink-0 rounded bg-zinc-200 px-1 py-0.5 text-[7px] font-bold text-zinc-500">CORE</span>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <div className="text-[9px] font-semibold text-amber-700 mb-1">Step tagged as &quot;Yours&quot;</div>
            <div className="text-[10px] text-amber-700">Only you have used this approach so far. It&apos;s been added to your personalized version.</div>
          </div>

          <div className="flex gap-1.5">
            <button className="flex-1 rounded-lg bg-violet-600 py-1.5 text-[10px] font-semibold text-white">Approve Update</button>
            <button className="flex-1 rounded-lg border border-violet-300 py-1.5 text-[10px] font-medium text-violet-600">Propose for Intuit-wide</button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">{tab}</div>
      )}
    </RailFrame>
  );
}

/* Step 7: Shared Skill — 9:31 AM */
function VisualSharedSkill() {
  const planSteps = [
    { text: "Go to Settings → Advanced", done: true },
    { text: "Toggle Multi-currency ON", done: true },
    { text: "Select home currency (USD)", done: false },
    { text: "Save and confirm — this cannot be undone", done: false },
    { text: "Remind customer: multi-currency can't be turned off once enabled", done: false },
  ];

  return (
    <RailFrame defaultTab="Plan">
      {(tab) => tab === "Plan" ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-zinc-800">Multi-Currency Setup</span>
            <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-medium text-violet-600">
              2/5
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <Badge>Imported Skill</Badge>
            <span className="text-zinc-400">by Marcus · 5 steps</span>
          </div>

          <div className="h-1 rounded-full bg-zinc-100 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-400" style={{ width: "40%" }} />
          </div>

          <div className="space-y-1">
            {planSteps.map((s, i) => (
              <div key={i} className={`flex items-start gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] ${
                s.done ? "border-emerald-200 bg-emerald-50/50 opacity-60" : "border-zinc-200 bg-white"
              }`}>
                <div className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
                  s.done ? "border-emerald-400 bg-emerald-400 text-white" : "border-zinc-300"
                }`}>
                  {s.done && (
                    <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={s.done ? "line-through text-zinc-400" : "text-zinc-700"}>
                  {s.text}
                  {i === 4 && <span className="ml-1"><Badge color="amber">You</Badge></span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">{tab}</div>
      )}
    </RailFrame>
  );
}

/* Step 11: End of day — 4:55 PM */
function VisualEndOfDay() {
  return (
    <RailFrame defaultTab="Chat">
      {(tab) => tab === "Chat" ? (
        <div className="space-y-3">
          <ChatBubble role="shadow">
            Great shift, Asha. Here&apos;s your daily summary:
          </ChatBubble>

          <div className="rounded-lg border border-zinc-200 px-3 py-2.5">
            <div className="text-[10px] font-semibold uppercase text-zinc-500 mb-2">Daily Summary</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "11", label: "Contacts handled" },
                { value: "52s", label: "Avg wrap-up" },
                { value: "1", label: "Skill step proposed" },
                { value: "1", label: "Shared Skill imported" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-zinc-50 px-2.5 py-2 text-center">
                  <div className="text-[16px] font-bold text-violet-600">{s.value}</div>
                  <div className="text-[9px] text-zinc-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[10px] text-zinc-500 text-center">
              Team avg wrap-up: <span className="text-zinc-400">3m 40s</span> → yours: <span className="font-semibold text-emerald-600">52s</span>
            </div>
          </div>

          <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2">
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span className="font-semibold text-violet-700">Expert Profile</span>
              <span className="text-violet-600">72% → <strong>74%</strong></span>
            </div>
            <div className="h-1 rounded-full bg-violet-200">
              <div className="h-1 rounded-full bg-violet-500" style={{ width: "74%" }} />
            </div>
            <div className="mt-1 text-[9px] text-violet-600">+6 session observations today</div>
          </div>

          <ChatBubble role="shadow">
            Your reconciliation Skill was used by <strong>2 other experts</strong> today after you proposed the new step. Both kept it.
          </ChatBubble>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-[11px] text-zinc-400">{tab}</div>
      )}
    </RailFrame>
  );
}

/* ═══════════════════════════════════════════════════
   Timeline data & types
   ═══════════════════════════════════════════════════ */

interface TimelineStep {
  time: string;
  title: string;
  description: string;
  shadow: string;
  details?: string[];
  milestone?: string;
  visual?: ReactNode;
}

const timeline: TimelineStep[] = [
  {
    time: "8:58 AM",
    title: "Asha logs in and Shadow wakes up",
    description:
      "Asha Patel, a QuickBooks product expert with 9 years of experience, logs into the Intuit Expert Platform. The Shadow Chrome Extension detects the login and opens in the right rail.",
    shadow:
      "Shadow loads Asha's Expert Profile — her preferred navigation patterns, her 14 validated Skills, her communication style notes. It also pulls the day's queue summary: 12 scheduled contacts, mostly bookkeeping and reconciliation topics.",
    details: [
      "Shadow shows: 'Good morning, Asha. 12 contacts today. 3 are returning customers — I've loaded their history.'",
      "Asha's capture settings auto-apply: Clicks ✓, Types ✓, Network ✓, Screenshots ✓, Hovers off.",
    ],
    visual: <VisualLogin />,
  },
  {
    time: "9:02 AM",
    title: "First contact: pre-call prep",
    description:
      "A customer named David Park is calling about a reconciliation discrepancy. Asha has a 2-minute prep window before the call connects.",
    shadow:
      "Shadow queries the Context & Memory Service. David called 3 weeks ago about a similar issue — different expert handled it, but Shadow has the full context. It fetches 2 Skills from Asha's library that match the topic: 'qbo-reconcile-account' and 'qbo-resolve-discrepancy.'",
    details: [
      "Pre-call card shows: 'David Park — returning customer. Last contact: Feb 1 (reconciliation help, resolved by Marcus). Open item: David mentioned he'd call back about January close.'",
      "Asha previews the 'qbo-reconcile-account' Skill. It's hers — personalized with her approach of tackling largest discrepancies first. She's ready.",
    ],
    visual: <VisualPreCall />,
  },
  {
    time: "9:04 AM",
    title: "Call begins — Shadow observes",
    description:
      "The call connects. Asha greets David, references his previous call (thanks to Shadow's context), and starts working through the reconciliation. Shadow captures the session.",
    shadow:
      "Capture is active — recording clicks, navigation, and typing. Audio is being transcribed in real time (transcript only, raw audio stays on-device). Shadow detects Asha navigating to Bookkeeping → Reconcile and matches it to Step 1 of the fetched Skill.",
    details: [
      "Shadow nudge (subtle, in the right rail): 'David's last reconciliation had a $247 discrepancy in the Supplies category — might be relevant here.'",
      "Asha glances at the nudge, nods, and asks David about recent Supplies purchases. It's the right thread to pull.",
    ],
    visual: <VisualDuringCall />,
  },
  {
    time: "9:18 AM",
    title: "Mid-call: Shadow spots something new",
    description:
      "While resolving the discrepancy, Asha navigates to a report she doesn't usually use — the Transaction Detail by Account report. She filters it in a specific way to isolate the problem transactions.",
    shadow:
      "Shadow notices this isn't part of any existing Skill. It flags it internally as a potential new step: 'Expert used Transaction Detail by Account report (filtered by date range + category) during reconciliation — not in current Skills.'",
  },
  {
    time: "9:26 AM",
    title: "Call wraps — Shadow takes over the tedious part",
    description:
      "Asha resolves the issue. The call ends. Normally, this is where she'd spend 3-4 minutes writing a case summary, scheduling a follow-up, and updating the CRM. Instead:",
    shadow:
      "Shadow presents the wrap-up automatically. Case summary pre-written from the transcript and session context. Follow-up suggestion: 'David mentioned he wants to check in after month-end close — schedule for March 3?' CRM fields pre-populated.",
    details: [
      "Asha scans the summary — it's accurate. She edits one line ('Changed \"billing discrepancy\" to \"reconciliation discrepancy\"'), confirms the follow-up, and hits Submit. 45 seconds instead of 4 minutes.",
      "Shadow writes the session back to the Context & Memory Service: summary, resolution, follow-up, Skills used.",
    ],
    milestone: "This is Shadow's upfront value — saving time on work Asha already has to do.",
    visual: <VisualWrapUp />,
  },
  {
    time: "9:27 AM",
    title: "Post-call: Shadow proposes a Skill update",
    description:
      "After the wrap-up, Shadow has one more thing to show Asha.",
    shadow:
      "Shadow detected the new pattern (the Transaction Detail report step) and proposes updating the 'qbo-reconcile-account' Skill. It shows a diff: the existing 4 core steps plus a new suggested step between steps 2 and 3.",
    details: [
      "Proposed new step: 'If discrepancy source is unclear, run Transaction Detail by Account report filtered by date range and category to isolate problem transactions.'",
      "The step is tagged as 'Yours' (personalized) since only Asha has used this approach so far.",
      "Asha reviews it, tweaks the wording ('Run Transaction Detail report' → 'Pull the Transaction Detail by Account report'), and approves. The Skill is updated, version 4.",
      "Shadow asks: 'This step could be useful to other experts. Want to propose it as a core step for the Intuit-wide version?' Asha says yes. Shadow strips her personal phrasing and queues the core version for review.",
    ],
    visual: <VisualSkillUpdate />,
  },
  {
    time: "9:31 AM",
    title: "Contact #2: a topic Asha hasn't seen before",
    description:
      "Next customer: small business owner asking about setting up multi-currency in QBO. Asha has never handled this. No Skills in her library match.",
    shadow:
      "Shadow searches the shared Intuit-wide Skill library. It finds 'qbo-enable-multicurrency' — created by Marcus, another expert, 2 weeks ago. 5 core steps. Shadow pulls it into Asha's Right Panel.",
    details: [
      "Asha opens the Skill in the Plan Tab. Shadow walks her through each step: 'Step 1: Go to Settings → Advanced. Step 2: Enable Multi-currency. Here's what you'll see...'",
      "Asha follows along, helping the customer. She's never done this before, but the Skill gives her the exact path.",
      "After the call, Shadow suggests: 'Want to add this Skill to your library? You can personalize it with your own steps.' Asha adds it and inserts a personalized step: 'Remind customer that multi-currency can't be turned off once enabled.'",
    ],
    milestone: "This is Skill reuse in action — one expert's knowledge, instantly available to another.",
    visual: <VisualSharedSkill />,
  },
  {
    time: "10:45 AM",
    title: "A quick Right Panel interaction between calls",
    description:
      "Asha has a 5-minute gap between contacts. She's curious about a customer's payment history.",
    shadow:
      "Asha types in the Right Panel: 'Pull up recent payments for Acme Corp.' Shadow is in Agent Mode. It finds the 'qbo-lookup-customer-payments' Skill and presents an execution preview: Customer: Acme Corp, Period: Last 90 days.",
    details: [
      "Asha hits 'Approve & Execute.' Shadow runs the Skill — navigates to the Customers page, searches for Acme Corp, opens their transaction history, filters to payments in the last 90 days.",
      "Shadow: 'Done. 7 payments found. Most recent: $4,200 on Feb 15. There are 2 overdue invoices — $1,800 and $950.'",
      "Asha didn't have to navigate a single screen. She reviews the results Shadow surfaced and moves to her next call prepared.",
    ],
    milestone: "This is the Right Panel as a working partner — not a chatbot, an agent that acts.",
  },
  {
    time: "12:30 PM",
    title: "Lunch — Shadow keeps learning",
    description:
      "Asha takes lunch. No capture is running — Shadow only records when she starts a session.",
    shadow:
      "In the background (server-side, not on Asha's machine), Shadow's analysis engine processes the morning's 6 sessions. It detects a pattern: Asha resolves reconciliation calls 22% faster than the team average. The difference? She always checks the Transaction Detail report. Shadow notes this in her Expert Profile.",
  },
  {
    time: "2:15 PM",
    title: "Asha reviews her Skills library",
    description:
      "Between calls, Asha opens the Skills tab. She has 15 Skills now — 14 she started the day with plus the multi-currency one she imported.",
    shadow:
      "Skills Tab shows each Skill with its steps broken down by Core vs. Yours. She notices 'qbo-create-expense' has 3 core steps and 1 personalized step (her keyboard shortcut preference). She deletes an old Skill she no longer uses — soft deleted, recoverable for 30 days.",
    details: [
      "Asha checks the 'qbo-reconcile-account' Skill she updated this morning. The new Transaction Detail step shows 'Proposed for Intuit-wide' with a status of 'Under review.'",
      "She sees related Skills: 'qbo-navigate-to-bookkeeping' (imported, required) and 'qbo-generate-reconciliation-report' (optional, can be invoked after reconciliation).",
    ],
  },
  {
    time: "4:55 PM",
    title: "End of shift — Shadow summarizes the day",
    description:
      "Asha wraps her last call and closes out the day.",
    shadow:
      "Shadow shows a daily summary: 11 contacts handled. Average wrap-up time: 52 seconds (team average: 3m 40s). 1 new Skill step proposed. 1 shared Skill imported. Expert Profile updated with 6 new session observations.",
    details: [
      "Asha's Expert Profile strength has gone from 72% to 74% — it's learning more about how she works with every session.",
      "Shadow: 'Your reconciliation Skill was used by 2 other experts today after you proposed the new step. Both kept it.'",
    ],
    milestone: "Day 1 value: time saved on wrap-up. Week 1 value: Skills accumulate. Month 1 value: Shadow knows you. Month 3 value: your expertise scales beyond you.",
    visual: <VisualEndOfDay />,
  },
];

/* ═══════════════════════════════════════════════════
   Timeline card & page
   ═══════════════════════════════════════════════════ */

function TimelineCard({ step, index }: { step: TimelineStep; index: number }) {
  const [expanded, setExpanded] = useState(index < 3);

  const textContent = (
    <>
      <div className="mb-1 text-xs font-semibold text-accent">{step.time}</div>
      <h3 className="mb-2 text-lg font-bold text-zinc-900">{step.title}</h3>
      <p className="mb-3 text-sm leading-relaxed text-zinc-600">{step.description}</p>

      <div className="mb-3 rounded-lg border border-accent/20 bg-accent-light/30 p-3">
        <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-accent">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-accent text-[8px] font-bold text-white">S</span>
          What Shadow does
        </div>
        <p className="text-sm leading-relaxed text-zinc-700">{step.shadow}</p>
      </div>

      {step.details && step.details.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mb-2 flex items-center gap-1 text-xs font-medium text-accent hover:underline"
          >
            {expanded ? "Hide" : "Show"} details
            <svg
              className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expanded && (
            <div className="space-y-2 rounded-lg bg-zinc-50 p-3">
              {step.details.map((d, i) => (
                <div key={i} className="flex gap-2 text-sm leading-relaxed text-zinc-600">
                  <span className="mt-1 shrink-0 text-zinc-300">•</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {step.milestone && (
        <div className="mt-3 rounded-lg border-l-4 border-accent bg-accent/5 px-4 py-2.5 text-sm font-medium text-zinc-800">
          {step.milestone}
        </div>
      )}
    </>
  );

  return (
    <div className="relative flex gap-6">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white text-xs font-bold ${
          step.visual ? "border-violet-600 text-violet-600" : "border-accent text-accent"
        }`}>
          {index + 1}
        </div>
        {index < timeline.length - 1 && (
          <div className="w-px flex-1 bg-border" />
        )}
      </div>

      {/* Content — side-by-side when visual is present */}
      <div className="mb-10 min-w-0 flex-1 pb-2">
        {step.visual ? (
          <div className="flex flex-col lg:flex-row lg:gap-6">
            <div className="lg:w-[55%] min-w-0">{textContent}</div>
            <div className="mt-4 lg:mt-0 lg:w-[45%] shrink-0">
              <div className="lg:sticky lg:top-24">
                {step.visual}
              </div>
            </div>
          </div>
        ) : (
          textContent
        )}
      </div>
    </div>
  );
}

export default function DayInTheLifePage() {
  return (
    <>
      <PageHeader
        title="A Day in the Life"
        description="Follow Asha Patel — a QuickBooks product expert — through a full shift with Shadow. See how capture, Skills, the Right Panel, and the Context & Memory Service come together across real calls."
        badge="Narrative"
      />
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12 rounded-lg border border-accent-light bg-accent-light/20 p-5">
          <p className="text-sm leading-relaxed">
            This isn&apos;t a prototype — it&apos;s a story. Each step shows what the expert does and
            what Shadow does in parallel. Steps with a Right Rail mockup show exactly what Shadow&apos;s
            panel looks like at that moment. Expand any step for details.
          </p>
        </div>

        {/* Expert profile card */}
        <div className="mb-12 flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/10 text-2xl">
            👩‍💼
          </div>
          <div>
            <div className="font-bold text-zinc-900">Asha Patel</div>
            <div className="text-sm text-zinc-500">QuickBooks Product Expert · 9 years at Intuit</div>
            <div className="mt-1 flex gap-3 text-xs text-zinc-400">
              <span><strong className="text-accent">14</strong> Skills</span>
              <span><strong className="text-amber-500">247</strong> sessions captured</span>
              <span><strong className="text-emerald-500">74%</strong> profile strength</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          {timeline.map((step, i) => (
            <TimelineCard key={i} step={step} index={i} />
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h3 className="mb-4 text-lg font-bold">What happened in one shift</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { value: "~30 min", label: "saved on wrap-up across 11 calls" },
              { value: "1", label: "new Skill step proposed for Intuit-wide use" },
              { value: "1", label: "shared Skill imported and personalized" },
              { value: "2", label: "other experts adopted Asha's new step" },
              { value: "6", label: "sessions added to Asha's Expert Profile" },
              { value: "3", label: "returning customers served with full context" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-accent">{stat.value}</span>
                <span className="text-sm text-zinc-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
