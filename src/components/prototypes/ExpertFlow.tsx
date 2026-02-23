"use client";

import { useState, useEffect, useRef } from "react";
import { skills, contactTopics, expertProfile, customerMemory } from "@/data/skills";
import BrowserMockup from "./BrowserMockup";
import ExpertPortal from "./ExpertPortal";

type Phase = "pre-call" | "during-call" | "post-call" | "refine";

const topic = contactTopics[0];
const relatedSkills = skills.filter((s) =>
  topic.relatedSkillIds.includes(s.id)
);

const callSummary = {
  duration: "4m 32s",
  actionsDetected: 18,
  highlights: [
    "Reconciliation discrepancy of $1,247.50 on checking account.",
    "Navigated to Bookkeeping → Reconcile.",
    "Identified 3 uncleared transactions (45+ days old).",
    "Walked customer through matching to bank statement.",
    "Discrepancy resolved — difference $0.00.",
  ],
};

const proposedSkill = {
  name: "qbo-resolve-reconciliation-discrepancy",
  description:
    "Diagnose and resolve a reconciliation discrepancy in QBO.",
  steps: [
    "Ask when they last reconciled and the discrepancy amount.",
    "Go to Bookkeeping → Reconcile, select the account.",
    "Enter statement ending date and ending balance.",
    'Click "Start reconciling."',
    "Sort by date, look for uncleared transactions > 30 days.",
    "Cross-reference against bank statement.",
    "Check off matching transactions.",
    "If missing, ask customer to verify with bank.",
    'Once $0.00, click "Finish now."',
    "Confirm with customer.",
  ],
};

const refinementChat = [
  { role: "expert" as const, text: "Step 5 should also mention looking for duplicates — sometimes the discrepancy comes from a transaction entered twice." },
  { role: "shadow" as const, text: 'Updated step 5: "Sort by date, look for uncleared transactions > 30 days and any duplicate entries."' },
  { role: "expert" as const, text: "Add a step after 8: if discrepancy persists, run a Reconciliation Report to find the gap." },
  { role: "shadow" as const, text: 'Added step 9: "Go to Reports → Reconciliation Report to identify the gap." Steps 9-10 are now 10-11.' },
];

export default function ExpertFlow() {
  const [phase, setPhase] = useState<Phase>("pre-call");
  const [countdown, setCountdown] = useState(120);
  const [callTimer, setCallTimer] = useState(0);
  const [refineChatIndex, setRefineChatIndex] = useState(0);
  const [skillAccepted, setSkillAccepted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "pre-call" || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== "during-call") return;
    const t = setInterval(() => setCallTimer((c) => c + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [refineChatIndex]);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const phases: { id: Phase; label: string }[] = [
    { id: "pre-call", label: "Pre-Call" },
    { id: "during-call", label: "During" },
    { id: "post-call", label: "Post-Call" },
    { id: "refine", label: "Refine" },
  ];

  const shadowPanel = (
    <div className="flex h-full flex-col">
      {/* Panel header */}
      <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-600 text-[9px] font-bold text-white">S</span>
        <span className="text-[11px] font-semibold text-zinc-800">Shadow</span>
        {phase === "during-call" && (
          <span className="ml-auto flex items-center gap-1 text-[9px] text-green-600">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            Capturing
          </span>
        )}
      </div>

      {/* Phase tabs */}
      <div className="flex border-b border-zinc-200">
        {phases.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setPhase(p.id);
              if (p.id === "pre-call") setCountdown(120);
              if (p.id === "during-call") setCallTimer(0);
              if (p.id === "refine") { setRefineChatIndex(0); setSkillAccepted(false); }
            }}
            className={`flex-1 py-1.5 text-[10px] font-medium transition-colors ${
              phase === p.id
                ? "border-b-2 border-violet-600 text-violet-600"
                : "text-zinc-400 hover:text-zinc-700"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Phase content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Pre-call */}
        {phase === "pre-call" && (
          <div className="space-y-2">
            {/* Expert Profile card */}
            <div className="rounded-md border border-violet-200 bg-gradient-to-r from-violet-50 to-white p-2">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-[8px] font-bold text-white">
                  AP
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-semibold text-zinc-800">{expertProfile.name}</div>
                  <div className="text-[8px] text-zinc-400">{expertProfile.sessionsLogged} sessions &middot; {expertProfile.skillsGenerated} skills</div>
                </div>
              </div>
              <div className="mt-1.5">
                <div className="flex items-center justify-between text-[8px]">
                  <span className="text-zinc-400">Profile strength</span>
                  <span className="font-medium text-violet-600">{expertProfile.profileStrength}%</span>
                </div>
                <div className="mt-0.5 h-1 w-full rounded-full bg-zinc-200">
                  <div className="h-1 rounded-full bg-violet-500" style={{ width: `${expertProfile.profileStrength}%` }} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-violet-600">
                Incoming Contact
              </span>
              <span className="font-mono text-sm font-bold text-violet-600">
                {fmt(countdown)}
              </span>
            </div>
            <div className="rounded-md bg-violet-50 p-2 text-[10px] font-medium text-zinc-800">
              {topic.topic}
            </div>
            <div className="rounded-md border border-zinc-200 p-2 text-[10px] text-zinc-500">
              {topic.customerContext}
            </div>

            {/* Customer Memory from Context & Memory Service */}
            <div className="rounded-md border border-blue-200 bg-blue-50/50 p-2">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[9px] font-semibold uppercase text-blue-600">Customer History</span>
                <span className="rounded bg-blue-100 px-1 py-0.5 text-[7px] text-blue-600">Memory Service</span>
              </div>
              <div className="text-[8px] text-zinc-400 mb-1">
                {customerMemory.totalInteractions} interactions &middot; Last: {customerMemory.lastContact}
              </div>
              {customerMemory.episodes.slice(0, 2).map((ep, i) => (
                <div key={i} className="mb-1 rounded bg-white/80 px-1.5 py-1 border border-blue-100">
                  <div className="flex items-center gap-1 text-[8px]">
                    <span className="font-medium text-zinc-700">{ep.topic}</span>
                    <span className="text-zinc-300">&middot;</span>
                    <span className="text-zinc-400">{ep.date}</span>
                  </div>
                  <div className="text-[8px] text-zinc-500 mt-0.5">{ep.resolution}</div>
                  {ep.followUp && (
                    <div className="text-[8px] text-amber-600 mt-0.5">Follow-up: {ep.followUp}</div>
                  )}
                </div>
              ))}
              {customerMemory.openItems.length > 0 && (
                <div className="mt-1 rounded bg-amber-50 px-1.5 py-1 border border-amber-200">
                  <div className="text-[7px] font-semibold uppercase text-amber-600">Open item</div>
                  {customerMemory.openItems.map((item, i) => (
                    <div key={i} className="text-[8px] text-amber-700">{item}</div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-1">
              <div className="mb-1 flex items-center gap-1.5">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-violet-600">
                  Your Skills
                </span>
                <span className="rounded bg-violet-100 px-1 py-0.5 text-[7px] font-medium text-violet-600">
                  Personalized
                </span>
              </div>
              {relatedSkills.map((skill) => (
                <div key={skill.id} className="rounded-md border border-zinc-200 p-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] text-violet-600">{skill.name}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-zinc-500">{skill.description}</p>
                  {skill.styleNotes && skill.styleNotes.length > 0 && (
                    <div className="mt-1 rounded bg-amber-50 px-1.5 py-1">
                      <div className="text-[7px] font-semibold uppercase text-amber-600">Your style</div>
                      {skill.styleNotes.map((note, i) => (
                        <div key={i} className="text-[8px] text-amber-700">&bull; {note}</div>
                      ))}
                    </div>
                  )}
                  <details className="mt-1">
                    <summary className="cursor-pointer text-[9px] font-medium text-violet-600">
                      Preview steps
                    </summary>
                    <ol className="mt-1 space-y-0.5 pl-3 text-[9px] text-zinc-500">
                      {skill.steps.map((s, i) => (
                        <li key={i} className="list-decimal">{s}</li>
                      ))}
                    </ol>
                  </details>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setPhase("during-call"); setCallTimer(0); }}
              className="w-full rounded-md bg-green-600 py-1.5 text-[10px] font-medium text-white"
            >
              Call Connected
            </button>
          </div>
        )}

        {/* During call */}
        {phase === "during-call" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-md bg-green-50 p-2">
              <span className="text-[10px] font-medium text-green-700">Active call</span>
              <span className="font-mono text-sm font-bold text-green-700">{fmt(callTimer)}</span>
            </div>
            <div className="rounded-md border border-violet-200 bg-violet-50 p-2">
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-semibold uppercase text-violet-600">Nudge</span>
                <span className="rounded bg-amber-100 px-1 py-0.5 text-[7px] text-amber-700">Based on your pattern</span>
              </div>
              <p className="mt-0.5 text-[10px] text-zinc-600">
                You usually check reconciliation history before asking questions. Pull up Bookkeeping → Reconcile and check when they last reconciled.
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 p-2">
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-semibold text-zinc-500">Your Skill</span>
                <span className="rounded bg-violet-100 px-1 py-0.5 text-[7px] text-violet-600">Personalized</span>
              </div>
              <div className="mt-0.5 font-mono text-[9px] text-violet-600">{relatedSkills[0]?.name}</div>
              <ol className="mt-1 space-y-0.5 pl-3 text-[9px] text-zinc-500">
                {relatedSkills[0]?.steps.map((s, i) => (
                  <li key={i} className="list-decimal">{s}</li>
                ))}
              </ol>
            </div>
            <div className="rounded bg-zinc-50 p-1.5 text-[8px] text-zinc-400">
              Shadow is observing &middot; Learning your approach to this case type
            </div>
            <button
              onClick={() => setPhase("post-call")}
              className="w-full rounded-md bg-red-500 py-1.5 text-[10px] font-medium text-white"
            >
              End Call
            </button>
          </div>
        )}

        {/* Post-call */}
        {phase === "post-call" && (
          <div className="space-y-2">
            <div className="rounded-md border border-zinc-200 p-2">
              <div className="mb-1 text-[9px] font-semibold uppercase text-zinc-500">Call Summary</div>
              <div className="flex gap-3 text-[9px] text-zinc-500">
                <span>{callSummary.duration}</span>
                <span>{callSummary.actionsDetected} actions</span>
              </div>
              <ul className="mt-1.5 space-y-1">
                {callSummary.highlights.map((h, i) => (
                  <li key={i} className="flex gap-1 text-[10px] text-zinc-600">
                    <span className="shrink-0 text-violet-400">&#8226;</span>{h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Memory write-back */}
            <div className="rounded-md border border-blue-200 bg-blue-50/50 p-2">
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-semibold uppercase text-blue-600">Memory Updated</span>
                <span className="rounded bg-blue-100 px-1 py-0.5 text-[7px] text-blue-600">Context Service</span>
              </div>
              <div className="mt-1 space-y-0.5 text-[8px] text-zinc-500">
                <div className="flex items-center gap-1">
                  <span className="text-green-500">&#10003;</span>
                  Session summary saved to {customerMemory.name}&apos;s record
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-500">&#10003;</span>
                  Resolution: Reconciliation discrepancy resolved
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-500">&#10003;</span>
                  Interaction count: {customerMemory.totalInteractions} → {customerMemory.totalInteractions + 1}
                </div>
              </div>
            </div>

            <div className="rounded-md border border-violet-200 bg-violet-50 p-2">
              <div className="mb-0.5 flex items-center gap-1">
                <span className="text-[9px] font-semibold uppercase text-violet-600">Proposed Skill</span>
                <span className="rounded bg-violet-100 px-1 py-0.5 text-[7px] text-violet-600">Auto-detected</span>
                <span className="rounded bg-amber-100 px-1 py-0.5 text-[7px] text-amber-700">Your style</span>
              </div>
              <div className="font-mono text-[9px] text-violet-700">{proposedSkill.name}</div>
              <p className="mt-0.5 text-[9px] text-zinc-500">{proposedSkill.description}</p>
              <ol className="mt-1 space-y-0.5 pl-3 text-[9px] text-zinc-500">
                {proposedSkill.steps.map((s, i) => (
                  <li key={i} className="list-decimal">{s}</li>
                ))}
              </ol>
              <div className="mt-1.5 rounded bg-amber-50 px-1.5 py-1">
                <div className="text-[7px] font-semibold uppercase text-amber-600">Personalized details</div>
                <div className="text-[8px] text-amber-700">&bull; Reflects your pattern: check reconciliation history first</div>
                <div className="text-[8px] text-amber-700">&bull; Uses your second-tab Reconciliation Report approach</div>
                <div className="text-[8px] text-amber-700">&bull; Includes verbal walkthrough phrasing from your sessions</div>
              </div>
              <div className="mt-1.5 text-[8px] text-zinc-400">
                Based on {expertProfile.sessionsLogged} sessions in your Expert Profile
              </div>
              <div className="mt-2 flex gap-1">
                <button
                  onClick={() => { setPhase("refine"); setRefineChatIndex(0); setSkillAccepted(false); }}
                  className="rounded border border-violet-300 px-2 py-1 text-[9px] font-medium text-violet-600 hover:bg-violet-100"
                >
                  Modify
                </button>
                <button
                  onClick={() => setSkillAccepted(true)}
                  className="rounded bg-violet-600 px-2 py-1 text-[9px] font-medium text-white"
                >
                  Accept
                </button>
                <button className="rounded border border-zinc-200 px-2 py-1 text-[9px] text-zinc-400">
                  Dismiss
                </button>
              </div>
              {skillAccepted && (
                <div className="mt-1.5 rounded bg-green-50 p-1.5 text-[9px] text-green-700">
                  Skill saved to your personal library &middot; Expert Profile updated
                </div>
              )}
            </div>
          </div>
        )}

        {/* Refine */}
        {phase === "refine" && (
          <div className="space-y-2">
            <div className="text-[9px] text-zinc-400">
              Refine the proposed Skill with Shadow — like pair-editing with an assistant that knows your style.
            </div>
            <div className="rounded bg-amber-50 px-2 py-1 text-[8px] text-amber-700">
              Your refinements train Shadow on your preferences. Each edit makes future Skills more accurate for you.
            </div>
            <div className="max-h-[300px] space-y-1.5 overflow-y-auto rounded-md border border-zinc-200 bg-zinc-50 p-2">
              {refinementChat.slice(0, refineChatIndex + 1).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "expert" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[88%] rounded-md px-2 py-1.5 text-[10px] leading-relaxed ${
                    msg.role === "expert"
                      ? "bg-violet-600 text-white"
                      : "border border-zinc-200 bg-white text-zinc-700"
                  }`}>
                    <div className="mb-0.5 text-[8px] font-semibold opacity-70">
                      {msg.role === "expert" ? "You" : "Shadow"}
                    </div>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {refineChatIndex < refinementChat.length - 1 && (
              <button
                onClick={() => setRefineChatIndex((i) => Math.min(i + 1, refinementChat.length - 1))}
                className="w-full rounded-md border border-violet-300 py-1.5 text-[10px] font-medium text-violet-600 hover:bg-violet-50"
              >
                {refineChatIndex % 2 === 0 ? "Send next message" : "See Shadow's response"}
              </button>
            )}
            {refineChatIndex >= refinementChat.length - 1 && !skillAccepted && (
              <button
                onClick={() => setSkillAccepted(true)}
                className="w-full rounded-md bg-violet-600 py-1.5 text-[10px] font-medium text-white"
              >
                Approve Updated Skill
              </button>
            )}
            {skillAccepted && (
              <div className="rounded-md bg-green-50 p-2 text-center text-[10px] text-green-700">
                Skill refined and saved &middot; Expert Profile updated &middot; Profile strength: {expertProfile.profileStrength + 1}%
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const portalCustomerContext = [
    { label: "Relationship", value: "Returning customer" },
    { label: "Called within 7 days", value: "None" },
    { label: "Open investigation", value: "None" },
    { label: "Risk", value: "Low" },
    { label: "Product", value: "QBO" },
  ];

  return (
    <BrowserMockup
      url="expert.intuit.com/workflow/reconciliation"
      tabTitle="Intuit Expert Platform"
      portalContent={
        <ExpertPortal
          workflow="Reconciliation"
          listeningStatus={phase === "during-call" ? "Listening..." : phase === "pre-call" ? "Connecting..." : "Complete"}
          customerName="David Park"
          agentName="Asha Patel"
          mostLikely="Reconciliation discrepancy"
          customerContext={portalCustomerContext}
          welcomeMessage={
            phase === "pre-call" ? (
              <div className="text-[11px] leading-relaxed text-zinc-600">
                <p className="italic text-zinc-400">Connecting customer...</p>
                <p className="mt-1">Shadow is pulling customer history and preparing relevant Skills.</p>
              </div>
            ) : phase === "during-call" ? (
              <div className="text-[11px] leading-relaxed text-zinc-600">
                <p>Hi David, thanks for calling QuickBooks support.</p>
                <p className="mt-1">I see you&apos;re having a reconciliation issue. Let me pull up your account.</p>
              </div>
            ) : (
              <div className="text-[11px] leading-relaxed text-zinc-600">
                <p>Call complete. Discrepancy resolved.</p>
                <p className="mt-1 text-green-600">CSAT: Pending &middot; Resolution: First-call</p>
              </div>
            )
          }
        />
      }
      shadowPanel={shadowPanel}
      callControls={
        <div className="flex items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-medium text-zinc-600">
              {phase === "during-call" ? fmt(callTimer) : phase === "pre-call" ? "0:00" : callSummary.duration}
            </span>
            <span className={`h-1.5 w-1.5 rounded-full ${phase === "during-call" ? "bg-green-500" : phase === "pre-call" ? "bg-yellow-400" : "bg-zinc-300"}`} />
          </div>
          <div className="flex items-center gap-1.5">
            {["M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
              "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ].map((d, i) => (
              <button key={i} className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-zinc-600">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} /></svg>
              </button>
            ))}
            <button className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${phase === "during-call" ? "bg-red-500" : "bg-zinc-400"}`}>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
            </button>
          </div>
        </div>
      }
    />
  );
}
