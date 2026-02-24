"use client";

import { useState, useRef, useEffect } from "react";
import { chatTranscript } from "@/data/sessions";
import BrowserMockup from "./BrowserMockup";
import ExpertPortal from "./ExpertPortal";
import ShadowRightRail from "./ShadowRightRail";

export default function RightPanelChat() {
  const [visibleMessages, setVisibleMessages] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [actionState, setActionState] = useState<"pending" | "approved" | "editing" | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, actionState]);

  const handleSend = () => {
    if (visibleMessages < chatTranscript.length) {
      const nextMsg = chatTranscript[visibleMessages];
      if (nextMsg?.role === "action") {
        setVisibleMessages((v) => v + 1);
        setActionState("pending");
      } else {
        setVisibleMessages((v) => Math.min(v + 2, chatTranscript.length));
      }
      setInputValue("");
    }
  };

  const handleApprove = () => {
    setActionState("approved");
    setVisibleMessages((v) => Math.min(v + 1, chatTranscript.length));
  };

  const resetChat = () => {
    setVisibleMessages(1);
    setInputValue("");
    setActionState(null);
  };

  const renderRecord = () => (
    <div className="p-3">
      <div className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-2 py-1.5">
        <span className="h-2 w-2 rounded-full bg-zinc-300" />
        <span className="text-[10px] text-zinc-500">Idle</span>
      </div>
      <button className="mt-2 w-full rounded-md bg-green-600 py-1.5 text-[10px] font-medium text-white">
        Start Recording
      </button>
      <div className="mt-3 space-y-1.5">
        <div className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
          Capture Settings
        </div>
        {[{ label: "Clicks", on: true }, { label: "Types", on: true }, { label: "Scrolls", on: false }, { label: "Hovers", on: false }, { label: "Network Calls", on: true }, { label: "Screenshots", on: true }].map((item) => (
          <label key={item.label} className="flex items-center gap-1.5 text-[10px] text-zinc-600">
            <input type="checkbox" defaultChecked={item.on} className="h-3 w-3 accent-violet-600" />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="flex flex-1 flex-col overflow-hidden h-full">
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {chatTranscript.slice(0, visibleMessages).map((msg, i) => {
          if (msg.role === "action") {
            return (
              <div key={i} className="space-y-1.5">
                <div className="border border-zinc-200 bg-zinc-50 rounded-lg px-2.5 py-1.5">
                  <div className="mb-1 text-[9px] font-semibold text-violet-600">Shadow</div>
                  <div className="text-[10px] leading-relaxed text-zinc-700">{msg.content}</div>
                </div>

                <div className="rounded-lg border border-violet-200 bg-violet-50 p-2">
                  <div className="flex items-center gap-1 mb-1.5">
                    <span className="text-[8px] font-semibold uppercase text-violet-600">Skill Execution Preview</span>
                    <span className="rounded bg-violet-100 px-1 py-0.5 text-[7px] text-violet-600">{msg.skillName}</span>
                  </div>
                  <div className="space-y-1">
                    {msg.preview?.map((item, j) => (
                      <div key={j} className="flex justify-between text-[9px]">
                        <span className="text-zinc-500">{item.label}</span>
                        <span className="font-medium text-zinc-700">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {actionState === "pending" && (
                    <div className="mt-2 space-y-1.5">
                      <div className="flex gap-1.5">
                        <button onClick={handleApprove} className="flex-1 rounded bg-violet-600 py-1.5 text-[9px] font-medium text-white hover:bg-violet-700">
                          Approve & Execute
                        </button>
                        <button onClick={() => setActionState("editing")} className="flex-1 rounded border border-violet-300 py-1.5 text-[9px] font-medium text-violet-600 hover:bg-violet-100">
                          Review & Edit
                        </button>
                      </div>
                      <button className="w-full rounded border border-zinc-200 py-1 text-[9px] text-zinc-400 hover:bg-zinc-50">
                        Skip — I&apos;ll do it manually
                      </button>
                    </div>
                  )}

                  {actionState === "editing" && (
                    <div className="mt-2">
                      <div className="rounded border border-amber-200 bg-amber-50 p-1.5 mb-1.5">
                        <div className="text-[8px] font-semibold text-amber-600 mb-1">Edit before executing</div>
                        {msg.preview?.map((item, j) => (
                          <div key={j} className="flex items-center gap-1.5 mb-1">
                            <span className="text-[8px] text-zinc-500 w-16 shrink-0">{item.label}</span>
                            <input type="text" defaultValue={item.value} className="flex-1 rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[9px] outline-none focus:border-violet-400" />
                          </div>
                        ))}
                      </div>
                      <button onClick={handleApprove} className="w-full rounded bg-violet-600 py-1.5 text-[9px] font-medium text-white hover:bg-violet-700">
                        Approve & Execute
                      </button>
                    </div>
                  )}

                  {actionState === "approved" && (
                    <div className="mt-2 flex items-center gap-1 rounded bg-green-50 p-1.5 text-[9px] text-green-700">
                      <span>&#10003;</span>
                      <span>Approved by expert</span>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (msg.role === "result") {
            return (
              <div key={i} className="rounded-lg border border-green-200 bg-green-50 px-2.5 py-1.5">
                <div className="mb-0.5 text-[9px] font-semibold text-green-700">Execution Complete</div>
                <div className="whitespace-pre-wrap text-[10px] leading-relaxed text-green-800">{msg.content}</div>
              </div>
            );
          }

          return (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[92%] rounded-lg px-2.5 py-1.5 text-[10px] leading-relaxed ${
                msg.role === "user" ? "bg-violet-600 text-white" : msg.role === "system" ? "border border-zinc-200 bg-zinc-50 font-mono text-[9px]" : "border border-zinc-200 bg-zinc-50"
              }`}>
                {msg.role !== "user" && (
                  <div className="mb-0.5 text-[9px] font-semibold text-violet-600">
                    {msg.role === "system" ? "System" : "Shadow"}
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-zinc-200 p-2">
        {actionState === "pending" || actionState === "editing" ? (
          <div className="text-center text-[9px] text-zinc-400">Review the Skill execution above</div>
        ) : visibleMessages < chatTranscript.length ? (
          <div className="flex gap-1.5">
            <input
              type="text"
              value={inputValue || (chatTranscript[visibleMessages]?.role === "user" ? chatTranscript[visibleMessages].content : "")}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-[10px] outline-none focus:border-violet-400"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="rounded-md bg-violet-600 px-3 py-1.5 text-[10px] font-medium text-white hover:bg-violet-700">Send</button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-[9px] text-zinc-400">End of demo</p>
            <button onClick={resetChat} className="text-[9px] text-violet-600 hover:underline">Restart</button>
          </div>
        )}
      </div>
    </div>
  );

  const shadowPanel = (
    <ShadowRightRail
      defaultTab="Chat"
      renderRecord={renderRecord}
      renderChat={renderChat}
    />
  );

  return (
    <BrowserMockup
      url="qbo.intuit.com/app/expenses"
      tabTitle="QuickBooks Online"
      portalContent={
        <ExpertPortal
          workflow="Expense entry"
          listeningStatus="Active"
          customerName="Marcus Chen"
          mostLikely="Record a business expense"
          customerContext={[
            { label: "Relationship", value: "New customer" },
            { label: "Account type", value: "Simple Start" },
            { label: "Open cases", value: "None" },
            { label: "Risk", value: "Low" },
            { label: "Product", value: "QBO" },
          ]}
          welcomeMessage={
            <div className="text-[11px] leading-relaxed text-zinc-600">
              <p>Hi, thanks for calling QuickBooks support.</p>
              <p className="mt-1">I&apos;m Asha, I can help you with your expense entry. What would you like to do?</p>
            </div>
          }
        />
      }
      shadowPanel={shadowPanel}
      callControls={
        <div className="flex items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-medium text-zinc-600">3:42</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-1.5">
            {[
              "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
              "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
            ].map((d, i) => (
              <button key={i} className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 hover:bg-zinc-300">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} /></svg>
              </button>
            ))}
            <button className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
            </button>
          </div>
        </div>
      }
    />
  );
}
