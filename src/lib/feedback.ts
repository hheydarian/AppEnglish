import { useSettingsStore } from "@/store/settingsStore";

/**
 * Lightweight UI feedback — a WebAudio "tick"/"success chime" plus optional
 * haptic vibration. Fully gated by the Settings toggle (feedbackEnabled),
 * so calls are safe to sprinkle anywhere without checks at call sites.
 */

let audioCtx: AudioContext | null = null;

function beep(freq: number, duration = 0.07, gain = 0.035) {
  if (typeof window === "undefined") return;
  try {
    audioCtx ??= new AudioContext();
    if (audioCtx.state === "suspended") void audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g).connect(audioCtx.destination);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // AudioContext unavailable (e.g. blocked) — silently ignore.
  }
}

function enabled(): boolean {
  return useSettingsStore.getState().feedbackEnabled;
}

/** Short click tick — buttons, chips, word picks. */
export function tap() {
  if (!enabled()) return;
  beep(440, 0.045, 0.025);
  navigator.vibrate?.(6);
}

/** Rising three-note chime — correct answers, completed quizzes. */
export function success() {
  if (!enabled()) return;
  beep(523.25, 0.09);
  setTimeout(() => beep(659.25, 0.09), 90);
  setTimeout(() => beep(783.99, 0.14), 180);
  navigator.vibrate?.(14);
}

/** Low buzz — wrong answers (subtle, never harsh). */
export function error() {
  if (!enabled()) return;
  beep(196, 0.12, 0.03);
  navigator.vibrate?.(10);
}
