"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import type { ChatMessage } from "@/types";
import { ChatBubble } from "./ChatBubble";

interface MessageListProps {
  messages: ChatMessage[];
  /** The AI character's avatar emoji. */
  avatar?: string;
  /** id of the message currently being spoken via TTS. */
  speakingMessageId?: string | null;
  /** Speak a given message via TTS. */
  onSpeak?: (text: string, messageId: string) => void;
  /** Show the "AI is typing…" indicator at the end. */
  isThinking?: boolean;
}

/**
 * Scrollable list of chat messages that auto-scrolls to the bottom whenever
 * new messages arrive or the assistant is thinking.
 */
export function MessageList({
  messages,
  avatar,
  speakingMessageId,
  onSpeak,
  isThinking,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth-scroll the bottom into view on any change.
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  return (
    <div
      ref={containerRef}
      className="flex-1 space-y-4 overflow-y-auto px-1 py-4"
    >
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            avatar={avatar}
            isSpeaking={speakingMessageId === message.id}
            onSpeak={
              onSpeak ? (text) => onSpeak(text, message.id) : undefined
            }
          />
        ))}
      </AnimatePresence>

      {/* Typing indicator */}
      {isThinking && <TypingIndicator avatar={avatar} />}

      {/* Auto-scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}

/** Three-dot pulsing indicator shown while the AI is "thinking". */
function TypingIndicator({ avatar }: { avatar?: string }) {
  return (
    <div className="flex gap-2" dir="ltr">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-card text-lg shadow-sm ring-1 ring-border">
        {avatar ?? "🤖"}
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-ss-md bg-card px-4 py-3 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2 animate-bounce rounded-full bg-muted-foreground/60"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
