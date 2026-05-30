"use client";

import { REEL_STORIES, ReelStory } from "@/lib/reels";
import ReelStoryCard from "./ReelStoryCard";

interface ReelsGridProps {
  onSelect: (story: ReelStory) => void;
  showFooter?: boolean;
}

export default function ReelsGrid({ onSelect, showFooter = true }: ReelsGridProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {REEL_STORIES.map((story, index) => (
          <ReelStoryCard key={story.id} story={story} index={index} onSelect={() => onSelect(story)} />
        ))}
      </div>

      {showFooter && (
        <p className="mt-8 text-center text-sm text-bestie-muted">
          Tap anywhere to advance · Swipe left or right · Auto-narrated
        </p>
      )}
    </>
  );
}
