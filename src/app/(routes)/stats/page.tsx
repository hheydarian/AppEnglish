"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, MessagesSquare, Clock, Target } from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import {
  FeedbackBreakdown,
  ProgressRing,
  ScoreCard,
  StreakCard,
} from "@/components/stats";
import { Card } from "@/components/ui/card";
import { useUserStore, selectWeeklyProgress } from "@/store/userStore";
import { formatMinutes, toPersianDigits } from "@/lib/utils";

export default function StatsPage() {
  const stats = useUserStore();
  // Re-render only after mount so persisted (client-only) state is applied.
  // This is the standard SSR-safe pattern for reading Zustand persist stores
  // during the first render (avoids hydration mismatch).
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const weeklyPct = selectWeeklyProgress(stats);

  const tiles = [
    {
      label: "مکالمات",
      value: toPersianDigits(stats.totalSessions),
      icon: MessagesSquare,
    },
    {
      label: "پیام‌ها",
      value: toPersianDigits(stats.totalMessages),
      icon: MessagesSquare,
    },
    {
      label: "زمان تمرین",
      value: formatMinutes(stats.totalPracticeMinutes),
      icon: Clock,
    },
    {
      label: "لغت جدید",
      value: toPersianDigits(stats.wordsLearned.length),
      icon: BookOpen,
    },
  ];

  return (
    <DashboardLayout>
      <header className="pt-10 pb-4">
        <h1 className="text-2xl font-bold">پیشرفت شما</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          عملکرد یادگیری‌ات رو دنبال کن و انگیزه‌ات رو حفظ کن.
        </p>
      </header>

      {/* Hero: streak + shareable score card */}
      <section className="grid grid-cols-1 gap-3">
        <StreakCard days={mounted ? stats.streakDays : 0} />
        {mounted && <ScoreCard stats={stats} />}
      </section>

      {/* Weekly goal ring */}
      <section className="mt-4">
        <Card className="flex items-center gap-4 p-4">
          <ProgressRing
            value={weeklyPct}
            label={`${toPersianDigits(weeklyPct)}٪`}
          />
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <Target className="size-4 text-brand" />
              هدف هفتگی
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {mounted
                ? `${formatMinutes(stats.weeklyProgressMinutes)} از ${formatMinutes(
                    stats.weeklyGoalMinutes
                  )}`
                : "در حال بارگذاری..."}
            </p>
          </div>
        </Card>
      </section>

      {/* Stat tiles */}
      <section className="mt-4 grid grid-cols-2 gap-3">
        {tiles.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="p-4">
              <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-brand-muted text-brand">
                <t.icon className="size-5" />
              </div>
              <p className="text-xl font-bold leading-none">
                {mounted ? t.value : "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t.label}</p>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Feedback breakdown */}
      <section className="mt-4 pb-4">
        <Card className="p-4">
          <h3 className="mb-3 text-sm font-semibold">تحلیل نقاط ضعف</h3>
          <FeedbackBreakdown
            counts={mounted ? stats.feedbackReceived : {
              grammar: 0, vocabulary: 0, pronunciation: 0, idiom: 0, style: 0,
            }}
          />
        </Card>
      </section>
    </DashboardLayout>
  );
}
