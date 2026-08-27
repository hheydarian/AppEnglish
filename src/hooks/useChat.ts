"use client";

import { useCallback, useRef, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/userStore";
import { generateReplySafe } from "@/lib/ai";
import type { ChatRequestBody } from "@/lib/ai/types";
import type { CEFRLevel, ChatMessage, MessageMode } from "@/types";

interface UseChatOptions {
  scenarioId: string;
  level: CEFRLevel;
  language?: "en" | "fa";
}

interface UseChatReturn {
  /** Send a user message (text or transcribed voice) and get the AI reply. */
  sendMessage: (text: string, mode: MessageMode) => Promise<void>;
  /** Whether the AI is currently generating a reply. */
  isThinking: boolean;
  /** Optional error from the last turn. */
  error: string | null;
}

/**
 * Encapsulates the full conversation turn:
 *   user message → POST /api/chat → assistant message + feedback attached.
 *
 * Works on top of the persisted `chatStore`, so history survives refreshes.
 */
export function useChat({
  scenarioId,
  level,
  language = "en",
}: UseChatOptions): UseChatReturn {
  const addMessage = useChatStore((s) => s.addMessage);
  const attachFeedback = useChatStore((s) => s.attachFeedback);
  const setStatus = useChatStore((s) => s.setStatus);
  const setThinking = useChatStore((s) => s.setThinking);
  const setError = useChatStore((s) => s.setError);
  const recordTurn = useUserStore((s) => s.recordTurn);

  // Track the conversation history for the API independently of the store,
  // so we don't send the opening/system lines and can shape the payload.
  const historyRef = useRef<ChatMessage[]>([]);

  const [isThinkingState, setIsThinkingState] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string, mode: MessageMode) => {
      const trimmed = text.trim();
      if (!trimmed || isThinkingState) return;

      setErrorState(null);
      setError(null);

      // 1. Push the user message into the store + history.
      const userMsgId = addMessage({
        role: "user",
        content: trimmed,
        mode,
        language,
        status: "sent",
      });

      // Read the freshly added user message from the store for history.
      const session = useChatStore.getState().session;
      const userMsg = session?.messages.find((m) => m.id === userMsgId);
      if (userMsg) historyRef.current.push(userMsg);

      // 2. Ask the server for the AI reply.
      setThinking(true);
      setIsThinkingState(true);

      try {
        const payload: ChatRequestBody = {
          scenarioId,
          // Only user/assistant turns are sent; system lines stay server-side.
          messages: historyRef.current
            .filter(
              (m): m is ChatMessage & { role: "user" | "assistant" } =>
                m.role === "user" || m.role === "assistant"
            )
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
          level,
          language,
        };

        // Works both in the web build (→ /api/chat) and in the Capacitor
        // static build (→ browser-side client). See lib/ai/index.ts.
        const data = await generateReplySafe(payload);

        // 3a. Add the assistant reply.
        addMessage({
          role: "assistant",
          content: data.reply,
          mode: "text",
          language,
          status: "sent",
        });
        const updatedSession = useChatStore.getState().session;
        const lastAssistant = updatedSession?.messages.at(-1);
        if (lastAssistant) historyRef.current.push(lastAssistant);

        // 3b. Attach feedback to the user message (the one we just corrected).
        if (data.feedback.length > 0) {
          attachFeedback(userMsgId, data.feedback);
        }

        // 3c. Update the user's learning stats (streak, points, words, ...).
        // Estimate practice time: ~0.4 min per exchanged message pair.
        const practiceMinutes = Math.max(1, Math.round(0.4 * 2));
        recordTurn({
          scenarioId,
          messagesCount: 1,
          feedback: data.feedback,
          practiceMinutes,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "خطا در ارتباط با هوش مصنوعی.";
        setErrorState(message);
        setError(message);
        setStatus(userMsgId, "error");
      } finally {
        setThinking(false);
        setIsThinkingState(false);
      }
    },
    [
      addMessage,
      attachFeedback,
      setStatus,
      setThinking,
      setError,
      recordTurn,
      scenarioId,
      level,
      language,
      isThinkingState,
    ]
  );

  return { sendMessage, isThinking: isThinkingState, error: errorState };
}
