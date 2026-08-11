"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, MessagesSquare, Sparkles } from "lucide-react";
import { SCENARIOS } from "@/data/scenarios";
import { DashboardLayout } from "@/components/layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { formatMinutes, toPersianDigits } from "@/lib/utils";

export default function ScenariosPage() {
  return (
    <DashboardLayout>
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-10 pb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold sm:text-3xl">
              برو تو ماجرا! 🎬
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              یه موقعیت واقعی انتخاب کن و با هوش مصنوعی مکالمه کن. اصلاحات
              گرامری هم لحظه‌ای کنارته.
            </p>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-cyan-500 text-white shadow-xl shadow-brand/30">
            <MessagesSquare className="size-6" />
          </div>
        </div>
      </motion.header>

      {/* Scenario grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <ul className="grid grid-cols-1 gap-4 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {SCENARIOS.map((s, i) => (
          <li key={s.id}>
            {/* The ENTIRE card is a link — fully clickable per the skill rule #3 */}
            <Link
              href={`/chat/${s.id}`}
              className="block focus-visible:outline-none"
              aria-label={`شروع سناریوی ${s.title}`}
            >
              <GlassCard
                inView
                lift={6}
                className="group h-full cursor-pointer p-5 ring-1 ring-transparent transition-all hover:ring-brand/40"
              >
                <div className="flex items-center gap-4">
                  {/* 3D-feeling icon tile */}
                  <motion.div
                    initial={{ scale: 0.85, rotate: -8 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
                    whileHover={{ rotate: 6, scale: 1.05 }}
                    className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/30 to-cyan-600/10 shadow-lg"
                  >
                    <Icon name={s.icon} className="size-7 text-brand" />
                  </motion.div>

                  {/* Body */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate font-bold">{s.title}</h2>
                      <span className="rounded-full bg-brand-muted px-2 py-0.5 text-[10px] font-bold text-brand">
                        {s.difficulty}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {toPersianDigits(formatMinutes(s.estimatedMinutes))}
                      </span>
                      <span>{toPersianDigits(s.objectives.length)} هدف</span>
                      <span className="ml-auto flex items-center gap-1 font-semibold text-brand">
                        شروع
                        <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </li>
        ))}
      </ul>

      {/* Motivating footer */}
      <GlassCard
        noSpotlight
        lift={2}
        className="mb-12 flex flex-col items-center gap-2 p-6 text-center"
      >
        <Sparkles className="size-6 text-brand" />
        <p className="text-sm font-medium">
          یادت باشه: اشتباه کردن بخش ماجراست! 🚀
        </p>
        <p className="text-xs text-muted-foreground">
          هرچی بیشتر تمرین کنی، روان‌تر حرف می‌زنی. هوش مصنوعی صبوره و همیشه
          کنارته.
        </p>
      </GlassCard>
    </DashboardLayout>
  );
}
