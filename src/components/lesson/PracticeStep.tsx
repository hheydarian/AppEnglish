"use client";

import { motion } from "framer-motion";
import { Mic, MessageCircle, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import type { LessonContent } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

interface PracticeStepProps {
  content: LessonContent;
  lessonTitle: string;
  /** The lesson id — /chat/[lessonId] opens a lesson-specific AI conversation. */
  lessonId: string;
  onFinish: () => void;
}

/**
 * Step 4 — A friendly "ready to talk?" gateway into a live AI conversation.
 *
 * ALWAYS routes to /chat/[lessonId], where resolveChatScenario() gives the
 * AI a character + objectives tailored to exactly what was just learned.
 * Never falls back to /scenarios — that was the old bug.
 */
export function PracticeStep({ content, lessonTitle, lessonId, onFinish }: PracticeStepProps) {
  // Direct, lesson-specific chat route.
  const chatHref = `/chat/${lessonId}`;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan-500 text-white shadow-xl shadow-brand/40"
      >
        <Mic className="size-9" />
      </motion.div>

      <GlassCard className="w-full max-w-md p-6 text-center">
        <h3 className="flex items-center justify-center gap-2 text-xl font-bold">
          <Sparkles className="size-5 text-brand" />
          همه‌چی رو یاد گرفتی!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          حالا وقتشه اون چیزایی که تو «{lessonTitle}» یاد گرفتی رو تو یه مکالمه‌ی
          واقعی امتحان کنی. نگران نباش — هوش مصنوعی صبوره و همیشه کمکت می‌کنه! 🤗
        </p>

        <div className="mt-5 rounded-xl bg-brand-muted/40 p-3" dir="ltr">
          <p className="text-sm font-medium text-brand">
            🎯 {content.practicePrompt ?? "Practice what you learned!"}
          </p>
        </div>
      </GlassCard>

      <div className="mt-6 flex w-full max-w-md flex-col gap-3">
        <Link href={chatHref}>
          <Button className="w-full rounded-full bg-brand py-3 text-brand-foreground shadow-lg shadow-brand/30">
            <MessageCircle className="size-5" />
            بریم حرف بزنیم! 🎙️
          </Button>
        </Link>
        <Button
          onClick={onFinish}
          variant="outline"
          className="rounded-full"
        >
          <ArrowLeft className="size-4" />
          بعداً تمرین می‌کنم
        </Button>
      </div>
    </div>
  );
}
