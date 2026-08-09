"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";
import { getScenarioById } from "@/data/scenarios";
import { useChatStore } from "@/store/chatStore";
import { useChat } from "@/hooks/useChat";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTTS } from "@/hooks/useTTS";
import { MessageList } from "@/components/chat";
import { VoiceRecorderButton } from "@/components/voice/VoiceRecorderButton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  useSettingsStore,
  ACCENT_TO_LOCALE,
  PROFICIENCY_TO_CEFR,
} from "@/store/settingsStore";

export default function ChatView({ scenarioId }: { scenarioId: string }) {
  const router = useRouter();
  const scenario = useMemo(() => getScenarioById(scenarioId), [scenarioId]);

  /* ---- store ---- */
  const session = useChatStore((s) => s.session);
  const startSession = useChatStore((s) => s.startSession);
  const resetSession = useChatStore((s) => s.resetSession);
  const setRecording = useChatStore((s) => s.setRecording);
  const setSpeaking = useChatStore((s) => s.setSpeaking);

  /* ---- settings (level, accent, rate) ---- */
  const proficiency = useSettingsStore((s) => s.proficiency);
  const accent = useSettingsStore((s) => s.accent);
  const ttsRate = useSettingsStore((s) => s.ttsRate);
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

  /* ---- TTS ---- */
  const tts = useTTS({ lang: locale, rate: ttsRate });
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(
    null
  );
  useEffect(() => setSpeaking(tts.isSpeaking), [tts.isSpeaking, setSpeaking]);

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
    sendMessage(draft, "text");
    setDraft("");
  };

  /* ---- voice input ---- */
  const recognition = useSpeechRecognition({
    lang: locale,
    onResult: (text, isFinal) => {
      setDraft(text);
      if (isFinal) {
        // Auto-send once recognition finalizes.
        setTimeout(() => {
          sendMessage(text, "voice");
          setDraft("");
        }, 150);
      }
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
        <div className="flex size-9 items-center justify-center rounded-full bg-card text-xl shadow-sm ring-1 ring-border">
          {scenario.role.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold">{scenario.title}</h1>
          <p className="truncate text-xs text-muted-foreground">
            {scenario.role.name}
          </p>
        </div>
        <Badge variant="secondary">{effectiveLevel}</Badge>
      </header>

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
