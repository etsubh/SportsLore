"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage, STARTER_QUESTIONS, getMockResponse } from "@/lib/chat";
import Button from "@/components/Button";
import Mascot from "@/components/Mascot";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-pulse rounded-full bg-bestie-purple/40"
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey! I'm Sports Bestie 👋\n\nI'm not here to quiz you on rules. I'm here to help you understand why people care — so you can jump into any sports conversation and feel included.\n\nAsk me anything. Zero judgment.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, role: "user", content: text.trim() }]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    setMessages((prev) => [
      ...prev,
      { id: `assistant-${Date.now()}`, role: "assistant", content: getMockResponse(text) },
    ]);
    setIsTyping(false);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-5rem)] max-w-2xl flex-col px-5 py-4 sm:px-8">
      <div className="mb-4 text-center animate-fade-in">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Mascot size={40} />
          <h1 className="heading-serif text-2xl sm:text-3xl">Sports Bestie</h1>
        </div>
        <p className="text-sm text-bestie-muted">Why people care — not rulebooks.</p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl border border-bestie-border bg-white p-4 shadow-card">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                  message.role === "user"
                    ? "rounded-tr-sm bg-bestie-purple text-white"
                    : "rounded-tl-sm border border-bestie-border bg-bestie-purple-light text-bestie-text"
                }`}
              >
                {message.role === "assistant" && (
                  <p className="mb-1 text-xs font-semibold text-bestie-purple">Sports Bestie</p>
                )}
                <p className="whitespace-pre-wrap text-sm leading-relaxed sm:text-base">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="rounded-2xl rounded-tl-sm border border-bestie-border bg-bestie-purple-light">
                <p className="px-4 pt-2 text-xs font-semibold text-bestie-purple">Sports Bestie</p>
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {messages.length <= 1 && (
        <div className="my-3 flex flex-wrap gap-2 animate-fade-in">
          {STARTER_QUESTIONS.map((question) => (
            <button
              key={question}
              onClick={() => sendMessage(question)}
              className="rounded-full border border-bestie-border bg-white px-3 py-1.5 text-xs text-bestie-muted shadow-card transition-all hover:border-bestie-purple/30 hover:text-bestie-purple sm:text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Why do people care about...?"
          disabled={isTyping}
          className="flex-1 rounded-full border border-bestie-border bg-white px-4 py-3 text-sm text-bestie-text placeholder-bestie-muted shadow-card outline-none transition-colors focus:border-bestie-purple/50 disabled:opacity-50 sm:px-5 sm:text-base"
        />
        <Button type="submit" disabled={!input.trim() || isTyping} className="shrink-0 !px-5">
          Send
        </Button>
      </form>
    </div>
  );
}
