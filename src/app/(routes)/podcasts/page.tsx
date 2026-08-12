"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Headphones, Clock, ArrowLeft } from "lucide-react";
import { STORIES } from "@/data/podcasts";
import { DashboardLayout } from "@/components/layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { toPersianDigits } from "@/lib/utils";

export default function PodcastsPage() {
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
              پادکست و داستان صوتی 🎧
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              گوش بده، بخوان، بفهم — مهارت شنیداری‌ت رو تقویت کن!
            </p>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-cyan-500 text-white shadow-xl shadow-brand/30">
            <Headphones className="size-6" />
          </div>
        </div>
      </motion.header>

      <ul className="grid grid-cols-1 items-stretch gap-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {STORIES.map((s, i) => (
          <li key={s.id} className="flex">
            <Link href={`/podcasts/${s.id}`} className="block w-full focus-visible:outline-none">
              <GlassCard
                inView
                lift={6}
                className="group h-full cursor-pointer p-5 ring-1 ring-transparent transition-all hover:ring-brand/40"
              >
                <motion.div
                  initial={{ scale: 0.85 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="mb-3 text-4xl"
                >
                  {s.emoji}
                </motion.div>
                <h2 className="font-bold">{s.title}</h2>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {toPersianDigits(s.estimatedMinutes)} دقیقه
                  </span>
                  <span className="rounded-full bg-brand-muted px-2 py-0.5 text-[10px] font-bold text-brand">
                    {s.level}
                  </span>
                  <span className="ml-auto flex items-center gap-1 font-semibold text-brand">
                    گوش بده
                    <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          </li>
        ))}
      </ul>

      <GlassCard noSpotlight lift={2} className="mb-12 p-6 text-center">
        <p className="text-sm font-medium">
          هر داستان رو می‌تونی با صدای زن یا مرد و لهجه‌ی americikایی یا بریتانیایی گوش بدی! 🎙️
        </p>
      </GlassCard>
    </DashboardLayout>
  );
}
