"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Clock, ArrowLeft } from "lucide-react";
import { SCENARIOS } from "@/data/scenarios";
import { AppShell } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { formatMinutes, toPersianDigits } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/* Map scenario.icon string → lucide component. */
function getIcon(name: string): LucideIcon {
  return (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.MessageCircle;
}

export default function ScenariosPage() {
  return (
    <AppShell>
      <header className="pt-10 pb-4">
        <h1 className="text-2xl font-bold">سناریوها</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          یک موقعیت واقعی انتخاب کن و مکالمه رو شروع کن.
        </p>
      </header>

      <ul className="space-y-3 pb-4">
        {SCENARIOS.map((s, i) => {
          const Icon = getIcon(s.icon);
          return (
            <li key={s.id}>
              <Link href={`/chat/${s.id}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Icon tile */}
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-muted text-brand">
                    <Icon className="size-6" />
                  </div>

                  {/* Body */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-semibold">{s.title}</h3>
                      <Badge variant="secondary" className="shrink-0">
                        {s.difficulty}
                      </Badge>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {s.description}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {toPersianDigits(formatMinutes(s.estimatedMinutes))}
                      </span>
                      <span>{toPersianDigits(s.objectives.length)} هدف</span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <ArrowLeft className="size-5 shrink-0 text-muted-foreground" />
                </motion.div>
              </Link>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
