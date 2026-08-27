"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { secureStorage } from "@/lib/secureStorage";
import type { CEFRLevel } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/** Friendly proficiency buckets, mapped to a CEFR level for the AI prompt. */
export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced";

/** Accent drives the BCP-47 locale used for both STT and TTS. */
export type Accent = "us" | "uk" | "au";

/** AI narrator voice gender. */
export type VoiceGender = "female" | "male";

/** Default homepage focus band. */
export type DefaultLevelBand = "beginner" | "intermediate" | "advanced";

/** Visual density of glass effects app-wide. */
export type GlassStyle = "liquid" | "minimal";

export interface Settings {
  /* Voice & persona */
  voiceGender: VoiceGender;
  accent: Accent;
  /** TTS speed — snapped to 0.75 / 1.0 / 1.25 in the UI. */
  ttsRate: number;

  /* Learning preferences */
  proficiency: ProficiencyLevel;
  defaultLevel: DefaultLevelBand;
  /** Click/success sounds + haptic vibration. */
  feedbackEnabled: boolean;
  /** Auto-show Persian translations on flashcards & story lines. */
  showPersianTranslation: boolean;

  /* Appearance */
  glassStyle: GlassStyle;
  reduceMotion: boolean;
}

interface SettingsState extends Settings {
  setVoiceGender: (g: VoiceGender) => void;
  setAccent: (a: Accent) => void;
  setTtsRate: (rate: number) => void;
  setProficiency: (level: ProficiencyLevel) => void;
  setDefaultLevel: (band: DefaultLevelBand) => void;
  setFeedbackEnabled: (v: boolean) => void;
  setShowPersianTranslation: (v: boolean) => void;
  setGlassStyle: (style: GlassStyle) => void;
  setReduceMotion: (v: boolean) => void;
  resetSettings: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Mappings & constants                                                      */
/* -------------------------------------------------------------------------- */

export const PROFICIENCY_TO_CEFR: Record<ProficiencyLevel, CEFRLevel> = {
  Beginner: "A2",
  Intermediate: "B1",
  Advanced: "C1",
};

export const ACCENT_TO_LOCALE: Record<Accent, string> = {
  us: "en-US",
  uk: "en-GB",
  au: "en-AU",
};

/** The three standard exam-style speed presets shown in Settings. */
export const TTS_PRESETS = [0.75, 1.0, 1.25] as const;

/** App version shown in Settings → About. */
export const APP_VERSION = "SpeakUp v2.0 — Grandmaster Edition";

/* -------------------------------------------------------------------------- */
/*  Store                                                                     */
/* -------------------------------------------------------------------------- */

const DEFAULT_SETTINGS: Settings = {
  voiceGender: "female",
  accent: "us",
  ttsRate: 1.0,

  proficiency: "Beginner",
  defaultLevel: "beginner",
  feedbackEnabled: true,
  showPersianTranslation: true,

  glassStyle: "liquid",
  reduceMotion: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      setVoiceGender: (voiceGender) => set({ voiceGender }),
      setAccent: (accent) => set({ accent }),
      setTtsRate: (rate) =>
        set({ ttsRate: Math.max(0.5, Math.min(1.5, rate)) }),
      setProficiency: (proficiency) => set({ proficiency }),
      setDefaultLevel: (defaultLevel) => set({ defaultLevel }),
      setFeedbackEnabled: (feedbackEnabled) => set({ feedbackEnabled }),
      setShowPersianTranslation: (showPersianTranslation) =>
        set({ showPersianTranslation }),
      setGlassStyle: (glassStyle) => set({ glassStyle }),
      setReduceMotion: (reduceMotion) => set({ reduceMotion }),
      resetSettings: () => set({ ...DEFAULT_SETTINGS }),
    }),
    {
      name: "speakup-settings",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
