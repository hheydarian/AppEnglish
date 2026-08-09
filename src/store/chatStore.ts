"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ChatMessage,
  ChatSession,
  Feedback,
  MessageMode,
} from "@/types";
import { uid } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface ChatState {
  /* The active session (persisted so a refresh mid-conversation survives). */
  session: ChatSession | null;
  /* UI flags for async operations. */
  isThinking: boolean;
  isRecording: boolean;
  isSpeaking: boolean;
  /* Transient error message shown in a toast/banner. */
  error: string | null;

  /* ---- session lifecycle ---- */
  startSession: (scenarioId: string, mode: MessageMode) => void;
  endSession: () => void;
  resetSession: () => void;

  /* ---- messages ---- */
  addMessage: (msg: Omit<ChatMessage, "id" | "createdAt">) => string;
  appendAssistantChunk: (id: string, chunk: string) => void;
  attachFeedback: (messageId: string, feedback: Feedback[]) => void;
  setStatus: (messageId: string, status: ChatMessage["status"]) => void;

  /* ---- ui flags ---- */
  setThinking: (v: boolean) => void;
  setRecording: (v: boolean) => void;
  setSpeaking: (v: boolean) => void;
  setError: (msg: string | null) => void;
}

/* -------------------------------------------------------------------------- */
/*  Store                                                                     */
/* -------------------------------------------------------------------------- */

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      session: null,
      isThinking: false,
      isRecording: false,
      isSpeaking: false,
      error: null,

      startSession: (scenarioId, mode) =>
        set({
          session: {
            id: uid("ses"),
            scenarioId,
            messages: [],
            startedAt: Date.now(),
            status: "active",
            mode,
          },
          isThinking: false,
          isRecording: false,
          isSpeaking: false,
          error: null,
        }),

      endSession: () =>
        set((s) =>
          s.session
            ? { session: { ...s.session, status: "completed" } }
            : { session: null }
        ),

      resetSession: () =>
        set({
          session: null,
          isThinking: false,
          isRecording: false,
          isSpeaking: false,
          error: null,
        }),

      addMessage: (msg) => {
        const id = uid("msg");
        const full: ChatMessage = { ...msg, id, createdAt: Date.now() };
        set((s) =>
          s.session
            ? {
                session: {
                  ...s.session,
                  messages: [...s.session.messages, full],
                },
              }
            : {}
        );
        return id;
      },

      appendAssistantChunk: (id, chunk) =>
        set((s) => {
          if (!s.session) return {};
          return {
            session: {
              ...s.session,
              messages: s.session.messages.map((m) =>
                m.id === id ? { ...m, content: m.content + chunk } : m
              ),
            },
          };
        }),

      attachFeedback: (messageId, feedback) =>
        set((s) => {
          if (!s.session) return {};
          return {
            session: {
              ...s.session,
              messages: s.session.messages.map((m) =>
                m.id === messageId ? { ...m, feedback } : m
              ),
            },
          };
        }),

      setStatus: (messageId, status) =>
        set((s) => {
          if (!s.session) return {};
          return {
            session: {
              ...s.session,
              messages: s.session.messages.map((m) =>
                m.id === messageId ? { ...m, status } : m
              ),
            },
          };
        }),

      setThinking: (v) => set({ isThinking: v }),
      setRecording: (v) => set({ isRecording: v }),
      setSpeaking: (v) => set({ isSpeaking: v }),
      setError: (msg) => set({ error: msg }),
    }),
    {
      name: "speakup-chat",
      storage: createJSONStorage(() => localStorage),
      // Only persist the session itself, not transient UI flags.
      partialize: (state) => ({ session: state.session }),
    }
  )
);
