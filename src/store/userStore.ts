"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { secureStorage } from "@/lib/secureStorage";
import type {
  CEFRLevel,
  CompletedScenario,
  Feedback,
  FeedbackType,
  UserStats,
} from "@/types";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface UserState extends UserStats {
  /* ---- mutators ---- */
  /** Call after a completed conversation turn to bump counters + streak. */
  recordTurn: (params: {
    scenarioId: string;
    messagesCount: number;
    feedback: Feedback[];
    practiceMinutes: number;
  }) => void;
  /** Record a finished scenario with its performance score. */
  completeScenario: (scenarioId: string, score: number, messagesCount: number) => void;
  setWeeklyGoal: (minutes: number) => void;
  /** Reset everything (used in settings). */
  resetStats: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const FEEDBACK_TYPES: FeedbackType[] = [
  "grammar",
  "vocabulary",
  "pronunciation",
  "idiom",
  "style",
];

const FEEDBACK_POINTS: Record<FeedbackType, number> = {
  grammar: 5,
  vocabulary: 4,
  pronunciation: 4,
  idiom: 6,
  style: 3,
};

function emptyFeedbackCount(): Record<FeedbackType, number> {
  return { grammar: 0, vocabulary: 0, pronunciation: 0, idiom: 0, style: 0 };
}

/** Local date key (YYYY-MM-DD) in the user's timezone. */
function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayKey(d);
}

/**
 * Compute the new streak given the previous streak + last active date.
 * - Same day → unchanged.
 * - Consecutive day → +1.
 * - Gap → reset to 1.
 */
function computeStreak(prev: { streakDays: number; lastActiveDate: string }): {
  streakDays: number;
  lastActiveDate: string;
} {
  const today = todayKey();
  if (prev.lastActiveDate === today) {
    return { streakDays: prev.streakDays, lastActiveDate: today };
  }
  if (prev.lastActiveDate === yesterdayKey()) {
    return { streakDays: prev.streakDays + 1, lastActiveDate: today };
  }
  return { streakDays: 1, lastActiveDate: today };
}

const DEFAULT_STATS: UserStats = {
  userId: "local-user",
  totalSessions: 0,
  totalMessages: 0,
  totalPracticeMinutes: 0,
  streakDays: 0,
  lastActiveDate: "",
  feedbackReceived: emptyFeedbackCount(),
  currentLevel: "A2",
  weeklyGoalMinutes: 30,
  weeklyProgressMinutes: 0,
  completedScenarios: [],
  wordsLearned: [],
  totalPoints: 0,
};

/* -------------------------------------------------------------------------- */
/*  Store                                                                     */
/* -------------------------------------------------------------------------- */

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATS,

      recordTurn: ({ scenarioId, messagesCount, feedback, practiceMinutes }) => {
        const s = get();
        const streak = computeStreak(s);

        // Tally feedback by type + collect new words learned.
        const feedbackReceived = { ...s.feedbackReceived };
        const wordsLearned = [...s.wordsLearned];
        let pointsGained = 10; // base points per turn

        for (const f of feedback) {
          feedbackReceived[f.type] += 1;
          pointsGained += FEEDBACK_POINTS[f.type] ?? 3;
          // Track the suggestion as a "learned" expression (deduped).
          if (f.suggestion && !wordsLearned.includes(f.suggestion)) {
            wordsLearned.push(f.suggestion);
            // Cap memory to avoid unbounded growth.
            if (wordsLearned.length > 500) wordsLearned.shift();
          }
        }

        set({
          totalMessages: s.totalMessages + messagesCount,
          totalPracticeMinutes: s.totalPracticeMinutes + practiceMinutes,
          weeklyProgressMinutes: s.weeklyProgressMinutes + practiceMinutes,
          streakDays: streak.streakDays,
          lastActiveDate: streak.lastActiveDate,
          feedbackReceived,
          wordsLearned,
          totalPoints: s.totalPoints + pointsGained,
          // Don't bump totalSessions here — that happens on completeScenario.
          // scenarioId is intentionally unused at the turn level.
          ...(scenarioId ? {} : {}),
        });
      },

      completeScenario: (scenarioId, score, messagesCount) => {
        const s = get();
        const existing = s.completedScenarios.find(
          (c) => c.scenarioId === scenarioId
        );
        const bestScore = existing ? Math.max(existing.score, score) : score;

        const completed: CompletedScenario = {
          scenarioId,
          completedAt: Date.now(),
          score: bestScore,
          messagesCount: messagesCount,
        };

        const completedScenarios = existing
          ? s.completedScenarios.map((c) =>
              c.scenarioId === scenarioId ? completed : c
            )
          : [...s.completedScenarios, completed];

        set({
          totalSessions: s.totalSessions + (existing ? 0 : 1),
          completedScenarios,
          totalPoints: s.totalPoints + Math.round(score / 2),
        });
      },

      setWeeklyGoal: (minutes) =>
        set({ weeklyGoalMinutes: Math.max(5, Math.min(600, minutes)) }),

      resetStats: () => set({ ...DEFAULT_STATS }),
    }),
    {
      name: "speakup-user",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

/* -------------------------------------------------------------------------- */
/*  Selectors                                                                 */
/* -------------------------------------------------------------------------- */

export const selectAccuracy = (s: UserStats): number => {
  const totalFeedback = FEEDBACK_TYPES.reduce(
    (sum, t) => sum + s.feedbackReceived[t],
    0
  );
  if (s.totalMessages === 0) return 100;
  // accuracy = messages without any feedback / total messages (approx).
  const cleanMessages = Math.max(0, s.totalMessages - totalFeedback);
  return Math.round((cleanMessages / s.totalMessages) * 100);
};

export const selectWeeklyProgress = (s: UserStats): number => {
  if (s.weeklyGoalMinutes === 0) return 0;
  return Math.min(100, Math.round((s.weeklyProgressMinutes / s.weeklyGoalMinutes) * 100));
};

/** CEFR helpers for settings bridging. */
export const LEVEL_TO_CEFR: Record<string, CEFRLevel> = {
  Beginner: "A2",
  Intermediate: "B1",
  Advanced: "C1",
};
