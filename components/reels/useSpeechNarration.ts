"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { speechController } from "./speechController";

interface UseSpeechNarrationOptions {
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export function useSpeechNarration({ onEnd, onError }: UseSpeechNarrationOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceName, setVoiceName] = useState<string | null>(null);

  const onEndRef = useRef(onEnd);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    speechController.setCallbacks(
      () => onEndRef.current?.(),
      (error) => onErrorRef.current?.(error)
    );
  }, []);

  useEffect(() => {
    return speechController.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsSpeaking(state.isSpeaking);
      setVoiceName(state.voiceName);
    });
  }, []);

  const speak = useCallback((text: string) => {
    speechController.speak(text);
  }, []);

  const startFromGesture = useCallback((text: string) => {
    speechController.startFromGesture(text);
  }, []);

  const cancel = useCallback(() => {
    speechController.cancel();
  }, []);

  const stop = useCallback(() => {
    speechController.stop();
  }, []);

  const setPlaying = useCallback((playing: boolean) => {
    speechController.setPlaying(playing);
  }, []);

  return {
    speak,
    startFromGesture,
    stop,
    cancel,
    isPlaying,
    isSpeaking,
    setIsPlaying: setPlaying,
    voiceName,
  };
}

export function startSpeechFromGesture(text: string) {
  speechController.startFromGesture(text);
}

export function stopSpeech() {
  speechController.stop();
}
