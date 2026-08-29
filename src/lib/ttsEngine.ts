"use client";

import { useSettingsStore } from "@/store/settingsStore";

/**
 * HybridTTS — a 3-layer, self-healing speech engine for ZabanYar.
 *
 * LAYER 1 — Online streamed TTS (fastest, best quality)
 *   When online, streams Google Translate TTS audio via `new Audio(url)`.
 *   Works flawlessly inside the Android WebView (media playback unlocked in
 *   MainActivity) and needs no device voice data.
 *
 * LAYER 2 — Native offline TTS (fallback)
 *   @capacitor-community/text-to-speech → the device's Google TTS engine.
 *   Language matching is UNDERSCORE-AWARE: Android reports "en_US" while the
 *   web world says "en-US" — regex /^en[-_]/i handles both.
 *
 * LAYER 3 — Web Speech API (last resort, desktop browsers)
 *   Hardened SpeechSynthesis with warmed voices and keep-alive.
 *
 * All layers are silent-safe: any failure falls through to the next layer.
 */

/* -------------------------------------------------------------------------- */
/*  Platform detection                                                        */
/* -------------------------------------------------------------------------- */

export async function isNativePlatform(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const cap = (
      window as unknown as {
        Capacitor?: { isNativePlatform?: () => boolean };
      }
    ).Capacitor;
    return typeof cap?.isNativePlatform === "function" && cap.isNativePlatform();
  } catch {
    return false;
  }
}

function isOnline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine !== false;
}

/* -------------------------------------------------------------------------- */
/*  Layer 2 — native plugin                                                   */
/* -------------------------------------------------------------------------- */

type NativeTts = {
  speak: (o: {
    text: string;
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    category?: string;
  }) => Promise<void>;
  stop: () => Promise<void>;
  getSupportedLanguages: () => Promise<{ languages: string[] }>;
  openInstall: () => Promise<void>;
};

let nativeTts: NativeTts | null = null;
let nativeLoadAttempted = false;

async function loadNative(): Promise<NativeTts | null> {
  if (!(await isNativePlatform())) return null;
  if (nativeTts) return nativeTts;
  if (nativeLoadAttempted) return null;
  nativeLoadAttempted = true;
  try {
    const mod = await import("@capacitor-community/text-to-speech");
    nativeTts = mod.TextToSpeech as unknown as NativeTts;
    return nativeTts;
  } catch (err) {
    console.warn("[ttsEngine] native TTS plugin unavailable:", err);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Self-healing: language support (UNDERSCORE-AWARE)                          */
/* -------------------------------------------------------------------------- */

export type TtsHealth = "checking" | "ready" | "engine-missing";

type HealthListener = (health: TtsHealth) => void;
const healthListeners = new Set<HealthListener>();
let ttsHealth: TtsHealth = "checking";

export function getTtsHealth(): TtsHealth {
  return ttsHealth;
}

export function onTtsHealthChange(listener: HealthListener): () => void {
  healthListeners.add(listener);
  return () => healthListeners.delete(listener);
}

function setHealth(h: TtsHealth): void {
  if (ttsHealth === h) return;
  ttsHealth = h;
  healthListeners.forEach((fn) => fn(h));
}

/**
 * Verify the device TTS engine supports the target language.
 *
 * CRITICAL: Android's getSupportedLanguages() returns underscore codes
 * ("en_US"), while we request hyphen codes ("en-US"). A naive includes()
 * check fails and wrongly reports the engine as broken. The regex
 * /^en[-_]/i treats both forms as equal.
 */
async function verifyLanguageSupport(nat: NativeTts, lang: string): Promise<boolean> {
  try {
    const { languages } = await nat.getSupportedLanguages();
    const prefix = lang.slice(0, 2).toLowerCase();
    const ok =
      languages.some((l) => new RegExp(`^${prefix}[-_]`, "i").test(l)) ||
      languages.some((l) => l.toLowerCase() === lang.toLowerCase());

    if (!ok) {
      console.warn(
        "[ttsEngine] device TTS has no voice for:",
        lang,
        "— available:",
        languages.filter((l) => l.toLowerCase().startsWith("en")).join(", ") || "none"
      );
    }
    setHealth(ok ? "ready" : "engine-missing");
    return ok;
  } catch {
    setHealth("engine-missing");
    return false;
  }
}

/**
 * Open the system Text-to-Speech settings (android.settings.TTS_SETTINGS)
 * so the user can install/enable English voice data.
 */
export async function openTtsSettings(): Promise<void> {
  try {
    const nat = await loadNative();
    await nat?.openInstall();
  } catch (err) {
    console.warn("[ttsEngine] could not open TTS settings:", err);
  }
}

/* -------------------------------------------------------------------------- */
/*  Layer 1 — online streamed audio                                            */
/* -------------------------------------------------------------------------- */

let streamAudio: HTMLAudioElement | null = null;

/**
 * Stream TTS audio from Google Translate (works in WebView, no voice data
 * needed, kicks in instantly when online).
 */
function playStreamed(text: string, lang: string, rate: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isOnline()) {
      resolve(false);
      return;
    }
    try {
      stopSpeak();
      const url =
        "https://translate.google.com/translate_tts?ie=UTF-8&tl=" +
        encodeURIComponent(lang.slice(0, 2)) +
        "&client=tw-ob&q=" +
        encodeURIComponent(text.slice(0, 200)); // endpoint caps ~200 chars

      streamAudio = new Audio(url);
      streamAudio.playbackRate = Math.min(1.5, Math.max(0.6, rate));

      const cleanup = () => {
        streamAudio?.removeEventListener("ended", onEnded);
        streamAudio?.removeEventListener("error", onError);
      };
      const onEnded = () => {
        cleanup();
        resolve(true);
      };
      const onError = () => {
        cleanup();
        resolve(false);
      };

      streamAudio.addEventListener("ended", onEnded);
      streamAudio.addEventListener("error", onError);

      void streamAudio.play().catch(() => {
        cleanup();
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });
}

/** Stop any active streamed audio. */
function stopStream(): void {
  if (streamAudio) {
    streamAudio.pause();
    streamAudio.src = "";
    streamAudio = null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Layer 3 — Web Speech helpers                                              */
/* -------------------------------------------------------------------------- */

let webVoices: SpeechSynthesisVoice[] = [];
let webVoicesReady = false;
let webWarming = false;

export function warmUpVoices(langPrefix = "en"): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  const grab = () => {
    const list = synth.getVoices();
    if (list.length > 0) {
      webVoices = list;
      webVoicesReady = true;
      return true;
    }
    return false;
  };
  if (grab()) return;
  if (!webWarming) {
    webWarming = true;
    synth.addEventListener?.("voiceschanged", () => grab(), { once: true });
    let tries = 0;
    const poll = setInterval(() => {
      tries += 1;
      if (grab() || tries > 40) {
        clearInterval(poll);
        webWarming = false;
      }
    }, 250);
  }
  void langPrefix;
}

function pickVoice(lang: string, gender: "female" | "male") {
  if (!webVoicesReady && typeof window !== "undefined" && "speechSynthesis" in window) {
    webVoices = window.speechSynthesis.getVoices();
    webVoicesReady = webVoices.length > 0;
  }
  const prefix = lang.slice(0, 2).toLowerCase();
  const langPool = webVoices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  const pool = langPool.length > 0 ? langPool : webVoices;
  const hints =
    gender === "female"
      ? ["female", "samantha", "victoria", "zira", "karen", "google us english", "aria", "jenny"]
      : ["male", "daniel", "alex", "david", "george", "mark", "fred"];
  return pool.find((v) => hints.some((h) => v.name.toLowerCase().includes(h))) ?? pool[0] ?? null;
}

function chunkText(text: string): string[] {
  if (text.length <= 180) return [text];
  const parts = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let cur = "";
  for (const p of parts) {
    if ((cur + " " + p).trim().length <= 180) cur = (cur + " " + p).trim();
    else {
      if (cur) chunks.push(cur);
      cur = p;
    }
  }
  if (cur) chunks.push(cur);
  return chunks.length ? chunks : [text];
}

/* -------------------------------------------------------------------------- */
/*  Public controls                                                            */
/* -------------------------------------------------------------------------- */

let activeWatchdog: ReturnType<typeof setInterval> | null = null;

/** Stop every layer (stream + native + web). Safe to call anywhere. */
export function stopSpeak(): void {
  stopStream();
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
  void (async () => {
    try {
      const nat = await loadNative();
      await nat?.stop();
    } catch {
      /* ignore */
    }
  })();
}

export interface SpeakOptions {
  text: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
  onStart?: () => void;
}

export type SpeakResult = "stream" | "native" | "web" | "failed";

/**
 * Speak text through the best available layer:
 *   1. Online stream (Google Translate TTS) — instant, no voice data needed
 *   2. Native offline TTS (device Google TTS engine)
 *   3. Web Speech API (desktop browsers)
 */
export async function speakRobust(
  opts: SpeakOptions
): Promise<SpeakResult> {
  const { text, lang = "en-US", rate = 1, pitch = 1 } = opts;
  if (!text.trim()) return "failed";

  const settings = useSettingsStore.getState();

  /* ================= LAYER 1 — ONLINE STREAM ================= */
  if (isOnline()) {
    const ok = await playStreamed(text, lang, rate);
    if (ok) {
      opts.onStart?.();
      opts.onEnd?.();
      return "stream";
    }
    // Stream failed (offline mid-flight / endpoint blocked) → fall through.
  }

  /* ================= LAYER 2 — NATIVE OFFLINE TTS ============= */
  if (await isNativePlatform()) {
    const nat = await loadNative();

    // Self-healing: is English voice data actually installed?
    // UNDERSCORE-AWARE check (en_US vs en-US both match /^en[-_]/i).
    if (nat && ttsHealth !== "ready") {
      const supported = await verifyLanguageSupport(nat, lang);
      if (!supported) return "failed";
    }

    if (nat) {
      try {
        await nat.stop();
        // lang is optional here — the engine default applies when omitted,
        // which sidesteps any en_US/en-US formatting mismatch entirely.
        await nat.speak({
          text,
          lang,
          rate: Math.min(2, Math.max(0.5, rate)),
          pitch,
          volume: 1.0,
          category: "ambient",
        });
        setHealth("ready");
        opts.onStart?.();
        opts.onEnd?.();
        return "native";
      } catch (err) {
        console.warn("[ttsEngine] native speak failed:", err);
        setHealth("engine-missing");
        return "failed";
      }
    }
    setHealth("engine-missing");
    return "failed";
  }

  /* ================= LAYER 3 — WEB SPEECH (desktop) ========== */
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return "failed";
  }

  warmUpVoices(lang);
  const synth = window.speechSynthesis;
  stopSpeak();

  const voice = pickVoice(lang, settings.voiceGender);
  const chunks = chunkText(text);
  let started = false;

  const speakChunk = (i: number) => {
    const utter = new SpeechSynthesisUtterance(chunks[i]);
    utter.lang = lang;
    utter.rate = rate;
    utter.pitch = pitch;
    utter.volume = 1.0;
    if (voice) utter.voice = voice;

    utter.onstart = () => {
      if (!started) {
        started = true;
        opts.onStart?.();
        if (activeWatchdog) clearInterval(activeWatchdog);
        activeWatchdog = setInterval(() => {
          if (synth.speaking && synth.paused) synth.resume();
        }, 5000);
      }
    };

    utter.onend = () => {
      if (i < chunks.length - 1) speakChunk(i + 1);
      else {
        stopSpeak();
        opts.onEnd?.();
      }
    };

    synth.speak(utter);
  };

  speakChunk(0);
  return "web";
}
