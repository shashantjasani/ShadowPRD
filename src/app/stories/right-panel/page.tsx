import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import RightPanelChat from "@/components/prototypes/RightPanelChat";

export default function RightPanelPage() {
  return (
    <>
      <PageHeader
        title="Right Panel Chat"
        description="An expert opens the Shadow panel, asks for help, and Shadow can execute Skills on their behalf — with the expert reviewing and approving before anything happens."
        badge="Prototype B"
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <EditBanner filePath="src/components/prototypes/RightPanelChat.tsx" />
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-bold">The Story</h2>
          <p className="leading-relaxed text-muted">
            An expert is on a product page — say, QuickBooks Online — and
            needs to perform a task. They open the Shadow Right Panel and
            describe what they need in plain language. Shadow identifies the
            relevant Skill, gathers the necessary details, and then offers
            to execute the Skill on the expert&apos;s behalf. The expert sees a
            full preview of exactly what Shadow will do — every field, every
            value — and can approve, edit the details, or skip and do it
            manually. Nothing happens without the expert&apos;s approval. This
            is the difference between a chatbot that gives instructions and
            an assistant that does the work for you, with you in control.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Use Cases</h2>
          <ol className="space-y-2 pl-5 text-sm leading-relaxed text-muted">
            <li className="list-decimal">
              Expert is on a product page and needs to perform a task.
            </li>
            <li className="list-decimal">
              Expert opens Shadow Right Panel (via extension icon or keyboard shortcut).
            </li>
            <li className="list-decimal">
              Expert describes the task in natural language (e.g. &quot;add an expense in quickbooks&quot;).
            </li>
            <li className="list-decimal">
              Shadow identifies the relevant Skill and asks for the required details.
            </li>
            <li className="list-decimal">
              Expert provides details. Shadow presents a Skill Execution Preview — a full breakdown of exactly what it will do.
            </li>
            <li className="list-decimal">
              Expert chooses: <strong>Approve & Execute</strong> (Shadow performs the task), <strong>Review & Edit</strong> (modify details before execution), or <strong>Skip</strong> (do it manually).
            </li>
            <li className="list-decimal">
              On approval, Shadow executes the Skill and confirms the result with a transaction reference.
            </li>
            <li className="list-decimal">
              Task completed without leaving the page. Expert stayed in control throughout.
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
