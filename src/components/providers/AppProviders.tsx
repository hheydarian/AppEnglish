"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { useSettingsStore } from "@/store/settingsStore";

/**
 * Global client providers — mounted once in the root layout.
 *
 * - MotionConfig: when "Reduce Motion" is on, every Framer Motion animation
 *   across the app is instantly disabled (spring transforms included).
 * - data-glass / data-reduce-motion attributes on <html> drive the CSS-level
 *   overrides declared in globals.css (blur removal, CSS animation kill).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const glassStyle = useSettingsStore((s) => s.glassStyle);
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.glass = glassStyle;
    root.dataset.reduceMotion = String(reduceMotion);
  }, [glassStyle, reduceMotion]);

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
