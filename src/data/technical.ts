export const architecture = {
  overview:
    "Shadow uses an edge-first architecture. Most processing (PII detection, transcription, event extraction) happens on the user's device. Only processed, redacted data is sent to the cloud for cross-session analysis, search indexing, and the workflow library.",
  layers: [
    {
      name: "Capture Layer (Edge)",
      components: [
        "Chrome Extension — content script + background service worker",
        "Desktop Agent — system tray app (Electron or native), macOS + Windows",
        "Audio pipeline — in-tab or system audio → on-device transcription → text only",
        "Screenshot pipeline — triggered by events, PII-redacted on-device",
      ],
    },
    {
      name: "Companion Service (Local)",
      components: [
        "Local HTTP server (e.g. localhost:3000) bridging extension ↔ backend",
        "Session management — start, pause, stop, session ID generation",
        "Skill generation — LLM call with filtered actions + optional screenshots",
        "Auth proxy — Intuit SSO token relay",
      ],
    },
    {
      name: "Backend (Cloud)",
      components: [
        "Session store — event logs, transcripts, screenshots, metadata",
        "Analysis engine — pattern detection, workflow extraction, case summarization",
        "Skill registry — CRUD for Agent Skills, versioning, tagging",
        "Search index — semantic search across sessions and skills",
        "Coaching data — aggregated metrics per agent/team for manager dashboards",
      ],
    },
  ],
};

export const eventSchema = {
  description:
    "Every captured user action is stored as a SessionEvent. The Chrome extension and desktop client both produce events in this format so the backend can merge and analyze them uniformly.",
  fields: [
    { name: "id", type: "string", description: "UUID, unique per event" },
    { name: "sessionId", type: "string", description: "Parent session ID" },
    { name: "timestamp", type: "number", description: "Seconds since session start" },
    { name: "type", type: "EventType", description: '"click" | "type" | "hover" | "navigate" | "network" | "scroll"' },
    { name: "label", type: "string", description: "Human-readable description of the action" },
    { name: "element", type: "string?", description: "HTML tag name (e.g. a, button, input)" },
    { name: "selector", type: "string?", description: "CSS selector path to the element" },
    { name: "position", type: "{ x, y }?", description: "Click/hover coordinates" },
    { name: "text", type: "string?", description: "Visible text or input value (PII-redacted)" },
    { name: "url", type: "string?", description: "Page URL or request URL" },
    { name: "screenshotRef", type: "string?", description: "Reference to screenshot asset if captured" },
    { name: "meta", type: "Record<string, any>?", description: "Extensible metadata (e.g. HTTP status for network events)" },
  ],
};

export const apiEndpoints = [
  {
    method: "POST",
    path: "/api/v1/sessions",
    summary: "Create a new capture session",
    requestBody: `{
  "userId": "usr_abc123",
  "source": "chrome_extension",
  "captureConfig": {
    "clicks": true,
    "types": true,
    "hovers": false,
    "scrolls": false,
    "network": true,
    "screenshots": true,
    "audio": false
  }
}`,
    responseBody: `{
  "sessionId": "session-1771531819539-hfz31o",
  "status": "recording",
  "startedAt": "2026-02-19T19:56:59.000Z"
}`,
    status: "201 Created",
  },
  {
    method: "PATCH",
    path: "/api/v1/sessions/:sessionId",
    summary: "Update session status (pause, resume, stop)",
    requestBody: `{
  "status": "stopped"
}`,
    responseBody: `{
  "sessionId": "session-1771531819539-hfz31o",
  "status": "stopped",
  "startedAt": "2026-02-19T19:56:59.000Z",
  "endedAt": "2026-02-19T19:58:12.000Z",
  "totalActions": 624,
  "durationSeconds": 72
}`,
    status: "200 OK",
  },
  {
    method: "POST",
    path: "/api/v1/sessions/:sessionId/events",
    summary: "Batch upload events for a session",
    requestBody: `{
  "events": [
    {
      "id": "evt-001",
      "timestamp": 4.175,
      "type": "click",
      "label": "Clicked QuickBooks Online link",
      "element": "a",
      "selector": "#sign-in-options-menu > ul > li:nth-of-type(1) > span > a",
      "position": { "x": 1349, "y": 175 },
      "text": "QuickBooks Online"
    }
  ]
}`,
    responseBody: `{
  "accepted": 1,
  "sessionId": "session-1771531819539-hfz31o"
}`,
    status: "202 Accepted",
  },
  {
    method: "POST",
    path: "/api/v1/sessions/:sessionId/skills/generate",
    summary: "Generate a Skill from filtered session events",
    requestBody: `{
  "filterTypes": ["click", "type", "navigate"],
  "includeScreenshots": true,
  "includeTranscript": true
}`,
    responseBody: `{
  "skillId": "skill-004",
  "name": "quickbooks-online-create-expense-transaction",
  "description": "Create an expense transaction in QuickBooks Online.",
  "steps": [
    { "index": 0, "label": "Go to Expenses (left menu).", "tag": "core" },
    { "index": 1, "label": "Click \\"New transaction\\" → \\"Expense\\".", "tag": "core" },
    { "index": 2, "label": "Choose Payee and Payment method/account.", "tag": "core" },
    { "index": 3, "label": "Enter Category, Description, and Amount.", "tag": "core" },
    { "index": 4, "label": "Click \\"Save and close\\".", "tag": "core" }
  ],
  "generatedFrom": {
    "sessionId": "session-1771531819539-hfz31o",
    "eventCount": 31,
    "screenshotsUsed": 3
  }
}`,
    status: "200 OK",
  },
  {
    method: "GET",
    path: "/api/v1/skills",
    summary: "List available Skills (with optional tag/search filter)",
    requestBody: null,
    responseBody: `{
  "skills": [
    {
      "skillId": "skill-001",
      "name": "quickbooks-online-create-expense-transaction",
      "description": "Create an expense transaction in QuickBooks Online.",
      "tags": ["QuickBooks Online", "Expenses"],
      "version": 2,
      "createdAt": "2026-02-19T20:00:00.000Z",
      "updatedAt": "2026-02-19T21:30:00.000Z"
    }
  ],
  "total": 1
}`,
    status: "200 OK",
  },
  {
    method: "GET",
    path: "/api/v1/skills/:skillId",
    summary: "Get full Skill definition (Agent Skills format)",
    requestBody: null,
    responseBody: `{
  "skillId": "skill-001",
  "name": "quickbooks-online-create-expense-transaction",
  "slug": "qbo-create-expense",
  "description": "Create an expense transaction in QuickBooks Online.",
  "steps": [
    { "index": 0, "label": "Go to Expenses (left menu).", "tag": "core" },
    { "index": 1, "label": "Click \\"New transaction\\" → \\"Expense\\".", "tag": "core" },
    { "index": 2, "label": "Choose Payee and Payment method/account.", "tag": "core" },
    { "index": 3, "label": "Enter Ref no. (optional).", "tag": "core" },
    { "index": 4, "label": "In the line item: pick Category, add Description, enter Amount.", "tag": "core" },
    { "index": 5, "label": "Click \\"Save and close\\".", "tag": "core" },
    { "index": 6, "label": "Use Cmd+S shortcut instead of clicking Save.", "tag": "personalized", "personalizedBy": "usr_asha01" }
  ],
  "tags": ["QuickBooks Online", "Expenses", "Bookkeeping"],
  "version": 3,
  "sourceSessionIds": ["session-1771531819539-hfz31o"],
  "importedSkills": [],
  "optionalSkills": ["skill-008"],
  "proposedForSharing": "approved",
  "format": "agent-skill-v2"
}`,
    status: "200 OK",
  },
  {
    method: "PUT",
    path: "/api/v1/skills/:skillId",
    summary: "Update a Skill (e.g. after expert refinement)",
    requestBody: `{
  "steps": [
    { "index": 0, "label": "Go to Expenses (left menu).", "tag": "core" },
    { "index": 1, "label": "Click \\"New transaction\\" → \\"Expense\\".", "tag": "core" },
    { "index": 2, "label": "Choose Payee and Payment method/account.", "tag": "core" },
    { "index": 3, "label": "Enter Ref no. (optional).", "tag": "core" },
    { "index": 4, "label": "In the line item: pick Category, add Description, enter Amount.", "tag": "core" },
    { "index": 5, "label": "Click \\"Save and close\\".", "tag": "core" },
    { "index": 6, "label": "Verify the expense appears in the Expenses list.", "tag": "personalized" }
  ],
  "tags": ["QuickBooks Online", "Expenses", "Bookkeeping", "Verified"]
}`,
    responseBody: `{
  "skillId": "skill-001",
  "version": 3,
  "updatedAt": "2026-02-20T10:00:00.000Z"
}`,
    status: "200 OK",
  },
  {
    method: "POST",
    path: "/api/v1/chat",
    summary: "Right Panel Chat — send a message and get Shadow's response",
    requestBody: `{
  "sessionContext": {
    "currentUrl": "https://qbo.intuit.com/app/expenses",
    "availableSkills": ["skill-001", "skill-002"]
  },
  "message": "add an expense in quickbooks"
}`,
    responseBody: `{
  "response": "I can help you add an Expense in QuickBooks Online. I found a matching Skill: quickbooks-online-create-expense-transaction. Send me the details (Payee, Date, Amount, Category) and I'll walk you through it step by step.",
  "matchedSkillId": "skill-001",
  "suggestedActions": ["provide_details", "show_manual_steps"]
}`,
    status: "200 OK",
  },
];

export const intelligencePipeline = {
  description:
    "The Intelligence Pipeline is how raw session data becomes actionable Skills. Each stage transforms the data and requires different processing — some on-device, some in the cloud.",
  stages: [
    {
      name: "Capture",
      location: "Edge (on-device)",
      description: "Raw user actions, audio, and screenshots are recorded during a session.",
      output: "SessionEvents + raw transcript + screenshot refs",
    },
    {
      name: "Filter",
      location: "Edge (on-device)",
      description: "PII is detected and redacted. Noise events (idle scrolls, irrelevant hovers) are stripped. Only meaningful actions survive.",
      output: "Filtered, PII-redacted event stream",
    },
    {
      name: "Interpret",
      location: "Cloud",
      description: "LLM processes the filtered events + transcript to understand what happened. Actions are grouped into logical steps. Intent is inferred from context.",
      output: "Structured action sequence with inferred intent",
    },
    {
      name: "Pattern Match",
      location: "Cloud",
      description: "The interpreted sequence is compared against existing Skills and the expert's past sessions. Shadow detects: is this a known Skill? A variation? Something entirely new?",
      output: "Match result: existing Skill, Skill update, or new Skill candidate",
    },
    {
      name: "Skill Draft",
      location: "Cloud",
      description: "For new patterns or updates, Shadow generates a Skill draft: named steps, core vs. personalized tags, related Skill associations. The draft includes the expert's specific style.",
      output: "Draft Skill with step-level core/personalized tagging",
    },
    {
      name: "Expert Validation",
      location: "Edge (Right Panel)",
      description: "The draft is presented to the expert for review. They can approve, modify steps, re-tag core vs. personalized, reject, or give feedback. This is the critical quality signal.",
      output: "Validated Skill (expert-approved) + feedback signal for Shadow's learning",
    },
    {
      name: "Publish",
      location: "Cloud",
      description: "The validated Skill enters the expert's library. If proposed for Intuit-wide use, the personalization layer is stripped and the core Skill is submitted for review.",
      output: "Published Skill in the Skill Registry, available for execution and sharing",
    },
  ],
};

export const dataModels = [
  {
    name: "Session",
    fields: [
      { name: "id", type: "string" },
      { name: "userId", type: "string" },
      { name: "source", type: '"chrome_extension" | "desktop_client"' },
      { name: "status", type: '"recording" | "paused" | "stopped" | "processing" | "complete"' },
      { name: "captureConfig", type: "CaptureConfig" },
      { name: "startedAt", type: "ISO 8601" },
      { name: "endedAt", type: "ISO 8601?" },
      { name: "durationSeconds", type: "number?" },
      { name: "totalActions", type: "number" },
      { name: "transcript", type: "string?" },
      { name: "audioRef", type: "string? (local only, never uploaded)" },
    ],
  },
  {
    name: "Skill",
    fields: [
      { name: "id", type: "string" },
      { name: "name", type: "string (kebab-case identifier)" },
      { name: "slug", type: "string" },
      { name: "description", type: "string" },
      { name: "steps", type: "SkillStep[]" },
      { name: "tags", type: "string[]" },
      { name: "version", type: "number" },
      { name: "format", type: '"agent-skill-v2"' },
      { name: "sourceSessionIds", type: "string[]" },
      { name: "createdBy", type: "string (userId)" },
      { name: "importedSkills", type: "string[]? (required dependency Skill IDs)" },
      { name: "optionalSkills", type: "string[]? (optionally invoked Skill IDs)" },
      { name: "proposedForSharing", type: 'boolean | "pending" | "approved" | "rejected"' },
      { name: "createdAt", type: "ISO 8601" },
      { name: "updatedAt", type: "ISO 8601" },
    ],
  },
  {
    name: "SkillStep",
    fields: [
      { name: "index", type: "number" },
      { name: "label", type: "string" },
      { name: "tag", type: '"core" | "personalized"' },
      { name: "personalizedBy", type: "string? (userId — only for personalized steps)" },
      { name: "replacesCore", type: "number? (index of core step this replaces, if any)" },
      { name: "addedAt", type: "ISO 8601" },
    ],
  },
  {
    name: "CaptureConfig",
    fields: [
      { name: "clicks", type: "boolean" },
      { name: "types", type: "boolean" },
      { name: "hovers", type: "boolean" },
      { name: "scrolls", type: "boolean" },
      { name: "network", type: "boolean" },
      { name: "screenshots", type: "boolean" },
      { name: "audio", type: "boolean" },
    ],
  },
];
