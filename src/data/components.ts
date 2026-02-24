export interface ComponentSpec {
  id: string;
  name: string;
  description: string;
  states?: string[];
  guidelines?: string[];
}

export interface SubSection {
  id: string;
  title: string;
  description: string;
  specs: ComponentSpec[];
}

export interface ComponentSection {
  id: string;
  letter: string;
  title: string;
  description: string;
  subSections: SubSection[];
}

export const componentSections: ComponentSection[] = [
  {
    id: "record-tab",
    letter: "A",
    title: "Right Rail — Record Tab",
    description:
      "The Record Tab is the expert's control center for session capture. It provides session start/stop controls, granular capture settings, auto-trigger configuration, and access to past session captures.",
    subSections: [
      {
        id: "b-session-controls",
        title: "Session Controls",
        description:
          "Start and stop session recording. The expert should always know whether capture is active.",
        specs: [
          {
            id: "b-start-stop",
            name: "Start Session / End Session toggle",
            description:
              "A prominent button that toggles between starting and ending a capture session. Visual state changes clearly when recording is active.",
            states: [
              "Idle: 'Start Session' button (green). No capture active.",
              "Recording: 'End Session' button (red) with a pulsing indicator. Timer shows elapsed time.",
              "Paused: 'Resume' button (amber). Capture is suspended but session is still open.",
              "Processing: spinner after ending session while data is being prepared for review.",
            ],
            guidelines: [
              "The recording indicator must be visible at all times when capture is active — even when the user switches to the Chat tab.",
              "Accidentally closing the panel should NOT end the session. Show a confirmation dialog.",
              "Maximum session duration: configurable, default 60 minutes. Warn at 5 minutes remaining.",
            ],
          },
          {
            id: "b-session-status",
            name: "Session status bar",
            description:
              "A compact status bar showing current state: elapsed time, event count, and capture health.",
            guidelines: [
              "Always visible at the top of the Record tab when a session is active.",
              "Event count updates in real time as actions are captured.",
              "If capture encounters an error (e.g., permission denied), show an amber warning inline.",
            ],
          },
        ],
      },
      {
        id: "b-capture-settings",
        title: "Capture Settings",
        description:
          "Granular toggles that control what types of activity Shadow captures during a session. Experts can customize based on what's relevant.",
        specs: [
          {
            id: "b-capture-clicks",
            name: "Clicks",
            description: "Capture mouse click events with target element and position.",
            states: ["On (default)", "Off"],
            guidelines: ["Includes left-click, right-click, and double-click."],
          },
          {
            id: "b-capture-types",
            name: "Types",
            description: "Capture keyboard input events. Sensitive fields (password, SSN) are automatically redacted.",
            states: ["On (default)", "Off"],
            guidelines: [
              "PII redaction applies automatically — no expert action needed.",
              "Show a small 'redacted' indicator when sensitive input is detected.",
            ],
          },
          {
            id: "b-capture-scrolls",
            name: "Scrolls",
            description: "Capture scroll position changes. Useful for understanding navigation patterns.",
            states: ["Off (default)", "On"],
            guidelines: ["Off by default to reduce noise. Enable for detailed workflow analysis."],
          },
          {
            id: "b-capture-hovers",
            name: "Hovers",
            description: "Capture hover events over interactive elements. Useful for understanding exploration patterns.",
            states: ["Off (default)", "On"],
            guidelines: ["Off by default — generates high event volume. Enable only when hover behavior is relevant."],
          },
          {
            id: "b-capture-network",
            name: "Network Calls",
            description: "Capture XHR/Fetch requests and responses (status codes, endpoints). Payloads are not captured.",
            states: ["On (default)", "Off"],
            guidelines: [
              "Only capture request method, URL, and status code — never request/response bodies.",
              "Useful for understanding API interactions and page load sequences.",
            ],
          },
          {
            id: "b-capture-screenshots",
            name: "Screenshots",
            description: "Capture screenshots at key moments (clicks, navigation, form submissions).",
            states: ["On (default)", "Off"],
            guidelines: [
              "PII detected in screenshots is blurred automatically before upload.",
              "Screenshots are taken at the moment of the triggering action, not continuously.",
            ],
          },
          {
            id: "b-capture-desktop",
            name: "Full Desktop Capture",
            description: "Extends capture beyond the browser to the full desktop environment. Has sub-options for scope control.",
            states: ["Off (default)", "On"],
            guidelines: [
              "Requires additional system permissions. Prompt the expert clearly when enabling.",
              "When enabled, expose the sub-options below.",
            ],
          },
          {
            id: "b-capture-desktop-specific",
            name: "Specific Desktop Only",
            description: "Limit desktop capture to a single monitor or virtual desktop.",
            states: ["On (default when desktop capture is enabled)", "Off"],
            guidelines: ["Reduces noise by focusing on the expert's primary workspace."],
          },
          {
            id: "b-capture-desktop-non-chrome",
            name: "Only when engaging non-Chrome window",
            description: "Desktop capture only activates when the expert switches away from Chrome (e.g., to a desktop app like Excel, Slack, or a CRM tool).",
            states: ["Off (default)", "On"],
            guidelines: [
              "Useful for capturing cross-application workflows without doubling up on in-browser capture.",
              "In-browser capture (Section B settings above) remains active for Chrome tabs.",
            ],
          },
        ],
      },
      {
        id: "b-auto-triggers",
        title: "Auto-Triggers",
        description:
          "Configurable rules that automatically start a capture session based on specific events, so the expert doesn't have to remember to press 'Start' every time.",
        specs: [
          {
            id: "b-trigger-engagement",
            name: "Engagement Start to End",
            description:
              "Automatically start recording when a customer engagement begins (e.g., call connected) and stop when it ends (e.g., wrap-up complete).",
            states: ["Off (default)", "On"],
            guidelines: [
              "Requires integration with the Intuit Expert Platform engagement lifecycle.",
              "Expert is notified when auto-capture starts — it's never silent.",
              "Expert can manually stop at any time, overriding the auto-trigger.",
            ],
          },
          {
            id: "b-trigger-iep-login",
            name: "IEP Login",
            description:
              "Automatically start recording when the expert logs into the Intuit Expert Platform.",
            states: ["Off (default)", "On"],
            guidelines: [
              "Designed for experts who want to capture their entire IEP session.",
              "Show a persistent recording indicator so the expert is always aware.",
            ],
          },
          {
            id: "b-trigger-startup",
            name: "System Start-up",
            description:
              "Automatically start recording when the expert's workstation starts up (desktop client only).",
            states: ["Off (default)", "On"],
            guidelines: [
              "Desktop client only — not applicable to the Chrome Extension.",
              "Primarily for full-desktop capture scenarios.",
              "Must show a clear system notification that recording has started.",
            ],
          },
        ],
      },
      {
        id: "b-past-sessions",
        title: "Past Sessions",
        description:
          "A list of the expert's previous session captures. The expert can review, adjust, and update any past session — correcting errors, adding context, or refining the captured data before it's used for Skill generation.",
        specs: [
          {
            id: "b-session-list",
            name: "Session list",
            description:
              "Scrollable list of past sessions showing date, duration, event count, and status (reviewed / unreviewed).",
            guidelines: [
              "Most recent sessions at the top.",
              "Show a badge for unreviewed sessions to encourage expert review.",
              "Clicking a session opens the Session Viewer (full-page or modal).",
            ],
          },
          {
            id: "b-session-review",
            name: "Session review & adjustment",
            description:
              "The expert can open any past session to review captured events, edit descriptions, remove irrelevant events, add notes, and mark events as key moments.",
            guidelines: [
              "Edits persist — the expert's corrections improve the quality of data used for Skill generation.",
              "Deleted events are soft-deleted (recoverable) for 30 days.",
              "The expert can re-trigger Skill generation from a reviewed session.",
            ],
          },
          {
            id: "b-session-export",
            name: "Session export",
            description:
              "Export a session as a structured document (JSON or Markdown) for sharing or archiving.",
            guidelines: [
              "PII redaction applies to exports.",
              "Include a shareable summary option (no raw event data, just the narrative).",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "chat-tab",
    letter: "B",
    title: "Right Rail — Chat Tab",
    description:
      "The Chat Tab is the conversational interface between the expert and Shadow — like a Slack DM with a colleague who can see your screen. The expert asks questions, Shadow responds and can proactively message. When the expert wants Shadow to execute a Skill, an execution preview appears for approval. When the expert wants to plan, Shadow builds a plan in the dedicated Plan tab.",
    subSections: [
      {
        id: "c-chat-interaction",
        title: "Chat Interaction",
        description:
          "The core conversational interface — input, messages, and Skill execution flow.",
        specs: [
          {
            id: "c-input",
            name: "Chat input",
            description:
              "Text input field with send button. Supports natural language questions, commands, and follow-ups.",
            guidelines: [
              "Enter key sends the message. Shift+Enter for newline.",
              "Input auto-resizes up to 4 lines, then scrolls.",
              "Show a subtle placeholder: 'Ask Shadow anything...'",
            ],
          },
          {
            id: "c-messages",
            name: "Message history",
            description:
              "Scrollable chat history. Expert messages on the right, Shadow responses on the left. Proactive messages from Shadow include source badges (see Proactive Messages section).",
            guidelines: [
              "Auto-scroll to the latest message.",
              "Shadow messages support rich formatting: bold, lists, code blocks, inline Skill references.",
              "Long messages are collapsible with a 'Show more' toggle.",
              "Expert can react to any Shadow message (thumbs up/down) for feedback.",
            ],
          },
          {
            id: "c-skill-execution",
            name: "Skill Execution Preview",
            description:
              "When the expert asks Shadow to execute a Skill, it presents a preview card showing the Skill name, every parameter and value, and three action buttons: Approve & Execute, Review & Edit, and Skip.",
            guidelines: [
              "The preview must show every field that will be affected — no hidden actions.",
              "Review & Edit makes all fields editable inline before approval.",
              "After approval, show execution status and a confirmation with result details.",
              "Execution is never automatic — the expert always initiates it.",
            ],
          },
          {
            id: "c-plan-trigger",
            name: "Plan creation from Chat",
            description:
              "When the expert asks Shadow to plan something (e.g., 'plan it out for me'), Shadow builds the plan in the Plan tab and confirms in chat with a reference to switch over.",
            guidelines: [
              "Shadow's confirmation message should say where the plan is: 'I built a plan in the Plan tab — switch over to review.'",
              "The expert can continue chatting while the plan is active in the other tab.",
              "Plans are not embedded inline in chat — they live in their own tab.",
            ],
          },
        ],
      },
      {
        id: "c-image-upload",
        title: "Image Upload",
        description:
          "The expert can attach images (screenshots, photos of documents, error messages) to provide Shadow with visual context.",
        specs: [
          {
            id: "c-upload-action",
            name: "Upload interaction",
            description:
              "An attachment icon next to the chat input. Supports click-to-browse, drag-and-drop, and paste from clipboard.",
            states: [
              "Default: attachment icon visible next to input field.",
              "Uploading: progress indicator on the thumbnail.",
              "Uploaded: thumbnail preview in the message before sending.",
              "Error: inline error if file type is unsupported or too large.",
            ],
            guidelines: [
              "Supported formats: PNG, JPG, GIF, WebP.",
              "Max file size: 10 MB per image.",
              "PII detection runs on uploaded images — detected PII is flagged (not auto-redacted, since the expert is intentionally sharing).",
              "Multiple images can be attached to a single message.",
            ],
          },
          {
            id: "c-upload-context",
            name: "How Shadow uses images",
            description:
              "Shadow analyzes uploaded images for context — identifying UI elements, error messages, data on screen — to inform its responses and Skill suggestions.",
            guidelines: [
              "Shadow should acknowledge what it sees in the image ('I can see the reconciliation screen with a $1,247.50 discrepancy').",
              "Images are not stored beyond the session unless the expert explicitly saves the session.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "plan-tab",
    letter: "C",
    title: "Plan Tab",
    description:
      "The Plan Tab is where Shadow builds and the expert manages collaborative task plans. Think of it like Cursor's Plan Mode — a structured checklist that can compose multiple Skills into a single workflow. The expert reviews, adds their own steps, checks items off, and has full control. Plans live here, not inline in chat.",
    subSections: [
      {
        id: "p-plan-structure",
        title: "Plan Structure",
        description:
          "A plan is a to-do checklist composed from one or more Skills, plus any custom steps the expert adds.",
        specs: [
          {
            id: "p-multi-skill",
            name: "Multi-Skill composition",
            description:
              "Shadow analyzes the expert's request and identifies every relevant Skill. It combines steps from multiple Skills into a single, ordered plan. Each to-do item is tagged with the Skill it belongs to.",
            guidelines: [
              "Each Skill group has a header with its name and a 'Skill' badge.",
              "Steps are shown in the order they should be performed, even across Skills.",
              "Shadow includes context lookups (e.g., customer history) as plan items when relevant.",
            ],
          },
          {
            id: "p-custom-steps",
            name: "Expert's own steps",
            description:
              "The expert can add their own custom steps to any plan using the '+ Add your own step' button. These appear with a 'You' badge.",
            guidelines: [
              "Custom steps can be added at any position (appended to the end by default).",
              "Expert-added steps are tagged so Shadow learns what's missing from the original Skills.",
              "If the same custom step is added to 3+ plans, Shadow suggests incorporating it into the Skill.",
            ],
          },
          {
            id: "p-remove-steps",
            name: "Remove steps",
            description:
              "The expert can remove any step from the plan by hovering and clicking the remove button.",
            guidelines: [
              "Removed steps are tracked — if the expert consistently removes a step, Shadow stops including it.",
            ],
          },
        ],
      },
      {
        id: "p-lifecycle",
        title: "Plan Lifecycle",
        description:
          "A plan moves through clear states: Draft → Active → Complete.",
        specs: [
          {
            id: "p-draft",
            name: "Draft state",
            description:
              "When Shadow creates a plan, it starts as a draft. The expert reviews the steps and clicks 'Accept Plan' to activate it.",
            states: [
              "Draft: plan is visible but checkboxes are disabled. Expert can still add/remove steps.",
              "The Accept button is prominent — this is a deliberate opt-in.",
            ],
          },
          {
            id: "p-active",
            name: "Active state",
            description:
              "Once accepted, checkboxes are enabled. The expert checks off steps as they complete them. A progress bar tracks completion.",
            states: [
              "Active: checkboxes enabled, progress bar visible.",
              "Partial: some steps done — progress bar fills proportionally.",
            ],
          },
          {
            id: "p-complete",
            name: "Complete state",
            description:
              "When all steps are checked off, the plan shows a completion card. Shadow suggests that it can handle this automatically next time.",
          },
        ],
      },
      {
        id: "p-history",
        title: "Plan History",
        description:
          "The Plan Tab maintains a history of completed plans so the expert can revisit past workflows.",
        specs: [
          {
            id: "p-history-list",
            name: "History view",
            description:
              "A list of previously completed plans, showing name, date, and step count. Clicking a past plan expands it for review.",
            guidelines: [
              "History is sorted by most recent first.",
              "Past plans are read-only — the expert can view steps but not modify them.",
              "Useful for training, audit, and understanding patterns over time.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "skills-tab",
    letter: "D",
    title: "Skills Tab",
    description:
      "The Skills Tab is where the expert views, manages, and shares their Skills. Each Skill clearly separates core logic from personalization, and shows relationships to other Skills.",
    subSections: [
      {
        id: "d-skill-list",
        title: "Skill List & Search",
        description:
          "A searchable, filterable list of all Skills available to the expert — both their own and shared Skills from other experts.",
        specs: [
          {
            id: "d-list-view",
            name: "Skill list view",
            description:
              "Each Skill is shown as a card with: name, description, origin (who created it), tags, step count (core vs. personalized), and related Skills.",
            guidelines: [
              "Search by name, description, or tags.",
              "Filter by: My Skills, Shared Skills, All Skills.",
              "Sort by: recently created, most used, alphabetical.",
              "Show a badge for Skills the expert created vs. Skills they imported.",
            ],
          },
          {
            id: "d-skill-count",
            name: "Skill count and stats",
            description:
              "Header area showing total Skills, how many contain personalized steps, and how many have been proposed for Intuit-wide use.",
            guidelines: [
              "Keep it compact — one line of stats above the list.",
            ],
          },
        ],
      },
      {
        id: "d-skill-actions",
        title: "Skill Actions",
        description:
          "Actions the expert can take on any Skill they own.",
        specs: [
          {
            id: "d-modify",
            name: "Modify Skill",
            description:
              "Edit the Skill's steps, description, tags, or personalization notes. Opens an inline editor or detail view.",
            guidelines: [
              "Changes are versioned — the expert can see previous versions.",
              "Modifying a Skill that has been shared Intuit-wide creates a personal fork, not a global edit.",
            ],
          },
          {
            id: "d-delete",
            name: "Delete Skill",
            description:
              "Remove a Skill from the expert's library. Requires confirmation.",
            states: [
              "Confirm dialog: 'Delete this Skill? This removes it from your library.'",
              "If the Skill has been proposed Intuit-wide, warn: 'This Skill has been shared. Deleting it removes your copy but the shared version remains.'",
            ],
            guidelines: [
              "Soft delete with 30-day recovery window.",
              "Shared versions are not affected by personal deletion.",
            ],
          },
          {
            id: "d-propose",
            name: "Propose for Intuit-wide consumption",
            description:
              "Submit a Skill for review and potential inclusion in the shared Intuit Skill library. Shadow strips the personalization layer and presents the core Skill for review.",
            states: [
              "Draft: expert reviews the core Skill (personalization stripped).",
              "Submitted: Skill is in the review queue.",
              "Approved: Skill is live in the Intuit-wide library.",
              "Rejected: feedback provided, expert can revise and resubmit.",
            ],
            guidelines: [
              "The expert sees a side-by-side: their personalized version vs. the core version being proposed.",
              "The expert can edit the core version before submitting.",
              "Attribution: the expert's name is associated with the Skill in the shared library.",
            ],
          },
        ],
      },
      {
        id: "d-core-vs-personal",
        title: "Core vs. Personalized Steps",
        description:
          "Within a Skill, each step is tagged as either Core or Personalized. Core steps are the universal, transferable logic — the part that any expert or agent can adopt. Personalized steps are expert-specific additions or modifications: a different navigation shortcut, a preferred phrasing, an extra verification step that matches how one expert likes to work. When an expert imports an Intuit-wide Skill, they receive the Core steps. They can then add their own Personalized steps or modify existing ones without affecting the shared version.",
        specs: [
          {
            id: "d-core-step",
            name: "Core step",
            description:
              "A step that is part of the universal Skill logic. Core steps are what get shared Intuit-wide. They represent the canonical way to accomplish the task.",
            guidelines: [
              "Displayed with a neutral visual treatment — standard text, standard row in the step list.",
              "Every Skill must have at least one Core step. A Skill with only Personalized steps cannot be proposed for Intuit-wide use.",
              "Core steps are locked from modification in an imported Skill — the expert forks the Skill if they want to change core logic.",
            ],
          },
          {
            id: "d-personalized-step",
            name: "Personalized step",
            description:
              "A step the expert has added or modified to match their style. Examples: a navigation shortcut instead of the menu path, a custom greeting template, an extra QA check they always perform.",
            guidelines: [
              "Displayed with a distinct visual treatment — amber/gold left border and a 'Your step' tag.",
              "Personalized steps can be inserted between Core steps, appended at the end, or used to replace a Core step (the original Core step is preserved underneath).",
              "When the Skill is proposed for Intuit-wide consumption, Personalized steps are stripped. The expert sees a preview of what the shared version will look like.",
              "Other experts who import the Skill do not see the original expert's Personalized steps — they start with Core only and add their own.",
            ],
          },
          {
            id: "d-step-tagging",
            name: "Step tagging & management",
            description:
              "The expert can tag any step as Core or Personalized. Shadow also auto-suggests tags based on whether the step matches common patterns (Core) or is unique to this expert's sessions (Personalized).",
            guidelines: [
              "Each step in the step list shows a small tag: 'Core' (neutral) or 'Yours' (amber).",
              "The expert can toggle a step's tag at any time.",
              "When viewing a Skill, the expert can filter to show 'All steps', 'Core only', or 'My additions only'.",
              "Shadow highlights newly added Personalized steps so the expert can review what's unique to them.",
            ],
          },
        ],
      },
      {
        id: "d-related-skills",
        title: "Related Skills",
        description:
          "Skills don't exist in isolation. The related Skills section shows dependencies and optional connections.",
        specs: [
          {
            id: "d-imported",
            name: "Imported Skills",
            description:
              "Skills that are required as a prerequisite or used in tandem with this Skill. These are dependencies — the current Skill won't work properly without them.",
            guidelines: [
              "Displayed as a linked list with the relationship clearly labeled: 'Required by this Skill' or 'Used together with this Skill.'",
              "If an imported Skill is missing from the expert's library, show a prompt to add it.",
              "Example: 'qbo-reconcile-account' imports 'qbo-navigate-to-bookkeeping.'",
            ],
          },
          {
            id: "d-optional",
            name: "Optionally Invoked Skills",
            description:
              "Skills that may be triggered dynamically based on user choice or context during execution. These are not required but extend the current Skill's capability.",
            guidelines: [
              "Displayed separately from imported Skills with a different label: 'May also invoke' or 'Related optional Skills.'",
              "During Skill execution (Agent Mode), Shadow presents these as choices: 'Would you also like me to run [optional Skill]?'",
              "Example: 'qbo-resolve-reconciliation-discrepancy' optionally invokes 'qbo-generate-reconciliation-report.'",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "inline-suggestions",
    letter: "E",
    title: "Proactive Messages",
    description:
      "Shadow and the expert interact like two colleagues on Slack who are looking at the same screen. Shadow doesn't overlay floating UI elements on the page — it communicates through the chat. When Shadow notices something relevant (a matching Skill, a customer history detail, a behavioral pattern), it sends a proactive message in the conversation, just like a colleague would tap you and say 'Hey, heads up.' The chat is always the single channel of communication.",
    subSections: [
      {
        id: "e-proactive-triggers",
        title: "When Shadow Speaks Up",
        description:
          "Shadow monitors the expert's context — the page they're on, the customer they're helping, the actions they're taking — and proactively sends messages when it has something useful to share. These aren't system alerts; they're conversational.",
        specs: [
          {
            id: "e-message-types",
            name: "Message types",
            description:
              "Three flavors of proactive message: (1) Context recall — Shadow surfaces relevant history ('Heads up — David called about a $247 discrepancy in Supplies last month. That unmatched Office Supplies line might be related.'), (2) Skill match — Shadow notices a relevant Skill ('You're on the reconcile page — I have a Skill for this. Want me to walk you through it or run it?'), (3) Pattern observation — Shadow notices something the expert does repeatedly ('I've seen you pull the Transaction Detail report during reconciliations the last 3 times. Want me to add that as a step in your Skill?').",
            guidelines: [
              "Messages should read like a helpful colleague, not a system notification.",
              "Each proactive message is clearly labeled with a source tag so the expert knows why Shadow is speaking up: 'Customer history', 'Skill match', or 'Pattern observed'.",
              "The expert can reply naturally — ask follow-up questions, say 'tell me more', or dismiss with 'got it'.",
              "Shadow respects conversation flow — it won't interrupt the expert mid-thought. If the expert is actively typing, Shadow queues its message.",
            ],
          },
          {
            id: "e-message-frequency",
            name: "Cadence & restraint",
            description:
              "Shadow is a thoughtful colleague, not a noisy one. It limits proactive messages to avoid fatigue — typically no more than 2-3 unsolicited messages per call. It prioritizes high-confidence, high-value observations over exhaustive commentary.",
            guidelines: [
              "Maximum 2-3 proactive messages per customer engagement unless the expert asks for more.",
              "Higher confidence → more likely to surface. Low-confidence observations stay quiet.",
              "If the expert dismisses proactive messages repeatedly, Shadow reduces frequency for that session.",
              "The expert can adjust proactivity level in settings: 'Quiet', 'Balanced', or 'Chatty'.",
            ],
          },
        ],
      },
      {
        id: "e-visual-treatment",
        title: "How Proactive Messages Look in Chat",
        description:
          "Proactive messages appear in the same chat stream as regular conversation, but with a subtle visual distinction so the expert can tell at a glance that Shadow initiated the message (vs. responding to a question).",
        specs: [
          {
            id: "e-proactive-styling",
            name: "Visual differentiation",
            description:
              "Proactive messages share the same chat bubble style as Shadow's regular responses but include a small source badge above the message (e.g., 'Customer history', 'Skill match'). An optional left-border accent or icon distinguishes them from direct replies without breaking the chat flow.",
            states: [
              "Appeared: message fades in with a subtle slide-up, like a new Slack message.",
              "Actionable: if the message contains a suggested action (open a Skill, add a step), an inline button appears below the text.",
              "Acknowledged: the expert can react (thumbs up) or reply — either way, the conversation continues naturally.",
              "Muted: if dismissed or ignored, the message stays in history but is visually de-emphasized.",
            ],
            guidelines: [
              "Proactive messages should never look like error banners, system toasts, or modal alerts.",
              "They belong in the conversation — same font, same bubble shape, just a small badge to indicate Shadow spoke first.",
              "Action buttons within proactive messages should use the same patterns as other chat interactions (Plan it, Run it, Show details).",
            ],
          },
          {
            id: "e-attention-dot",
            name: "Unread indicator",
            description:
              "If the expert has the Right Panel minimized or is on a different tab when Shadow sends a proactive message, a subtle dot appears on the Shadow extension icon — like an unread badge on Slack. It signals 'I have something for you' without demanding attention.",
            guidelines: [
              "The dot is small and non-distracting — a signal, not an alarm.",
              "Clicking it opens the Right Panel to the latest proactive message.",
              "The dot clears once the expert views the message.",
            ],
          },
        ],
      },
      {
        id: "e-conversation-examples",
        title: "Conversation Patterns",
        description:
          "Examples of how proactive messages weave naturally into the chat — showing the Slack-like dynamic between Shadow and the expert.",
        specs: [
          {
            id: "e-example-context",
            name: "Context recall mid-call",
            description:
              "Expert is on the reconcile page. Shadow sends: 'Heads up — David mentioned a $247 issue with Supplies last call. That unmatched Office Supplies Co. line ($247.00) might be the same thing.' Expert replies: 'Good catch, let me check.' The conversation continues naturally from there.",
          },
          {
            id: "e-example-skill",
            name: "Skill suggestion",
            description:
              "Expert navigates to the invoice page. Shadow sends: 'I have a Skill for creating invoices from estimates — want me to pull it up?' Expert replies: 'Yeah, plan it out for me.' Shadow responds with a Plan Mode checklist.",
          },
          {
            id: "e-example-pattern",
            name: "Pattern observation",
            description:
              "After the expert finishes a reconciliation, Shadow sends: 'I noticed you always pull the Transaction Detail report after reconciling. Want me to add that as a step in your qbo-reconcile-account Skill?' Expert replies: 'Yes, but make it optional — I only do it for business checking.' Shadow updates the Skill and confirms.",
          },
        ],
      },
    ],
  },
];
