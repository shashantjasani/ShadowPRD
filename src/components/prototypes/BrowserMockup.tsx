"use client";

import { ReactNode } from "react";

interface BrowserMockupProps {
  url?: string;
  tabTitle?: string;
  portalContent: ReactNode;
  shadowPanel: ReactNode;
  callControls?: ReactNode;
}

export default function BrowserMockup({
  url = "expert.intuit.com/workflow",
  tabTitle = "Intuit Expert Platform",
  portalContent,
  shadowPanel,
  callControls,
}: BrowserMockupProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100 shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-200/80 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        {/* Tab */}
        <div className="ml-2 flex items-center gap-2 rounded-t-md bg-white px-3 py-1 text-[11px] font-medium text-zinc-700">
          <svg className="h-3 w-3 text-green-600" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
          {tabTitle}
        </div>
        <div className="flex items-center gap-2 rounded-t-md bg-zinc-300/60 px-3 py-1 text-[11px] text-zinc-500">
          <svg className="h-3 w-3 text-violet-500" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="3" />
          </svg>
          Shadow
        </div>
      </div>

      {/* URL bar */}
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-3 py-1.5">
        <div className="flex gap-1 text-zinc-400">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </div>
        <div className="flex flex-1 items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-[11px] text-zinc-500">
          <svg className="h-3 w-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          {url}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-violet-600 text-[9px] font-bold text-white">S</div>
        </div>
      </div>

      {/* Main content: portal + shadow panel */}
      <div className="flex h-[580px] bg-white">
        {/* Left: Intuit Expert Portal */}
        <div className="flex flex-1 overflow-hidden">
          {portalContent}
        </div>

        {/* Right: Shadow panel */}
        <div className="flex w-[320px] shrink-0 flex-col border-l border-zinc-200 bg-white">
          {shadowPanel}
        </div>
      </div>

      {/* Call controls bar at bottom */}
      {callControls && (
        <div className="border-t border-zinc-200 bg-zinc-50">
          {callControls}
        </div>
      )}
    </div>
  );
}
