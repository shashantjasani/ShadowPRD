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
    "Go to Expenses (left menu).",
    "Click \\"New transaction\\" → \\"Expense\\".",
    "Choose Payee and Payment method/account.",
    "Enter Category, Description, and Amount.",
    "Click \\"Save and close\\"."
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
    "Go to Expenses (left menu).",
    "Click \\"New transaction\\" → \\"Expense\\".",
    "Choose Payee and Payment method/account.",
    "Enter Ref no. (optional).",
    "In the line item: pick Category, add Description, enter Amount.",
    "Click \\"Save and close\\"."
  ],
  "tags": ["QuickBooks Online", "Expenses", "Bookkeeping"],
  "version": 2,
  "sourceSessionIds": ["session-1771531819539-hfz31o"],
  "format": "agent-skill-v1"
}`,
    status: "200 OK",
  },
  {
    method: "PUT",
    path: "/api/v1/skills/:skillId",
    summary: "Update a Skill (e.g. after expert refinement)",
    requestBody: `{
  "steps": [
    "Go to Expenses (left menu).",
    "Click \\"New transaction\\" → \\"Expense\\".",
    "Choose Payee and Payment method/account.",
    "Enter Ref no. (optional).",
    "In the line item: pick Category, add Description, enter Amount.",
    "Click \\"Save and close\\".",
    "Verify the expense appears in the Expenses list."
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
      { name: "steps", type: "string[]" },
      { name: "tags", type: "string[]" },
      { name: "version", type: "number" },
      { name: "format", type: '"agent-skill-v1"' },
      { name: "sourceSessionIds", type: "string[]" },
      { name: "createdBy", type: "string (userId)" },
      { name: "createdAt", type: "ISO 8601" },
      { name: "updatedAt", type: "ISO 8601" },
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
