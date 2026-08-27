"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { useSettingsStore } from "@/store/settingsStore";
import { stopSpeak } from "@/lib/ttsEngine";

/**
 * Global client providers — mounted once in the root layout.
 *
 * - MotionConfig: "Reduce Motion" setting disables all Framer animations.
 * - data-glass / data-reduce-motion attributes on <html> drive CSS overrides.
 * - ANDROID HARDWARE BACK BUTTON: without this listener the OS default kills
 *   the app from any screen. We intercept it and route like a normal browser:
 *     • chat/lesson/exam/podcast → history.back() (step-by-step flow)
 *     • any other non-root page  → router.back()
 *     • root "/"                 → double-tap within 2s to exit (native toast)
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const glassStyle = useSettingsStore((s) => s.glassStyle);
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.glass = glassStyle;
    root.dataset.reduceMotion = String(reduceMotion);
  }, [glassStyle, reduceMotion]);

  /* ---------- Android hardware back button ---------- */
  useEffect(() => {
    // Only meaningful inside the native shell — web browsers handle back natively.
    if (!(window as unknown as { Capacitor?: unknown }).Capacitor) return;

    let cancelled = false;
    let lastBack = 0;

    void (async () => {
      try {
        const { App: CapApp } = await import("@capacitor/app");
        if (cancelled) return;

        await CapApp.addListener("backButton", () => {
          // Stop any narration first — a back press means "leave this context".
          stopSpeak();

          // Deep flows always step backwards through their own screens.
          if (
            pathname.startsWith("/chat") ||
            pathname.startsWith("/lesson") ||
            pathname.startsWith("/exam") ||
            pathname.startsWith("/podcasts")
          ) {
            router.back();
            return;
          }

          if (pathname !== "/") {
            router.back();
            return;
          }

          // Already home: double-tap within 2s exits (standard Android UX).
          const now = Date.now();
          if (now - lastBack < 2000) {
            void CapApp.exitApp();
          } else {
            lastBack = now;
            navigator.vibrate?.(30);
          }
        });
      } catch {
        // Plugin unavailable (pure web build) — browser handles back natively.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
