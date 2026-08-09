"use client";

import { motion } from "framer-motion";
import { Volume2, Check, AlertTriangle } from "lucide-react";
import type { ChatMessage } from "@/types";
import { cn, formatTime } from "@/lib/utils";
import { FeedbackInline } from "./FeedbackInline";

interface ChatBubbleProps {
  message: ChatMessage;
  /** The avatar emoji for the AI character. */
  avatar?: string;
  /** Whether the AI's TTS is currently playing this message. */
  isSpeaking?: boolean;
  /** Callback to speak this message via TTS. */
  onSpeak?: (text: string) => void;
}

/**
 * A single chat message bubble.
 * - User messages align to the inline-end side with brand colors + feedback panel.
 * - Assistant messages align to the inline-start side with a neutral card + avatar.
 *
 * Uses logical properties (ms/me/ps/pe) so it mirrors correctly in RTL.
 */
export function ChatBubble({ message, avatar, isSpeaking, onSpeak }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={cn(
        "flex w-full gap-2",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar / status icon */}
      <div className="mt-auto shrink-0">
        {isUser ? (
          <div className="flex size-8 items-center justify-center rounded-full bg-brand-muted text-xs font-bold text-brand">
            من
          </div>
        ) : (
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full bg-card text-lg shadow-sm ring-1 ring-border",
              isSpeaking && "ring-brand"
            )}
          >
            {avatar ?? "🤖"}
          </div>
        )}
      </div>

      {/* Bubble + meta */}
      <div className={cn("flex max-w-[80%] flex-col", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
            isUser
              ? "rounded-se-md bg-gradient-to-br from-brand to-cyan-600 text-white"
              : "rounded-ss-md bg-card text-card-foreground"
          )}
          dir="auto"
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>

          {/* Footer: time + status + speak */}
          <div
            className={cn(
              "mt-1 flex items-center gap-2 text-[10px]",
              isUser ? "text-white/70" : "text-muted-foreground"
            )}
          >
            <span>{formatTime(message.createdAt)}</span>
            {message.status === "sending" && (
              <span className="opacity-70">…</span>
            )}
            {message.status === "error" && <AlertTriangle className="size-3" />}
            {!isUser && onSpeak && (
              <button
                type="button"
                onClick={() => onSpeak(message.content)}
                className={cn(
                  "rounded-full p-0.5 transition-colors hover:text-foreground",
                  isSpeaking && "text-brand"
                )}
                aria-label="پخش صدا"
              >
                <Volume2 className="size-3" />
              </button>
            )}
            {!isUser && message.status === "sent" && (
              <Check className="size-3 text-emerald-500" />
            )}
          </div>
        </div>

        {/* Feedback panel — only for user messages */}
        {isUser && message.feedback && message.feedback.length > 0 && (
          <div className="w-full min-w-[220px]">
            <FeedbackInline feedback={message.feedback} onSpeak={onSpeak} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
