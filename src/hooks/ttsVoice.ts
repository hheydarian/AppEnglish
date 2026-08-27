/**
 * Voice picker — match a system voice by gender + language prefix.
 * Used by useTTS to prime the RobustTTS engine cache; the engine also
 * re-resolves from its own warmed list at speak time.
 */

const FEMALE_HINTS = [
  "female", "samantha", "victoria", "zira", "karen", "moira", "tessa",
  "serena", "fiona", "susan", "google us english", "google uk english female",
  "aria", "jenny", "michelle",
];
const MALE_HINTS = [
  "male", "daniel", "alex", "arthur", "oliver", "rishi", "fred", "tom",
  "david", "george", "mark", "google uk english male",
];

export function pickVoiceByGender(
  lang: string,
  gender: "female" | "male"
): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const langPrefix = lang.slice(0, 2).toLowerCase();
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
  const pool = langVoices.length > 0 ? langVoices : voices;

  const hints = gender === "female" ? FEMALE_HINTS : MALE_HINTS;
  const match = pool.find((v) =>
    hints.some((h) => v.name.toLowerCase().includes(h))
  );
  return match ?? pool[0] ?? null;
}
