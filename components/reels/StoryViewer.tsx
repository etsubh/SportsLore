"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReelStory } from "@/lib/reels";
import { useSpeechNarration } from "./useSpeechNarration";

interface StoryViewerProps {
  story: ReelStory;
  storyIndex: number;
  totalStories: number;
  onClose: () => void;
  onNextStory?: () => void;
  onPrevStory?: () => void;
}

export default function StoryViewer({
  story,
  storyIndex,
  totalStories,
  onClose,
  onNextStory,
  onPrevStory,
}: StoryViewerProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const touchStartX = useRef(0);
  const autoAdvanceRef = useRef(true);
  const slide = story.slides[slideIndex];
  const isLastSlide = slideIndex === story.slides.length - 1;
  const isFirstSlide = slideIndex === 0;

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= story.slides.length) return;
      setSlideIndex(index);
      setSlideProgress(0);
      setTransitionKey((k) => k + 1);
      setImageLoaded(false);
    },
    [story.slides.length]
  );

  const goNext = useCallback(() => {
    if (slideIndex < story.slides.length - 1) {
      goToSlide(slideIndex + 1);
    } else if (onNextStory) {
      onNextStory();
    } else {
      onClose();
    }
  }, [slideIndex, story.slides.length, goToSlide, onNextStory, onClose]);

  const goPrev = useCallback(() => {
    if (slideIndex > 0) {
      goToSlide(slideIndex - 1);
    } else if (onPrevStory) {
      onPrevStory();
    }
  }, [slideIndex, goToSlide, onPrevStory]);

  const { speak, toggle, stop, isPlaying, isSpeaking, setIsPlaying } = useSpeechNarration({
    onEnd: () => {
      if (autoAdvanceRef.current) {
        setTimeout(() => goNext(), 600);
      }
    },
  });

  useEffect(() => {
    setSlideIndex(0);
    setSlideProgress(0);
    setTransitionKey((k) => k + 1);
    setIsPlaying(true);
    autoAdvanceRef.current = true;
  }, [story.id, setIsPlaying]);

  useEffect(() => {
    if (!slide?.caption) return;
    stop();
    const timer = setTimeout(() => speak(slide.caption), 150);
    return () => {
      clearTimeout(timer);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, story.id]);

  useEffect(() => {
    if (!isSpeaking) {
      setSlideProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setSlideProgress((p) => Math.min(p + 2, 100));
    }, 120);

    return () => clearInterval(interval);
  }, [isSpeaking, slideIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev, toggle]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.3) goPrev();
    else goNext();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative h-full w-full max-w-md overflow-hidden bg-black shadow-2xl sm:h-[90vh] sm:rounded-2xl sm:border sm:border-white/10">
      {/* Background image with ken burns */}
      <div key={transitionKey} className="absolute inset-0 animate-fade-in">
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className={`object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            priority
            onLoad={() => setImageLoaded(true)}
            sizes="100vw"
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-b ${story.gradient} opacity-80`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      </div>

      {/* Tap zones */}
      <div
        className="absolute inset-0 z-10"
        onClick={handleTap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="presentation"
      />

      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-20 px-3 pb-2 pt-3 sm:px-4 sm:pt-4">
        {/* Segment progress */}
        <div className="mb-3 flex gap-1">
          {story.slides.map((_, i) => (
            <div key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    i < slideIndex ? "100%" : i === slideIndex ? `${slideProgress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="pointer-events-none min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{story.emoji}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{story.title}</p>
                <p className="truncate text-xs text-white/70">{story.subtitle}</p>
              </div>
            </div>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/50">
              60 Second Sports Lore · {story.duration}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              stop();
              onClose();
            }}
            className="relative z-30 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            aria-label="Close story"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Slide label */}
      <div
        key={`label-${transitionKey}`}
        className="pointer-events-none absolute left-0 right-0 top-28 z-20 px-6 animate-fade-in-up sm:top-32"
      >
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md"
          style={{ backgroundColor: `${story.accent}40`, border: `1px solid ${story.accent}60` }}
        >
          {slide.label}
        </span>
      </div>

      {/* Caption */}
      <div className="pointer-events-none absolute bottom-28 left-0 right-0 z-20 px-6 sm:bottom-32">
        <div
          key={`caption-${transitionKey}`}
          className={`animate-fade-in-up rounded-2xl border px-5 py-4 backdrop-blur-md transition-all duration-300 ${
            isSpeaking
              ? "border-white/30 bg-white/15 shadow-lg shadow-black/20"
              : "border-white/10 bg-black/30"
          }`}
        >
          <p
            className={`text-center text-lg font-medium leading-relaxed sm:text-xl ${
              isSpeaking ? "text-white" : "text-white/90"
            }`}
          >
            {slide.caption}
          </p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/60 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            disabled={isFirstSlide && !onPrevStory}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 disabled:opacity-30"
            aria-label="Previous slide"
          >
            ←
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              autoAdvanceRef.current = false;
              if (!isPlaying) {
                setIsPlaying(true);
                speak(slide.caption);
              } else if (isSpeaking) {
                toggle();
              } else {
                setIsPlaying(true);
                speak(slide.caption);
              }
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${story.accent}, #7C3AED)` }}
            aria-label={isPlaying && isSpeaking ? "Pause narration" : "Play narration"}
          >
            <span className="text-xl">{isPlaying && isSpeaking ? "⏸" : "▶"}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
            aria-label="Next slide"
          >
            →
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-white/50">
          <span>
            {slideIndex + 1} / {story.slides.length}
          </span>
          <span>·</span>
          <span>
            Story {storyIndex + 1} of {totalStories}
          </span>
          {isLastSlide && !onNextStory && (
            <>
              <span>·</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stop();
                  onClose();
                }}
                className="font-medium text-bestie-pink hover:text-white"
              >
                Done ✨
              </button>
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
