"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Which preset for Instagram?",
  "JPEG vs WebP vs PNG?",
  "Why is my file still large?",
];

export default function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const handleClose = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis?.start();
    setOpen(false);
  };

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply ?? "Sorry, something went wrong." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-5 z-[9990] flex flex-col scale-in"
          onMouseEnter={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).lenis?.stop();
          }}
          onMouseLeave={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).lenis?.start();
          }}
          style={{
            width: "min(360px, calc(100vw - 40px))",
            height: "min(520px, calc(100vh - 120px))",
            background: "var(--surface)",
            border: "1px solid var(--border-hi)",
            borderRadius: 20,
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid var(--border-hi)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>Zero Assistant</p>
                <p style={{ fontSize: 10, color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>Powered by NVIDIA NIM</p>
              </div>
            </div>
            <button
              onClick={() => handleClose()}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ color: "var(--fg-3)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--fg)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--fg-3)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ scrollbarWidth: "none" }}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                <p className="text-sm" style={{ color: "var(--fg-2)" }}>
                  Ask me anything about compressing your photos & videos.
                </p>
                <div className="flex flex-col gap-2 w-full">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left px-4 py-2.5 rounded-xl text-xs transition-all duration-150 active:scale-[0.98]"
                      style={{ border: "1px solid var(--border)", color: "var(--fg-2)", background: "transparent" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-hi)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--fg)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--fg-2)"; }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    m.role === "user"
                      ? { background: "var(--fg)", color: "#000", borderBottomRightRadius: 6 }
                      : { background: "rgba(255,255,255,0.06)", color: "var(--fg-2)", borderBottomLeftRadius: 6, border: "1px solid var(--border)" }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", borderBottomLeftRadius: 6 }}
                >
                  <div className="flex gap-1.5 items-center">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "var(--fg-3)",
                          animation: "dot-bounce 1.2s ease-in-out infinite",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex-shrink-0 px-4 py-3 flex items-center gap-2"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask about compression..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "var(--fg)", caretColor: "var(--fg)" }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-30"
              style={{ background: "var(--fg)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* FAB toggle button */}
      <button
        onClick={() => open ? handleClose() : setOpen(true)}
        className="fixed bottom-6 right-6 z-[9991] flex items-center gap-2 transition-all duration-300 active:scale-95"
        style={{
          height: 40,
          padding: open ? "0 14px" : "0 14px",
          borderRadius: 20,
          background: open ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)",
          border: "1px solid var(--border-hi)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
        aria-label="Open AI assistant"
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = open ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)"; }}
      >
        {open ? (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.05em" }}>Close</span>
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.05em" }}>Ask AI</span>
          </>
        )}
      </button>

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
