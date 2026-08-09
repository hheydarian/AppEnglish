"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Lightbulb,
  AlertCircle,
  Sparkles,
  Volume2,
} from "lucide-react";
import type { Feedback } from "@/types";
import { cn } from "@/lib/utils";

interface FeedbackInlineProps {
  feedback: Feedback[];
  /** When true, TTS will be invoked for the suggestion on click. */
  onSpeak?: (text: string) => void;
}

/* Style map per severity. */
const SEVERITY_STYLE: Record<
  Feedback["severity"],
  { box: string; icon: typeof Check; label: string }
> = {
  correction: {
    box: "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30",
    icon: AlertCircle,
    label: "اصلاح",
  },
  suggestion: {
    box:
      "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30",
    icon: Lightbulb,
    label: "پیشنهاد",
  },
  info: {
    box:
      "border-sky-200 bg-sky-50 dark:border-sky-900/50 dark:bg-sky-950/30",
    icon: Sparkles,
    label: "نکته",
  },
};

/** Short Persian label per feedback type. */
const TYPE_LABEL: Record<Feedback["type"], string> = {
  grammar: "گرامر",
  vocabulary: "واژگان",
  pronunciation: "تلفظ",
  idiom: "اصطلاح",
  style: "سبک",
};

/**
 * Non-intrusive teaching panel shown beneath a user message.
 * Lists each feedback item with original → suggestion and a Persian explanation.
 */
export function FeedbackInline({ feedback, onSpeak }: FeedbackInlineProps) {
  if (!feedback || feedback.length === 0) return null;

  return (
    <div className="mt-2 space-y-2" dir="rtl">
      <AnimatePresence initial={false}>
        {feedback.map((item, index) => {
          const style = SEVERITY_STYLE[item.severity];
          const Icon = style.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.06 }}
              className={cn(
                "rounded-xl border p-3 text-sm",
                style.box
              )}
            >
              {/* Header: type + severity */}
              <div className="mb-2 flex items-center gap-2">
                <Icon className="size-4 shrink-0 text-foreground/70" />
                <span className="rounded-full bg-white/60 px-2 py-0.5 text-[11px] font-medium dark:bg-black/30">
                  {TYPE_LABEL[item.type]}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {style.label}
                </span>
              </div>

              {/* Correction comparison */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                <span className="text-foreground/60 line-through decoration-red-400/70">
                  {item.original}
                </span>
                <span className="text-muted-foreground">←</span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  {item.suggestion}
                </span>
                {onSpeak && (
                  <button
                    type="button"
                    onClick={() => onSpeak(item.suggestion)}
                    className="ms-auto rounded-full p-1 text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
                    aria-label="پخش تلفظ"
                  >
                    <Volume2 className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Explanation */}
              {item.explanation && (
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {item.explanation}
                </p>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
