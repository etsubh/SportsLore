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

  constructor() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
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
      if (synth?.speaking) synth.resume();
    }, 200);
  }

  /** Call synchronously inside a click/tap handler. */
  startFromGesture(text: string) {
    const synth = this.synth();
    if (!synth) return;
    synth.cancel();
    synth.resume();
    this.beginSpeaking(text);
  }

  speak(text: string) {
    const synth = this.synth();
    if (!synth) return;
    if (synth.speaking) synth.cancel();
    this.beginSpeaking(text);
  }

  private beginSpeaking(text: string) {
    this.generation += 1;
    const generation = this.generation;

    const phrases = splitIntoPhrases(text);
    if (phrases.length === 0) return;

    this.queue = phrases;
    this.queueIndex = 0;
    this.isPlaying = true;
    this.emit();

    this.loadVoices();
    this.speakNextPhrase(generation);
    this.startResumeInterval();
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
      }, 300);
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

      if (this.voice && this.queueIndex === 0) {
        this.voice = null;
        this.speakNextPhrase(generation);
        return;
      }

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
    this.emit();
  }
}

export const speechController = new SpeechController();
