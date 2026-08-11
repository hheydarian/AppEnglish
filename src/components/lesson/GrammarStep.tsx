"use client";

import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Check } from "lucide-react";
import type { GrammarByte } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { BidiText } from "@/components/ui/BidiText";
import { Button } from "@/components/ui/button";

interface GrammarStepProps {
  grammar: GrammarByte;
  onDone: () => void;
}

/**
 * Step 2 — A friendly one-line grammar explanation with examples.
 * Designed to feel like a quick, encouraging "aha!" moment.
 */
export function GrammarStep({ grammar, onDone }: GrammarStepProps) {
  return (
    <div className="flex flex-col items-center">
      <GlassCard className="w-full max-w-md p-6">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
            <Lightbulb className="size-5" />
          </span>
          <h3 className="font-bold">نکته‌ی گرامری</h3>
        </div>

        {/* The rule — isolated LTR container so punctuation never jumps */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-gradient-to-br from-brand/20 to-cyan-500/10 p-4"
        >
          <div dir="ltr" className="text-center font-sans text-xl font-extrabold">
            {grammar.rule}
          </div>
        </motion.div>

        {/* Persian explanation */}
        <p className="mt-4 text-sm leading-relaxed text-foreground/90">
          <BidiText>{grammar.explanation}</BidiText>
        </p>

        {/* Examples — each in its own isolated LTR block */}
        <div className="mt-4 space-y-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <BookOpen className="size-3.5" />
            مثال‌ها:
          </p>
          {grammar.examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              dir="ltr"
              className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-left font-sans text-sm"
            >
              <Check className="size-4 shrink-0 text-emerald-400" />
              {ex}
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <Button
        onClick={onDone}
        className="mt-6 w-full max-w-md rounded-full bg-brand py-3 text-brand-foreground shadow-lg shadow-brand/30"
      >
        بریم تمرین! ✏️
      </Button>
    </div>
  );
}
