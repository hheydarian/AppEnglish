"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Trophy, RotateCcw } from "lucide-react";
import type { QuizQuestion } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { BidiText } from "@/components/ui/BidiText";
import { Button } from "@/components/ui/button";
import { cn, toPersianDigits, normalizeText } from "@/lib/utils";

interface QuizStepProps {
  questions: QuizQuestion[];
  onDone: () => void;
}

export function QuizStep({ questions, onDone }: QuizStepProps) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">سوالی برای این درس نیست.</p>
        <Button onClick={onDone} className="mt-4 rounded-full bg-brand text-brand-foreground">
          بزن بریم
        </Button>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-4 text-6xl"
        >
          {pct >= 70 ? "🎉" : pct >= 40 ? "💪" : "📚"}
        </motion.div>
        <GlassCard className="w-full max-w-md p-6 text-center">
          <h3 className="text-xl font-bold">
            {pct >= 70 ? "عالی بود!" : pct >= 40 ? "خوب بود!" : "دوباره تلاش کن!"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {toPersianDigits(score)} از {toPersianDigits(questions.length)} درست
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              onClick={() => {
                setIndex(0);
                setScore(0);
                setFinished(false);
              }}
              variant="outline"
              className="rounded-full"
            >
              <RotateCcw className="size-4" />
              دوباره
            </Button>
            <Button
              onClick={onDone}
              className="rounded-full bg-brand text-brand-foreground"
            >
              <Trophy className="size-4" />
              ادامه
            </Button>
          </div>
        </GlassCard>
      </div>
    );
  }

  const q = questions[index];
  const onNext = () => {
    if (index < questions.length - 1) setIndex((i) => i + 1);
    else setFinished(true);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-3 w-full max-w-md text-xs text-muted-foreground">
        سوال {toPersianDigits(index + 1)} از {toPersianDigits(questions.length)} · امتیاز: {toPersianDigits(score)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-md"
        >
          {q.kind === "multiple-choice" ? (
            <MultipleChoice q={q} onResult={(ok) => ok && setScore((s) => s + 1)} onNext={onNext} />
          ) : (
            <WordOrder q={q} onResult={(ok) => ok && setScore((s) => s + 1)} onNext={onNext} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---- Multiple choice ---- */
function MultipleChoice({
  q,
  onResult,
  onNext,
}: {
  q: QuizQuestion;
  onResult: (ok: boolean) => void;
  onNext: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === q.correctIndex;

  return (
    <GlassCard className="p-6">
      <p className="text-center font-semibold">{q.prompt}</p>
      {q.englishHint && (
        <p className="mt-1 text-center text-xs text-muted-foreground" dir="ltr">
          {q.englishHint}
        </p>
      )}
      <div className="mt-4 space-y-2">
        {q.options?.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isPicked = i === picked;
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => {
                setPicked(i);
                onResult(isCorrect);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all",
                !answered && "border-border hover:border-brand/50 hover:bg-brand-muted/30",
                answered && isCorrect && "border-emerald-500 bg-emerald-500/10",
                answered && isPicked && !isCorrect && "border-red-500 bg-red-500/10",
                answered && !isCorrect && !isPicked && "opacity-50"
              )}
              dir="ltr"
            >
              {opt}
              {answered && isCorrect && <Check className="size-4 text-emerald-500" />}
              {answered && isPicked && !isCorrect && <X className="size-4 text-red-500" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          <p className={cn("mb-3 text-sm", correct ? "text-emerald-400" : "text-red-400")}>
            {correct ? "آفرین! ✅" : "اشکالی نداره! 💪"}
          </p>
          <p className="mb-4 text-xs text-muted-foreground">
            <BidiText>{q.explain}</BidiText>
          </p>
          <Button onClick={onNext} className="w-full rounded-full bg-brand text-brand-foreground">
            {q.id === "last" ? "تمام" : "بعدی"}
          </Button>
        </motion.div>
      )}
    </GlassCard>
  );
}

/* ---- Word order ---- */
function WordOrder({
  q,
  onResult,
  onNext,
}: {
  q: QuizQuestion;
  onResult: (ok: boolean) => void;
  onNext: () => void;
}) {
  const [bank, setBank] = useState<string[]>(() => shuffle(q.words ?? []));
  const [picked, setPicked] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Normalize both sides before comparing so punctuation, case, and extra
  // whitespace never mark a correct answer wrong.
  const correct =
    normalizeText(picked.join(" ")) === normalizeText(q.correctSentence ?? "");

  const pick = (i: number) => {
    if (submitted) return;
    const word = bank[i];
    setBank((b) => b.filter((_, idx) => idx !== i));
    setPicked((p) => [...p, word]);
  };
  const unpick = (i: number) => {
    if (submitted) return;
    const word = picked[i];
    setPicked((p) => p.filter((_, idx) => idx !== i));
    setBank((b) => [...b, word]);
  };

  return (
    <GlassCard className="p-6">
      <p className="text-center font-semibold">{q.prompt}</p>

      {/* Answer slot */}
      <div className="mt-4 min-h-[3.5rem] rounded-xl border-2 border-dashed border-brand/30 bg-brand-muted/10 p-3">
        <div className="flex flex-wrap gap-2" dir="ltr">
          {picked.length === 0 && (
            <span className="text-sm text-muted-foreground">کلمه‌ها رو بزن...</span>
          )}
          {picked.map((w, i) => (
            <motion.button
              key={`${w}-${i}`}
              layout
              onClick={() => unpick(i)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium",
                submitted
                  ? correct
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-red-500/20 text-red-300"
                  : "bg-brand text-brand-foreground"
              )}
            >
              {w}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Word bank */}
      <div className="mt-3 flex flex-wrap gap-2" dir="ltr">
        {bank.map((w, i) => (
          <motion.button
            key={`${w}-${i}`}
            layout
            onClick={() => pick(i)}
            className="rounded-lg border border-border bg-white/5 px-3 py-1.5 text-sm transition-colors hover:bg-muted"
          >
            {w}
          </motion.button>
        ))}
      </div>

      {submitted ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          <p className={cn("mb-2 text-sm", correct ? "text-emerald-400" : "text-red-400")}>
            {correct ? "آفرین! ✅" : "نزدیک بود! جواب درست:"}{" "}
            {!correct && <span dir="ltr">{q.correctSentence}</span>}
          </p>
          <p className="mb-4 text-xs text-muted-foreground">
            <BidiText>{q.explain}</BidiText>
          </p>
          <Button onClick={onNext} className="w-full rounded-full bg-brand text-brand-foreground">
            بعدی
          </Button>
        </motion.div>
      ) : (
        <Button
          onClick={() => {
            setSubmitted(true);
            onResult(correct);
          }}
          disabled={bank.length > 0}
          className="mt-4 w-full rounded-full bg-brand text-brand-foreground disabled:opacity-40"
        >
          بررسی جواب
        </Button>
      )}
    </GlassCard>
  );
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
