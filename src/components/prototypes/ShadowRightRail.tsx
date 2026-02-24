"use client";

import { useState, type ReactNode } from "react";

export type ShadowTab = "Record" | "Chat" | "Plan" | "Skills";

const ALL_TABS: ShadowTab[] = ["Record", "Chat", "Plan", "Skills"];

interface ShadowRightRailProps {
  defaultTab?: ShadowTab;
  headerExtra?: ReactNode;
  renderRecord?: () => ReactNode;
  renderChat?: () => ReactNode;
  renderPlan?: () => ReactNode;
  renderSkills?: () => ReactNode;
  className?: string;
}

export default function ShadowRightRail({
  defaultTab = "Chat",
  headerExtra,
  renderRecord,
  renderChat,
  renderPlan,
  renderSkills,
  className = "",
}: ShadowRightRailProps) {
  const [activeTab, setActiveTab] = useState<ShadowTab>(defaultTab);

  const renderers: Record<ShadowTab, (() => ReactNode) | undefined> = {
    Record: renderRecord,
    Chat: renderChat,
    Plan: renderPlan,
    Skills: renderSkills,
  };

  const content = renderers[activeTab]?.();

  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-600 text-[9px] font-bold text-white">
          S
        </span>
        <span className="text-[11px] font-semibold text-zinc-800">Shadow</span>
        {headerExtra || (
          <span className="ml-auto flex items-center gap-1 text-[9px] text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-zinc-200">
        {ALL_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-[11px] font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-violet-600 text-violet-600"
                : "text-zinc-400 hover:text-zinc-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {content ?? (
          <div className="flex items-center justify-center py-12 text-[11px] text-zinc-400">
            {activeTab}
          </div>
        )}
      </div>
    </div>
  );
}

export function ShadowRailPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-12 text-[11px] text-zinc-400">
      {label}
    </div>
  );
}
