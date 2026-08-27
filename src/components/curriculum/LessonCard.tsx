"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Lesson } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { useLessonStore } from "@/store/lessonStore";
import { cn, toPersianDigits } from "@/lib/utils";

/** Accent → tailwind classes (kept as static strings so JIT keeps them). */
const ACCENT: Record<string, { tile: string; ring: string; text: string }> = {
  sky:     { tile: "from-sky-500/30 to-sky-600/10",     ring: "group-hover:ring-sky-400/40",     text: "text-sky-300" },
  emerald: { tile: "from-emerald-500/30 to-emerald-600/10", ring: "group-hover:ring-emerald-400/40", text: "text-emerald-300" },
  amber:   { tile: "from-amber-500/30 to-amber-600/10", ring: "group-hover:ring-amber-400/40",   text: "text-amber-300" },
  violet:  { tile: "from-violet-500/30 to-violet-600/10", ring: "group-hover:ring-violet-400/40", text: "text-violet-300" },
  rose:    { tile: "from-rose-500/30 to-rose-600/10",   ring: "group-hover:ring-rose-400/40",    text: "text-rose-300" },
  cyan:    { tile: "from-cyan-500/30 to-cyan-600/10",   ring: "group-hover:ring-cyan-400/40",    text: "text-cyan-300" },
};

interface LessonCardProps {
  lesson: Lesson;
  accent: keyof typeof ACCENT;
  index?: number;
}

/**
 * LessonCard — a single node in the learning tree.
 *
 * - Roleplay lessons → /chat/[scenarioId]  (live AI conversation).
 * - Non-roleplay lessons → /lesson/[id]    (the 4-step interactive flow).
 * - Locked lessons render non-interactive.
 * - Completed lessons show a green check badge.
 */
export function LessonCard({ lesson, accent, index = 0 }: LessonCardProps) {
  const a = ACCENT[accent] ?? ACCENT.cyan;
  const isCompleted = useLessonStore((s) => s.completedLessons.includes(lesson.id));

  const href = lesson.locked
    ? undefined
    : lesson.type === "roleplay" && lesson.scenarioId
      ? `/chat/${lesson.scenarioId}`
      : `/lesson/${lesson.id}`;

  const inner = (
    <GlassCard
      inView
      lift={6}
      role={lesson.locked ? undefined : "button"}
      aria-disabled={lesson.locked}
      tabIndex={lesson.locked ? -1 : 0}
      className={cn(
        // gpu-layer: Android WebView keeps each card on its own compositor
        // layer → hover/entrance animations stay 60fps in long lists.
        "gpu-layer h-full p-5 ring-1 ring-transparent transition-all",
        !lesson.locked && "cursor-pointer",
        a.ring
      )}
    >
      <div className="flex items-start gap-4">
        {/* 3D-feeling icon tile */}
        <motion.div
          initial={{ scale: 0.8, rotate: -6 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
            a.tile
          )}
        >
          <Icon name={lesson.icon} className={cn("size-6", a.text)} />
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-bold">{lesson.title}</h3>
            {lesson.type === "roleplay" && (
              <span className="rounded-full bg-brand-muted px-2 py-0.5 text-[10px] font-semibold text-brand">
                مکالمه زنده
              </span>
            )}
            {isCompleted && (
              <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                <CheckCircle2 className="size-3" />
                انجام شد
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {lesson.description}
          </p>

          <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {toPersianDigits(lesson.estimatedMinutes)} دقیقه
            </span>
            {!lesson.locked && (
              <span className={cn("flex items-center gap-1 font-medium", a.text)}>
                شروع کن
                <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
              </span>
            )}
          </div>
        </div>

        {lesson.locked && (
          <Lock className="size-4 shrink-0 text-muted-foreground/60" />
        )}
      </div>
    </GlassCard>
  );

  if (lesson.locked || !href) return inner;

  return (
    <Link href={href} className="block focus-visible:outline-none">
      {inner}
    </Link>
  );
}
