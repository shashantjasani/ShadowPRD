"use client";

import { useState, useRef, useEffect } from "react";
import { chatTranscript } from "@/data/sessions";
import BrowserMockup from "./BrowserMockup";
import ExpertPortal from "./ExpertPortal";

type Tab = "record" | "chat";

export default function RightPanelChat() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [visibleMessages, setVisibleMessages] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages]);

  const handleSend = () => {
    if (visibleMessages < chatTranscript.length) {
      setVisibleMessages((v) => Math.min(v + 2, chatTranscript.length));
      setInputValue("");
    }
  };

  const resetChat = () => {
    setVisibleMessages(1);
    setInputValue("");
  };

  const shadowPanel = (
    <div className="flex h-full flex-col">
      {/* Panel header */}
      <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-600 text-[9px] font-bold text-white">
          S
        </span>
        <span className="text-[11px] font-semibold text-zinc-800">Shadow</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200">
        {(["record", "chat"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-[11px] font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-violet-600 text-violet-600"
                : "text-zinc-400 hover:text-zinc-700"
            }`}
          >
            {tab === "record" ? "Record" : "Chat"}
          </button>
        ))}
      </div>

      {/* Record tab */}
      {activeTab === "record" && (
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
            {[
              { label: "Clicks", on: true },
              { label: "Types", on: true },
              { label: "Scrolls", on: false },
              { label: "Hovers", on: false },
              { label: "Network Calls", on: true },
              { label: "Screenshots", on: true },
            ].map((item) => (
              <label
                key={item.label}
                className="flex items-center gap-1.5 text-[10px] text-zinc-600"
              >
                <input
                  type="checkbox"
                  defaultChecked={item.on}
                  className="h-3 w-3 accent-violet-600"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Chat tab */}
      {activeTab === "chat" && (
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {chatTranscript.slice(0, visibleMessages).map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[92%] rounded-lg px-2.5 py-1.5 text-[10px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white"
                      : msg.role === "system"
                        ? "border border-zinc-200 bg-zinc-50 font-mono text-[9px]"
                        : "border border-zinc-200 bg-zinc-50"
                  }`}
                >
                  {msg.role !== "user" && (
                    <div className="mb-0.5 text-[9px] font-semibold text-violet-600">
                      {msg.role === "system" ? "System" : "Agent"}
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-zinc-200 p-2">
            {visibleMessages < chatTranscript.length ? (
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={
                    inputValue ||
                    (chatTranscript[visibleMessages]?.role === "user"
                      ? chatTranscript[visibleMessages].content
                      : "")
                  }
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-[10px] outline-none focus:border-violet-400"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="rounded-md bg-violet-600 px-3 py-1.5 text-[10px] font-medium text-white hover:bg-violet-700"
                >
                  Send
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-[9px] text-zinc-400">End of demo</p>
                <button
                  onClick={resetChat}
                  className="text-[9px] text-violet-600 hover:underline"
                >
                  Restart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
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
