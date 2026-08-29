"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VolumeX, Settings, X } from "lucide-react";
import {
  getTtsHealth,
  onTtsHealthChange,
  openTtsSettings,
  isNativePlatform,
  type TtsHealth,
} from "@/lib/ttsEngine";
import { success } from "@/lib/feedback";

/**
 * TtsGuideModal — a minimal, beautiful self-healing dialog.
 *
 * Appears automatically ONCE when the device's TTS engine cannot speak the
 * target language (usually: English voice data not installed). Guides the
 * user to the system Text-to-Speech settings with a one-tap deep link
 * (android.settings.TTS_SETTINGS via the plugin's openInstall()).
 */
export function TtsGuideModal() {
  const [health, setHealth] = useState<TtsHealth>(getTtsHealth());
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Subscribe to engine health changes reported by ttsEngine.
  useEffect(() => {
    const off = onTtsHealthChange((h) => setHealth(h));
    // Defer the initial read out of the synchronous effect body.
    const t = setTimeout(() => setHealth(getTtsHealth()), 0);
    return () => {
      clearTimeout(t);
      off();
    };
  }, []);

  // Auto-open once per app session when the engine is missing on native.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const native = await isNativePlatform();
        if (!cancelled && native && health === "engine-missing" && !dismissed) {
          setOpen(true);
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [health, dismissed]);

  const close = () => {
    setOpen(false);
    setDismissed(true);
  };

  const openSettings = async () => {
    try {
      await openTtsSettings();
      success();
    } finally {
      close();
    }
  };

  const show = open && health === "engine-missing";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.92, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-white/20 bg-card/95 p-6 shadow-2xl backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <VolumeX className="size-6" />
              </div>
              <button
                onClick={close}
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                aria-label="بستن"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Body */}
            <h3 className="text-lg font-bold">موتور صوتی غیرفعال است</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              موتور صوتی گوشی شما برای زبان انگلیسی فعال نیست. برای شنیدن تلفظ‌ها،
              لطفاً در تنظیمات گوشی بخش <b className="text-foreground">Text-to-Speech</b>{" "}
              موتور <b className="text-foreground">Google Speech Services</b> را
              انتخاب و صدای انگلیسی را نصب کنید.
            </p>

            {/* Steps */}
            <ol className="mt-4 space-y-2 text-xs text-muted-foreground">
              {[
                "روی دکمه‌ی «باز کردن تنظیمات» بزنید",
                "در بخش Text-to-Speech موتور Google را انتخاب کنید",
                "زبان English (United States) را نصب کنید",
                "به ZabanYar برگردید — صدا فعال است!",
              ].map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-muted text-[10px] font-bold text-brand">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            {/* Actions */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={close}
                className="min-h-11 flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                بعداً
              </button>
              <button
                onClick={openSettings}
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-brand py-2.5 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition-transform hover:scale-[1.02]"
              >
                <Settings className="size-4" />
                باز کردن تنظیمات
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
