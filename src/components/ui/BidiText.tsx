import { Fragment, type ReactNode } from "react";

interface BidiTextProps {
  /** Plain text that may mix Persian (RTL) and English (LTR) runs. */
  children: string;
  className?: string;
}

/**
 * Render mixed-direction text correctly by wrapping each English/Latin run
 * in a <bdi dir="ltr"> so punctuation and word order don't break.
 *
 * Use this anywhere a data string may contain both Persian and English
 * (grammar explanations, quiz explanations, feedback copy). For purely
 * English or purely Persian strings, a plain <p> is fine.
 *
 * Detection heuristic: a run is treated as LTR if it starts with a Latin
 * letter or digit. Everything else stays RTL. This is deliberately simple —
 * it covers our lesson-content cases robustly without a full bidi engine.
 */
export function BidiText({ children, className }: BidiTextProps): ReactNode {
  // Split into tokens: consecutive Latin/digit/punctuation runs vs the rest.
  // We keep the separators so nothing is dropped.
  const parts = children.split(/([A-Za-z][A-Za-z\s.,!?'"`/()0-9-]*[A-Za-z0-9]|[A-Za-z0-9])/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part) return null;
        // A "latin run" is one that starts with a letter/digit (the regex
        // captures those). We detect via the first character.
        const isLatin = /^[A-Za-z0-9"'(`]/.test(part);
        return isLatin ? (
          <bdi key={i} dir="ltr" className="inline-block font-sans">
            {part}
          </bdi>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </span>
  );
}
