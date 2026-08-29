"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { speakRobust, stopSpeak, warmUpVoices, isNativePlatform } from "@/lib/ttsEngine";
import { prepareForSpeech } from "./ttsPrepare";
import { pickVoiceByGender } from "./ttsVoice";

/* -------------------------------------------------------------------------- */
/*  Web feature detection (SSR-safe)                                          */
/* -------------------------------------------------------------------------- */

const emptySubscribe = () => () => {};
function getSpeechSynthesisSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export interface UseTTSOptions {
  /** BCP-47 language tag, e.g. "en-US". */
  lang?: string;
  /** Speech rate (0.1–10). 1 = normal. */
  rate?: number;
  /** Voice pitch (0–2). 1 = normal. */
  pitch?: number;
  /** Preferred narrator voice gender. */
  voiceGender?: "female" | "male";
}

export interface UseTTSReturn {
  /** Whether an utterance is currently being spoken. */
  isSpeaking: boolean;
  /** Whether any TTS path is available (stream / native / web speech). */
  isSupported: boolean;
  /** Speak the given text. Cancels any ongoing speech first. */
  speak: (text: string) => void;
  /** Stop any ongoing speech immediately. */
  cancel: () => void;
}

/**
 * Hook facade over the HybridTTS engine (lib/ttsEngine.ts).
 *
 * `isSupported` is effectively always true on real devices because Layer 1
 * (online stream) only needs an internet connection — so UI buttons never
 * disable themselves on Android WebView.
 */
export function useTTS(options: UseTTSOptions = {}): UseTTSReturn {
  const { lang = "en-US", rate = 1, pitch = 1, voiceGender } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const webSupported = useSyncExternalStore(
    emptySubscribe,
    getSpeechSynthesisSupported,
    () => false
  );

  // Track native availability so isSupported stays true inside the WebView.
  const [nativeReady, setNativeReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const native = await isNativePlatform();
        if (!cancelled) setNativeReady(native);
      } catch {
        /* stay false */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Prime the web voice cache for the desktop fallback layer.
  const resolvedVoice = useMemo(
    () => (voiceGender ? pickVoiceByGender(lang, voiceGender) : undefined),
    [lang, voiceGender]
  );

  useEffect(() => {
    if (webSupported) {
      warmUpVoices(lang);
      void resolvedVoice;
    }
    return () => {
      stopSpeak();
    };
  }, [webSupported, lang, resolvedVoice]);

  // Stream + native layers mean playback is available whenever we're online,
  // even if web speech is missing inside the Android WebView.
  const isSupported = webSupported || nativeReady || true;

  const speak = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      setIsSpeaking(true);

      void speakRobust({
        text: prepareForSpeech(text),
        lang,
        rate,
        pitch,
        onEnd: () => setIsSpeaking(false),
      }).catch(() => setIsSpeaking(false));
    },
    [lang, rate, pitch]
  );

  const cancel = useCallback(() => {
    stopSpeak();
    setIsSpeaking(false);
  }, []);

  return { isSpeaking, isSupported, speak, cancel };
}
