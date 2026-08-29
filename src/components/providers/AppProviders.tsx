"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { useSettingsStore } from "@/store/settingsStore";
import { stopSpeak, isNativePlatform } from "@/lib/ttsEngine";
import { SplashScreen } from "./SplashScreen";

/**
 * Global client providers — mounted once in the root layout.
 *
 * - MotionConfig: "Reduce Motion" setting disables all Framer animations.
 * - data-glass / data-reduce-motion attributes on <html> drive CSS overrides.
 * - ANDROID HARDWARE BACK BUTTON: intercepted only when running on a native
 *   platform (Capacitor.isNativePlatform() === true), never on plain web.
 *   Every plugin call is inside try/catch — a plugin failure must never
 *   white-screen the app.
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
    let cancelled = false;
    let lastBack = 0;
    let cleanupFn: (() => void) | null = null;

    // GUARD 1: native platform only. On plain web this resolves false and the
    // whole block (and the dynamic plugin import) is skipped entirely.
    void (async () => {
      try {
        const native = await isNativePlatform();
        if (cancelled || !native) return;

        // GUARD 2: dynamic import inside try/catch — a missing/broken plugin
        // module can never crash the render tree.
        const { App: CapApp } = await import("@capacitor/app");
        if (cancelled) return;

        const listener = await CapApp.addListener("backButton", () => {
          // Stop narration — a back press means "leave this context".
          try {
            stopSpeak();
          } catch {
            /* never let TTS teardown crash navigation */
          }

          // Deep flows step backwards through their own screens.
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

          // Home: double-tap within 2s exits (standard Android UX).
          const now = Date.now();
          if (now - lastBack < 2000) {
            void CapApp.exitApp();
          } else {
            lastBack = now;
            navigator.vibrate?.(30);
          }
        });

        cleanupFn = () => listener.remove();
      } catch (err) {
        // Plugin unavailable / bridge not ready — browser handles back natively.
        console.warn("[AppProviders] backButton listener unavailable:", err);
      }
    })();

    return () => {
      cancelled = true;
      try {
        cleanupFn?.();
      } catch {
        /* ignore */
      }
    };
  }, [pathname, router]);

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
      <SplashScreen>{children}</SplashScreen>
    </MotionConfig>
  );
}
