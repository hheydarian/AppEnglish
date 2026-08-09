"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderButtonProps {
  /** Whether recording is currently active. */
  isRecording: boolean;
  /** Whether the browser supports speech recognition. */
  isSupported: boolean;
  /** Toggle recording on/off. */
  onToggle: () => void;
  /** Current interim transcript to display while recording. */
  interimTranscript?: string;
}

/**
 * A large, tactile record button with an animated waveform ring while active.
 * When the browser doesn't support speech recognition, it renders as a
 * disabled, muted control so the user understands voice input is unavailable.
 */
export function VoiceRecorderButton({
  isRecording,
  isSupported,
  onToggle,
  interimTranscript,
}: VoiceRecorderButtonProps) {
  if (!isSupported) {
    return (
      <button
        type="button"
        disabled
        className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
        title="مرورگر شما از تشخیص صدا پشتیبانی نمی‌کند"
      >
        <MicOff className="size-5" />
      </button>
    );
  }

  return (
    <div className="relative flex size-12 items-center justify-center">
      {/* Pulsing rings while recording */}
      <AnimatePresence>
        {isRecording && (
          <>
            <motion.span
              key="ring-1"
              className="absolute inset-0 rounded-full bg-red-500/30"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              key="ring-2"
              className="absolute inset-0 rounded-full bg-red-500/20"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* The button itself */}
      <motion.button
        type="button"
        onClick={onToggle}
        whileTap={{ scale: 0.9 }}
        animate={
          isRecording
            ? { backgroundColor: "#ef4444", scale: [1, 1.08, 1] }
            : { backgroundColor: "var(--brand)", scale: 1 }
        }
        transition={
          isRecording
            ? { scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } }
            : { duration: 0.2 }
        }
        className={cn(
          "relative flex size-12 items-center justify-center rounded-full text-white shadow-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
        aria-pressed={isRecording}
        aria-label={isRecording ? "توقف ضبط" : "شروع ضبط صدا"}
        title={interimTranscript || (isRecording ? "در حال گوش دادن..." : "ضبط صدا")}
      >
        {isRecording ? (
          <Square className="size-4 fill-current" />
        ) : (
          <Mic className="size-5" />
        )}
      </motion.button>
    </div>
  );
}
