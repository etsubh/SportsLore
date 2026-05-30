"use client";

import { getCoverImage } from "@/lib/reel-images";
import ReelSlideImage from "./ReelSlideImage";
import { ReelStory } from "@/lib/reels";
import { startSpeechFromGesture } from "./useSpeechNarration";

interface ReelStoryCardProps {
  story: ReelStory;
  index: number;
  onSelect: () => void;
}

export default function ReelStoryCard({ story, index, onSelect }: ReelStoryCardProps) {
  const coverSrc = getCoverImage(story.id);

  const handleClick = () => {
    // Must be first — Chrome requires speak() in the same synchronous click handler
    startSpeechFromGesture(story.slides[0].caption);
    onSelect();
  };

  return (
    <button
      onClick={handleClick}
      className={`animate-fade-in-up animate-delay-${Math.min((index + 1) * 100, 500)} group relative aspect-[9/16] overflow-hidden rounded-2xl opacity-0 shadow-card transition-transform hover:scale-[1.03] active:scale-[0.97]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient}`} />

      <ReelSlideImage
        src={coverSrc}
        alt={story.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />

      <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
        {story.duration}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
        <span className="mb-1 block text-2xl">{story.emoji}</span>
        <h3 className="text-sm font-bold leading-tight text-white sm:text-base">{story.title}</h3>
        <p className="mt-0.5 text-xs text-white/70">{story.subtitle}</p>
        <p className="mt-2 text-[10px] font-medium text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
          Watch story →
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl backdrop-blur-sm">
          ▶
        </span>
      </div>
    </button>
  );
}
