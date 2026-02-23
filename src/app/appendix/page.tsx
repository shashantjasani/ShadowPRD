import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";

export default function AppendixPage() {
  return (
    <>
      <PageHeader
        title="Appendix & References"
        description="Supporting documents, specs, and assets."
        badge="Reference"
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="mb-2 text-lg font-semibold">
              Privacy, Security & Legal
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-muted">
              Detailed review brief covering consent, PII handling, retention
              policies, and review requests for Security, IT, Legal, Privacy,
              and Compliance.
            </p>
            <span className="text-sm text-accent">
              shadow-security-it-legal-onepager.txt
            </span>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="mb-2 text-lg font-semibold">Agent Skills Format</h3>
            <p className="mb-3 text-sm leading-relaxed text-muted">
              Skills created in Shadow follow an open, documented format. These
              Skills can be read and executed by tools like Cursor, making expert
              workflows directly actionable by AI.
            </p>
            <span className="text-sm text-accent">
              Open-source Agent Skills specification
            </span>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="mb-2 text-lg font-semibold">
              Chrome Extension Screenshots
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-muted">
              Screenshots and screen recordings of the Chrome extension showing
              the capture settings popup, session viewer, Create Skill flow,
              Audio & Transcript, and Right Panel Chat.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-muted">
              <span className="rounded bg-background px-2 py-1">
                Capture Settings
              </span>
              <span className="rounded bg-background px-2 py-1">
                Session Viewer
              </span>
              <span className="rounded bg-background px-2 py-1">
                Create Skill
              </span>
              <span className="rounded bg-background px-2 py-1">
                Audio & Transcript
              </span>
              <span className="rounded bg-background px-2 py-1">
                Right Panel Chat
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h3 className="mb-2 text-lg font-semibold">
              Static PRD (Markdown)
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              The lightweight markdown PRD (prd-v3-lightweight.md) contains the
              full narrative text that feeds the static sections of this site.
              Use it as a portable reference when the interactive site isn&apos;t
              available.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm text-accent hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
