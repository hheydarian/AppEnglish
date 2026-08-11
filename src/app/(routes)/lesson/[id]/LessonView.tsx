"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";
import type { LessonStep } from "@/types";
import { getLessonById, getLessonContent } from "@/data/curriculum";
import { useLessonStore } from "@/store/lessonStore";
import { useUserStore } from "@/store/userStore";
import { VocabStep, GrammarStep, QuizStep, PracticeStep } from "@/components/lesson";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const STEPS: { key: LessonStep; label: string; emoji: string }[] = [
  { key: "vocab", label: "واژگان", emoji: "🔤" },
  { key: "grammar", label: "گرامر", emoji: "📖" },
  { key: "quiz", label: "تمرین", emoji: "✏️" },
  { key: "practice", label: "مکالمه", emoji: "🎙️" },
];

export function LessonView({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const lesson = useMemo(() => getLessonById(lessonId), [lessonId]);
  const content = useMemo(() => getLessonContent(lessonId), [lessonId]);

  const [step, setStep] = useState(0);
  const completeLesson = useLessonStore((s) => s.completeLesson);
  const saveStep = useLessonStore((s) => s.saveStep);
  const recordTurn = useUserStore((s) => s.recordTurn);

  // Persist the current step so a refresh resumes where they left off.
  useEffect(() => {
    if (lesson) saveStep(lessonId, step, STEPS.length);
  }, [step, lessonId, lesson, saveStep]);

  // Not-found or roleplay lesson (has no interactive content) → bounce home.
  if (!lesson || !content) {
    return (
      <div className="app-container flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg font-semibold">این درس هنوز آماده نشده! 🚧</p>
        <button
          onClick={() => router.push("/")}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground"
        >
          بازگشت به خانه
        </button>
      </div>
    );
  }

  const goNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else finish();
  };

  const finish = () => {
    completeLesson(lessonId);
    // Award some user-store points for finishing a lesson.
    recordTurn({
      scenarioId: lessonId,
      messagesCount: 1,
      feedback: [],
      practiceMinutes: lesson.estimatedMinutes,
    });
    router.push("/");
  };

  const current = STEPS[step];
  const accentIcon = (
    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-cyan-500 text-white shadow-lg">
      <Icon name={lesson.icon} className="size-5" />
    </span>
  );

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-6 sm:px-6">
      {/* Header */}
      <header className="mb-6 flex items-center gap-3">
        <button
          onClick={() => router.push("/")}
          className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          aria-label="بستن"
        >
          <X className="size-5" />
        </button>
        {accentIcon}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-bold">{lesson.title}</h1>
          <p className="text-xs text-muted-foreground">{current.label}</p>
        </div>
      </header>

      {/* Step progress bar */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex flex-1 items-center">
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                i < step && "bg-brand text-brand-foreground",
                i === step && "bg-brand text-brand-foreground ring-4 ring-brand-muted",
                i > step && "bg-muted text-muted-foreground"
              )}
            >
              {i < step ? <Check className="size-4" /> : <span>{s.emoji}</span>}
            </button>
            {i < STEPS.length - 1 && (
              <div className="mx-1 h-0.5 flex-1 rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-brand"
                  initial={{ width: 0 }}
                  animate={{ width: i < step ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <main className="flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            {step === 0 && <VocabStep cards={content.vocabulary} onDone={goNext} />}
            {step === 1 && <GrammarStep grammar={content.grammar} onDone={goNext} />}
            {step === 2 && <QuizStep questions={content.quiz} onDone={goNext} />}
            {step === 3 && (
              <PracticeStep
                content={content}
                lessonTitle={lesson.title}
                lessonId={lessonId}
                onFinish={finish}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Skip-forward hint */}
      {step < STEPS.length - 1 && (
        <button
          onClick={goNext}
          className="mx-auto mt-8 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          رد کردن این بخش
          <ArrowRight className="size-3" />
        </button>
      )}
    </div>
  );
}
