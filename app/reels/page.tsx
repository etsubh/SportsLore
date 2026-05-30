"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { REEL_STORIES, ReelStory } from "@/lib/reels";
import StoryViewer from "@/components/reels/StoryViewer";

function ReelsGrid({ onSelect }: { onSelect: (story: ReelStory) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-10 text-center animate-fade-in">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-bestie-pink/30 bg-bestie-pink/10 px-4 py-1.5 text-sm font-medium text-bestie-pink">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bestie-pink opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-bestie-pink" />
          </span>
          Flagship Feature
        </span>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
          60 Second <span className="text-gradient">Sports Lore</span>
        </h1>
        <p className="mx-auto max-w-lg text-white/60">
          Binge sports stories like social media reels. Tap a card, lean back, and get caught up —
          no rules, no jargon, just the drama.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {REEL_STORIES.map((story, index) => (
          <button
            key={story.id}
            onClick={() => onSelect(story)}
            className={`animate-fade-in-up animate-delay-${Math.min((index + 1) * 100, 500)} group relative aspect-[9/16] overflow-hidden rounded-2xl opacity-0 transition-transform hover:scale-[1.03] active:scale-[0.97]`}
          >
            <Image
              src={story.slides[0].image}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${story.gradient} opacity-70`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
              {story.duration}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <span className="mb-1 block text-2xl">{story.emoji}</span>
              <h3 className="text-sm font-bold leading-tight text-white sm:text-base">
                {story.title}
              </h3>
              <p className="mt-0.5 text-xs text-white/70">{story.subtitle}</p>
              <p className="mt-2 text-[10px] font-medium text-bestie-pink opacity-0 transition-opacity group-hover:opacity-100">
                Watch story →
              </p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl backdrop-blur-sm">
                ▶
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-white/40">
        Tap anywhere to advance · Swipe left or right · Auto-narrated
      </p>
    </div>
  );
}

function ReelsContent() {
  const searchParams = useSearchParams();
  const [activeStory, setActiveStory] = useState<ReelStory | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const storyId = searchParams.get("story");
    if (storyId) {
      const story = REEL_STORIES.find((s) => s.id === storyId);
      if (story) {
        setActiveStory(story);
        setActiveIndex(REEL_STORIES.indexOf(story));
      }
    }
  }, [searchParams]);

  const openStory = (story: ReelStory) => {
    setActiveStory(story);
    setActiveIndex(REEL_STORIES.indexOf(story));
  };

  const closeStory = () => setActiveStory(null);

  const nextStory = () => {
    if (activeIndex < REEL_STORIES.length - 1) {
      const next = REEL_STORIES[activeIndex + 1];
      setActiveStory(next);
      setActiveIndex(activeIndex + 1);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (activeIndex > 0) {
      const prev = REEL_STORIES[activeIndex - 1];
      setActiveStory(prev);
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <>
      <ReelsGrid onSelect={openStory} />
      {activeStory && (
        <StoryViewer
          story={activeStory}
          storyIndex={activeIndex}
          totalStories={REEL_STORIES.length}
          onClose={closeStory}
          onNextStory={activeIndex < REEL_STORIES.length - 1 ? nextStory : undefined}
          onPrevStory={activeIndex > 0 ? prevStory : undefined}
        />
      )}
    </>
  );
}

export default function ReelsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="animate-pulse text-white/60">Loading stories...</div>
        </div>
      }
    >
      <ReelsContent />
    </Suspense>
  );
}
