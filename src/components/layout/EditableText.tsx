"use client";

import { useState, useRef, useEffect } from "react";
import { useEditable } from "@/hooks/useEditable";

interface EditableTextProps {
  contentKey: string;
  original: string;
  as?: "p" | "span" | "div";
  className?: string;
  multiline?: boolean;
}

export default function EditableText({
  contentKey,
  original,
  as: Tag = "p",
  className = "",
  multiline = false,
}: EditableTextProps) {
  const { value, isEditing, isModified, save, reset, startEditing, cancelEditing } =
    useEditable(contentKey, original);
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) {
      setDraft(value);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }, [isEditing, value]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [draft, isEditing]);

  if (isEditing) {
    return (
      <div className="group relative">
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") cancelEditing();
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save(draft);
          }}
          className={`w-full resize-none rounded-md border border-violet-300 bg-violet-50/50 px-3 py-2 text-base leading-relaxed outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 ${multiline ? "min-h-[100px]" : "min-h-[44px]"}`}
          rows={multiline ? 4 : 2}
        />
        <div className="mt-1.5 flex items-center gap-2">
          <button
            onClick={() => save(draft)}
            className="rounded bg-violet-600 px-3 py-1 text-xs font-medium text-white hover:bg-violet-700"
          >
            Save
          </button>
          <button
            onClick={cancelEditing}
            className="rounded border border-zinc-200 px-3 py-1 text-xs text-zinc-500 hover:bg-zinc-50"
          >
            Cancel
          </button>
          <span className="text-[10px] text-zinc-400">
            {navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Enter to save &middot; Esc to cancel
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <Tag className={`${className} ${isModified ? "border-l-2 border-violet-400 pl-3" : ""}`}>
        {value}
      </Tag>
      <div className="absolute -right-2 top-0 flex translate-x-full items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={startEditing}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-400 shadow-sm ring-1 ring-zinc-200 hover:text-violet-600 hover:ring-violet-300"
          title="Edit"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        {isModified && (
          <button
            onClick={reset}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-400 shadow-sm ring-1 ring-zinc-200 hover:text-amber-600 hover:ring-amber-300"
            title="Reset to original"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>
      {isModified && (
        <span className="ml-2 inline-block rounded bg-violet-100 px-1.5 py-0.5 text-[9px] font-medium text-violet-600">
          Modified
        </span>
      )}
    </div>
  );
}
