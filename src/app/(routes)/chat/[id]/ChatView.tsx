"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Send, Gauge, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { resolveChatScenario } from "@/data/lesson-scenarios";
import { useChatStore } from "@/store/chatStore";
import { useChat } from "@/hooks/useChat";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTTS } from "@/hooks/useTTS";
import { MessageList } from "@/components/chat";
import { VoiceRecorderButton } from "@/components/voice/VoiceRecorderButton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { tap } from "@/lib/feedback";
import {
  useSettingsStore,
  ACCENT_TO_LOCALE,
  PROFICIENCY_TO_CEFR,
} from "@/store/settingsStore";

export default function ChatView({ scenarioId }: { scenarioId: string }) {
  const router = useRouter();
  // Resolve BOTH real scenarios (cafe-ordering, casual-chat, ...) AND
  // lesson-specific A0 chats (/chat/a0-1-3, /chat/a0-2-2, ...).
  const scenario = useMemo(() => resolveChatScenario(scenarioId), [scenarioId]);

  /* ---- store ---- */
  const session = useChatStore((s) => s.session);
  const startSession = useChatStore((s) => s.startSession);
  const resetSession = useChatStore((s) => s.resetSession);
  const setRecording = useChatStore((s) => s.setRecording);
  const setSpeaking = useChatStore((s) => s.setSpeaking);

  /* ---- settings (level, accent, rate, voice gender) ---- */
  const proficiency = useSettingsStore((s) => s.proficiency);
  const accent = useSettingsStore((s) => s.accent);
  const ttsRate = useSettingsStore((s) => s.ttsRate);
  const voiceGender = useSettingsStore((s) => s.voiceGender);
  const setAccent = useSettingsStore((s) => s.setAccent);
  const setTtsRate = useSettingsStore((s) => s.setTtsRate);
  const locale = ACCENT_TO_LOCALE[accent];
  // User's chosen proficiency overrides the scenario's default difficulty,
  // so the AI adapts its language to the learner's actual level.
  const effectiveLevel = PROFICIENCY_TO_CEFR[proficiency];

  /* ---- chat logic ---- */
  const { sendMessage, isThinking } = useChat({
    scenarioId,
    level: effectiveLevel,
    language: "en",
  });

  /* ---- TTS (normal + a slow instance for the "Replay slow" button) ---- */
  const tts = useTTS({ lang: locale, rate: ttsRate, voiceGender });
  const ttsSlow = useTTS({ lang: locale, rate: Math.max(0.5, ttsRate * 0.6), voiceGender });
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(
    null
  );
  useEffect(() => setSpeaking(tts.isSpeaking || ttsSlow.isSpeaking), [
    tts.isSpeaking,
    ttsSlow.isSpeaking,
    setSpeaking,
  ]);

  /** The most recent AI message text — used by the "Replay slow" button. */
  const lastAssistantText = useMemo(() => {
    const msgs = session?.messages ?? [];
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].role === "assistant") return msgs[i].content;
    }
    return null;
  }, [session?.messages]);

  /** Replay the last AI reply at a slower speed. */
  const replaySlow = () => {
    if (!lastAssistantText) return;
    tts.cancel();
    ttsSlow.speak(lastAssistantText);
  };

  const handleSpeak = (text: string, messageId: string) => {
    if (speakingMessageId === messageId && tts.isSpeaking) {
      tts.cancel();
      setSpeakingMessageId(null);
    } else {
      tts.speak(text);
      setSpeakingMessageId(messageId);
    }
  };

  /* ---- text input ---- */
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submitText = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!draft.trim()) return;
    tap();
    sendMessage(draft, "text");
    setDraft("");
  };

  /* ---- voice input ----
   * Speech is transcribed LIVE into the input box (so the user sees what was
   * heard and can edit it) and is NOT auto-sent. The user reviews the text
   * then taps Send like a normal message. */
  const recognition = useSpeechRecognition({
    lang: locale,
    onResult: (text) => {
      setDraft(text);
    },
    onEnd: () => setRecording(false),
  });

  const toggleRecording = () => {
    if (recognition.isListening) {
      recognition.stop();
      setRecording(false);
    } else {
      setDraft("");
      recognition.start();
      setRecording(true);
    }
  };

  /* ---- session bootstrap ---- */
  // (Re)start the session when the scenario changes.
  useEffect(() => {
    if (!scenario) return;
    // Only (re)start if there's no session for this scenario yet.
    if (!session || session.scenarioId !== scenario.id) {
      startSession(scenario.id, "text");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario?.id]);

  // Seed the opening line as the first assistant message.
  const messages = session?.messages ?? [];
  const hasOpening = messages.some((m) => m.role === "assistant");
  useEffect(() => {
    if (scenario && session && !hasOpening) {
      // Add the opening line directly via the store.
      useChatStore.getState().addMessage({
        role: "assistant",
        content: scenario.opening,
        mode: "text",
        language: scenario.language,
        status: "sent",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario?.id, session?.id, hasOpening]);

  /* ---- invalid scenario ---- */
  if (!scenario) {
    return (
      <div className="app-container flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg font-semibold">سناریو پیدا نشد.</p>
        <Link
          href="/scenarios"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground"
        >
          بازگشت به سناریوها
        </Link>
      </div>
    );
  }

  return (
    <div className="app-container flex h-dvh flex-col bg-background">
      {/* Header */}
      <header className="safe-top flex items-center gap-3 border-b border-border px-4 py-3">
        <button
          onClick={() => {
            resetSession();
            router.push("/scenarios");
          }}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          aria-label="بازگشت"
        >
          <ArrowRight className="size-5" />
        </button>
        <motion.div
          className="relative flex size-9 items-center justify-center rounded-full bg-card text-xl shadow-sm ring-1 ring-border"
          animate={
            tts.isSpeaking || ttsSlow.isSpeaking
              ? { scale: [1, 1.08, 1] }
              : { scale: 1 }
          }
          transition={
            tts.isSpeaking || ttsSlow.isSpeaking
              ? { duration: 0.7, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        >
          {scenario.role.avatar}
          {(tts.isSpeaking || ttsSlow.isSpeaking) && (
            <motion.span
              className="absolute inset-0 rounded-full bg-brand/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold">{scenario.title}</h1>
          <p className="truncate text-xs text-muted-foreground">
            {scenario.role.name}
          </p>
        </div>
        <Badge variant="secondary">{effectiveLevel}</Badge>
      </header>

      {/* Voice control toolbar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2 text-xs">
        {/* TTS rate cycle: 0.75 → 1.0 → 1.25 → back */}
        <button
          onClick={() => {
            const next =
              ttsRate >= 1.2 ? 0.75 : ttsRate >= 0.95 ? 1.25 : 1.0;
            setTtsRate(next);
          }}
          className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 transition-colors hover:bg-muted"
          aria-label="سرعت پخش صدا"
        >
          <Gauge className="size-3.5" />
          {ttsRate.toFixed(2)}×
        </button>

        {/* Accent toggle US/UK */}
        <button
          onClick={() => setAccent(accent === "us" ? "uk" : accent === "uk" ? "au" : "us")}
          className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 transition-colors hover:bg-muted"
          aria-label="لهجه"
        >
          {accent === "us" ? "🇺🇸 US" : accent === "uk" ? "🇬🇧 UK" : "🇦🇺 AU"}
        </button>

        {/* Replay last AI message slowly */}
        <button
          onClick={replaySlow}
          disabled={!lastAssistantText}
          className="ms-auto flex items-center gap-1 rounded-full border border-brand/30 bg-brand-muted/40 px-2.5 py-1 font-medium text-brand transition-colors hover:bg-brand-muted/70 disabled:opacity-40"
          aria-label="پخش آهسته آخرین پیام"
        >
          <RotateCcw className="size-3.5" />
          پخش آهسته
        </button>
      </div>

      {/* Messages */}
      <MessageList
        messages={messages}
        avatar={scenario.role.avatar}
        speakingMessageId={speakingMessageId}
        onSpeak={handleSpeak}
        isThinking={isThinking}
      />

      {/* Live transcript while recording */}
      {recognition.isListening && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-1 text-center text-xs text-muted-foreground"
          dir="ltr"
        >
          {recognition.interimTranscript || "در حال گوش دادن..."}
        </motion.div>
      )}

      {/* Input bar */}
      <form
        onSubmit={submitText}
        className="safe-bottom flex items-center gap-2 border-t border-border bg-background/80 px-3 py-3 backdrop-blur"
      >
        <VoiceRecorderButton
          isRecording={recognition.isListening}
          isSupported={recognition.isSupported}
          onToggle={toggleRecording}
          interimTranscript={recognition.interimTranscript}
        />
        <Input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="پیام بنویس..."
          dir="ltr"
          disabled={isThinking}
          className={cn("flex-1", recognition.isListening && "opacity-50")}
        />
        <button
          type="submit"
          disabled={!draft.trim() || isThinking}
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-colors hover:bg-brand/90 disabled:opacity-40"
          aria-label="ارسال"
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
}
