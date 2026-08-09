"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen, Volume2, MessageSquareQuote, Palette } from "lucide-react";
import type { FeedbackType } from "@/types";
import { toPersianDigits, cn } from "@/lib/utils";

interface FeedbackBreakdownProps {
  counts: Record<FeedbackType, number>;
}

/* Per-type visual config: icon + label + bar color. */
const CONFIG: Record<
  FeedbackType,
  { label: string; icon: typeof Sparkles; color: string }
> = {
  grammar: { label: "گرامر", icon: BookOpen, color: "bg-rose-500" },
  vocabulary: { label: "واژگان", icon: BookOpen, color: "bg-sky-500" },
  pronunciation: { label: "تلفظ", icon: Volume2, color: "bg-violet-500" },
  idiom: { label: "اصطلاح", icon: MessageSquareQuote, color: "bg-amber-500" },
  style: { label: "سبک", icon: Palette, color: "bg-emerald-500" },
};

const ORDER: FeedbackType[] = [
  "grammar",
  "vocabulary",
  "pronunciation",
  "idiom",
  "style",
];

/**
 * Horizontal bar chart breaking down the feedback the learner has received,
 * by type. Helps surface which skill needs the most work.
 */
export function FeedbackBreakdown({ counts }: FeedbackBreakdownProps) {
  const max = Math.max(1, ...ORDER.map((t) => counts[t] ?? 0));

  return (
    <div className="space-y-3" dir="rtl">
      {ORDER.map((type) => {
        const value = counts[type] ?? 0;
        const cfg = CONFIG[type];
        const Icon = cfg.icon;
        const pct = Math.round((value / max) * 100);

        return (
          <div key={type} className="flex items-center gap-3">
            <div className="flex w-20 shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Icon className="size-3.5" />
              {cfg.label}
            </div>
            <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className={cn("h-full rounded-full", cfg.color)}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="w-6 shrink-0 text-left text-xs font-semibold tabular-nums">
              {toPersianDigits(value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
