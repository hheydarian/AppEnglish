/**
 * Normalize text before sending it to the speech synthesizer so that:
 *  - Paired letter forms like "A a", "Bb" are spoken as two separate letters
 *    with a natural pause ("A ... a") instead of gluing into a slur.
 *  - Sequences of single capital letters ("A E I O U") get commas between them.
 *
 * Extracted from useTTS for reuse by the robust engine layer.
 */
export function prepareForSpeech(text: string): string {
  let out = text.trim();
  if (!out) return out;

  // 1) "A a" / "A  a" → "A, a"
  out = out.replace(/([A-Z])\s+([a-z])/g, "$1, $2");
  // 2) "Bb" → "B, b"
  out = out.replace(/([A-Z])([a-z])(?![a-z])/g, "$1, $2");
  // 3) "A E I O U" → "A, E, I, O, U"
  out = out.replace(/([A-Z])(\s+)(?=[A-Z](?:\s|$))/g, "$1,$2");
  // 4) Collapse artifacts.
  out = out.replace(/,\s*,/g, ",").replace(/\s+/g, " ").trim();

  return out;
}
