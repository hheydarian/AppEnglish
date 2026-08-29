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
  /** Whether any TTS path is available (web speech OR native plugin). */
  isSupported: boolean;
  /** Speak the given text. Cancels any ongoing speech first. */
  speak: (text: string) => void;
  /** Stop any ongoing speech immediately. */
  cancel: () => void;
}

/**
 * Hook facade over RobustTTS.
 *
 * Platform routing (decided inside lib/ttsEngine.ts):
 *   - Android/Capacitor → native TextToSpeech plugin (web layer skipped)
 *   - Desktop browser   → hardened Web SpeechSynthesis
 *
 * `isSupported` is true when EITHER path exists, so UI buttons never disable
 * themselves inside the Android WebView where web speech is absent but the
 * native engine works.
 */
export function useTTS(options: UseTTSOptions = {}): UseTTSReturn {
  const { lang = "en-US", rate = 1, pitch = 1, voiceGender } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const webSupported = useSyncExternalStore(
    emptySubscribe,
    getSpeechSynthesisSupported,
    () => false
  );

  // On native, TTS works even without web speechSynthesis — track it so the
  // "isSupported" flag stays true inside the Android WebView.
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

  const resolvedVoice = useMemo(
    () => (voiceGender ? pickVoiceByGender(lang, voiceGender) : undefined),
    [lang, voiceGender]
  );

  useEffect(() => {
    if (!webSupported && !nativeReady) return;
    warmUpVoices(lang); // desktop only benefit; no-op on native
    void resolvedVoice;
    return () => {
      stopSpeak();
    };
  }, [webSupported, nativeReady, lang, resolvedVoice]);

  const isSupported = webSupported || nativeReady;

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
