"use client";

import { useSettingsStore } from "@/store/settingsStore";

/**
 * RobustTTS — native-first text-to-speech for ZabanYar.
 *
 * ARCHITECTURE (final, per Android WebView reality):
 *
 *   ANDROID (Capacitor.isNativePlatform() === true):
 *     → EXCLUSIVELY uses the native Android TTS engine via
 *       @capacitor-community/text-to-speech. Web SpeechSynthesis is NEVER
 *       attempted — it is silent/broken in most Android WebViews.
 *
 *   WEB / DESKTOP BROWSER:
 *     → Hardened Web SpeechSynthesis (warmed voices, chunking, keep-alive).
 *
 * Every consumer (chat, podcasts, lessons, exam, settings preview) calls
 * speakRobust()/stopSpeak() — the layers are fully transparent.
 */

/* -------------------------------------------------------------------------- */
/*  Native layer                                                              */
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
  /** List languages the device TTS engine can actually speak. */
  getSupportedLanguages: () => Promise<{ languages: string[] }>;
  /** Open the system Text-to-Speech settings screen. */
  openInstall: () => Promise<void>;
};

let nativeTts: NativeTts | null = null;
let nativeLoadAttempted = false;

/** Official Capacitor check — authoritative on both web and native. */
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

/** Lazily load the native plugin ONLY on a verified native platform. */
async function loadNative(): Promise<NativeTts | null> {
  if (!(await isNativePlatform())) return null;
  if (nativeTts) return nativeTts;
  if (nativeLoadAttempted) return null;
  nativeLoadAttempted = true;
  try {
    // registerPlugin returns a ready proxy — no constructor call.
    const mod = await import("@capacitor-community/text-to-speech");
    nativeTts = mod.TextToSpeech as unknown as NativeTts;
    return nativeTts;
  } catch (err) {
    console.warn("[ttsEngine] native TTS plugin unavailable:", err);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Self-healing: language availability + user guidance state                 */
/* -------------------------------------------------------------------------- */

export type TtsHealth = "checking" | "ready" | "engine-missing";

type HealthListener = (health: TtsHealth) => void;
const healthListeners = new Set<HealthListener>();
let ttsHealth: TtsHealth = "checking";

/**
 * Current TTS health on native devices.
 * "engine-missing" means English TTS is unavailable → UI should show the
 * guidance modal directing the user to system Text-to-Speech settings.
 */
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
 * Verify the device's TTS engine actually supports the target language.
 * Runs once per session on native; sets the shared health state.
 */
async function verifyLanguageSupport(nat: NativeTts, lang: string): Promise<boolean> {
  try {
    const { languages } = await nat.getSupportedLanguages();
    const prefix = lang.slice(0, 2).toLowerCase();
    const ok = languages.some(
      (l) => l.toLowerCase().startsWith(prefix) || l.toLowerCase() === lang.toLowerCase()
    );
    setHealth(ok ? "ready" : "engine-missing");
    return ok;
  } catch {
    // Engine query failed — assume broken and guide the user.
    setHealth("engine-missing");
    return false;
  }
}

/**
 * Open the system Text-to-Speech settings screen
 * (com.android.settings.TTS_SETTINGS) so the user can install/enable the
 * English voice data. Uses the plugin's built-in openInstall() which issues
 * exactly that Intent.
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
/*  Web layer state                                                           */
/* -------------------------------------------------------------------------- */

let webVoices: SpeechSynthesisVoice[] = [];
let webVoicesReady = false;
let webWarming = false;

/**
 * Warm the Web voices list (desktop browsers only path).
 * Android WebView never reaches this — native layer short-circuits first.
 */
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
      ? ["female", "samantha", "victoria", "zira", "karen", "moira", "tessa", "serena", "fiona", "google us english", "aria", "jenny"]
      : ["male", "daniel", "alex", "arthur", "oliver", "rishi", "fred", "david", "george", "mark"];

  return (
    pool.find((v) => hints.some((h) => v.name.toLowerCase().includes(h))) ??
    pool[0] ??
    null
  );
}

/** Split long text — desktop browsers also clip very long utterances. */
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
/*  Public controls                                                           */
/* -------------------------------------------------------------------------- */

let activeWatchdog: ReturnType<typeof setInterval> | null = null;

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
  // Native stop — wrapped so a broken plugin never throws here.
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

/**
 * Speak text with the correct engine for the current platform.
 *   Native Android → @capacitor-community/text-to-speech (ALWAYS first).
 *   Web browser    → hardened SpeechSynthesis.
 */
export async function speakRobust(
  opts: SpeakOptions
): Promise<"native" | "web" | "failed"> {
  const { text, lang = "en-US", rate = 1, pitch = 1 } = opts;
  if (!text.trim()) return "failed";

  const settings = useSettingsStore.getState();

  /* ================= LAYER 1 — NATIVE (Android) =================
   * On native, web speechSynthesis is silent. The native Android TTS
   * engine (Google TTS) is the ONLY reliable path — so we use it
   * exclusively and never fall through to the broken web layer.      */
  if (await isNativePlatform()) {
    const nat = await loadNative();

    // SELF-HEALING: verify the engine actually supports the target language.
    // If en-US is missing, surface the guidance modal instead of playing silence.
    if (nat && ttsHealth !== "ready") {
      const supported = await verifyLanguageSupport(nat, lang);
      if (!supported) return "failed";
    }

    if (nat) {
      try {
        await nat.stop();
        await nat.speak({
          text,
          lang,
          rate: Math.min(2, Math.max(0.5, rate)),
          pitch,
          volume: 1.0,
          category: "ambient", // mixes properly, respects media volume
        });
        setHealth("ready");
        opts.onStart?.();
        opts.onEnd?.(); // plugin promise resolves on completion
        return "native";
      } catch (err) {
        // speak() itself errored → likely no engine/data. Guide the user.
        console.warn("[ttsEngine] native speak failed:", err);
        setHealth("engine-missing");
        // We do NOT use web speech on Android — it is silent there.
        return "failed";
      }
    }
    // Plugin module missing on native — nothing else can produce sound here.
    setHealth("engine-missing");
    return "failed";
  }

  /* ================= LAYER 2 — WEB (desktop/browser) ============= */
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
      if (i < chunks.length - 1) {
        speakChunk(i + 1);
      } else {
        stopSpeak();
        opts.onEnd?.();
      }
    };

    synth.speak(utter);
  };

  speakChunk(0);
  return "web";
}
