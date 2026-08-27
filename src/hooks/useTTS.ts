"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

import {
  speakRobust,
  stopSpeak,
  warmUpVoices,
} from "@/lib/ttsEngine";
import { prepareForSpeech } from "./ttsPrepare";
import { pickVoiceByGender } from "./ttsVoice";

/* -------------------------------------------------------------------------- */
/*  Speech preparation — make letters & short tokens pronounce distinctly     */
/* -------------------------------------------------------------------------- */

export interface UseTTSOptions {
  /** BCP-47 language tag, e.g. "en-US". */
  lang?: string;
  /** Speech rate (0.1–10). 1 = normal. */
  rate?: number;
  /** Voice pitch (0–2). 1 = normal. */
  pitch?: number;
  /** Preferred voice gender for narration. Picks a matching system voice. */
  voiceGender?: "female" | "male";
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
 * Hook facade over the layered RobustTTS engine (lib/ttsEngine.ts).
 * The engine handles Android WebView quirks: async voice lists, silent
 * failures, long-utterance cutoffs — and falls back to the native
 * Capacitor TTS plugin when web speech proves unreliable.
 */
export function useTTS(options: UseTTSOptions = {}): UseTTSReturn {
  const { lang = "en-US", rate = 1, pitch = 1, voiceGender } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSupported = useSyncExternalStore(
    emptySubscribe,
    getSpeechSynthesisSupported, // client snapshot
    () => false // server snapshot (SSR)
  );

  // Resolve a system voice matching the requested gender + lang so the
  // engine's cache is primed even before first playback.
  const resolvedVoice = useMemo(
    () => (voiceGender ? pickVoiceByGender(lang, voiceGender) : undefined),
    [lang, voiceGender]
  );

  useEffect(() => {
    if (!isSupported) return;
    warmUpVoices(lang);
    void resolvedVoice; // pre-resolved → cached inside engine on next speak
    return () => {
      stopSpeak();
    };
  }, [isSupported, lang, resolvedVoice]);

  const speak = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      if (
        typeof window === "undefined" ||
        !("speechSynthesis" in window)
      ) {
        // Even without Web Speech, the native layer may still work.
        void speakRobust({ text, lang, rate, pitch });
        return;
      }

      setIsSpeaking(true);

      void speakRobust({
        text: prepareForSpeech(text),
        lang,
        rate,
        pitch,
        onEnd: () => setIsSpeaking(false),
      });
    },
    [lang, rate, pitch]
  );

  const cancel = useCallback(() => {
    stopSpeak();
    setIsSpeaking(false);
  }, []);

  return { isSpeaking, isSupported, speak, cancel };
}
