"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LORE_STORIES, LoreStory } from "@/lib/lore";
import { REEL_STORIES, ReelStory } from "@/lib/reels";
import Card from "@/components/Card";
import Button from "@/components/Button";
import ReelsGrid from "@/components/reels/ReelsGrid";
import StoryViewer from "@/components/reels/StoryViewer";
import StoriesToggle, { StoriesTab } from "@/components/stories/StoriesToggle";
import { startSpeechFromGesture, stopSpeech } from "@/components/reels/useSpeechNarration";

function LoreDetail({
  story,
  onBack,
  onWatchReels,
}: {
  story: LoreStory;
  onBack: () => void;
  onWatchReels: () => void;
}) {
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
        className="mb-6 flex items-center gap-2 text-sm text-bestie-muted transition-colors hover:text-bestie-purple"
      >
        ← Back to all stories
      </button>

      <Card className="mb-8 border-bestie-purple/20 bg-bestie-purple-light">
        <span className="mb-3 block text-4xl">{story.emoji}</span>
        <h1 className="heading-serif mb-2 text-3xl sm:text-4xl">{story.title}</h1>
        <p className="text-lg text-bestie-muted">{story.subtitle}</p>
      </Card>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card key={section.label} className={`animate-fade-in-up animate-delay-${(index + 1) * 100} opacity-0`}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">{section.emoji}</span>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-bestie-purple">{section.label}</h2>
            </div>
            <p className="leading-relaxed text-bestie-text">{section.content}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button onClick={onWatchReels} variant="secondary">
          Watch in 60s Reels
        </Button>
        <Button href="/chat">Ask Sports Bestie</Button>
      </div>
    </div>
  );
}

function LoreContent() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<StoriesTab>("read");
  const [selectedStory, setSelectedStory] = useState<LoreStory | null>(null);
  const [activeReel, setActiveReel] = useState<ReelStory | null>(null);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "reels") setTab("reels");

    const storyId = searchParams.get("story");
    if (!storyId) return;

    const loreStory = LORE_STORIES.find((s) => s.id === storyId);
    if (loreStory) {
      setSelectedStory(loreStory);
      setTab("read");
      return;
    }

    const reelStory = REEL_STORIES.find((s) => s.id === storyId);
    if (reelStory) {
      setTab("reels");
      setActiveReel(reelStory);
      setActiveReelIndex(REEL_STORIES.indexOf(reelStory));
    }
  }, [searchParams]);

  const openReel = (story: ReelStory) => {
    startSpeechFromGesture(story.slides[0].caption);
    setActiveReel(story);
    setActiveReelIndex(REEL_STORIES.indexOf(story));
  };

  const closeReel = () => {
    stopSpeech();
    setActiveReel(null);
  };

  const nextReel = () => {
    if (activeReelIndex < REEL_STORIES.length - 1) {
      const next = REEL_STORIES[activeReelIndex + 1];
      setActiveReel(next);
      setActiveReelIndex(activeReelIndex + 1);
    } else {
      closeReel();
    }
  };

  const prevReel = () => {
    if (activeReelIndex > 0) {
      const prev = REEL_STORIES[activeReelIndex - 1];
      setActiveReel(prev);
      setActiveReelIndex(activeReelIndex - 1);
    }
  };

  const handleTabChange = (next: StoriesTab) => {
    setTab(next);
    setSelectedStory(null);
    closeReel();
  };

  if (selectedStory) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <LoreDetail
          story={selectedStory}
          onBack={() => setSelectedStory(null)}
          onWatchReels={() => {
            setSelectedStory(null);
            setTab("reels");
          }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-8 text-center animate-fade-in">
        <p className="mb-2 text-sm font-medium text-bestie-purple">Stories</p>
        <h1 className="heading-serif mb-4 text-3xl sm:text-4xl">
          Learn Sports Through <span className="text-bestie-purple">Stories</span>
        </h1>
        <p className="mx-auto mb-6 max-w-lg text-bestie-muted">
          Binge narrated reels or read at your own pace — the gossip, the drama, the characters.
        </p>

        <StoriesToggle active={tab} onChange={handleTabChange} />
      </div>

      {tab === "reels" ? (
        <ReelsGrid onSelect={openReel} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LORE_STORIES.map((story, index) => (
            <Card
              key={story.id}
              hover
              onClick={() => setSelectedStory(story)}
              className={`animate-fade-in-up animate-delay-${Math.min((index + 1) * 100, 500)} group opacity-0`}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-bestie-purple-light text-3xl transition-transform group-hover:scale-110">
                {story.emoji}
              </div>
              <h3 className="heading-serif mb-1 text-lg">{story.title}</h3>
              <p className="text-sm text-bestie-muted">{story.subtitle}</p>
              <p className="mt-3 text-xs font-medium text-bestie-purple opacity-0 transition-opacity group-hover:opacity-100">
                Read the story →
              </p>
            </Card>
          ))}
        </div>
      )}

      {activeReel && (
        <StoryViewer
          key={activeReel.id}
          story={activeReel}
          storyIndex={activeReelIndex}
          totalStories={REEL_STORIES.length}
          onClose={closeReel}
          onNextStory={activeReelIndex < REEL_STORIES.length - 1 ? nextReel : undefined}
          onPrevStory={activeReelIndex > 0 ? prevReel : undefined}
        />
      )}
    </div>
  );
}

export default function LorePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="animate-pulse text-bestie-muted">Loading stories...</div>
        </div>
      }
    >
      <LoreContent />
    </Suspense>
  );
}
