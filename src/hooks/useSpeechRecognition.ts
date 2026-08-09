"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  SpeechRecognitionErrorEvent,
  SpeechRecognitionEvent,
  SpeechRecognitionLike,
  SpeechRecognitionConstructor,
} from "@/lib/speech/types";

/* ---- SSR-safe feature detection ---- */
const emptySubscribe = () => () => {};
function getRecognitionSupported() {
  return (
    typeof window !== "undefined" &&
    !!(window.SpeechRecognition ?? window.webkitSpeechRecognition)
  );
}

export interface UseSpeechRecognitionOptions {
  /** BCP-47 language tag for recognition, e.g. "en-US". */
  lang?: string;
  /** Called whenever new (final or interim) transcript text arrives. */
  onResult?: (text: string, isFinal: boolean, confidence: number) => void;
  /** Called when recognition stops (manually or automatically). */
  onEnd?: () => void;
  /** Called when an error occurs. */
  onError?: (error: string) => void;
}

export interface UseSpeechRecognitionReturn {
  /** Whether recognition is currently active. */
  isListening: boolean;
  /** Whether the browser supports speech recognition. */
  isSupported: boolean;
  /** The latest interim transcript (cleared on each final result). */
  interimTranscript: string;
  /** Start listening. */
  start: () => void;
  /** Stop listening. */
  stop: () => void;
}

/**
 * Wrapper around the Web Speech API SpeechRecognition.
 *
 * Browser-only by design: it detects support at mount and no-ops gracefully
 * when unavailable, so the chat page degrades to text-only input.
 */
export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn {
  const { lang = "en-US", onResult, onEnd, onError } = options;
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const isSupported = useSyncExternalStore(
    emptySubscribe,
    getRecognitionSupported, // client snapshot
    () => false // server snapshot (SSR)
  );

  // Keep latest callbacks in a ref. We only WRITE the ref inside the effect
  // (never read/write during render) to satisfy the hooks compiler rule.
  const cbRef = useRef({ onResult, onEnd, onError });

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    // Sync the latest callbacks into the ref for the event handlers below.
    cbRef.current = { onResult, onEnd, onError };

    if (!isSupported) return;

    const Ctor: SpeechRecognitionConstructor | undefined =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const alt = result[0];
        if (result.isFinal) {
          const text = alt.transcript.trim();
          if (text) {
            cbRef.current.onResult?.(text, true, alt.confidence);
          }
        } else {
          interim += alt.transcript;
        }
      }
      setInterimTranscript(interim);
      if (interim) {
        cbRef.current.onResult?.(interim, false, 0);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      cbRef.current.onError?.(event.error);
      setIsListening(false);
      setInterimTranscript("");
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
      cbRef.current.onEnd?.();
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
    // Re-create when the language or support changes.
  }, [lang, isSupported, onResult, onEnd, onError]);

  const start = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec || isListening) return;
    setInterimTranscript("");
    try {
      rec.start();
    } catch {
      // start() throws if already started; safe to ignore.
    }
  }, [isListening]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  return { isListening, isSupported, interimTranscript, start, stop };
}
