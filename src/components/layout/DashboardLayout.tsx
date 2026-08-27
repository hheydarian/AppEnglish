"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { DashboardSidebar } from "./DashboardSidebar";
import { useSettingsStore } from "@/store/settingsStore";
import { cn } from "@/lib/utils";

/**
 * Ambient 3D scene — lazy-loaded, SSR disabled (canvas can't SSR), wrapped
 * aria-hidden so assistive tech ignores the purely decorative canvas.
 */
const AmbientScene = dynamic(
  () => import("@/components/three/AmbientScene").then((m) => m.AmbientScene),
  { ssr: false }
);

interface DashboardLayoutProps {
  children: ReactNode;
  /** Show the ambient 3D backdrop behind the content (default true). */
  ambient3d?: boolean;
  /** Hide bottom nav (e.g. inside chat). Sidebar still shows on desktop. */
  hideNav?: boolean;
  className?: string;
}

/**
 * DashboardLayout — the responsive shell that fixes the "stretched mobile"
 * problem from the 3d-modern-ui-expert skill.
 *
 * - Desktop (lg+): split dashboard — [content | sidebar], content centered
 *   within a max-width column, with the ambient 3D canvas behind it.
 * - Mobile: single column + fixed BottomNav (no sidebar).
 *
 * Never stretches a phone-width column across a wide desktop.
 */
export function DashboardLayout({
  children,
  ambient3d = true,
  hideNav = false,
  className,
}: DashboardLayoutProps) {
  // Settings → Reduce Motion disables the 3D backdrop entirely (perf).
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-background">
      {/* Ambient 3D backdrop (decorative) */}
      {ambient3d && !reduceMotion && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        >
          <AmbientScene />
        </div>
      )}

      {/* Ambient gradient wash for depth */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,var(--brand-muted),transparent_70%)]"
      />

      {/* Split layout: content + sidebar on desktop, single column on mobile.
          NOTE: do NOT constrain `main` with `app-container`/`max-w-md` here —
          that stretches a phone column across desktop (the bug we're fixing).
          Mobile-width centering is applied to inner page blocks via .app-
          container instead, so the content area can host multi-column grids. */}
      <div className="flex w-full">
        <main
          className={cn(
            "min-h-dvh w-full flex-1 px-4 pt-2 sm:px-6 lg:px-10 lg:pt-6",
            !hideNav && "pb-safe-nav",
            className
          )}
        >
          {children}
        </main>
        <DashboardSidebar />
      </div>

      {!hideNav && <BottomNav />}
    </div>
  );
}
