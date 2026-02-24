"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";

interface TimelineStep {
  time: string;
  title: string;
  description: string;
  shadow: string;
  details?: string[];
  milestone?: string;
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
  },
  {
    time: "9:18 AM",
    title: "Mid-call: Shadow spots something new",
    description:
      "While resolving the discrepancy, Asha navigates to a report Asha doesn't usually use — the Transaction Detail by Account report. She filters it in a specific way to isolate the problem transactions.",
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
  },
  {
    time: "9:31 AM",
    title: "Contact #2: a topic Asha hasn't seen before",
    description:
      "Next customer: small business owner asking about setting up multi-currency in QBO. Asha has never handled this. No Skills in her library match.",
    shadow:
      "Shadow searches the shared Intuit-wide Skill library. It finds 'qbo-enable-multicurrency' — created by Marcus, another expert, 2 weeks ago. 5 core steps. Shadow pulls it into Asha's Right Panel.",
    details: [
      "Asha opens the Skill in Plan Mode. Shadow walks her through each step in the chat: 'Step 1: Go to Settings → Advanced. Step 2: Enable Multi-currency. Here's what you'll see...'",
      "Asha follows along, helping the customer. She's never done this before, but the Skill gives her the exact path.",
      "After the call, Shadow suggests: 'Want to add this Skill to your library? You can personalize it with your own steps.' Asha adds it and inserts a personalized step: 'Remind customer that multi-currency can't be turned off once enabled.'",
    ],
    milestone: "This is Skill reuse in action — one expert's knowledge, instantly available to another.",
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
  },
];

function TimelineCard({ step, index }: { step: TimelineStep; index: number }) {
  const [expanded, setExpanded] = useState(index < 3);

  return (
    <div className="relative flex gap-6">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-white text-xs font-bold text-accent">
          {index + 1}
        </div>
        {index < timeline.length - 1 && (
          <div className="w-px flex-1 bg-border" />
        )}
      </div>

      {/* Content */}
      <div className="mb-10 min-w-0 flex-1 pb-2">
        <div className="mb-1 text-xs font-semibold text-accent">{step.time}</div>
        <h3 className="mb-2 text-lg font-bold text-zinc-900">{step.title}</h3>
        <p className="mb-3 text-sm leading-relaxed text-zinc-600">{step.description}</p>

        {/* Shadow's role */}
        <div className="mb-3 rounded-lg border border-accent/20 bg-accent-light/30 p-3">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-accent">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-accent text-[8px] font-bold text-white">S</span>
            What Shadow does
          </div>
          <p className="text-sm leading-relaxed text-zinc-700">{step.shadow}</p>
        </div>

        {/* Expandable details */}
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

        {/* Milestone callout */}
        {step.milestone && (
          <div className="mt-3 rounded-lg border-l-4 border-accent bg-accent/5 px-4 py-2.5 text-sm font-medium text-zinc-800">
            {step.milestone}
          </div>
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
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-12 rounded-lg border border-accent-light bg-accent-light/20 p-5">
          <p className="text-sm leading-relaxed">
            This isn&apos;t a prototype — it&apos;s a story. Each step shows what the expert does and
            what Shadow does in parallel. Expand any step for the details. The goal: by the end of one
            shift, you see how Shadow earns its place as a working partner.
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
