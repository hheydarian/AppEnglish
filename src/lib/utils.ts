import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely (handles conflicts + conditional classes).
 * The cornerstone utility for all component styling in the app.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* -------------------------------------------------------------------------- */
/*  IDs & time                                                                */
/* -------------------------------------------------------------------------- */

/** Generate a short, collision-resistant unique id (client-safe). */
export function uid(prefix = ""): string {
  const rand = Math.random().toString(36).slice(2, 10);
  const time = Date.now().toString(36);
  return `${prefix ? prefix + "_" : ""}${time}${rand}`;
}

/** Format epoch milliseconds into a localized HH:MM string. */
export function formatTime(ms: number, locale = "fa-IR"): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ms));
  } catch {
    return new Date(ms).toLocaleTimeString();
  }
}

/** Format minutes into a human-readable duration, e.g. "۱۲ دقیقه". */
export function formatMinutes(minutes: number, locale = "fa-IR"): string {
  const rounded = Math.round(minutes);
  const formatter = new Intl.NumberFormat(locale);
  return `${formatter.format(rounded)} دقیقه`;
}

/* -------------------------------------------------------------------------- */
/*  Persian digits                                                            */
/* -------------------------------------------------------------------------- */

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert any latin digits in a string to Persian digits. */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/* -------------------------------------------------------------------------- */
/*  Misc                                                                      */
/* -------------------------------------------------------------------------- */

/** Clamp a number between a min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Pause for ms milliseconds (useful for simulating latency / demos). */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* -------------------------------------------------------------------------- */
/*  Quiz string normalization                                                */
/* -------------------------------------------------------------------------- */

/**
 * Normalize a user/correct answer before comparison so that punctuation,
 * extra whitespace, letter case, and Persian/Arabic digit + character
 * differences never mark a correct answer wrong.
 *
 * Used by the quiz step to compare "A blue door." vs "a blue door" as equal.
 */
export function normalizeText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    // unify Arabic/Persian characters
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "") // Arabic diacritics + tatweel
    .replace(/\u06CC/g, "\u064A") // Persian Yeh → Arabic Yeh
    .replace(/\u06A9/g, "\u0643") // Persian Keheh → Arabic Kaf
    .replace(/\u06AF/g, "\u06AF") // Gaf stays
    .replace(/\u0698/g, "\u0698") // Jeh stays
    // strip punctuation
    .replace(/[.,!?;:"'`(){}\[\]\\\/\-—_]/g, "")
    // collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
}
