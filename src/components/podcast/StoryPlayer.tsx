"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Gauge, Check, X, Trophy, RotateCcw } from "lucide-react";
import type { Story } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTTS } from "@/hooks/useTTS";
import { cn, toPersianDigits } from "@/lib/utils";

type VoiceGender = "female" | "male";

interface StoryPlayerProps {
  story: Story;
}

/**
 * Interactive audio story player.
 *
 * Features:
 *  - TTS narrates sentence-by-sentence; the active line is highlighted
 *    (live synchronized transcript).
 *  - Voice gender toggle (female/male) + accent toggle (US/UK).
 *  - Playback speed control (0.75 / 1.0 / 1.25).
 *  - Comprehension quiz at the end (3 questions).
 *
 * All English text is in isolated `dir="ltr"` containers so mixed Persian
 * narration labels and English sentences never tangle.
 */
export function StoryPlayer({ story }: StoryPlayerProps) {
  const [index, setIndex] = useState(0);          // current line
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [accent, setAccent] = useState<"us" | "uk">("us");
  const [voiceGender, setVoiceGender] = useState<VoiceGender>("female");
  const [showQuiz, setShowQuiz] = useState(false);

  const total = story.lines.length;

  // Voice gender + accent drive the TTS engine to pick a matching system voice.
  const tts = useTTS({
    lang: accent === "us" ? "en-US" : "en-GB",
    rate: speed,
    voiceGender,
  });

  /* --- playback logic --- */
  const playFrom = (i: number) => {
    setIndex(i);
    setPlaying(true);
  };

  // When playing & index changes, speak that line. When we've gone past the
  // last line, transition to the quiz. This is a genuine state-machine
  // synchronization (React → external TTS), so setState in the effect is
  // intentional and required.
  useEffect(() => {
    if (!playing) return;
    if (index >= total) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
       
      setShowQuiz(true);
      return;
    }
    tts.speak(story.lines[index].en);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, playing]);

  // Watch for TTS end to advance to next line.
  const prevSpeaking = useRef(false);
  useEffect(() => {
    if (prevSpeaking.current && !tts.isSpeaking && playing) {
      // TTS just finished a line → go next
       
      setIndex((i) => i + 1);
    }
    prevSpeaking.current = tts.isSpeaking;
  }, [tts.isSpeaking, playing]);

  const togglePlay = () => {
    if (showQuiz) return;
    if (playing) {
      tts.cancel();
      setPlaying(false);
    } else {
      playFrom(index);
    }
  };

  const stop = () => {
    tts.cancel();
    setPlaying(false);
  };

  const restart = () => {
    stop();
    setShowQuiz(false);
    setIndex(0);
  };

  /* --- render --- */
  if (showQuiz) {
    return <StoryQuiz story={story} onRestart={restart} />;
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan-500 text-4xl shadow-xl shadow-brand/30"
        >
          {story.emoji}
        </motion.div>
        <h1 className="text-xl font-extrabold">{story.title}</h1>
        <p className="mt-1 text-xs text-muted-foreground">{story.description}</p>
      </div>

      {/* Controls toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        {/* Voice gender */}
        <button
          onClick={() => setVoiceGender(voiceGender === "female" ? "male" : "female")}
          className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
        >
          {voiceGender === "female" ? "👩 Female" : "👨 Male"}
        </button>
        {/* Accent */}
        <button
          onClick={() => setAccent(accent === "us" ? "uk" : "us")}
          className="rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
        >
          {accent === "us" ? "🇺🇸 US" : "🇬🇧 UK"}
        </button>
        {/* Speed */}
        <button
          onClick={() => {
            const next = speed >= 1.2 ? 0.75 : speed >= 0.95 ? 1.25 : 1.0;
            setSpeed(next);
          }}
          className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
        >
          <Gauge className="size-3.5" />
          {speed.toFixed(2)}×
        </button>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand to-cyan-400"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </div>
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
          جمله‌ی {toPersianDigits(Math.min(index + 1, total))} از {toPersianDigits(total)}
        </p>
      </div>

      {/* Live transcript — English isolated in LTR, Persian translation below */}
      <div className="flex-1 space-y-3">
        {story.lines.map((l, i) => {
          const isActive = i === index;
          const isPast = i < index;
          return (
            <motion.button
              key={i}
              onClick={() => playFrom(i)}
              className={cn(
                "block w-full rounded-2xl border p-4 text-left transition-all",
                isActive
                  ? "border-brand bg-brand-muted/30 shadow-lg"
                  : isPast
                    ? "border-transparent bg-white/5 opacity-60"
                    : "border-border bg-white/5 hover:border-brand/30"
              )}
            >
              {/* English line — fully isolated LTR */}
              <div dir="ltr" className={cn("font-sans text-base", isActive && "font-bold text-brand")}>
                {l.en}
              </div>
              {/* Persian translation */}
              <p className="mt-1.5 text-xs text-muted-foreground">{l.fa}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Player controls */}
      <div className="sticky bottom-4 mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => playFrom(Math.max(0, index - 1))}
          disabled={index === 0}
          className="flex size-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
          aria-label="قبلی"
        >
          <SkipForward className="size-5" />
        </button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-xl shadow-brand/40"
          aria-label={playing ? "توقف" : "پخش"}
        >
          {playing ? <Pause className="size-7" /> : <Play className="size-7 translate-x-0.5" />}
        </motion.button>
        <button
          onClick={() => playFrom(Math.min(total - 1, index + 1))}
          disabled={index >= total - 1}
          className="flex size-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
          aria-label="بعدی"
        >
          <SkipBack className="size-5" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Comprehension quiz                                                         */
/* -------------------------------------------------------------------------- */

function StoryQuiz({ story, onRestart }: { story: Story; onRestart: () => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = story.quiz.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );
  const allAnswered = story.quiz.every((q) => answers[q.id] !== undefined);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-4 text-center text-5xl"
      >
        {submitted ? (score >= 2 ? "🎉" : "💪") : "📝"}
      </motion.div>
      <h2 className="mb-6 text-center text-xl font-bold">
        {submitted ? (score >= 2 ? "آفرین! داستان رو خوب فهمیدی!" : "تلاش خوبی بود!") : "حالا ببینم چقدر یاد گرفتی!"}
      </h2>

      <div className="flex-1 space-y-4">
        {story.quiz.map((q, qi) => (
          <GlassCard key={q.id} className="p-5">
            <p className="mb-3 text-sm font-semibold">
              {toPersianDigits(qi + 1)}. {q.prompt}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const picked = answers[q.id] === oi;
                const isCorrect = oi === q.correctIndex;
                const showResult = submitted;
                return (
                  <button
                    key={oi}
                    disabled={showResult}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-all",
                      !showResult && picked && "border-brand bg-brand-muted/30",
                      !showResult && !picked && "border-border hover:border-brand/40",
                      showResult && isCorrect && "border-emerald-500 bg-emerald-500/10",
                      showResult && picked && !isCorrect && "border-red-500 bg-red-500/10",
                      showResult && !isCorrect && !picked && "opacity-50"
                    )}
                    dir="auto"
                  >
                    {opt}
                    {showResult && isCorrect && <Check className="size-4 text-emerald-500" />}
                    {showResult && picked && !isCorrect && <X className="size-4 text-red-500" />}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-2 text-xs text-muted-foreground">{q.explain}</p>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6">
        {submitted ? (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-sm"
            >
              <RotateCcw className="size-4" />
              دوباره
            </button>
            <button
              onClick={onRestart}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-medium text-brand-foreground"
            >
              <Trophy className="size-4" />
              گوش دوباره
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="w-full rounded-full bg-brand py-3 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 disabled:opacity-40"
          >
            ببینم چقدر گرفتی!
          </button>
        )}
      </div>
    </div>
  );
}
