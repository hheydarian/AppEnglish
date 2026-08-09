"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export interface UseTTSOptions {
  /** BCP-47 language tag, e.g. "en-US". */
  lang?: string;
  /** Speech rate (0.1–10). 1 = normal. */
  rate?: number;
  /** Voice pitch (0–2). 1 = normal. */
  pitch?: number;
}

export interface UseTTSReturn {
  /** Whether a utterance is currently being spoken. */
  isSpeaking: boolean;
  /** Whether the browser supports speech synthesis. */
  isSupported: boolean;
  /** Speak the given text. Cancels any ongoing speech first. */
  speak: (text: string) => void;
  /** Stop any ongoing speech immediately. */
  cancel: () => void;
}

/* ---- SSR-safe feature detection via useSyncExternalStore ---- */
const emptySubscribe = () => () => {};
function getSpeechSynthesisSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Wrapper around the Web Speech API SpeechSynthesis (text-to-speech).
 * Used to read the AI character's replies aloud for listening practice.
 */
export function useTTS(options: UseTTSOptions = {}): UseTTSReturn {
  const { lang = "en-US", rate = 1, pitch = 1 } = options;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSupported = useSyncExternalStore(
    emptySubscribe,
    getSpeechSynthesisSupported, // client snapshot
    () => false // server snapshot (SSR)
  );

  useEffect(() => {
    if (!isSupported) return;
    // Some browsers keep synthesis paused; ensure it's ready.
    window.speechSynthesis.cancel();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (!text.trim()) return;

      const synth = window.speechSynthesis;
      synth.cancel(); // interrupt anything currently playing

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.speak(utterance);
    },
    [lang, rate, pitch]
  );

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { isSpeaking, isSupported, speak, cancel };
}
