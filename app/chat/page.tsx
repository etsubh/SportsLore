"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage, STARTER_QUESTIONS, getMockResponse } from "@/lib/chat";
import Button from "@/components/Button";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-pulse rounded-full bg-white/40"
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

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    const response = getMockResponse(text);
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 py-4 sm:px-6">
      <div className="mb-4 text-center animate-fade-in">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Chat with <span className="text-gradient">Sports Bestie</span> 💬
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Why people care — not rulebooks. Ask anything.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-bestie-card/40 p-4 backdrop-blur-sm">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-bestie-pink to-bestie-purple text-white"
                    : "border border-white/10 bg-white/5 text-white/90"
                }`}
              >
                {message.role === "assistant" && (
                  <p className="mb-1 text-xs font-semibold text-bestie-pink">Sports Bestie</p>
                )}
                <p className="whitespace-pre-wrap text-sm leading-relaxed sm:text-base">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="rounded-2xl border border-white/10 bg-white/5">
                <p className="px-4 pt-2 text-xs font-semibold text-bestie-pink">Sports Bestie</p>
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
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-all hover:border-bestie-purple/50 hover:bg-bestie-purple/10 hover:text-white sm:text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Why do people care about...?"
          disabled={isTyping}
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-bestie-purple/50 focus:ring-1 focus:ring-bestie-purple/30 disabled:opacity-50 sm:px-5 sm:text-base"
        />
        <Button type="submit" disabled={!input.trim() || isTyping} className="shrink-0 px-5">
          Send
        </Button>
      </form>
    </div>
  );
}
