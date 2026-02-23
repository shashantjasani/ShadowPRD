import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import RightPanelChat from "@/components/prototypes/RightPanelChat";

export default function RightPanelPage() {
  return (
    <>
      <PageHeader
        title="Right Panel Chat"
        description="An agent opens the Shadow panel on any page and asks for help. Shadow finds the right Skill and walks them through it step by step."
        badge="Prototype B"
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <EditBanner filePath="src/components/prototypes/RightPanelChat.tsx" />
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-bold">The Story</h2>
          <p className="leading-relaxed text-muted">
            An agent is on a product page — say, QuickBooks Online — and isn&apos;t
            sure how to do something. Instead of switching to a separate help
            system, they open the Shadow Right Panel directly on the page.
            They type their question in plain language. Shadow identifies the
            relevant Skill, explains what information it needs, and walks the
            agent through each step without ever leaving the page. The agent
            stays in flow and gets guidance in context.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Use Cases</h2>
          <ol className="space-y-2 pl-5 text-sm leading-relaxed text-muted">
            <li className="list-decimal">
              Agent is on a product page and encounters an unfamiliar task.
            </li>
            <li className="list-decimal">
              Agent opens Shadow Right Panel (e.g. via extension icon or keyboard shortcut).
            </li>
            <li className="list-decimal">
              Agent types a question in natural language (e.g. &quot;add an expense in quickbooks&quot;).
            </li>
            <li className="list-decimal">
              Shadow identifies the relevant Skill and responds with what
              information it needs or gives step-by-step instructions.
            </li>
            <li className="list-decimal">
              Agent provides details; Shadow walks them through the remaining
              steps with exact UI references.
            </li>
            <li className="list-decimal">
              Task completed without leaving the page or switching tools.
            </li>
          </ol>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-bold">Interactive Prototype</h2>
          <p className="mb-6 text-sm text-muted">
            The browser mockup below shows the Intuit Expert Portal on the left
            and Shadow&apos;s Chat panel on the right. Click &quot;Send&quot; to advance the
            simulated conversation. Switch to the Record tab to see capture
            settings.
          </p>
        </div>

        <RightPanelChat />
      </div>
    </>
  );
}
