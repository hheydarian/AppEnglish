"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, MessageCircle, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The four primary destinations in the app. Order matches the visual order,
 * which (because the app is RTL) renders right-to-left.
 */
const NAV_ITEMS = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/scenarios", label: "تمرین", icon: MessageCircle },
  { href: "/stats", label: "پیشرفت", icon: BarChart3 },
  { href: "/settings", label: "تنظیمات", icon: Settings },
] as const;

/**
 * Mobile-first bottom navigation bar.
 * Fixed to the viewport bottom with safe-area padding so it sits above the
 * Android nav bar / iOS home indicator (Capacitor-ready).
 *
 * The active tab is highlighted with an animated pill using Framer Motion's
 * `layoutId`, which smoothly slides between tabs.
 */
export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur-lg safe-bottom"
      aria-label="ناوبری اصلی"
    >
      <ul className="app-container flex items-stretch justify-around px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="relative flex h-14 w-full flex-col items-center justify-center gap-0.5 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="bottomnav-active"
                    className="absolute inset-x-2 inset-y-1 rounded-lg bg-brand-muted"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon
                  className={cn(
                    "relative z-10 size-5 transition-transform",
                    active && "scale-110 text-brand"
                  )}
                />
                <span
                  className={cn(
                    "relative z-10 text-[10px] font-medium leading-none",
                    active && "text-brand"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
