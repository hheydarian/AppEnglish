"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import type { VocabCard } from "@/types";
import { useTTS } from "@/hooks/useTTS";
import { useSettingsStore } from "@/store/settingsStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { toPersianDigits } from "@/lib/utils";
import { tap } from "@/lib/feedback";

interface VocabStepProps {
  cards: VocabCard[];
  onDone: () => void;
}

/**
 * Step 1 — Vocabulary flashcards with TTS pronunciation.
 * Swipe/click through cards; each plays its English term aloud on demand.
 */
export function VocabStep({ cards, onDone }: VocabStepProps) {
  const [index, setIndex] = useState(0);
  // Global Settings: narrator voice + optional Persian "challenge mode".
  const settingsVoice = useSettingsStore((s) => s.voiceGender);
  const settingsAccent = useSettingsStore((s) => s.accent);
  const settingsShowFa = useSettingsStore((s) => s.showPersianTranslation);
  const tts = useTTS({
    lang: settingsAccent === "uk" ? "en-GB" : settingsAccent === "au" ? "en-AU" : "en-US",
    rate: 0.85,
    voiceGender: settingsVoice,
  });
  // In challenge mode the Persian meaning is hidden until the learner taps.
  const [revealed, setRevealed] = useState(false);

  const card = cards[index];
  const isLast = index === cards.length - 1;

  const next = () => {
    setRevealed(false);
    tap();
    if (isLast) {
      onDone();
    } else {
      setIndex((i) => i + 1);
    }
  };
  const prev = () => {
    setRevealed(false);
    setIndex((i) => Math.max(0, i - 1));
  };

  const speak = () => tts.speak(card.term);

  // Auto-play pronunciation when the card changes.
  const progressPct = Math.round(((index + 1) / cards.length) * 100);

  return (
    <div className="flex flex-col items-center">
      {/* Linear progress bar — scales to any card count (1 to 26+) */}
      <div className="mb-4 w-full max-w-sm">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
          کارت {toPersianDigits(index + 1)} از {toPersianDigits(cards.length)}
        </p>
      </div>

      <div className="relative w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <GlassCard className="p-8 text-center">
              {/* Emoji */}
              <motion.div
                className="mb-4 text-6xl"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                {card.emoji ?? "🔤"}
              </motion.div>

              {/* Term */}
              <button
                onClick={speak}
                className="group inline-flex items-center gap-2 text-3xl font-extrabold"
                dir="ltr"
              >
                {card.term}
                <Volume2 className="size-5 text-brand opacity-60 transition-opacity group-hover:opacity-100" />
              </button>

              {/* Phonetic */}
              {card.phonetic && (
                <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                  /{card.phonetic}/
                </p>
              )}

              {/* Persian meaning — hidden in challenge mode until tapped */}
              {settingsShowFa || revealed ? (
                <p className="mt-3 text-lg font-medium text-brand">{card.meaning}</p>
              ) : (
                <button
                  onClick={() => {
                    setRevealed(true);
                    tap();
                  }}
                  className="mt-3 rounded-full border border-brand/30 bg-brand-muted/30 px-4 py-1.5 text-xs font-semibold text-brand"
                >
                  نمایش معنی 👁
                </button>
              )}

              {/* Example */}
              <p
                className="mt-4 rounded-xl bg-white/5 px-4 py-2 text-sm text-muted-foreground"
                dir="ltr"
              >
                💬 {card.example}
              </p>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="mt-6 flex w-full max-w-sm items-center justify-between">
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
          aria-label="قبلی"
        >
          <ChevronRight className="size-5" />
        </button>
        <button
          onClick={speak}
          className="flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-muted/40 px-3 py-1.5 text-xs font-medium text-brand transition-colors hover:bg-brand-muted/70"
          aria-label="پخش تلفظ"
        >
          <Volume2 className="size-3.5" />
          بشنو
        </button>
        <button
          onClick={next}
          className="flex size-11 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-105"
          aria-label={isLast ? "تمام" : "بعدی"}
        >
          <ChevronLeft className="size-5" />
        </button>
      </div>
    </div>
  );
}
