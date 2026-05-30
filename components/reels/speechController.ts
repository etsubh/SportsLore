"use client";

type SpeechListener = (state: {
  isPlaying: boolean;
  isSpeaking: boolean;
  voiceName: string | null;
}) => void;

function splitIntoPhrases(text: string): string[] {
  return text
    .replace(/—/g, ", ")
    .replace(/\.\.\./g, ".")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Chrome/Chromium speechSynthesis is unreliable — use streamed audio instead. */
function shouldUseAudioEngine(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Chrome|Chromium|Edg\//.test(navigator.userAgent);
}

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const english = voices.filter((v) => v.lang.startsWith("en"));
  const ranked = [
    ...english.filter((v) => /Samantha|Karen|Daniel|Google US English|Microsoft.*Jenny/i.test(v.name)),
    ...english.filter((v) => v.lang === "en-US"),
    ...english,
  ];
  return ranked[0] ?? null;
}

class SpeechController {
  private listeners = new Set<SpeechListener>();
  private generation = 0;
  private queue: string[] = [];
  private queueIndex = 0;
  private voice: SpeechSynthesisVoice | null = null;
  private voiceName: string | null = null;
  private isPlaying = false;
  private isSpeaking = false;
  private onEndCallback: (() => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private rate = 0.9;
  private resumeInterval: ReturnType<typeof setInterval> | null = null;
  private audio: HTMLAudioElement | null = null;
  private readonly audioEngine = shouldUseAudioEngine();
  /** Set after a user gesture successfully starts audio — unlocks later slides. */
  private audioUnlocked = false;

  constructor() {
    if (this.audioEngine) {
      this.voiceName = "Narrator";
    } else if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.addEventListener("voiceschanged", () => this.loadVoices());
      this.loadVoices();
    }
  }

  setCallbacks(onEnd?: () => void, onError?: (error: string) => void) {
    this.onEndCallback = onEnd ?? null;
    this.onErrorCallback = onError ?? null;
  }

  subscribe(listener: SpeechListener) {
    this.listeners.add(listener);
    listener({
      isPlaying: this.isPlaying,
      isSpeaking: this.isSpeaking,
      voiceName: this.voiceName,
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((l) =>
      l({
        isPlaying: this.isPlaying,
        isSpeaking: this.isSpeaking,
        voiceName: this.voiceName,
      })
    );
  }

  private synth() {
    return typeof window !== "undefined" ? window.speechSynthesis : null;
  }

  loadVoices() {
    if (this.audioEngine) return;
    const synth = this.synth();
    if (!synth) return;
    const voices = synth.getVoices();
    if (voices.length === 0) return;
    const best = pickBestVoice(voices);
    if (best) {
      this.voice = best;
      this.voiceName = best.name.replace(/ \(.*\)/, "");
      this.emit();
    }
  }

  isActive() {
    return this.isPlaying || this.isSpeaking;
  }

  cancel() {
    this.generation += 1;
    this.queue = [];
    this.queueIndex = 0;
    this.stopAudio();
    const synth = this.synth();
    if (synth) synth.cancel();
    this.isSpeaking = false;
    this.stopResumeInterval();
    this.emit();
  }

  stop() {
    this.cancel();
    this.isPlaying = false;
    this.emit();
  }

  private stopAudio() {
    if (!this.audio) return;
    this.audio.onended = null;
    this.audio.onerror = null;
    this.audio.onplaying = null;
    this.audio.pause();
    this.audio.removeAttribute("src");
    this.audio.load();
  }

  private stopResumeInterval() {
    if (this.resumeInterval) {
      clearInterval(this.resumeInterval);
      this.resumeInterval = null;
    }
  }

  private startResumeInterval() {
    this.stopResumeInterval();
    this.resumeInterval = setInterval(() => {
      const synth = this.synth();
      if (synth?.speaking || synth?.pending) synth.resume();
    }, 250);
  }

  /** Call synchronously as the first line of a click/tap handler. */
  startFromGesture(text: string) {
    this.audioUnlocked = true;
    this.beginSpeaking(text);
  }

  speak(text: string) {
    if (this.audioEngine && !this.audioUnlocked) return;
    this.beginSpeaking(text);
  }

  private beginSpeaking(text: string) {
    const normalized = text.replace(/—/g, ", ").replace(/\.\.\./g, ".");
    const phrases = this.audioEngine ? [normalized] : splitIntoPhrases(normalized);
    if (phrases.length === 0) return;

    // Avoid canceling in-progress playback of the same slide
    if (
      this.isPlaying &&
      this.queue.length === phrases.length &&
      this.queue[0] === phrases[0] &&
      this.queueIndex === 0
    ) {
      return;
    }

    this.generation += 1;
    const generation = this.generation;
    this.stopAudio();

    this.queue = phrases;
    this.queueIndex = 0;
    this.isPlaying = true;
    this.emit();

    if (this.audioEngine) {
      this.playNextAudio(generation);
    } else {
      this.loadVoices();
      this.speakNextPhrase(generation);
      this.startResumeInterval();
    }
  }

  private getAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.preload = "auto";
    }
    return this.audio;
  }

  private playNextAudio(generation: number) {
    if (generation !== this.generation) return;

    if (this.queueIndex >= this.queue.length) {
      this.isSpeaking = false;
      this.emit();
      this.onEndCallback?.();
      return;
    }

    const phrase = this.queue[this.queueIndex];
    const audio = this.getAudio();

    // Set src and call play() synchronously
    audio.src = `/api/tts?text=${encodeURIComponent(phrase)}`;
    audio.playbackRate = this.rate;

    audio.onplaying = () => {
      if (generation !== this.generation) return;
      this.isSpeaking = true;
      this.audioUnlocked = true;
      this.emit();
    };

    audio.onended = () => {
      if (generation !== this.generation) return;
      this.queueIndex += 1;
      if (this.queueIndex < this.queue.length) {
        this.playNextAudio(generation);
      } else {
        this.isSpeaking = false;
        this.emit();
        this.onEndCallback?.();
      }
    };

    audio.onerror = () => {
      if (generation !== this.generation) return;
      this.failAudio("audio-error");
    };

    audio.play().catch(() => {
      if (generation !== this.generation) return;
      this.failAudio("audio-blocked");
    });
  }

  private failAudio(error: string) {
    this.isSpeaking = false;
    this.isPlaying = false;
    this.emit();
    this.onErrorCallback?.(error);
  }

  private speakNextPhrase(generation: number) {
    if (generation !== this.generation) return;
    const synth = this.synth();
    if (!synth) return;

    if (this.queueIndex >= this.queue.length) {
      this.isSpeaking = false;
      this.stopResumeInterval();
      this.emit();
      this.onEndCallback?.();
      return;
    }

    if (synth.getVoices().length === 0 && this.queueIndex === 0) {
      const onVoices = () => {
        synth.removeEventListener("voiceschanged", onVoices);
        this.loadVoices();
        this.speakNextPhrase(generation);
      };
      synth.addEventListener("voiceschanged", onVoices);
      setTimeout(() => {
        if (generation !== this.generation) return;
        synth.removeEventListener("voiceschanged", onVoices);
        this.speakNextPhrase(generation);
      }, 500);
      return;
    }

    const phrase = this.queue[this.queueIndex];
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = "en-US";
    utterance.rate = this.rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    if (this.voice) utterance.voice = this.voice;

    utterance.onstart = () => {
      if (generation !== this.generation) return;
      this.isSpeaking = true;
      this.emit();
    };

    utterance.onend = () => {
      if (generation !== this.generation) return;
      this.queueIndex += 1;
      if (this.queueIndex < this.queue.length) {
        this.speakNextPhrase(generation);
      } else {
        this.isSpeaking = false;
        this.stopResumeInterval();
        this.emit();
        this.onEndCallback?.();
      }
    };

    utterance.onerror = (event) => {
      if (generation !== this.generation) return;
      if (event.error === "canceled" || event.error === "interrupted") return;
      this.isSpeaking = false;
      this.isPlaying = false;
      this.stopResumeInterval();
      this.emit();
      this.onErrorCallback?.(event.error);
    };

    synth.resume();
    synth.speak(utterance);
  }

  setPlaying(playing: boolean) {
    this.isPlaying = playing;
    if (this.audioEngine && this.audio) {
      if (!playing) this.audio.pause();
      else this.audio.play().catch(() => undefined);
    }
    this.emit();
  }
}

export const speechController = new SpeechController();
