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
    id: "not-logged-in",
    letter: "A",
    title: "Right Rail — Not Logged In",
    description:
      "What the expert sees before authenticating with their Intuit Google Profile. The panel should clearly communicate what Shadow is, why it's valuable, and provide a frictionless path to sign in.",
    subSections: [
      {
        id: "a-branding",
        title: "Branding & Introduction",
        description:
          "The unauthenticated state is the expert's first impression of Shadow. It should be clean, professional, and immediately communicative.",
        specs: [
          {
            id: "a-logo",
            name: "Shadow logo and name",
            description:
              "Displayed prominently at the top of the panel. Establishes identity.",
            guidelines: [
              "Use the standard Shadow logo mark (S icon) and wordmark.",
              "No version numbers or internal labels visible to the user.",
            ],
          },
          {
            id: "a-tagline",
            name: "Value tagline",
            description:
              "A one-liner explaining what Shadow does: 'Your AI assistant that learns how you work.'",
            guidelines: [
              "Keep it under 10 words.",
              "Focus on the expert's benefit, not Shadow's features.",
            ],
          },
          {
            id: "a-feature-bullets",
            name: "Feature highlights",
            description:
              "3–4 short bullets showing what the expert gets: personalized Skills, session capture, in-context assistance, wrap-up automation.",
            guidelines: [
              "Use icons or small illustrations alongside each bullet.",
              "No jargon — language should make sense to a first-time user.",
            ],
          },
        ],
      },
      {
        id: "a-auth",
        title: "Authentication",
        description:
          "Sign-in flow using the expert's Intuit Google Profile.",
        specs: [
          {
            id: "a-sign-in-cta",
            name: "Sign in button",
            description:
              "Primary CTA: 'Sign in with Intuit'. Uses the standard Intuit OAuth / Google Profile flow.",
            states: [
              "Default: button enabled, ready to click.",
              "Loading: spinner replaces button text while authenticating.",
              "Error: inline error message below the button if auth fails.",
              "Success: panel transitions to the Record Tab home (Section B).",
            ],
            guidelines: [
              "Button should be the most prominent element on the panel.",
              "Do not require any information before sign-in — one click to authenticate.",
              "If the user is already authenticated in the browser, auto-detect and skip this screen.",
            ],
          },
          {
            id: "a-privacy-note",
            name: "Privacy note",
            description:
              "A brief reassurance below the sign-in button: 'Shadow only records when you start a session. You review everything before it's shared.'",
            guidelines: [
              "Keep it to 1–2 sentences.",
              "Link to the full privacy policy if available.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "record-tab",
    letter: "B",
    title: "Right Rail — Record Tab (Logged In)",
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
    letter: "C",
    title: "Right Rail — Chat Tab (Logged In)",
    description:
      "The Chat Tab is the conversational interface between the expert and Shadow. It supports two interaction modes, image uploads for context, and the full Skill execution flow with expert approval.",
    subSections: [
      {
        id: "c-mode-selector",
        title: "Mode Selector",
        description:
          "The expert can switch between Plan Mode and Agent Mode, controlling how Shadow responds.",
        specs: [
          {
            id: "c-plan-mode",
            name: "Plan Mode",
            description:
              "Shadow explains what to do step by step but does not execute any actions. The expert performs the steps manually. Think of it as a knowledgeable guide.",
            states: ["Active (indicated by a label in the chat header)", "Inactive"],
            guidelines: [
              "Default mode for new users.",
              "Shadow provides numbered step-by-step instructions with specific UI references.",
              "No Skill Execution Preview cards appear in this mode.",
            ],
          },
          {
            id: "c-agent-mode",
            name: "Agent Mode",
            description:
              "Shadow can execute Skills on the expert's behalf. When Shadow identifies an executable Skill, it presents a Skill Execution Preview for the expert to approve, edit, or skip.",
            states: ["Active (indicated by a label in the chat header)", "Inactive"],
            guidelines: [
              "Expert must explicitly switch to Agent Mode — it's never auto-enabled.",
              "Every execution requires expert approval via the Skill Execution Preview card.",
              "The expert can switch back to Plan Mode at any time, even mid-conversation.",
            ],
          },
          {
            id: "c-mode-toggle",
            name: "Mode toggle UI",
            description:
              "A segmented control or toggle in the chat header that switches between Plan and Agent mode.",
            guidelines: [
              "Clearly indicate the current mode with a label and visual differentiation.",
              "Show a brief tooltip on first use explaining the difference.",
              "Mode persists across sessions (saved in user preferences).",
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
              "Scrollable chat history. Expert messages on the right, Shadow responses on the left. System messages (Skill detection, status) in a neutral style.",
            guidelines: [
              "Auto-scroll to the latest message.",
              "Shadow messages support rich formatting: bold, lists, code blocks, inline Skill references.",
              "Long messages are collapsible with a 'Show more' toggle.",
            ],
          },
          {
            id: "c-skill-execution",
            name: "Skill Execution Preview (Agent Mode only)",
            description:
              "When Shadow identifies an executable Skill, it presents a preview card showing the Skill name, every parameter and value, and three action buttons: Approve & Execute, Review & Edit, and Skip.",
            guidelines: [
              "Only appears in Agent Mode.",
              "The preview must show every field that will be affected — no hidden actions.",
              "Review & Edit makes all fields editable inline before approval.",
              "After approval, show execution status and a confirmation with result details.",
              "Execution is never automatic — the expert always initiates it.",
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
    title: "Inline Suggestions (Phase 2)",
    description:
      "Inline suggestions are contextual nudges that appear directly on the expert's screen — overlaid on the page they're working on, not just in the Right Panel. Think of Cursor's ghost text: it appears right where you're typing, exactly when it's relevant. Shadow's equivalent is a subtle callout at the point of action — when the expert is about to navigate, click, or fill in a field.",
    subSections: [
      {
        id: "e-contextual-nudges",
        title: "Contextual Nudges",
        description:
          "Proactive suggestions that appear on the expert's screen during a call, anchored to the UI element or workflow step they relate to.",
        specs: [
          {
            id: "e-nudge-type",
            name: "Nudge types",
            description:
              "Three categories of inline suggestion: (1) Behavioral — based on what other experts typically do at this point ('Experts usually verify the reconciliation date here'), (2) Contextual — based on the current customer's history ('David mentioned a $247 discrepancy in Supplies last time'), (3) Skill-aware — suggesting a relevant Skill step ('You have a Skill for this — want to run it?').",
            guidelines: [
              "Nudges appear as small, dismissible callouts near the relevant UI element — never blocking the expert's work.",
              "Each nudge includes a source indicator: 'From your patterns', 'From customer history', or 'Skill: qbo-reconcile-account'.",
              "Maximum 1 nudge visible at a time. Queue additional nudges and show them sequentially.",
              "Nudges auto-dismiss after 8 seconds if not interacted with.",
            ],
          },
          {
            id: "e-nudge-appearance",
            name: "Visual treatment",
            description:
              "A compact floating card with a subtle shadow, anchored near the relevant element. Uses Shadow's brand accent color for the left border. Contains 1-2 lines of text, an optional action button, and a dismiss X.",
            states: [
              "Appearing: fade-in with a slight slide-up animation.",
              "Visible: static, positioned near the anchor element. Repositions if the page scrolls.",
              "Interacted: if the expert clicks the action button, the nudge transitions to the Right Panel for follow-through.",
              "Dismissed: fade-out on click of X or after auto-dismiss timer.",
            ],
            guidelines: [
              "Never cover critical UI elements (form fields, buttons the expert is about to click).",
              "Position priority: below the element, then above, then to the side.",
              "The expert can disable inline suggestions entirely from the Right Panel settings.",
            ],
          },
        ],
      },
      {
        id: "e-learning-indicators",
        title: "Learning Indicators",
        description:
          "Subtle visual signals that show Shadow is observing and learning — building trust that the system is paying attention without being intrusive.",
        specs: [
          {
            id: "e-learning-pulse",
            name: "Activity pulse",
            description:
              "A small, pulsing dot on the Shadow extension icon that indicates Shadow noticed something noteworthy — a new pattern, a deviation from usual behavior, or a potential Skill opportunity. Clicking it opens a brief explanation in the Right Panel.",
            guidelines: [
              "The pulse is gentle and non-distracting — not an alert, a signal.",
              "At most 2-3 pulses per session to avoid fatigue.",
              "Each pulse links to a specific insight: 'I noticed you used a different approach for this reconciliation — want me to remember it?'",
            ],
          },
          {
            id: "e-skill-match",
            name: "Skill match indicator",
            description:
              "When the expert navigates to a page or starts an action that matches a known Skill, a brief indicator appears: 'Skill available: qbo-create-expense'. Clicking it opens the Skill in the Right Panel.",
            states: [
              "Matched: small banner at the top of the Right Rail — 'Skill match: [skill name]'.",
              "Clicked: opens the Skill detail in the Right Panel with an option to execute (Agent Mode) or view steps (Plan Mode).",
              "Dismissed: expert closes it, won't show again for this Skill on this page during this session.",
            ],
            guidelines: [
              "Only show for Skills with high confidence match (>80% step overlap with current context).",
              "Don't show for Skills the expert just executed — avoid redundancy.",
            ],
          },
        ],
      },
      {
        id: "e-phase2-note",
        title: "Phase 2 Scope",
        description:
          "Inline suggestions are not part of the Phase 1 Chrome Extension. They require deeper page-level integration and confidence calibration. They're spec'd here because the component model needs to account for them — the Right Rail's layout, the event system, and the Skill matching engine all need to be designed with inline suggestions in mind, even before they ship.",
        specs: [
          {
            id: "e-prereqs",
            name: "Prerequisites for Phase 2",
            description:
              "Before inline suggestions can ship, Phase 1 needs to establish: (1) a reliable Skill matching engine with known accuracy, (2) enough Expert Profile depth to generate behavioral nudges, (3) expert trust — measured by continued usage and positive feedback on Right Panel suggestions.",
            guidelines: [
              "Phase 1 data collection directly feeds Phase 2 suggestion quality.",
              "The Right Panel in Phase 1 serves as a proving ground — if experts find its suggestions valuable, inline suggestions are the natural extension.",
              "Inline suggestions should launch behind a feature flag, opt-in only, with the expert panel providing initial feedback.",
            ],
          },
        ],
      },
    ],
  },
];
