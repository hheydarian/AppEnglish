"use client";

import { useSettingsStore } from "@/store/settingsStore";

/**
 * RobustTTS — a WebView-survivable text-to-speech service.
 *
 * WHY THIS EXISTS
 * ===============
 * `window.speechSynthesis` inside the Android WebView is notoriously broken:
 *   - getVoices() returns [] until the engine warms up (async, sometimes never).
 *   - .speak() silently no-ops if called with an unknown `voice`.
 *   - Long utterances get cut off after ~4s on some OEM WebView builds unless
 *     a keep-alive resume loop runs.
 *
 * STRATEGY (layered fallback):
 *   Layer 1 (Web): warmed-up SpeechSynthesis with voice resolution,
 *                  chunked long text + keep-alive resume timer.
 *   Layer 2 (Native): @capacitor-community/text-to-speech plugin when running
 *                  inside Capacitor AND web layer reports failure.
 *
 * Every hook consumer just calls speak()/cancel() — the layers are invisible.
 */

/* -------------------------------------------------------------------------- */
/*  Engine state                                                               */
/* -------------------------------------------------------------------------- */

let voices: SpeechSynthesisVoice[] = [];
let voicesReady = false;
let warming = false;

/** true once we've proven (or assumed after timeout) that Web TTS is dead. */
let webTTSBroken: boolean | null = null; // null = unknown

type NativeTts = {
  speak: (o: {
    text: string;
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
  }) => Promise<void>;
  stop: () => Promise<void>;
};

let nativeTts: NativeTts | null = null;
let nativeLoadAttempted = false;

function isCapacitor(): boolean {
  return (
    typeof window !== "undefined" &&
    !!(window as unknown as { Capacitor?: unknown }).Capacitor
  );
}

/** Lazily load the native plugin ONLY inside Capacitor. */
async function loadNative(): Promise<NativeTts | null> {
  if (!isCapacitor()) return null;
  if (nativeTts) return nativeTts;
  if (nativeLoadAttempted) return null;
  nativeLoadAttempted = true;
  try {
    // registerPlugin returns a ready proxy — no constructor call.
    const mod = await import("@capacitor-community/text-to-speech");
    nativeTts = mod.TextToSpeech as unknown as NativeTts;
    return nativeTts;
  } catch {
    return null;
  }
}

/**
 * Warm the Web voices list. Android WebView populates voices async — poll
 * briefly and also hook onvoiceschanged so late arrivals register.
 */
export function warmUpVoices(langPrefix = "en"): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  const grab = () => {
    const list = synth.getVoices();
    if (list.length > 0) {
      voices = list;
      voicesReady = true;
      return true;
    }
    return false;
  };

  if (grab()) return;

  if (!warming) {
    warming = true;
    // Standard event.
    synth.addEventListener?.("voiceschanged", () => grab(), { once: true });
    // Aggressive polling — some WebViews fire nothing.
    let tries = 0;
    const poll = setInterval(() => {
      tries += 1;
      if (grab() || tries > 40) {
        clearInterval(poll);
        warming = false;
      }
    }, 250);
  }
  void langPrefix; // reserved for per-lang warmup filtering
}

/** Pick the best system voice for lang + gender using our warmed cache. */
function pickVoice(lang: string, gender: "female" | "male") {
  if (!voicesReady && typeof window !== "undefined" && "speechSynthesis" in window) {
    voices = window.speechSynthesis.getVoices();
    voicesReady = voices.length > 0;
  }

  const prefix = lang.slice(0, 2).toLowerCase();
  const pool =
    voices.filter((v) => v.lang.toLowerCase().startsWith(prefix)).length > 0
      ? voices.filter((v) => v.lang.toLowerCase().startsWith(prefix))
      : voices;

  const hints =
    gender === "female"
      ? ["female", "samantha", "victoria", "zira", "karen", "moira", "tessa", "serena", "fiona", "google us english", "aria", "jenny"]
      : ["male", "daniel", "alex", "arthur", "oliver", "rishi", "fred", "david", "george", "mark"];

  return (
    pool.find((v) => hints.some((h) => v.name.toLowerCase().includes(h))) ??
    pool[0] ??
    null
  );
}

/**
 * Android WebView cuts long utterances — split on sentence boundaries so each
 * chunk stays under ~180 chars and plays back to back.
 */
function chunkText(text: string): string[] {
  if (text.length <= 180) return [text];
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + " " + s).trim().length <= 180) {
      cur = (cur + " " + s).trim();
    } else {
      if (cur) chunks.push(cur);
      cur = s;
    }
  }
  if (cur) chunks.push(cur);
  return chunks.length > 0 ? chunks : [text];
}

/* -------------------------------------------------------------------------- */
/*  Public imperative API                                                      */
/* -------------------------------------------------------------------------- */

export interface SpeakOptions {
  text: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  /** Called when playback fully finishes (or fails over successfully). */
  onEnd?: () => void;
  /** Called immediately when playback audibly starts. */
  onStart?: () => void;
}

let activeWatchdog: ReturnType<typeof setInterval> | null = null;
let endTimer: ReturnType<typeof setTimeout> | null = null;

export function stopSpeak(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
  }
  if (activeWatchdog) {
    clearInterval(activeWatchdog);
    activeWatchdog = null;
  }
  if (endTimer) {
    clearTimeout(endTimer);
    endTimer = null;
  }
  void nativeTts?.stop();
}

/**
 * Speak with layered fallback. Returns "web" | "native" | "failed".
 */
export async function speakRobust(opts: SpeakOptions): Promise<"web" | "native" | "failed"> {
  const { text, lang = "en-US", rate = 1, pitch = 1 } = opts;
  if (!text.trim()) return "failed";

  const settings = useSettingsStore.getState();

  // Always warm before speaking — fixes first-tap silence on Android.
  warmUpVoices(lang);

  const preferNative =
    settings.accent === "au" || // AU system voices rarely exist in WebView → native handles it better
    webTTSBroken === true;

  /* ---------- Layer 2 first: native plugin (only in Capacitor) ---------- */
  if (isCapacitor() && (preferNative || !voicesReady)) {
    const nat = await loadNative();
    if (nat) {
      try {
        await nat.stop();
        await nat.speak({
          text,
          lang,
          rate: Math.min(2, Math.max(0.5, rate)),
          pitch,
          volume: 1.0,
        });
        opts.onStart?.();
        opts.onEnd?.(); // plugin resolves on completion
        return "native";
      } catch {
        // fall through to web attempt
      }
    }
  }

  /* ---------- Layer 1: hardened Web Speech ---------- */
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return "failed";
  }
  const synth = window.speechSynthesis;
  stopSpeak();

  const voice = pickVoice(lang, settings.voiceGender);
  const chunks = chunkText(text);
  let started = false;

  const speakChunk = (i: number) => {
    const utter = new SpeechSynthesisUtterance(chunks[i]);
    utter.lang = lang; // REQUIRED — some engines ignore utterance without it
    utter.rate = rate;
    utter.pitch = pitch;
    utter.volume = 1.0;
    if (voice) utter.voice = voice;

    utter.onstart = () => {
      if (!started) {
        started = true;
        webTTSBroken = false;
        opts.onStart?.();

        // Keep-alive: Chrome/WebView pauses synthesis when idle mid-utterance.
        if (activeWatchdog) clearInterval(activeWatchdog);
        activeWatchdog = setInterval(() => {
          if (synth.speaking && synth.paused) synth.resume();
        }, 5000);
      }
    };

    utter.onend = () => {
      if (i < chunks.length - 1) {
        speakChunk(i + 1);
      } else {
        stopSpeak();
        opts.onEnd?.();
      }
    };

    // Detect silent failure: no start within 1200ms of calling speak().
    setTimeout(() => {
      if (!started && i === 0) {
        webTTSBroken = true;
        // Escalate to native once, synchronously best-effort.
        void (async () => {
          const nat = await loadNative();
          if (nat) {
            try {
              await nat.stop();
              await nat.speak({ text, lang, rate, pitch, volume: 1.0 });
              opts.onStart?.();
              opts.onEnd?.();
            } catch {
              /* give up silently */
            }
          }
        })();
      }
    }, 1200);

    synth.speak(utter);
  };

  speakChunk(0);
  void endTimer;
  return "web";
}
