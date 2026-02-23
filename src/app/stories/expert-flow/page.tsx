import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import ExpertFlow from "@/components/prototypes/ExpertFlow";

export default function ExpertFlowPage() {
  return (
    <>
      <PageHeader
        title="Expert Pre-Call / Call / Post-Call"
        description="Shadow fetches personalized Skills before the call, observes during, then presents a summary and proposed Skills tuned to the expert's style for collaborative refinement."
        badge="Prototype A"
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <EditBanner filePath="src/components/prototypes/ExpertFlow.tsx" />
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-bold">The Story</h2>
          <p className="leading-relaxed text-muted">
            A Product Support expert gets a 2-minute window before each customer
            call. During that window, Shadow identifies the contact topic and
            fetches Skills personalized to this expert&apos;s patterns and style.
            During the call, Shadow captures the session and surfaces nudges
            informed by how this expert typically handles similar cases. After
            the call, Shadow presents a summary and proposes new Skills that
            reflect the expert&apos;s specific approach — not generic templates.
            The expert reviews, modifies, and approves — each refinement
            trains Shadow further on their preferences, building toward
            a richer Expert Profile and ultimately an AI Twin. The result is
            a polished, personalized Skill immediately available to others.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Use Cases</h2>
          <ol className="space-y-2 pl-5 text-sm leading-relaxed text-muted">
            <li className="list-decimal">
              Expert receives incoming contact with topic and customer context.
            </li>
            <li className="list-decimal">
              Shadow fetches Skills personalized to this expert&apos;s history and displays them during the 2-minute prep window.
            </li>
            <li className="list-decimal">
              Expert previews Skills with their style notes (navigation patterns, tool preferences) and prepares.
            </li>
            <li className="list-decimal">
              Call connects; Shadow captures actions, transcript, and network activity while learning the expert&apos;s approach.
            </li>
            <li className="list-decimal">
              Shadow surfaces contextual nudges based on this expert&apos;s typical patterns for similar cases.
            </li>
            <li className="list-decimal">
              Call ends; Shadow generates a call summary with key actions and transcript highlights.
            </li>
            <li className="list-decimal">
              Shadow proposes new or updated Skills tuned to the expert&apos;s style, with personalization details visible.
            </li>
            <li className="list-decimal">
              Expert reviews proposed Skill: accept, modify (collaborative refinement with Shadow), or dismiss. Each interaction refines the Expert Profile.
            </li>
            <li className="list-decimal">
              Approved Skill is saved to the expert&apos;s personal library and available to other agents. Expert Profile strength increases.
            </li>
          </ol>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-bold">Interactive Prototype</h2>
          <p className="mb-6 text-sm text-muted">
            The browser mockup below shows the Intuit Expert Portal on the left
            and Shadow&apos;s panel on the right. Use the phase tabs inside the
            Shadow panel to walk through Pre-Call → During → Post-Call → Refine.
          </p>
        </div>

        <ExpertFlow />
      </div>
    </>
  );
}
