import PageHeader from "@/components/layout/PageHeader";
import EditBanner from "@/components/layout/EditBanner";
import SessionToSkill from "@/components/prototypes/SessionToSkill";

export default function SessionSkillPage() {
  return (
    <>
      <PageHeader
        title="Session Review & Skill Creation"
        description="An expert reviews a captured session, filters to the actions that matter, and generates a reusable Skill with one click."
        badge="Prototype C"
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <EditBanner filePath="src/components/prototypes/SessionToSkill.tsx" />
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-bold">The Story</h2>
          <p className="leading-relaxed text-muted">
            After a session is captured, the expert (or anyone with access) can
            open it in the session viewer. They see every action on a timeline —
            clicks, typing, navigation, network calls — with details for each
            event. They can filter to just the actions that matter (e.g. only
            Clicks and Navigate), optionally include screenshots for richer
            context, and hit &quot;Generate Skill.&quot; Shadow analyzes the filtered
            actions and produces a clean, reusable Skill. The expert can edit it
            inline before saving. The Skill follows an open format that tools
            like Cursor can read and execute.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Use Cases</h2>
          <ol className="space-y-2 pl-5 text-sm leading-relaxed text-muted">
            <li className="list-decimal">
              Expert opens a past session in the session viewer.
            </li>
            <li className="list-decimal">
              They see session metadata (ID, date, time range, duration, total actions) and a timeline of events.
            </li>
            <li className="list-decimal">
              They filter events by type (e.g. show only Clicks and Navigate) — the timeline and count update.
            </li>
            <li className="list-decimal">
              If audio was captured, they can play the recording and read the transcript.
            </li>
            <li className="list-decimal">
              They choose whether to include screenshots and click &quot;Generate Skill.&quot;
            </li>
            <li className="list-decimal">
              Shadow analyzes the filtered actions (and screenshots/transcript if included) and produces a Skill.
            </li>
            <li className="list-decimal">
              Expert reviews the Skill, edits inline if needed, and saves it.
            </li>
            <li className="list-decimal">
              The Skill is available in the library and can be used by other agents or consumed by tools like Cursor.
            </li>
          </ol>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-bold">Interactive Prototype</h2>
          <p className="mb-6 text-sm text-muted">
            Filter events using the toggles, then click &quot;Generate Skill&quot; to see
            the flow. You can edit the generated Skill inline.
          </p>
        </div>

        <SessionToSkill />
      </div>
    </>
  );
}
