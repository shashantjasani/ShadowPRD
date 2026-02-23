"use client";

import { ReactNode } from "react";

interface ExpertPortalProps {
  agentName?: string;
  customerName?: string;
  workflow?: string;
  listeningStatus?: string;
  mostLikely?: string;
  customerContext?: { label: string; value: string }[];
  welcomeMessage?: ReactNode;
  bottomBar?: ReactNode;
}

export default function ExpertPortal({
  agentName = "Asha Patel",
  customerName = "Liza Moran",
  workflow = "Tax advice",
  listeningStatus = "Listening...",
  mostLikely = "Childcare tax credit",
  customerContext = [
    { label: "Relationship", value: "Returning customer" },
    { label: "Called within 7 days", value: "None" },
    { label: "Open investigation", value: "None" },
    { label: "Risk of not filing", value: "Low" },
    { label: "Progress tracker", value: "State taxes" },
  ],
  welcomeMessage,
  bottomBar,
}: ExpertPortalProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left sidebar nav */}
      <div className="flex w-10 shrink-0 flex-col items-center gap-3 border-r border-zinc-100 bg-zinc-50 py-3">
        <svg className="h-4 w-4 text-green-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <div className="mt-1 space-y-3 text-zinc-400">
          {["M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            "8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
            "15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
            "21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
            "3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          ].map((d, i) => (
            <svg key={i} className={`h-4 w-4 ${i === 2 ? "text-green-600" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
            </svg>
          ))}
        </div>
      </div>

      {/* Left panel - workflow sidebar */}
      <div className="flex w-[150px] shrink-0 flex-col border-r border-zinc-100 bg-white">
        <div className="border-b border-zinc-100 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-400" />
            <span className="text-[11px] font-medium text-zinc-800">{customerName}</span>
            <svg className="h-2.5 w-2.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Workflow</div>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-zinc-800">{workflow}</span>
            <span className="flex items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-medium text-green-600">
              <span className="h-1 w-1 rounded-full bg-green-500" />
              {listeningStatus}
            </span>
          </div>
        </div>
        <div className="px-3">
          <div className="rounded-md bg-zinc-50 px-2 py-1.5 text-[10px] text-zinc-600">
            Welcome {customerName.split(" ")[0]}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-y-auto bg-zinc-50/50">
        <div className="flex-1 px-4 py-3">
          <div className="rounded-lg border border-zinc-200 bg-white">
            {/* Header */}
            <div className="border-b border-zinc-100 px-4 py-2.5">
              <h3 className="text-sm font-semibold text-zinc-800">Welcome</h3>
            </div>

            {/* Customer context row */}
            <div className="flex gap-0 border-b border-zinc-100 bg-blue-50/40 text-[9px]">
              {customerContext.map((ctx, i) => (
                <div key={i} className="flex-1 border-r border-zinc-100 px-2 py-1.5 last:border-r-0">
                  <div className="text-zinc-400">{ctx.label}</div>
                  <div className="font-medium text-zinc-700">
                    {ctx.value === "Low" ? (
                      <span className="flex items-center gap-0.5">Low <span className="h-1.5 w-1.5 rounded-full bg-green-400" /></span>
                    ) : ctx.label === "Progress tracker" ? (
                      <span className="text-blue-600 underline">{ctx.value}</span>
                    ) : ctx.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Most likely prediction */}
            <div className="mx-3 mt-3 rounded-md bg-blue-50 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-[9px] text-blue-500">Most likely</span>
              </div>
              <div className="mt-0.5 text-[11px] font-semibold text-zinc-800">{mostLikely}</div>
            </div>

            {/* Welcome message */}
            <div className="p-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-1">
                    <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    <span className="text-[9px] text-zinc-400">Welcome</span>
                  </div>
                  {welcomeMessage || (
                    <div className="text-[11px] leading-relaxed text-zinc-600">
                      <p>Hi, thanks for calling Intuit TurboTax.</p>
                      <p className="mt-1">My name is {agentName.split(" ")[0]}. I&apos;m a certified tax professional with 9 years of experience.</p>
                      <p className="mt-1">Who am I speaking to today?</p>
                    </div>
                  )}
                  <div className="mt-2 flex gap-1">
                    <button className="text-zinc-300 hover:text-zinc-500">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                    </button>
                    <button className="text-zinc-300 hover:text-zinc-500">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>
                    </button>
                  </div>
                </div>
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: Ask anything + tools */}
        {bottomBar || (
          <div className="border-t border-zinc-100 bg-white px-4 py-2">
            <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5">
              <span className="flex-1 text-[11px] text-zinc-400">Ask anything</span>
              <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
            <div className="mt-1.5 flex items-center gap-3 text-[9px] text-zinc-400">
              {["Email", "History", "Document", "Interview", "Tax form", "More"].map((t) => (
                <span key={t} className="flex items-center gap-0.5">
                  <span className="h-2.5 w-2.5 rounded bg-zinc-200" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
