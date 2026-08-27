"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Timer,
  Headphones,
  BookOpen,
  ListOrdered,
  Mic,
  Award,
  Play,
  Share2,
  Check,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { MASTERY_EXAM, EXAM_OBJECTIVE_POINTS } from "@/data/exam-content";
import type { ExamQuestion } from "@/types";
import { cefrFromScore } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTTS } from "@/hooks/useTTS";
import { cn, toPersianDigits, normalizeText } from "@/lib/utils";
import { tap, success } from "@/lib/feedback";
import { useSettingsStore } from "@/store/settingsStore";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function fmtTime(total: number): string {
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/** Deterministic symbolic QR-like grid from a seed string (decorative). */
function SymbolicQR({ seed }: { seed: string }) {
  const cells = useMemo(() => {
    let h = 0;
    for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
    let x = h;
    const out: boolean[] = [];
    for (let i = 0; i < 81; i++) {
      x = (x * 1103515245 + 12345) & 0x7fffffff;
      out.push(((x >> 16) & 1) === 0);
    }
    return out;
  }, [seed]);
  return (
    <div className="grid grid-cols-9 gap-px rounded-md bg-foreground p-1.5" dir="ltr" aria-hidden>
      {cells.map((on, i) => (
        <span key={i} className={cn("size-1.5", on ? "bg-foreground" : "bg-transparent")} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Phase config                                                               */
/* -------------------------------------------------------------------------- */

const STEPS = [
  { label: "شنیداری", emoji: "🎧" },
  { label: "گرامر", emoji: "📖" },
  { label: "جمله‌سازی", emoji: "🧩" },
  { label: "مصاحبه", emoji: "🎙️" },
  { label: "گواهی", emoji: "🏆" },
] as const;

type Phase = "intro" | 1 | 2 | 3 | 4 | "report";

/* -------------------------------------------------------------------------- */
/*  Main view                                                                  */
/* -------------------------------------------------------------------------- */

export function ExamView() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [name, setName] = useState("");
  const [seconds, setSeconds] = useState(0);

  const [lsnAnswers, setLsnAnswers] = useState<Record<string, number>>({});
  const [useAnswers, setUseAnswers] = useState<Record<string, number>>({});
  const [syn, setSyn] = useState<
    Record<string, { picked: number[]; checked: boolean; correct: boolean }>
  >(() =>
    Object.fromEntries(
      MASTERY_EXAM.syntax.map((t) => [t.id, { picked: [] as number[], checked: false, correct: false }])
    )
  );
  const [banks] = useState(() =>
    MASTERY_EXAM.syntax.map((t) => ({ id: t.id, words: shuffle(t.words) }))
  );
  const [oral, setOral] = useState<Record<string, string>>({});

  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [certId, setCertId] = useState<string>("");

  /* TTS engines for the two exam accents — narrator gender follows Settings. */
  const examVoice = useSettingsStore((s) => s.voiceGender);
  const ttsUS = useTTS({ lang: "en-US", rate: 1.0, voiceGender: examVoice });
  const ttsUK = useTTS({ lang: "en-GB", rate: 1.0, voiceGender: examVoice });

  /* Exam timer — starts when the intro is dismissed. */
  const running = phase !== "intro";
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  /* ---------------- scoring ---------------- */
  const scores = useMemo(() => {
    const lsnCorrect = MASTERY_EXAM.listening.reduce(
      (n, t) => n + t.questions.filter((q) => lsnAnswers[q.id] === q.correctIndex).length,
      0
    );
    const useCorrect = MASTERY_EXAM.useOfEnglish.filter(
      (q) => useAnswers[q.id] === q.correctIndex
    ).length;
    const synCorrect = MASTERY_EXAM.syntax.filter((t) => syn[t.id]?.correct).length;
    const oralPts = MASTERY_EXAM.oral.reduce((n, q) => {
      const w = wordCount(oral[q.id] ?? "");
      return n + (w >= 30 ? 3 : w >= 15 ? 2 : w >= 5 ? 1 : 0);
    }, 0);
    const lsnQ = MASTERY_EXAM.listening.reduce((n, t) => n + t.questions.length, 0);
    const objPct = ((lsnCorrect + useCorrect + synCorrect) / EXAM_OBJECTIVE_POINTS) * 100;
    const oralPct = (oralPts / 9) * 100;
    return {
      listening: Math.round((lsnCorrect / lsnQ) * 100),
      useOfEnglish: Math.round((useCorrect / MASTERY_EXAM.useOfEnglish.length) * 100),
      syntax: Math.round((synCorrect / MASTERY_EXAM.syntax.length) * 100),
      oral: Math.round(oralPct),
      total: Math.round(objPct * 0.7 + oralPct * 0.3),
    };
  }, [lsnAnswers, useAnswers, syn, oral]);

  /* ---------------- gating ---------------- */
  const canLeave = (p: Exclude<Phase, "intro" | "report">): boolean => {
    if (p === 1)
      return MASTERY_EXAM.listening.every((t) =>
        t.questions.every((q) => lsnAnswers[q.id] !== undefined)
      );
    if (p === 2)
      return MASTERY_EXAM.useOfEnglish.every((q) => useAnswers[q.id] !== undefined);
    if (p === 3) return MASTERY_EXAM.syntax.every((t) => syn[t.id]?.checked);
    return MASTERY_EXAM.oral.every((q) => wordCount(oral[q.id] ?? "") >= 1);
  };

  const nextFrom = (p: Phase): Phase => {
    if (p === "intro") return 1;
    if (p === 1) return 2;
    if (p === 2) return 3;
    if (p === 3) return 4;
    return "report";
  };

  const goNext = () => {
    const n = nextFrom(phase);
    if (n === "report" && !certId) {
      setCertId(`SPK-${Date.now().toString(36).toUpperCase().slice(-6)}`);
      success();
    } else {
      tap();
    }
    setPhase(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepIndex = phase === "intro" ? 0 : phase === "report" ? 4 : phase;

  /* ======================================================================== */
  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden bg-background pb-12">
      {/* Ambient exam atmosphere */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,var(--brand-muted),transparent_70%)]" />
        <div className="absolute -right-24 top-24 size-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -left-24 bottom-24 size-72 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      {/* Top bar: back + timer + stepper */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
            aria-label="بازگشت"
          >
            <ArrowRight className="size-5" />
          </Link>
          <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-500">
            <Timer className="size-3.5" />
            <span className="tabular-nums" dir="ltr">{fmtTime(seconds)}</span>
          </div>
          {/* Stepper */}
          <div className="flex flex-1 items-center justify-end gap-1.5">
            {STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-[11px] transition-all",
                    i < stepIndex && "bg-brand text-brand-foreground",
                    i === stepIndex && "bg-brand text-brand-foreground ring-4 ring-brand/20",
                    i > stepIndex && "bg-muted text-muted-foreground"
                  )}
                >
                  {i < stepIndex ? <Check className="size-3.5" /> : s.emoji}
                </div>
                {i < STEPS.length - 1 && <div className="mx-0.5 h-0.5 w-3 rounded bg-muted" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pt-6">
        <AnimatePresence mode="wait">
          {/* ================= INTRO ================= */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <GlassCard className="mb-6 p-6 text-center">
                <motion.div
                  initial={{ scale: 0.6, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-xl shadow-amber-500/40"
                >
                  <GraduationCap className="size-10" />
                </motion.div>
                <h1 className="text-2xl font-extrabold">آزمون نهایی استادی 🏆</h1>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  چهار مهارت در استاندارد IELTS/CEFR سنجیده می‌شود: شنیداری با دو لهجه،
                  گرامر و واژگان پیشرفته، جمله‌سازی، و مصاحبه‌ی شفاهی. در پایان گواهی
                  تسلط رسمی می‌گیری!
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                  {STEPS.slice(0, 4).map((s) => (
                    <div key={s.label} className="rounded-xl bg-white/5 p-2.5 text-center">
                      <div className="text-xl">{s.emoji}</div>
                      <div className="mt-1 font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <label className="mb-2 block text-sm font-semibold">
                  اسمت رو برای گواهی وارد کن:
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثلاً: سارا محمدی"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
                />
                <button
                  onClick={goNext}
                  className="mt-4 w-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-[1.01]"
                >
                  شروع آزمون — موفق باشی! ✨
                </button>
              </GlassCard>
            </motion.div>
          )}

          {/* ================= SECTION 1: LISTENING ================= */}
          {phase === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-4">
              <SectionHeader emoji="🎧" title="بخش اول: درک شنیداری" desc="به هر تسک گوش بده (۲ لهجه‌ی US و UK) و به سوالات پاسخ بده." />
              {MASTERY_EXAM.listening.map((task) => {
                const isActive = activeAudio === task.id;
                const playing =
                  isActive && (task.accent === "us" ? ttsUS.isSpeaking : ttsUK.isSpeaking);
                return (
                  <GlassCard key={task.id} className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-muted-foreground">{task.context}</p>
                      <button
                        onClick={() => {
                          const engine = task.accent === "us" ? ttsUS : ttsUK;
                          engine.speak(task.passage);
                          setActiveAudio(task.id);
                        }}
                        className={cn(
                          "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                          playing
                            ? "bg-brand text-brand-foreground"
                            : "bg-brand-muted text-brand hover:bg-brand/20"
                        )}
                        aria-label="پخش صوت"
                      >
                        <Headphones className="size-3.5" />
                        {playing ? "در حال پخش..." : "پخش"}
                      </button>
                    </div>
                    {/* Hidden transcript (spoiler-free): collapsible */}
                    <details className="mb-3 rounded-xl bg-white/5 p-3 text-xs text-muted-foreground">
                      <summary className="cursor-pointer font-medium">متن (بعد از پاسخ دادن باز کن)</summary>
                      <p className="mt-2 leading-relaxed" dir="ltr">{task.passage}</p>
                    </details>
                    {task.questions.map((q) => (
                      <MCQ
                        key={q.id}
                        q={q}
                        picked={lsnAnswers[q.id]}
                        onPick={(i) => setLsnAnswers((a) => ({ ...a, [q.id]: i }))}
                      />
                    ))}
                  </GlassCard>
                );
              })}
              <NextButton enabled={canLeave(1)} onClick={goNext} />
            </motion.div>
          )}

          {/* ================= SECTION 2: USE OF ENGLISH ================= */}
          {phase === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-3">
              <SectionHeader emoji="📖" title="بخش دوم: گرامر و واژگان" desc="۱۰ سوال تخصصی — از وجه التزامی تا وارونگی و collocation." />
              <GlassCard className="space-y-4 p-5">
                {MASTERY_EXAM.useOfEnglish.map((q, i) => (
                  <MCQ
                    key={q.id}
                    q={q}
                    index={i}
                    picked={useAnswers[q.id]}
                    onPick={(idx) => setUseAnswers((a) => ({ ...a, [q.id]: idx }))}
                  />
                ))}
              </GlassCard>
              <NextButton enabled={canLeave(2)} onClick={goNext} />
            </motion.div>
          )}

          {/* ================= SECTION 3: SYNTAX ================= */}
          {phase === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-4">
              <SectionHeader emoji="🧩" title="بخش سوم: جمله‌سازی" desc="کلمات را به ترتیب درست بچین — ساختارهای رسمی و آکادمیک." />
              {MASTERY_EXAM.syntax.map((t) => {
                const st = syn[t.id];
                const bank = banks.find((b) => b.id === t.id)!;
                return (
                  <GlassCard key={t.id} className="p-5">
                    <p className="mb-3 text-sm font-semibold">{t.prompt}</p>
                    {/* Answer slot — picked word chips (tap to remove) */}
                    <div className="min-h-[3rem] rounded-xl border-2 border-dashed border-brand/30 bg-brand-muted/10 p-3">
                      <div className="flex flex-wrap gap-2" dir="ltr">
                        {st.picked.length === 0 && (
                          <span className="text-xs text-muted-foreground">کلمه‌ها را به ترتیب بزن...</span>
                        )}
                        {st.picked.map((bi, pos) => (
                          <button
                            key={`${bi}-${pos}`}
                            disabled={st.checked}
                            onClick={() =>
                              setSyn((s) => ({
                                ...s,
                                [t.id]: { ...s[t.id], picked: s[t.id].picked.filter((_, idx) => idx !== pos) },
                              }))
                            }
                            className={cn(
                              "rounded-lg px-2.5 py-1 text-sm font-medium transition-colors",
                              st.checked
                                ? st.correct
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : "bg-red-500/20 text-red-300"
                                : "bg-brand text-brand-foreground"
                            )}
                          >
                            {bank.words[bi]}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Word bank — index-based, duplicates handled naturally */}
                    {!st.checked && (
                      <div className="mt-3 flex flex-wrap gap-2" dir="ltr">
                        {bank.words.map((w, i) => (
                          <button
                            key={`${w}-${i}`}
                            disabled={st.picked.includes(i)}
                            onClick={() =>
                              setSyn((s) => ({
                                ...s,
                                [t.id]: { ...s[t.id], picked: [...s[t.id].picked, i] },
                              }))
                            }
                            className="rounded-lg border border-border bg-white/5 px-2.5 py-1 text-sm transition-colors hover:bg-muted disabled:opacity-30"
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    )}
                    {/* Check / result */}
                    {st.checked ? (
                      <div className="mt-3">
                        <p className={cn("text-sm font-medium", st.correct ? "text-emerald-400" : "text-red-400")}>
                          {st.correct ? "درست! ✅" : "نادرست — جواب درست:"}{" "}
                          {!st.correct && <span dir="ltr" className="font-mono text-xs">{t.correctSentence}</span>}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          const sentence = st.picked.map((bi) => bank.words[bi]).join(" ");
                          const ok = normalizeText(sentence) === normalizeText(t.correctSentence);
                          if (ok) {
                            success();
                          } else {
                            tap();
                          }
                          setSyn((s) => ({ ...s, [t.id]: { ...s[t.id], checked: true, correct: ok } }));
                        }}
                        disabled={st.picked.length !== bank.words.length}
                        className="mt-3 w-full rounded-full bg-brand py-2.5 text-sm font-bold text-brand-foreground disabled:opacity-40"
                      >
                        بررسی جواب
                      </button>
                    )}
                  </GlassCard>
                );
              })}
              <NextButton enabled={canLeave(3)} onClick={goNext} />
            </motion.div>
          )}

          {/* ================= SECTION 4: ORAL ================= */}
          {phase === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-4">
              <SectionHeader emoji="🎙️" title="بخش چهارم: مصاحبه شفاهی" desc="۳ سوال تحلیلی از ممتحن ارشد — پاسخ کامل انگلیسی بنویس یا با چت زنده تمرین کن." />
              {/* Examiner card */}
              <GlassCard className="flex items-center gap-3 bg-gradient-to-br from-amber-500/10 to-yellow-600/10 p-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-2xl shadow-lg">🎓</div>
                <div>
                  <p className="text-sm font-bold">The Chief Examiner</p>
                  <p className="text-xs text-muted-foreground">ممتحن ارشد آزمون استادی SpeakUp</p>
                </div>
              </GlassCard>
              {MASTERY_EXAM.oral.map((o, i) => (
                <GlassCard key={o.id} className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-brand-muted px-2.5 py-0.5 text-[10px] font-bold text-brand">
                      سوال {toPersianDigits(i + 1)} — {o.tier === "describe" ? "توصیف" : o.tier === "analyze" ? "تحلیل" : "نتیجه‌گیری"}
                    </span>
                    <button
                      onClick={() => ttsUS.speak(o.question)}
                      className="flex items-center gap-1 rounded-full bg-brand-muted px-3 py-1 text-xs font-semibold text-brand"
                      aria-label="پخش سوال"
                    >
                      <Play className="size-3" />
                      بشنو
                    </button>
                  </div>
                  <p className="rounded-xl bg-white/5 p-3 text-sm leading-relaxed" dir="ltr">{o.question}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{o.questionFa}</p>
                  <textarea
                    value={oral[o.id] ?? ""}
                    onChange={(e) => setOral((a) => ({ ...a, [o.id]: e.target.value }))}
                    dir="ltr"
                    rows={4}
                    placeholder="Type your answer in English..."
                    className="mt-3 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
                  />
                  <p className="mt-1 text-left text-[10px] text-muted-foreground" dir="ltr">
                    {wordCount(oral[o.id] ?? "")} words
                  </p>
                </GlassCard>
              ))}
              <GlassCard noSpotlight className="p-4 text-center text-xs text-muted-foreground">
                برای ارزیابی رسمی و گفت‌وگوی صوتی زنده،{" "}
                <Link href="/chat/exam-oral" className="font-semibold text-brand underline">
                  مصاحبه با ممتحن ارشد
                </Link>{" "}
                را هم بگذران!
              </GlassCard>
              <NextButton enabled={canLeave(4)} onClick={goNext} label="پایان آزمون و مشاهده گواهی 🏆" />
            </motion.div>
          )}

          {/* ================= REPORT + CERTIFICATE ================= */}
          {phase === "report" && <Report name={name || "زبان‌آموز SpeakUp"} scores={scores} certId={certId} seconds={seconds} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

function SectionHeader({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="mb-2 text-center">
      <div className="text-3xl">{emoji}</div>
      <h2 className="mt-1 text-lg font-extrabold">{title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

function NextButton({ enabled, onClick, label = "بخش بعدی" }: { enabled: boolean; onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      className="w-full rounded-full bg-brand py-3 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition-transform enabled:hover:scale-[1.01] disabled:opacity-40"
    >
      {enabled ? label : "اول به همه‌ی سوالات این بخش پاسخ بده 🙂"}
    </button>
  );
}

function MCQ({
  q,
  index,
  picked,
  onPick,
}: {
  q: ExamQuestion;
  index?: number;
  picked?: number;
  onPick: (i: number) => void;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-sm font-semibold">
        {index !== undefined && <span className="text-muted-foreground">{toPersianDigits(index + 1)}. </span>}
        {q.prompt}
      </p>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onPick(i)}
            className={cn(
              "rounded-xl border px-3 py-2 text-left text-sm transition-all",
              picked === i
                ? "border-brand bg-brand-muted/30 font-semibold"
                : "border-border hover:border-brand/40"
            )}
            dir="ltr"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Report({
  name,
  scores,
  certId,
  seconds,
}: {
  name: string;
  scores: { listening: number; useOfEnglish: number; syntax: number; oral: number; total: number };
  certId: string;
  seconds: number;
}) {
  const cefr = cefrFromScore(scores.total);
  const [copied, setCopied] = useState(false);

  const shareText = `🏆 SpeakUp Grand Mastery Exam\n${name} — ${cefr.level} (${cefr.label})\nنمره کل: ${toPersianDigits(scores.total)}٪\nشنیداری ${toPersianDigits(scores.listening)}٪ · گرامر ${toPersianDigits(scores.useOfEnglish)}٪ · جمله‌سازی ${toPersianDigits(scores.syntax)}٪ · شفاهی ${toPersianDigits(scores.oral)}٪\nشناسه گواهی: ${certId}`;

  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "گواهی تسلط SpeakUp", text: shareText });
        return;
      } catch {
        /* cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const bars = [
    { label: "شنیداری", v: scores.listening, icon: Headphones },
    { label: "گرامر و واژگان", v: scores.useOfEnglish, icon: BookOpen },
    { label: "جمله‌سازی", v: scores.syntax, icon: ListOrdered },
    { label: "شفاهی", v: scores.oral, icon: Mic },
  ];

  const today = useMemo(
    () => new Date().toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }),
    []
  );

  return (
    <motion.div key="report" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      {/* Score summary */}
      <GlassCard className="p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-xl shadow-amber-500/40"
        >
          <Award className="size-8" />
        </motion.div>
        <p className="text-xs text-muted-foreground">نمره‌ی کل شما</p>
        <p className="mt-1 text-5xl font-extrabold tabular-nums text-gradient-brand">
          {toPersianDigits(scores.total)}٪
        </p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-sm font-bold text-amber-500">
          <Sparkles className="size-4" />
          {cefr.level} — {cefr.label}
        </div>
        <p className="mt-2 text-xs text-muted-foreground" dir="ltr">⏱ {fmtTime(seconds)}</p>
      </GlassCard>

      {/* Section breakdown */}
      <div className="grid grid-cols-2 gap-3">
        {bars.map((b, i) => (
          <motion.div key={b.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <GlassCard noSpotlight className="p-4 text-center">
              <b.icon className="mx-auto size-5 text-brand" />
              <p className="mt-2 text-2xl font-extrabold tabular-nums">{toPersianDigits(b.v)}٪</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{b.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* ================= DIGITAL CERTIFICATE ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="relative overflow-hidden rounded-[2rem] border-2 border-amber-400/40 bg-gradient-to-br from-amber-500/10 via-card to-yellow-600/10 p-6 shadow-[0_20px_80px_-20px_rgba(245,158,11,0.3)] backdrop-blur-2xl"
      >
        {/* glow */}
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-amber-400/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-16 -bottom-16 size-48 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-500">SpeakUp Academy</p>
            <h3 className="mt-1 text-xl font-extrabold">گواهی تسلط زبان انگلیسی</h3>
            <p className="mt-1 text-[10px] text-muted-foreground">Grand Mastery Certification</p>
            <div className="mx-auto mt-4 h-px w-24 bg-amber-400/50" />
            <p className="mt-4 text-xs text-muted-foreground">بدین‌وسیله گواهی می‌شود که</p>
            <p className="mt-1 text-2xl font-extrabold text-gradient-brand">{name}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              در آزمون جامع چهارمهارتی (شنیداری، گرامر، جمله‌سازی و شفاهی) با نمره‌ی
            </p>
            <p className="mt-1 text-3xl font-extrabold tabular-nums">
              {toPersianDigits(scores.total)}٪
            </p>
            <p className="mt-1 text-sm font-bold text-amber-500">
              در سطح {cefr.level} — {cefr.label}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">موفق به دریافت مدرک شد ✨</p>
          </div>

          {/* Gold seal + symbolic QR */}
          <div className="flex shrink-0 flex-col items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 shadow-lg shadow-amber-500/50"
            >
              <Award className="size-8 text-white" />
            </motion.div>
            <SymbolicQR seed={certId} />
          </div>
        </div>

        {/* Meta row */}
        <div className="relative mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-amber-400/20 pt-4 text-[10px] text-muted-foreground">
          <span>شناسه: <span dir="ltr" className="font-mono">{certId}</span></span>
          <span>تاریخ: {today}</span>
          <span>امضای دیجیتال: SpeakUp Exam Authority ✍️</span>
        </div>

        {/* Share */}
        <button
          onClick={share}
          className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-[1.01]"
        >
          {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
          {copied ? "در کلیپ‌بورد کپی شد!" : "اشتراک‌گذاری گواهی"}
        </button>
      </motion.div>

      {/* Honest note + oral interview CTA */}
      <GlassCard noSpotlight className="p-4 text-center text-[11px] leading-relaxed text-muted-foreground">
        نمره‌ی بخش شفاهی در این نسخه بر اساس تحلیل ساختاری پاسخ‌ها (طول و محتوا) است.
        برای ارزیابی رسمی گفت‌وگومحور،{" "}
        <Link href="/chat/exam-oral" className="font-semibold text-brand underline">
          مصاحبه‌ی زنده با ممتحن ارشد
        </Link>{" "}
        را کامل کن!
        <div className="mt-3 flex justify-center gap-2">
          <Link
            href="/"
            className="rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-muted"
          >
            بازگشت به خانه
          </Link>
          <Link
            href="/chat/exam-oral"
            className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-brand-foreground"
          >
            <Mic className="size-3.5" />
            مصاحبه شفاهی
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
}
