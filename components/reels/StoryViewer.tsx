"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReelStory } from "@/lib/reels";
import ReelSlideImage from "./ReelSlideImage";
import { useSpeechNarration } from "./useSpeechNarration";
import { speechController } from "./speechController";

const AUTO_ADVANCE_MS = 8000;

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
  const [imageIndex, setImageIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const autoAdvanceRef = useRef(true);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoStartRef = useRef<number>(0);
  const narrationEnabledRef = useRef(true);
  const prevStoryIdRef = useRef<string | null>(null);
  const slideIndexRef = useRef(slideIndex);

  useEffect(() => {
    slideIndexRef.current = slideIndex;
  }, [slideIndex]);

  const slide = story.slides[slideIndex];
  const slideImages = slide?.images ?? [];
  const isLastSlide = slideIndex === story.slides.length - 1;
  const isFirstSlide = slideIndex === 0;

  const clearAutoTimer = useCallback(() => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= story.slides.length) return;
      clearAutoTimer();
      setSlideIndex(index);
      setImageIndex(0);
      setSlideProgress(0);
      setTransitionKey((k) => k + 1);
    },
    [story.slides.length, clearAutoTimer]
  );

  const goNext = useCallback(() => {
    clearAutoTimer();
    if (slideIndex < story.slides.length - 1) {
      goToSlide(slideIndex + 1);
    } else if (onNextStory) {
      onNextStory();
    } else {
      onClose();
    }
  }, [slideIndex, story.slides.length, goToSlide, onNextStory, onClose, clearAutoTimer]);

  const goNextRef = useRef(goNext);
  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  const goPrev = useCallback(() => {
    clearAutoTimer();
    if (slideIndex > 0) {
      goToSlide(slideIndex - 1);
    } else if (onPrevStory) {
      onPrevStory();
    }
  }, [slideIndex, goToSlide, onPrevStory, clearAutoTimer]);

  const startAutoAdvanceTimer = useCallback(() => {
    clearAutoTimer();
    autoStartRef.current = Date.now();
    setSlideProgress(0);

    autoTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - autoStartRef.current;
      const pct = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);
      setSlideProgress(pct);

      if (elapsed >= AUTO_ADVANCE_MS) {
        clearAutoTimer();
        if (autoAdvanceRef.current) goNext();
      }
    }, 50);
  }, [clearAutoTimer, goNext]);

  const { speak, startFromGesture, cancel, stop, isPlaying, isSpeaking, setIsPlaying, voiceName } =
    useSpeechNarration({
      onEnd: () => {
        if (autoAdvanceRef.current) {
          setTimeout(() => goNextRef.current(), 400);
        }
      },
      onError: () => {
        if (narrationEnabledRef.current) {
          clearAutoTimer();
          startAutoAdvanceTimer();
        }
      },
    });

  const handlePlayPause = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isPaused && (isSpeaking || isPlaying)) {
        setIsPaused(true);
        narrationEnabledRef.current = false;
        cancel();
        setIsPlaying(false);
        clearAutoTimer();
        startAutoAdvanceTimer();
      } else {
        setIsPaused(false);
        narrationEnabledRef.current = true;
        clearAutoTimer();
        setIsPlaying(true);
        startFromGesture(slide?.caption ?? "");
      }
    },
    [
      isPaused,
      isSpeaking,
      isPlaying,
      slide?.caption,
      cancel,
      setIsPlaying,
      clearAutoTimer,
      startAutoAdvanceTimer,
      startFromGesture,
    ]
  );

  useEffect(() => {
    setSlideIndex(0);
    setImageIndex(0);
    setSlideProgress(0);
    setTransitionKey((k) => k + 1);
    setIsPaused(false);
    narrationEnabledRef.current = true;
    autoAdvanceRef.current = true;

    const isStoryChange =
      prevStoryIdRef.current !== null && prevStoryIdRef.current !== story.id;
    const isFirstOpen = prevStoryIdRef.current === null;
    prevStoryIdRef.current = story.id;

    const firstCaption = story.slides[0]?.caption;
    if (!firstCaption || !narrationEnabledRef.current) return;

    if (isStoryChange) {
      speak(firstCaption);
    } else if (isFirstOpen && !speechController.isActive()) {
      // Deep link — no card-click gesture, try speak anyway
      speak(firstCaption);
    }
  }, [story.id, story.slides, speak]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        slideIndexRef.current === 0 &&
        !speechController.isActive() &&
        narrationEnabledRef.current
      ) {
        startAutoAdvanceTimer();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [story.id, startAutoAdvanceTimer]);

  // Narrate when advancing past slide 0
  useEffect(() => {
    if (!slide?.caption || slideIndex === 0) return;

    clearAutoTimer();
    setSlideProgress(0);

    if (!narrationEnabledRef.current) {
      startAutoAdvanceTimer();
      return;
    }

    speak(slide.caption);
  }, [slideIndex, story.id, slide?.caption, speak, clearAutoTimer, startAutoAdvanceTimer]);

  // Rotate through images on each slide
  useEffect(() => {
    if (slideImages.length <= 1) return;
    const interval = setInterval(() => {
      setImageIndex((i) => (i + 1) % slideImages.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [slideIndex, story.id, slideImages.length]);

  // Progress bar while narrating
  useEffect(() => {
    if (!isSpeaking) return;

    clearAutoTimer();
    setSlideProgress(0);
    const interval = setInterval(() => {
      setSlideProgress((p) => Math.min(p + 1.8, 95));
    }, 120);

    return () => clearInterval(interval);
  }, [isSpeaking, slideIndex, clearAutoTimer]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      clearAutoTimer();
    };
  }, [clearAutoTimer]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " ") {
        e.preventDefault();
        handlePlayPause(e as unknown as React.MouseEvent);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev, handlePlayPause]);

  const isNarrating = !isPaused && (isSpeaking || isPlaying);

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
    <div className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-black">
      {/* Full-screen image layer — inset above caption/controls so subjects aren't cropped */}
      <div key={transitionKey} className="absolute inset-x-0 top-0 bottom-44 sm:bottom-48">
        {slideImages.map((src, i) => (
          <div
            key={`${transitionKey}-img-${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === imageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Blurred fill for letterboxing */}
            <ReelSlideImage
              src={src}
              alt=""
              hidden
              priority={i === 0}
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl opacity-40"
            />
            <div className="absolute inset-0 animate-ken-burns">
              <ReelSlideImage
                src={src}
                alt={slide.imageAlt}
                priority={i === 0}
                className="absolute inset-0 h-full w-full object-contain object-center"
              />
            </div>
          </div>
        ))}
        <div className={`absolute inset-0 bg-gradient-to-b ${story.gradient} opacity-30`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Instagram-style progress bars — inside image at top */}
      <div className="absolute left-0 right-0 top-0 z-30 px-2 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex gap-1">
          {story.slides.map((_, i) => (
            <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
              <div
                className="h-full rounded-full bg-white transition-all duration-75 ease-linear"
                style={{
                  width:
                    i < slideIndex ? "100%" : i === slideIndex ? `${slideProgress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Header row — below progress bars */}
      <div className="absolute left-0 right-0 top-[max(1.75rem,env(safe-area-inset-top))] z-30 flex items-center justify-between gap-3 px-4 pt-4">
        <div className="pointer-events-none flex min-w-0 flex-1 items-center gap-2">
          <span className="text-lg">{story.emoji}</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white drop-shadow-md">{story.title}</p>
            <p className="truncate text-xs text-white/80 drop-shadow-md">{story.subtitle}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            stop();
            clearAutoTimer();
            onClose();
          }}
          className="relative z-40 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
          aria-label="Close story"
        >
          ✕
        </button>
      </div>

      {/* Slide label — upper-left overlay on image */}
      <div
        key={`label-${transitionKey}`}
        className="pointer-events-none absolute left-4 top-[max(5.5rem,calc(env(safe-area-inset-top)+4.5rem))] z-30 animate-fade-in"
      >
        <span className="inline-block rounded-lg bg-black/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
          {slide?.label}
        </span>
      </div>

      {/* Image carousel dots */}
      {slideImages.length > 1 && (
        <div className="pointer-events-none absolute bottom-44 left-0 right-0 z-30 flex justify-center gap-1.5">
          {slideImages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === imageIndex ? "w-4 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Tap zones */}
      <div
        className="absolute inset-0 z-10"
        onClick={handleTap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="presentation"
      />

      {/* Caption — semi-transparent dark blur */}
      <div className="pointer-events-none absolute bottom-36 left-0 right-0 z-30 px-5 sm:bottom-40">
        <div
          key={`caption-${transitionKey}`}
          className={`animate-fade-in-up rounded-2xl border border-white/10 bg-black/45 px-5 py-4 shadow-lg backdrop-blur-lg transition-all duration-300 ${
            isSpeaking ? "border-white/20 bg-black/55" : ""
          }`}
        >
          <p className="text-center text-base font-medium leading-relaxed text-white/95 sm:text-lg">
            {slide?.caption}
          </p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/50 px-4 py-4 backdrop-blur-xl pb-[max(1rem,env(safe-area-inset-bottom))]">
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
            onClick={handlePlayPause}
            className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${story.accent}, #7D5BA6)` }}
            aria-label={isNarrating ? "Pause narration" : "Play narration"}
          >
            <span className="text-xl">{isNarrating ? "⏸" : "▶"}</span>
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

        <div className="mt-3 flex flex-col items-center gap-1 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <span>
              Slide {slideIndex + 1} of {story.slides.length}
            </span>
            <span>·</span>
            <span>
              Reel {storyIndex + 1} of {totalStories}
            </span>
            {isPaused && (
              <>
                <span>·</span>
                <span className="text-white/70">Paused</span>
              </>
            )}
            {!isPaused && !isPlaying && !isSpeaking && (
              <>
                <span>·</span>
                <span className="text-white/70">Auto-advance</span>
              </>
            )}
            {isLastSlide && !onNextStory && (
              <>
                <span>·</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    stop();
                    onClose();
                  }}
                  className="font-medium text-white/80 hover:text-white"
                >
                  Done ✨
                </button>
              </>
            )}
          </div>
          {voiceName && isPlaying && (
            <span className="text-[10px] text-white/30">Narrated by {voiceName}</span>
          )}
        </div>
      </div>
    </div>
  );
}
