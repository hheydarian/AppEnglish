import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  /** Hide the bottom navigation (e.g. during an active chat session). */
  hideNav?: boolean;
  /** Extra classes applied to the main content wrapper. */
  className?: string;
}

/**
 * AppShell — the mobile-first frame that wraps every screen.
 *
 * Responsibilities:
 *  - Centers content in a phone-width column (`app-container`, max-w-md).
 *  - Adds bottom padding so content never hides behind the fixed `BottomNav`.
 *  - Renders the fixed `BottomNav` unless explicitly hidden.
 *
 * This layout is deliberately simple so pages control their own headers;
 * the shell only guarantees the column + nav + safe areas.
 */
export function AppShell({ children, hideNav = false, className }: AppShellProps) {
  return (
    <div className="min-h-dvh w-full bg-background">
      <main
        className={cn(
          "app-container flex min-h-dvh flex-col px-4",
          !hideNav && "pb-safe-nav",
          className
        )}
      >
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
