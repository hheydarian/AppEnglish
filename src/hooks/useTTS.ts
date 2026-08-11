"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/* -------------------------------------------------------------------------- */
/*  Speech preparation — make letters & short tokens pronounce distinctly     */
/* -------------------------------------------------------------------------- */

/**
 * Normalize text before sending it to the speech synthesizer so that:
 *  - Paired letter forms like "A a", "Bb", "B b" are spoken as two separate
 *    letters with a natural pause ("A ... a") instead of gluing into a slur.
 *  - Single capital letters (used alone as alphabet lessons) are spelled out.
 *  - Short token runs (e.g. "A E I O U") get commas between them.
 *
 * This is essential for A0 alphabet lessons, where "A a" otherwise sounds
 * like a single nonsense syllable.
 */
export function prepareForSpeech(text: string): string {
  let out = text.trim();
  if (!out) return out;

  // 1) "A a" / "A  a" (big-space-small) → "A, a"  — most common A0 pattern.
  out = out.replace(/([A-Z])\s+([a-z])/g, "$1, $2");
  // 2) "Bb" / "Cc" (big immediately followed by small) → "B, b".
  out = out.replace(/([A-Z])([a-z])(?![a-z])/g, "$1, $2");
  // 3) Sequences of single capital letters like "A E I O U" → "A, E, I, O, U".
  out = out.replace(/([A-Z])(\s+)(?=[A-Z](?:\s|$))/g, "$1,$2");
  // 4) Collapse double commas/whitespace created by the steps above.
  out = out.replace(/,\s*,/g, ",").replace(/\s+/g, " ").trim();

  return out;
}

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

      // Prepare text so alphabet letters & short tokens are spoken distinctly.
      const prepared = prepareForSpeech(text);

      const synth = window.speechSynthesis;
      synth.cancel(); // interrupt anything currently playing

      const utterance = new SpeechSynthesisUtterance(prepared);
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
