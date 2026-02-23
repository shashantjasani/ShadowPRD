"use client";

import { useState, useEffect } from "react";
import { getAllModifiedKeys, resetAllEdits } from "@/hooks/useEditable";

interface EditBannerProps {
  filePath: string;
}

export default function EditBanner({ filePath }: EditBannerProps) {
  const [modifiedCount, setModifiedCount] = useState(0);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    const check = () => setModifiedCount(getAllModifiedKeys().length);
    check();
    window.addEventListener("storage", check);
    const interval = setInterval(check, 2000);
    return () => {
      window.removeEventListener("storage", check);
      clearInterval(interval);
    };
  }, []);

  const handleResetAll = () => {
    if (confirm("Reset all edits across the site to their original content?")) {
      resetAllEdits();
      setModifiedCount(0);
      window.location.reload();
    }
  };

  const handleExport = () => {
    const keys = getAllModifiedKeys();
    const edits: Record<string, string> = {};
    keys.forEach((key) => {
      try {
        const val = localStorage.getItem(`shadow-prd-edit:${key}`);
        if (val) edits[key] = val;
      } catch { /* noop */ }
    });
    const blob = new Blob([JSON.stringify(edits, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shadow-prd-edits.json";
    a.click();
    URL.revokeObjectURL(url);
    setShowExport(false);
  };

  return (
    <div className="mb-6 flex items-center gap-2 rounded-md border border-dashed border-border bg-background px-3 py-2 text-xs text-muted">
      <svg
        className="h-3.5 w-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      <span className="flex-1">
        Hover over any text block to edit &middot;{" "}
        <code className="rounded bg-border/50 px-1 py-0.5 font-mono text-[10px]">
          {filePath}
        </code>
      </span>
      {modifiedCount > 0 && (
        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-600">
            {modifiedCount} edit{modifiedCount !== 1 ? "s" : ""}
          </span>
          <button
            onClick={handleExport}
            className="rounded border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
            title="Export edits as JSON"
          >
            Export
          </button>
          <button
            onClick={handleResetAll}
            className="rounded border border-zinc-200 px-2 py-0.5 text-[10px] text-zinc-500 hover:bg-zinc-50 hover:text-amber-600"
            title="Reset all edits"
          >
            Reset all
          </button>
        </div>
      )}
    </div>
  );
}
