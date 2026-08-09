"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CEFRLevel } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/** Friendly proficiency buckets, mapped to a CEFR level for the AI prompt. */
export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced";

/** Accent drives the BCP-47 locale used for both STT and TTS. */
export type Accent = "us" | "uk";

export interface Settings {
  proficiency: ProficiencyLevel;
  /** Speech rate for TTS, 0.5 (slow) – 1.5 (fast). */
  ttsRate: number;
  accent: Accent;
  /**
   * Optional personal OpenAI API key. Stored locally and sent to our OWN
   * /api/chat endpoint in the Authorization-free body; the server then uses
   * it instead of the default env key. NEVER sent to a third party.
   */
  apiKey: string;
}

interface SettingsState extends Settings {
  setProficiency: (level: ProficiencyLevel) => void;
  setTtsRate: (rate: number) => void;
  setAccent: (accent: Accent) => void;
  setApiKey: (key: string) => void;
  resetSettings: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Mappings                                                                  */
/* -------------------------------------------------------------------------- */

export const PROFICIENCY_TO_CEFR: Record<ProficiencyLevel, CEFRLevel> = {
  Beginner: "A2",
  Intermediate: "B1",
  Advanced: "C1",
};

export const ACCENT_TO_LOCALE: Record<Accent, string> = {
  us: "en-US",
  uk: "en-GB",
};

/* -------------------------------------------------------------------------- */
/*  Store                                                                     */
/* -------------------------------------------------------------------------- */

const DEFAULT_SETTINGS: Settings = {
  proficiency: "Beginner",
  ttsRate: 0.95,
  accent: "us",
  apiKey: "",
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      setProficiency: (proficiency) => set({ proficiency }),
      setTtsRate: (rate) =>
        set({ ttsRate: Math.max(0.5, Math.min(1.5, rate)) }),
      setAccent: (accent) => set({ accent }),
      setApiKey: (apiKey) => set({ apiKey }),
      resetSettings: () => set({ ...DEFAULT_SETTINGS }),
    }),
    {
      name: "speakup-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
