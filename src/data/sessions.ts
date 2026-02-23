export type EventType = "click" | "type" | "hover" | "navigate" | "network" | "scroll";

export interface SessionEvent {
  id: string;
  timestamp: number;
  type: EventType;
  label: string;
  element?: string;
  selector?: string;
  position?: { x: number; y: number };
  text?: string;
  url?: string;
  screenshotPlaceholder?: boolean;
}

export interface Session {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  durationSeconds: number;
  totalActions: number;
  events: SessionEvent[];
  transcript?: string;
  audioUrl?: string;
}

export const sampleSession: Session = {
  id: "session-1771531819539-hfz31o",
  date: "Thu, Feb 19, 2026",
  startTime: "11:56:59 AM",
  endTime: "11:58:12 AM",
  durationSeconds: 72,
  totalActions: 624,
  events: [
    {
      id: "evt-001",
      timestamp: 4.175,
      type: "click",
      label: "QuickBooks — Official Site | Smart Tools, Better B…",
      element: "a",
      selector: "#sign-in-options-menu > ul > li:nth-of-type(1) > span > a",
      position: { x: 1349, y: 175 },
      text: "QuickBooks Online",
      screenshotPlaceholder: true,
    },
    {
      id: "evt-002",
      timestamp: 6.8,
      type: "navigate",
      label: "Navigated to QuickBooks Online login page",
      url: "https://accounts.intuit.com/app/sign-in?redirect_uri=...",
    },
    {
      id: "evt-003",
      timestamp: 12.3,
      type: "type",
      label: "Entered email address",
      element: "input",
      selector: "#ius-userid",
      text: "[REDACTED]",
    },
    {
      id: "evt-004",
      timestamp: 14.1,
      type: "click",
      label: 'Clicked "Sign In" button',
      element: "button",
      selector: "#ius-sign-in-submit-btn",
      position: { x: 640, y: 420 },
    },
    {
      id: "evt-005",
      timestamp: 18.5,
      type: "navigate",
      label: "Navigated to QBO Dashboard",
      url: "https://qbo.intuit.com/app/homepage",
    },
    {
      id: "evt-006",
      timestamp: 20.2,
      type: "click",
      label: 'Clicked "Expenses" in left navigation',
      element: "a",
      selector: "#left-nav-expenses",
      position: { x: 82, y: 310 },
      text: "Expenses",
    },
    {
      id: "evt-007",
      timestamp: 23.0,
      type: "network",
      label: "GET /api/v3/company/expenses?page=1 — 200 OK",
      url: "/api/v3/company/expenses?page=1",
    },
    {
      id: "evt-008",
      timestamp: 24.8,
      type: "click",
      label: 'Clicked "New transaction" dropdown',
      element: "button",
      selector: ".new-transaction-btn",
      position: { x: 900, y: 160 },
      text: "New transaction",
      screenshotPlaceholder: true,
    },
    {
      id: "evt-009",
      timestamp: 26.1,
      type: "click",
      label: 'Selected "Expense" from dropdown',
      element: "a",
      selector: ".dropdown-menu .expense-option",
      position: { x: 920, y: 210 },
      text: "Expense",
    },
    {
      id: "evt-010",
      timestamp: 30.4,
      type: "type",
      label: "Entered Payee name",
      element: "input",
      selector: "#payee-field",
      text: "Office Depot",
    },
    {
      id: "evt-011",
      timestamp: 33.2,
      type: "click",
      label: "Selected payment account: Checking",
      element: "select",
      selector: "#payment-account",
      text: "Checking",
    },
    {
      id: "evt-012",
      timestamp: 36.7,
      type: "type",
      label: "Entered category: Office Supplies",
      element: "input",
      selector: "#category-field",
      text: "Office Supplies",
    },
    {
      id: "evt-013",
      timestamp: 40.0,
      type: "type",
      label: "Entered amount: $340.00",
      element: "input",
      selector: "#amount-field",
      text: "$340.00",
    },
    {
      id: "evt-014",
      timestamp: 42.5,
      type: "type",
      label: "Entered description: Monthly office supply order",
      element: "input",
      selector: "#description-field",
      text: "Monthly office supply order",
    },
    {
      id: "evt-015",
      timestamp: 45.8,
      type: "click",
      label: 'Clicked "Save and close"',
      element: "button",
      selector: "#save-and-close-btn",
      position: { x: 780, y: 550 },
      text: "Save and close",
      screenshotPlaceholder: true,
    },
    {
      id: "evt-016",
      timestamp: 47.2,
      type: "network",
      label: "POST /api/v3/company/expenses — 201 Created",
      url: "/api/v3/company/expenses",
    },
    {
      id: "evt-017",
      timestamp: 48.0,
      type: "navigate",
      label: "Returned to Expenses list",
      url: "https://qbo.intuit.com/app/expenses",
    },
  ],
  transcript:
    "Customer: Hi, I need to add an expense to my QuickBooks. I bought some office supplies and I'm not sure how to enter it.\n\nAgent: Sure, I can help with that. Let me walk you through it. First, go to Expenses in the left menu.\n\nCustomer: Okay, I see it.\n\nAgent: Great. Now click New transaction and then Expense. You'll enter the payee — that's who you paid — the account you paid from, and the category. Then add the amount and a description if you want. Once that's done, hit Save and close.\n\nCustomer: Got it, that was easy. Thank you!",
};

export interface ChatMessage {
  role: "system" | "user" | "agent" | "action" | "result";
  content: string;
  actionType?: "execute-skill";
  skillName?: string;
  preview?: { label: string; value: string }[];
}

export const chatTranscript: ChatMessage[] = [
  {
    role: "system",
    content:
      "TASK_SOLVED: true\n\nI checked the available skills in this environment. There is currently 1 skill available:\n\n- **quickbooks-online-create-expense-transaction** — a capability for creating an expense transaction in QuickBooks Online.",
  },
  {
    role: "user",
    content: "add an expense in quickbooks",
  },
  {
    role: "agent",
    content:
      "I can help with that. I have the Skill **quickbooks-online-create-expense-transaction** available.\n\nI need a few details:\n\n1) **Payee**\n2) **Payment method/account**\n3) **Category**\n4) **Amount**\n5) **Description**",
  },
  {
    role: "user",
    content:
      "Payee: Office Depot, Payment: Checking, Category: Office Supplies, Amount: $340, Description: Monthly office supply order",
  },
  {
    role: "action",
    content: "I can execute this Skill for you. Here's what I'll do:",
    actionType: "execute-skill",
    skillName: "quickbooks-online-create-expense-transaction",
    preview: [
      { label: "Payee", value: "Office Depot" },
      { label: "Payment account", value: "Checking" },
      { label: "Date", value: "Feb 20, 2026" },
      { label: "Category", value: "Office Supplies" },
      { label: "Amount", value: "$340.00" },
      { label: "Description", value: "Monthly office supply order" },
    ],
  },
  {
    role: "result",
    content: "Skill executed successfully.\n\nExpense created: $340.00 to Office Depot from Checking.\nTransaction ID: TXN-2026-04817\n\nThe expense is now in your Expenses list.",
  },
];
