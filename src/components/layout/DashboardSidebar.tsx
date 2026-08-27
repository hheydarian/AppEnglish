"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Home,
  MessagesSquare,
  Headphones,
  BarChart3,
  Settings,
  Flame,
} from "lucide-react";
import { cn, toPersianDigits } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";

const NAV = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/scenarios", label: "تمرین", icon: MessagesSquare },
  { href: "/podcasts", label: "پادکست", icon: Headphones },
  { href: "/stats", label: "پیشرفت", icon: BarChart3 },
  { href: "/settings", label: "تنظیمات", icon: Settings },
] as const;

/**
 * DashboardSidebar — desktop-only navigation rail (lg+).
 *
 * On mobile the BottomNav takes over; this is the left panel of the split
 * dashboard. Shows the SpeakUp mark, primary nav, and a live streak chip
 * pulled from the user store.
 */
export function DashboardSidebar() {
  const pathname = usePathname();
  const streak = useUserStore((s) => s.streakDays);
  const points = useUserStore((s) => s.totalPoints);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="sticky top-0 hidden h-dvh w-[260px] shrink-0 flex-col border-l border-white/10 bg-white/[0.03] backdrop-blur-2xl lg:flex">
      {/* Brand — ZabanYar */}
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="size-10 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-cyan-500 shadow-lg shadow-brand/30">
          <Image
            src="/logo.jpg"
            alt="ZabanYar"
            width={40}
            height={40}
            className="size-full object-cover"
          />
        </div>
        <div>
          <p className="font-extrabold leading-none text-gradient-brand">ZabanYar</p>
          <p className="mt-1 text-[11px] text-muted-foreground">از صفر تا تسلط</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3" aria-label="ناوبری اصلی">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "text-brand"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-brand-muted"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <motion.span
                whileHover={{ scale: 1.15, rotate: active ? 0 : -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative z-10"
              >
                <Icon className="size-5" />
              </motion.span>
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Streak / points chip */}
      <div className="m-3 rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/15 to-red-500/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-orange-300">
          <Flame className="size-4" />
          {toPersianDigits(streak)} روز زنده!
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {toPersianDigits(points)} امتیاز جمع کردی ⭐
        </p>
      </div>
    </aside>
  );
}
