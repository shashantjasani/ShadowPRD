export const siteTitle = "Shadow — Product Requirements";
export const siteDescription =
  "Interactive PRD for Shadow: capture how experts work, turn it into reusable Skills, and serve it up where people need it.";

export const hero = {
  headline: "Shadow",
  subline: "Cursor for Intuit Experts",
  description:
    "Cursor changed how developers build software — an AI companion embedded in their editor that learns their codebase, suggests what to do next, and executes on their behalf. Shadow does the same thing for Intuit Experts. It sits inside the tools they already use, learns how they work, and turns that knowledge into reusable Skills that any expert or agent can run.",
  analogy: [
    { cursor: "IDE / Code Editor", shadow: "Chrome Extension + Desktop Client" },
    { cursor: "Codebase indexing", shadow: "Session capture & Expert Profile" },
    { cursor: "Thinking / Reasoning display", shadow: "Shadow Reasoning (transparent thought process)" },
    { cursor: "Autocomplete & proactive suggestions", shadow: "Proactive Messages (contextual nudges in chat)" },
    { cursor: "Chat panel", shadow: "Right Panel Chat" },
    { cursor: "Plan mode (to-do checklist)", shadow: "Plan Tab (multi-Skill task plans)" },
    { cursor: "Rules & .cursorrules", shadow: "Expert preferences & personalization" },
    { cursor: "Agent Skills", shadow: "Shadow Skills (core + personalized steps)" },
    { cursor: "Multi-file edits", shadow: "Multi-step workflow automation" },
  ],
};

export const background = {
  problem: [
    "The gap between our best agents and everyone else isn't about training or effort — it's hundreds of small behaviors we can't see: which tools to check first, what questions to ask, how to navigate edge cases, and which repetitive tasks to automate so they can focus on the customer.",
    "That knowledge is invisible. It lives in people's heads, it doesn't survive attrition, and we can't transfer it with docs or job shadowing. The same goes for the shortcuts and automations experts build for themselves — they never make it to anyone else.",
    "We can't scale expertise with a linear model. We need a system that learns by watching experts work, gets direct validation from them — not inferred labels or implicit signals — and turns what it learns into repeatable automations that any expert or agent can use. The only way that works is if it's built into the workflow experts already have.",
  ],
  whatIsShadow: [
    "Shadow learns. The expert validates. What survives validation becomes a Skill — a repeatable automation of a task that Shadow can execute. Skills start personalized to the expert who created them, but Shadow separates the core logic of a Skill from what's unique to that expert's style, so the same Skill can be consumed by other experts and agents.",
    "The expert's direct feedback is the key signal. When an expert approves, modifies, or dismisses a proposed Skill, that tells Shadow what to do more of and what to do less of. This is higher-quality reinforcement than any implicit evaluation or labeling we can do today — but it only works if it doesn't feel like extra work.",
    "That's why Shadow meets experts where they already are. After every call, there's a Wrap-up window — a cumbersome step where experts summarize the case, schedule follow-ups, and update the CRM, often rushing through it because the next customer is already in the queue. Shadow automates that. Auto-summarization, follow-up scheduling, case notes — this is Shadow's upfront value proposition. It earns the expert's attention by saving them time on work they already have to do.",
    "The next layer is the Right Panel. Think of it like the interaction we're having right now — a conversational interface where the expert and Shadow work together in real time. Shadow can intelligently assist, answer questions in context, and execute Skills proactively or in response to the expert's request. It's not a chatbot bolted on; it's a working partner embedded in the tool the expert is already using.",
    "All of this comes together with a clean ability to view and manage the Skills that were created. The expert can see what Shadow has learned, what Skills exist, edit or remove them, and control what gets shared. The expert always feels in control.",
  ],
  howItWorks: [
    {
      stage: "Capture",
      description:
        "Record what experts do. In the browser: clicks, navigation, typing, network activity, optional audio → transcript. On desktop: full screen, system audio, all apps. Expert starts each session; they control what's in scope.",
    },
    {
      stage: "Interpret",
      description:
        "Turn raw sessions into usable knowledge. Generate reusable Skills personalized to each expert's style. Build and update Expert Profiles — structured memory of individual patterns and decision-making. Detect patterns across sessions. Summarize cases. PII is stripped on-device before anything is sent.",
    },
    {
      stage: "Serve Up",
      description:
        "Put knowledge where it's needed, personalized to who's receiving it. Right Panel Chat gives experts in-context help with Shadow Reasoning showing its thought process. Pre-call Skill fetching draws from the expert's own library and the shared Intuit-wide library. Proactive Messages surface relevant context mid-call. Plans compose Skills into step-by-step workflows the expert can walk through.",
    },
  ],
  contextMemory: {
    intro:
      "Shadow connects to an Enterprise Context and Memory Service — a shared layer that stores and retrieves interaction history across experts, customers, and sessions. This isn't Shadow's internal memory; it's an enterprise service that any system can read from and write to. Shadow is both a consumer and a contributor.",
    whatItProvides: [
      {
        label: "Customer interaction history",
        detail:
          "Every time an expert works with a customer, the Context & Memory Service records what happened — the topic, how it was resolved, any follow-ups, and which expert handled it. When that customer calls again, Shadow pulls up this history so the next expert has full context before the call even starts.",
      },
      {
        label: "Episodic memory",
        detail:
          "Not just 'what happened' but 'how it went.' The service stores episodic details — the approach that worked, the workaround that was needed, the edge case that came up. When Shadow sees a returning customer, it can surface these episodes so the expert doesn't start from zero.",
      },
      {
        label: "Cross-expert continuity",
        detail:
          "Customers rarely get the same expert twice. The Context & Memory Service ensures continuity regardless of who picks up the call. The new expert sees the full interaction thread — not just CRM notes, but the rich context Shadow captured from previous sessions.",
      },
      {
        label: "Expert-customer relationship signals",
        detail:
          "Frequency of contact, topics discussed, resolution patterns, open items. Shadow uses these signals to prioritize which Skills to fetch pre-call and to tailor nudges during the call based on this customer's specific history.",
      },
    ],
    howShadowIntegrates:
      "During the pre-call window, Shadow queries the Context & Memory Service for the incoming customer. It retrieves past interactions, open follow-ups, and any episodic notes left by previous experts. After the call, Shadow writes back — the session summary, the resolution, any new follow-ups, and the Skills that were used or created. Over time, this builds a rich, growing memory of every customer relationship across the organization.",
  },
  personalization: {
    intro:
      "Shadow doesn't just capture what experts do — it learns how each expert works. Over time, it builds a memory of individual patterns, preferences, and decision-making styles. This isn't a generic knowledge base; it's personalized to each expert.",
    howItLearns: [
      {
        label: "Behavioral patterns",
        detail:
          "Which tools does this expert check first? What order do they navigate screens? How do they phrase explanations to customers? Shadow picks up on these repeated micro-behaviors across sessions.",
      },
      {
        label: "Decision heuristics",
        detail:
          "When an expert encounters a fork — escalate vs. resolve, one workflow vs. another — Shadow tracks which path they take and why (via audio context). Over time, it learns the expert's judgment calls.",
      },
      {
        label: "Communication style",
        detail:
          "Tone, phrasing, level of detail. Some experts walk customers through every click; others give high-level guidance. Generated Skills reflect the style of the expert they came from.",
      },
      {
        label: "Tool preferences",
        detail:
          "Keyboard shortcuts vs. menus. Which reports they pull. Whether they use the built-in calculator or a side tool. These preferences get encoded into the Skills Shadow generates for them.",
      },
    ],
    expertMemory:
      "Shadow maintains an Expert Profile — a structured, evolving representation of an individual expert's working style. This profile isn't a static document; it's updated incrementally after every session. It captures what the expert does, how they do it, and what makes their approach distinct. The profile is private to the expert and only shared with their explicit consent.",
    personalizedSkills:
      "When Shadow generates a Skill for an expert, it doesn't produce a generic how-to. It produces a version tuned to that expert's style — their navigation patterns, their phrasing, their shortcuts. Two experts handling the same contact topic will get Skills that reflect their individual approaches. This is the difference between a template and an assistant that actually knows you.",
    aiTwinPath:
      "The Expert Profile is the foundation of an HI Twin. As the profile accumulates enough depth — enough sessions, enough patterns, enough validated Skills — it reaches a threshold where it can represent the expert's decision-making in a meaningful way. The Chrome Extension doesn't build the Twin. It builds the memory that makes the Twin possible.",
    phase1Value:
      "The Chrome Extension focuses on providing immediate, personal value to the expert from Day 1. Shadow acts like an assistant that's been watching over your shoulder — it knows the Skills you've built, the patterns you follow, and the context you care about. Pre-call Skill fetching is personalized to the expert's history. Post-call summaries reflect their style. Shadow Reasoning shows its thought process so the expert always understands why it's suggesting something. The goal is simple: from the first call, Shadow should feel like it knows you.",
  },
  platformConnection:
    "Shadow powers the \"Learn\" phase of the AI x HI Platform flywheel (Collaborate → Learn → Improve). Captured expert behavior and validated Skills become the structured knowledge that the platform uses to improve AI agents, enable cross-expert learning, and build toward autonomous execution over time.",
  valueProps: [
    {
      role: "Experts (knowledge source)",
      benefit:
        "Immediate time savings via auto-summarization and wrap-up automation. Right Panel acts as an intelligent assistant during calls — executes Skills proactively or on request. Repeatable tasks become established Skills consumable by all experts and agents. Clean skill management keeps the expert in control. Expert Profile builds toward an HI Twin — their expertise scales beyond them.",
    },
    {
      role: "New / developing agents (knowledge consumer)",
      benefit:
        "On-demand guidance for unfamiliar issues. Searchable shared Skills library with real expert workflows. Real examples instead of abstract docs. Proactive Messages surface relevant context and Skills during calls.",
    },
    {
      role: "Managers / coaches (knowledge enabler)",
      benefit:
        "See what separates top performers from others. Side-by-side workflow comparisons. Specific coaching insights backed by data.",
    },
  ],
};

export const scope = {
  intro:
    "Shadow ships in two forms. Each owns a clear domain so we don't duplicate capture or confuse users.",
  chromeExtension: {
    name: "Chrome Extension (Browser)",
    owns: "Everything inside the browser tab and Shadow's own UI (Right Panel, session viewer, Skills).",
    bullets: [
      "Capture in-page actions (clicks, hovers, typing, scrolling), network requests (XHR/Fetch), and optional audio → transcript.",
      "Right Panel Chat — in-context conversation with Shadow, backed by available Skills.",
      "Context & Memory Service integration — pull customer interaction history pre-call, write session context back post-call.",
      "Session viewer: review captures, filter events by type, create Skills from a session.",
      "Install from Chrome Web Store or enterprise policy. No desktop installer.",
    ],
  },
  desktopClient: {
    name: "Desktop Client (Cross-Application Workflows)",
    owns: "The workflows Chrome can't see — experts switching between QBO, Slack, Excel, a CRM, and desktop apps in a single customer interaction.",
    bullets: [
      "Cross-application capture: screen recording, system audio (transcript only leaves device), window focus tracking, and application-level events across all open apps.",
      "The Desktop Client's unique value is seeing the full workflow when an expert leaves Chrome — copying data into a spreadsheet, checking a Slack thread, updating a CRM record, or running a desktop calculator.",
      "PII detected and redacted on-device before any upload. Raw audio never leaves the machine.",
      "Shared Skills library, coaching dashboard, case summarization into SFDC/CRM.",
      "IT-deployed app (Windows/macOS), system tray. Same consent and privacy rules as the extension.",
    ],
  },
  lockStep:
    "One product, same rules. Only one capture source active at a time per user so we don't double-capture. Privacy and consent rules are shared — changes happen in lock step.",
  matrix: [
    { capability: "Capture: in-page actions", chrome: true, desktop: false },
    { capability: "Capture: network / console activity", chrome: true, desktop: false },
    { capability: "Capture: screenshots at key moments", chrome: true, desktop: true },
    { capability: "Capture: audio → transcript only", chrome: true, desktop: true },
    { capability: "Capture: full screen / all apps", chrome: false, desktop: true },
    { capability: "Session controls (start, pause, stop, review)", chrome: true, desktop: true },
    { capability: "Right Panel Chat", chrome: true, desktop: false },
    { capability: "Create Skills from session", chrome: true, desktop: false },
    { capability: "Context & Memory Service: read customer history", chrome: true, desktop: true },
    { capability: "Context & Memory Service: write session back", chrome: true, desktop: true },
    { capability: "Shared Skills library", chrome: true, desktop: true, note: "Both consume; Chrome also contributes via Skill creation" },
    { capability: "Coaching dashboard", chrome: false, desktop: true },
    { capability: "PII redaction before upload", chrome: true, desktop: true },
  ],
};

export const principles = {
  notList: [
    { bold: "Not surveillance.", rest: "People choose when to record. Sessions are for learning, not monitoring." },
    { bold: "Not a QA replacement.", rest: "We capture expertise to share, not compliance to enforce." },
    { bold: "Not always-on.", rest: "Recording only happens when the user starts it." },
    { bold: "Not a replacement for people.", rest: "Shadow helps people learn faster; it doesn't replace them." },
  ],
  privacy: [
    "Capture is opt-in only. Users explicitly start a session; there is no passive recording.",
    "Users can review what was captured and approve, edit, or exclude it before it's shared.",
    "Shadow data is for learning and knowledge sharing only — not for performance evaluation or discipline.",
    "Same consent and data-handling principles apply to the extension and the desktop client.",
    "Only transcript leaves the device — raw audio is never uploaded.",
    "PII (SSN, credit card, account numbers, customer names) redacted on-device before any data is sent.",
  ],
  constraints: [
    "One active capture at a time per user (browser or desktop) to avoid duplicate or conflicting data.",
    "Privacy and consent rules are shared across both clients — changes happen in lock step.",
  ],
};

export const metrics = {
  goals: [
    {
      id: "goal-1",
      title: "Improve Expert Efficiency & Capability",
      description:
        "Shadow Skills and automation reduce the manual, repetitive work experts do today — wrap-up summarization, follow-up scheduling, case documentation. Experts spend less time on overhead and more time helping customers.",
      signals: [
        "Reduction in wrap-up time per contact",
        "Number of Skills generated and validated by experts",
        "Expert-reported value of Shadow assistance during calls",
        "Repeat usage — experts continue using Shadow after the first week",
      ],
    },
    {
      id: "goal-2",
      title: "Enable Skill Reuse Across Agents & Experts",
      description:
        "Skills created by one expert become available to every other expert and agent. Shadow separates the core logic from expert-specific style so Skills are consumable broadly — not locked to the person who created them.",
      signals: [
        "Number of Skills consumed by agents who didn't create them",
        "Agent-reported usefulness of shared Skills",
        "Reduction in time-to-resolution for agents using Shadow Skills vs. not",
        "Growth of the shared Skill library over the pilot period",
      ],
    },
  ],
  referenceExperts: {
    intro:
      "Shadow is built for experts, so experts need to be in the room shaping it. We're enlisting a Reference Expert panel — 6 to 8 people representing different functions across the organization. This isn't a focus group we check in with quarterly. It's a tight, collaborative feedback loop that runs in cycles throughout development.",
    why: [
      "Direct, collaborative feedback from end-users beats surveys, second-hand reports, or assumptions about what experts need.",
      "Keeping experts fully aware and able to influence direction and implementation means we build the right thing — not just a thing that works in a demo.",
      "A small, diverse panel lets us stay nimble. We can test ideas, iterate, and course-correct in days instead of months.",
      "Experts who help shape Shadow become advocates. When it's time to roll out, they're already bought in.",
    ],
    roles: [
      { title: "Product Expert", detail: "Core product support — the primary user Shadow is designed for." },
      { title: "Domain Expert", detail: "Deep knowledge in a specific area (e.g., payroll, tax, bookkeeping). Validates that Skills capture real expertise." },
      { title: "Business Development Representative", detail: "Front-line sales perspective — how Shadow-generated knowledge could accelerate onboarding and customer conversations." },
      { title: "Account Manager", detail: "Ongoing customer relationships — validates cross-expert continuity and the Context & Memory Service." },
      { title: "Customer Success Manager", detail: "Post-sale experience — ensures Shadow fits into retention and expansion workflows." },
      { title: "Full Service Accountant", detail: "Professional services perspective — validates Skills for complex, multi-step financial workflows." },
      { title: "Bookkeeper", detail: "Day-to-day transactional work — ensures Skills cover the high-volume, repetitive tasks that benefit most from automation." },
      { title: "Tax Professional Assistant", detail: "Seasonal, high-pressure workflows — tests Shadow under time-constrained, accuracy-critical conditions." },
    ],
    cadence:
      "The panel meets in short, focused cycles — bi-weekly at minimum. Each cycle includes a demo of what's new, hands-on testing, and structured feedback. The panel's input directly shapes the next cycle's priorities. This isn't advisory; it's co-creation.",
  },
  pilotScope:
    "Single product line (TurboTax or QuickBooks). 10–20 experts capturing, 20–30 agents consuming. 3-month window.",
  pilotPhases: [
    "Feb 2026 — Setup: Legal/IT sign-off, expert recruitment, Chrome Extension deployment.",
    "Mar 2026 — Go live: Expert onboarding, consent, begin live capture and Skill generation.",
    "Apr 2026 — Scale: Skill library growing, agents start consuming shared Skills.",
    "May 2026 — Measure: Evaluate both goals, pilot retrospective, plan next phase.",
  ],
  adoptionCurve: [
    {
      period: "Day 1",
      title: "Instant value",
      description:
        "Expert installs the Chrome Extension, signs in, and takes their first call with Shadow. After the call, Shadow auto-generates the wrap-up summary and populates the CRM fields. The expert saves 3-4 minutes on their first call. That's the hook.",
    },
    {
      period: "Week 1",
      title: "Skills start accumulating",
      description:
        "After 10-15 calls, Shadow has proposed several Skills. The expert has validated 3-4 of them. The Right Panel starts recognizing incoming topics and fetching relevant Skills pre-call. Shadow feels useful, not just novel.",
    },
    {
      period: "Month 1",
      title: "Shadow knows you",
      description:
        "The Expert Profile has enough depth that Shadow's suggestions feel personalized — not generic. Skills reflect the expert's specific patterns and shortcuts. Wrap-up is nearly fully automated. The expert starts using Agent Mode to execute Skills directly.",
    },
    {
      period: "Month 3",
      title: "Your expertise scales beyond you",
      description:
        "The expert has 15-20 validated Skills. Several have been proposed and approved for Intuit-wide use. Other experts and agents are consuming Skills this expert created. The expert's impact extends beyond the calls they personally handle.",
    },
  ],
  whereThisGoes: {
    intro:
      "The Chrome Extension builds the foundation — capture, Skills, personalization, expert validation. What comes next depends on the depth and quality of what we collect, but the trajectory is clear:",
    items: [
      {
        title: "HI Twins",
        description:
          "As Expert Profiles accumulate enough sessions, validated Skills, and behavioral patterns, they reach a threshold where they can represent an expert's decision-making independently. An HI Twin is a digital version of an expert that can handle routine cases, answer questions, and execute Skills — supervised but not manually driven.",
      },
      {
        title: "Agent Gym",
        description:
          "Skills and session data become training material for AI agents. Instead of hand-crafted prompts, agents learn from real expert behavior — how to navigate a product, when to escalate, what questions to ask. The Gym is where agents practice on real workflows before handling live customers.",
      },
      {
        title: "Autonomous execution",
        description:
          "Today, every Skill execution requires expert approval. As trust is established through consistent quality — measured by execution success rate, override frequency, and expert satisfaction — Shadow can begin executing low-risk, well-validated Skills autonomously, with the expert notified after the fact.",
      },
    ],
  },
  notInPilot: [
    "AI agent training pipeline (Agent Gym)",
    "HI Twin development",
    "Autonomous actions without expert review",
  ],
};
