export interface Skill {
  id: string;
  name: string;
  slug: string;
  description: string;
  steps: string[];
  tags: string[];
  personalizedFor?: string;
  styleNotes?: string[];
}

export interface ExpertProfile {
  expertId: string;
  name: string;
  role: string;
  sessionsLogged: number;
  skillsGenerated: number;
  topPatterns: string[];
  communicationStyle: string;
  toolPreferences: string[];
  profileStrength: number;
}

export const expertProfile: ExpertProfile = {
  expertId: "expert-asha-patel",
  name: "Asha Patel",
  role: "Senior Product Support Expert",
  sessionsLogged: 147,
  skillsGenerated: 23,
  topPatterns: [
    "Checks reconciliation history before asking customer questions",
    "Uses Reports → Reconciliation Report early to diagnose",
    "Walks customer through each step verbally while navigating",
    "Always confirms resolution with customer before closing",
  ],
  communicationStyle:
    "Detailed and patient — explains each click as she performs it. Uses reassuring language ('Let's take a look together'). Prefers structured walkthroughs over high-level summaries.",
  toolPreferences: [
    "Keyboard shortcuts for navigation (Ctrl+Alt+R for Reconcile)",
    "Opens Reconciliation Report in a second tab for side-by-side comparison",
    "Uses built-in QBO calculator rather than external tools",
  ],
  profileStrength: 72,
};

export const skills: Skill[] = [
  {
    id: "skill-001",
    name: "quickbooks-online-create-expense-transaction",
    slug: "qbo-create-expense",
    description:
      "Create an expense transaction in QuickBooks Online. Walks through the full flow from navigation to saving the entry.",
    steps: [
      "Go to Expenses (left menu).",
      'Click "New transaction" → "Expense".',
      "Choose Payee and Payment method/account (e.g. Cash, Credit Card, Checking).",
      "Enter Ref no. (optional).",
      "In the line item: pick Category, add Description, enter Amount.",
      'Click "Save and close".',
    ],
    tags: ["QuickBooks Online", "Expenses", "Bookkeeping"],
    personalizedFor: "Asha Patel",
    styleNotes: [
      "Uses keyboard shortcut Ctrl+Alt+E to open Expenses",
      "Always adds a description — Asha's pattern is to include vendor + purpose",
    ],
  },
  {
    id: "skill-002",
    name: "quickbooks-online-reconcile-account",
    slug: "qbo-reconcile",
    description:
      "Reconcile a bank or credit card account in QuickBooks Online to match the statement balance.",
    steps: [
      "Go to Bookkeeping → Reconcile (left menu).",
      "Select the account to reconcile.",
      "Enter the statement ending date and ending balance from the bank statement.",
      'Click "Start reconciling".',
      "Match transactions by checking them off against the statement.",
      "Verify the difference is $0.00.",
      'Click "Finish now".',
    ],
    tags: ["QuickBooks Online", "Reconciliation", "Bookkeeping"],
    personalizedFor: "Asha Patel",
    styleNotes: [
      "Opens Reconciliation Report in a second tab for side-by-side comparison",
      "Checks reconciliation history before asking customer questions",
      "Walks customer through each step verbally",
    ],
  },
  {
    id: "skill-003",
    name: "quickbooks-online-add-client",
    slug: "qbo-add-client",
    description:
      "Add a new bookkeeping client to QuickBooks Online Accountant and set up their company profile.",
    steps: [
      "From the Accountant dashboard, click Clients → Client list.",
      'Click "Add client".',
      "Enter client name, email, and company details.",
      "Choose the subscription plan (if applicable).",
      "Send the invitation or set up the company directly.",
      "Verify the client appears in the client list.",
    ],
    tags: ["QuickBooks Online", "Clients", "Onboarding"],
  },
];

export interface CustomerMemory {
  customerId: string;
  name: string;
  totalInteractions: number;
  lastContact: string;
  episodes: {
    date: string;
    expert: string;
    topic: string;
    resolution: string;
    followUp?: string;
  }[];
  openItems: string[];
}

export const customerMemory: CustomerMemory = {
  customerId: "cust-david-park",
  name: "David Park",
  totalInteractions: 4,
  lastContact: "12 days ago",
  episodes: [
    {
      date: "Feb 8, 2026",
      expert: "Asha Patel",
      topic: "Bank feed connection issue",
      resolution: "Reconnected Chase checking via OAuth. Transactions synced within 2 hours.",
      followUp: "Customer to verify transactions matched by Feb 10.",
    },
    {
      date: "Jan 22, 2026",
      expert: "Marcus Rivera",
      topic: "Duplicate expense entries",
      resolution: "Identified 3 duplicates from bank feed + manual entry. Deleted manual entries, showed customer how to check for duplicates.",
    },
    {
      date: "Dec 15, 2025",
      expert: "Asha Patel",
      topic: "Year-end reconciliation help",
      resolution: "Walked through full Dec reconciliation. All accounts balanced. Customer needed help understanding uncleared transactions.",
    },
  ],
  openItems: [
    "Customer mentioned wanting to set up automatic bank rules — not yet addressed.",
  ],
};

export const contactTopics = [
  {
    id: "topic-001",
    topic: "QuickBooks reconciliation discrepancy",
    description:
      "Customer reports their reconciliation is off by a specific amount and can't find the source.",
    relatedSkillIds: ["skill-002"],
    customerContext:
      "Small business owner, QuickBooks Online Plus, last reconciled 45 days ago. Discrepancy of $1,247.50 on checking account.",
  },
  {
    id: "topic-002",
    topic: "How to record an expense in QuickBooks",
    description:
      "Customer needs help entering a business expense into their books.",
    relatedSkillIds: ["skill-001"],
    customerContext:
      "Sole proprietor, QuickBooks Online Simple Start, new user (2 weeks). Wants to enter a $340 office supplies purchase.",
  },
  {
    id: "topic-003",
    topic: "Adding a new client to QBO Accountant",
    description:
      "Bookkeeper wants to onboard a new client to their QuickBooks Online Accountant practice.",
    relatedSkillIds: ["skill-003"],
    customerContext:
      "ProAdvisor with 12 existing clients, adding a new restaurant client for monthly bookkeeping.",
  },
];
