"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Share2, Trophy, Check } from "lucide-react";
import type { UserStats } from "@/types";
import { toPersianDigits, cn } from "@/lib/utils";

interface ScoreCardProps {
  stats: UserStats;
}

/**
 * A shareable summary card showing the user's headline numbers
 * (streak, points, accuracy, words). Includes a native Web Share button
 * that falls back to copying a text summary to the clipboard.
 */
export function ScoreCard({ stats }: ScoreCardProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const totalFeedback = Object.values(stats.feedbackReceived).reduce(
    (a, b) => a + b,
    0
  );
  const accuracy =
    stats.totalMessages === 0
      ? 100
      : Math.round(
          (Math.max(0, stats.totalMessages - totalFeedback) /
            stats.totalMessages) *
            100
        );

  const headlineNumbers = [
    { label: "امتیاز", value: stats.totalPoints },
    { label: "دقیقه تمرین", value: stats.totalPracticeMinutes },
    { label: "لغت جدید", value: stats.wordsLearned.length },
    { label: "دقت", value: `${accuracy}٪` },
  ];

  const shareText = `🔥 SpeakUp — ${toPersianDigits(
    stats.streakDays
  )} روز متوالی تمرین!\n⭐ ${toPersianDigits(
    stats.totalPoints
  )} امتیاز | 🎯 ${accuracy}٪ دقت | 📚 ${toPersianDigits(
    stats.wordsLearned.length
  )} لغت جدید`;

  const handleShare = async () => {
    // Prefer the native share sheet (great inside a Capacitor WebView too).
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "پیشرفت من در SpeakUp", text: shareText });
        return;
      } catch {
        // user cancelled or share failed → fall back to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; silently ignore
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-cyan-600 p-5 text-white shadow-lg">
      {/* Glow */}
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="size-5" />
            <h3 className="font-bold">خلاصه عملکرد شما</h3>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium backdrop-blur transition-colors hover:bg-white/30"
          >
            {copied ? (
              <>
                <Check className="size-3.5" /> کپی شد
              </>
            ) : (
              <>
                <Share2 className="size-3.5" /> اشتراک
              </>
            )}
          </button>
        </div>

        {/* Numbers grid */}
        <div className="grid grid-cols-2 gap-3">
          {headlineNumbers.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-white/15 p-3 backdrop-blur"
            >
              <p className="text-2xl font-extrabold leading-none">
                {toPersianDigits(n.value)}
              </p>
              <p className="mt-1 text-[11px] text-white/80">{n.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom strip with streak highlight */}
      <div
        className={cn(
          "relative z-10 mt-4 flex items-center gap-2 rounded-2xl bg-black/20 px-4 py-2.5 text-sm font-medium backdrop-blur"
        )}
      >
        <span className="text-lg">🔥</span>
        {toPersianDigits(stats.streakDays)} روز متوالی تمرین — ادامه بده!
      </div>
    </div>
  );
}
