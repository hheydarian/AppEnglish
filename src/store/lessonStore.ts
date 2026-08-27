"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { secureStorage } from "@/lib/secureStorage";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface LessonState {
  /** Lesson ids the user has fully completed (all 4 steps done). */
  completedLessons: string[];
  /** Lesson ids currently in progress (step > 0 but not finished). */
  inProgressLessons: string[];
  /** Saved step index per lesson, so a refresh resumes where they left off. */
  stepByLesson: Record<string, number>;

  /** Mark a lesson as completed (idempotent). */
  completeLesson: (lessonId: string) => void;
  /** Save the current step for a lesson (for resume). */
  saveStep: (lessonId: string, step: number, totalSteps: number) => void;
  /** Reset all progress. */
  resetProgress: () => void;

  /** Selectors */
  isCompleted: (lessonId: string) => boolean;
  getStep: (lessonId: string) => number;
}

/* -------------------------------------------------------------------------- */
/*  Store                                                                     */
/* -------------------------------------------------------------------------- */

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      inProgressLessons: [],
      stepByLesson: {},

      completeLesson: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(lessonId)
            ? s.completedLessons
            : [...s.completedLessons, lessonId],
          inProgressLessons: s.inProgressLessons.filter((id) => id !== lessonId),
        })),

      saveStep: (lessonId, step, totalSteps) =>
        set((s) => {
          const isDone = step >= totalSteps - 1;
          return {
            stepByLesson: { ...s.stepByLesson, [lessonId]: step },
            inProgressLessons:
              !isDone && !s.inProgressLessons.includes(lessonId)
                ? [...s.inProgressLessons, lessonId]
                : s.inProgressLessons,
          };
        }),

      resetProgress: () =>
        set({ completedLessons: [], inProgressLessons: [], stepByLesson: {} }),

      isCompleted: (lessonId) => get().completedLessons.includes(lessonId),
      getStep: (lessonId) => get().stepByLesson[lessonId] ?? 0,
    }),
    {
      name: "speakup-lessons",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
