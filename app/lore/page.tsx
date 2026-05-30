"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LORE_STORIES, LoreStory } from "@/lib/lore";
import Card from "@/components/Card";
import Button from "@/components/Button";

function LoreDetail({ story, onBack }: { story: LoreStory; onBack: () => void }) {
  const sections = [
    { label: "The Hook", content: story.hook, emoji: "🎣" },
    { label: "The Characters", content: story.characters, emoji: "👥" },
    { label: "The Drama", content: story.drama, emoji: "🍿" },
    { label: "Why Fans Were Obsessed", content: story.whyFansObsessed, emoji: "❤️‍🔥" },
    { label: "Why It Still Matters", content: story.whyItMatters, emoji: "✨" },
  ];

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
      >
        ← Back to all stories
      </button>

      <div
        className={`mb-8 overflow-hidden rounded-2xl bg-gradient-to-br ${story.gradient} p-6 sm:p-8`}
      >
        <span className="mb-3 block text-4xl">{story.emoji}</span>
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">{story.title}</h1>
        <p className="text-lg text-white/80">{story.subtitle}</p>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card
            key={section.label}
            className={`animate-fade-in-up animate-delay-${(index + 1) * 100} opacity-0`}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">{section.emoji}</span>
              <h2 className="text-lg font-bold text-bestie-pink">{section.label}</h2>
            </div>
            <p className="leading-relaxed text-white/80">{section.content}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href="/prep" variant="secondary">
          Prep for the group chat 💬
        </Button>
        <Button href="/chat">Ask Sports Bestie about this ✨</Button>
      </div>
    </div>
  );
}

function LoreContent() {
  const searchParams = useSearchParams();
  const [selectedStory, setSelectedStory] = useState<LoreStory | null>(null);

  useEffect(() => {
    const storyId = searchParams.get("story");
    if (storyId) {
      const story = LORE_STORIES.find((s) => s.id === storyId);
      if (story) setSelectedStory(story);
    }
  }, [searchParams]);

  if (selectedStory) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <LoreDetail story={selectedStory} onBack={() => setSelectedStory(null)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-10 text-center animate-fade-in">
        <p className="mb-2 text-sm font-medium text-bestie-pink">Sports Lore Mode</p>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Learn Sports Through <span className="text-gradient">Stories</span>
        </h1>
        <p className="mx-auto max-w-lg text-white/60">
          The gossip, the drama, the characters — told like a friend who&apos;s obsessed. No jargon.
          No stats. Just the stories that make people care.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LORE_STORIES.map((story, index) => (
          <Card
            key={story.id}
            hover
            onClick={() => setSelectedStory(story)}
            className={`animate-fade-in-up animate-delay-${Math.min((index + 1) * 100, 500)} group opacity-0`}
          >
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${story.gradient} text-3xl transition-transform group-hover:scale-110`}
            >
              {story.emoji}
            </div>
            <h3 className="mb-1 text-lg font-bold text-white">{story.title}</h3>
            <p className="text-sm text-white/60">{story.subtitle}</p>
            <p className="mt-3 text-xs font-medium text-bestie-pink opacity-0 transition-opacity group-hover:opacity-100">
              Read the story →
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function LorePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="animate-pulse text-white/60">Loading stories...</div>
        </div>
      }
    >
      <LoreContent />
    </Suspense>
  );
}
