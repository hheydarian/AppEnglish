"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { toPersianDigits } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface StreakCardProps {
  days: number;
  className?: string;
}

/**
 * A warm, attention-grabbing card celebrating the user's consecutive
 * practice days, with a flame icon that gently pulses.
 */
export function StreakCard({ days, className }: StreakCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-4 text-white shadow-md",
        className
      )}
    >
      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-12 items-center justify-center rounded-full bg-white/20 backdrop-blur"
        >
          <Flame className="size-7" />
        </motion.div>
        <div>
          <p className="text-3xl font-extrabold leading-none">
            {toPersianDigits(days)}
          </p>
          <p className="mt-1 text-xs font-medium text-white/90">روز متوالی تمرین 🔥</p>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -left-6 -bottom-6 size-24 rounded-full bg-yellow-300/30 blur-2xl" />
    </div>
  );
}
