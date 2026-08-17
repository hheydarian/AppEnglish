"use client";

import { motion } from "framer-motion";
import { Sparkles, Flame, Trophy, ArrowLeft, BookOpen, Headphones } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { LessonCard } from "@/components/curriculum/LessonCard";
import { CURRICULUM, TOTAL_LESSONS } from "@/data/curriculum";
import { useUserStore } from "@/store/userStore";
import { cn, toPersianDigits } from "@/lib/utils";

export default function Home() {
  const streak = useUserStore((s) => s.streakDays);
  const points = useUserStore((s) => s.totalPoints);
  const lessonsDone = useUserStore((s) => s.completedScenarios.length);

  return (
    <DashboardLayout>
      {/* ============ HERO — Liquid Glass ============ */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-8 pb-6"
      >
        {/* Frosted glass hero panel */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 p-5 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)] sm:p-6">
          {/* Glow accents */}
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-brand/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -left-10 -bottom-10 size-32 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Mobile: stacked vertical; Desktop: horizontal */}
          <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-right">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-cyan-500 text-white shadow-xl shadow-brand/30 sm:size-14"
            >
              <Sparkles className="size-6 sm:size-7" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">سلام رفیق! 👋</p>
              <h1 className="mt-1 text-2xl font-extrabold text-gradient-brand sm:text-4xl">
                بیا انگلیسی رو زنده کنیم!
              </h1>
              <p className="mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
                از الفبا تا مکالمه‌ی حرفه‌ای — قدم‌به‌قدم، با یه هوش مصنوعی که مثل
                دوست بهت یاد می‌ده. آماده‌ای؟
              </p>
            </div>
          </div>

        {/* Quick stat chips — jelly glass, compact on mobile */}
        <div className="relative mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          <StatChip icon={Flame} label="روز زنده" value={streak} accent="text-orange-300" />
          <StatChip icon={Trophy} label="امتیاز" value={points} accent="text-amber-300" />
          <StatChip icon={BookOpen} label="درس انجام‌شده" value={lessonsDone} accent="text-emerald-300" />
        </div>
        </div>
      </motion.header>

      {/* ============ CTA ============ */}
      <Link href="/scenarios" className="block focus-visible:outline-none">
        <GlassCard
          lift={6}
          className="mb-8 flex items-center justify-between bg-gradient-to-br from-brand/90 to-cyan-600/90 p-5 text-white"
        >
          <div>
            <h2 className="text-lg font-bold">بریم توی یه ماجرای واقعی! 🚀</h2>
            <p className="mt-0.5 text-sm text-white/85">
              یه سناریو انتخاب کن و با هوش مصنوعی چت کن.
            </p>
          </div>
          <motion.div
            whileHover={{ x: -4 }}
            className="flex size-11 items-center justify-center rounded-full bg-white/20 backdrop-blur"
          >
            <ArrowLeft className="size-5" />
          </motion.div>
        </GlassCard>
      </Link>

      {/* ============ PODCAST CTA ============ */}
      <Link href="/podcasts" className="block focus-visible:outline-none">
        <GlassCard
          lift={4}
          className="mb-8 flex items-center gap-4 bg-gradient-to-br from-violet-600/80 to-indigo-600/80 p-5 text-white"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Headphones className="size-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold">پادکست و داستان صوتی 🎧</h2>
            <p className="mt-0.5 text-sm text-white/85">
              گوش بده، هم‌زمان بخون، و با کویز درک مطلب تمرین کن!
            </p>
          </div>
          <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
        </GlassCard>
      </Link>

      {/* ============ LEARNING TREE ============ */}
      <section className="pb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <span className="flex size-7 items-center justify-center rounded-lg bg-brand-muted text-brand">
              <BookOpen className="size-4" />
            </span>
            مسیر یادگیری
          </h2>
          <span className="text-xs text-muted-foreground">
            {toPersianDigits(TOTAL_LESSONS)} درس از صفر تا صد
          </span>
        </div>

        {/* Stages */}
        <div className="space-y-8">
          {CURRICULUM.map((stage, si) => (
            <motion.div
              key={stage.level}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: si * 0.05 }}
            >
              {/* Stage header */}
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                    accentStageTile(stage.accent)
                  )}
                >
                  <Icon name={stage.icon} className="size-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {stage.level}
                    </span>
                    <h3 className="font-bold">{stage.label}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{stage.subtitle}</p>
                </div>
              </div>

              {/* Lessons grid: 1 col mobile, 2 col tablet, 3 col desktop */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {stage.lessons.map((lesson, li) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    accent={stage.accent}
                    index={li}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          هر درسی تموم که بشه، قفل بعدی باز می‌شه. ادامه بده، استاد! 🎓
        </p>
      </section>
    </DashboardLayout>
  );
}

/* ---- helpers ---- */

function StatChip({
  icon: IconCmp,
  label,
  value,
  accent,
}: {
  icon: typeof Flame;
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-2 text-center backdrop-blur-xl sm:p-3"
    >
      {/* Jelly glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
           style={{ background: "radial-gradient(120px circle at 50% 0%, rgba(255,255,255,0.08), transparent 70%)" }} />
      <IconCmp className={cn("relative size-4", accent)} />
      <p className="relative mt-2 text-xl font-extrabold leading-none tabular-nums">
        {toPersianDigits(value)}
      </p>
      <p className="relative mt-1 text-[10px] text-muted-foreground">{label}</p>
    </motion.div>
  );
}

/** Static gradient class strings per stage accent (JIT-safe). */
function accentStageTile(accent: string): string {
  const map: Record<string, string> = {
    sky: "from-sky-500 to-sky-700",
    emerald: "from-emerald-500 to-emerald-700",
    amber: "from-amber-500 to-amber-700",
    violet: "from-violet-500 to-violet-700",
    rose: "from-rose-500 to-rose-700",
    cyan: "from-cyan-500 to-cyan-700",
  };
  return map[accent] ?? map.cyan;
}
