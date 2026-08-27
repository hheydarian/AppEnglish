"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AudioLines,
  GraduationCap,
  Gauge,
  Volume2,
  Palette,
  Database,
  Download,
  Upload,
  MessageSquareOff,
  Trash2,
  Wifi,
  WifiOff,
  AlertTriangle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTTS } from "@/hooks/useTTS";
import { useChatStore } from "@/store/chatStore";
import {
  secureGetItem,
  secureSetItem,
  secureRemoveItem,
} from "@/lib/secureStorage";
import { cn, toPersianDigits } from "@/lib/utils";
import { tap, success } from "@/lib/feedback";
import {
  useSettingsStore,
  ACCENT_TO_LOCALE,
  TTS_PRESETS,
  APP_VERSION,
  type Accent,
  type VoiceGender,
  type DefaultLevelBand,
  type GlassStyle,
} from "@/store/settingsStore";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const STORAGE_KEYS = [
  "speakup-settings",
  "speakup-user",
  "speakup-lessons",
  "speakup-chat",
];

const ACCENTS: { value: Accent; label: string; flag: string }[] = [
  { value: "us", label: "آمریکایی", flag: "🇺🇸" },
  { value: "uk", label: "بریتانیایی", flag: "🇬🇧" },
  { value: "au", label: "استرالیایی", flag: "🇦🇺" },
];

const LEVEL_BANDS: { value: DefaultLevelBand; label: string; range: string }[] = [
  { value: "beginner", label: "مبتدی", range: "A0–A2" },
  { value: "intermediate", label: "متوسط", range: "B1–B2" },
  { value: "advanced", label: "پیشرفته", range: "C1–C2" },
];

const SPEED_LABELS = ["آرام", "طبیعی", "سریع"];

const PREVIEW_SENTENCE = "Welcome to SpeakUp! I am your AI language partner.";

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function SettingsPage() {
  const s = useSettingsStore();

  // Live preview engine — always reflects the current voice settings.
  const preview = useTTS({
    lang: ACCENT_TO_LOCALE[s.accent],
    rate: s.ttsRate,
    voiceGender: s.voiceGender,
  });

  // Online/offline status + local-storage footprint.
  // Initial values are read inside a macrotask callback (never synchronously
  // in the effect body) to avoid cascading renders; listeners keep it live.
  const [online, setOnline] = useState(true);
  const [storageBytes, setStorageBytes] = useState(0);

  const refreshStorage = () => {
    let total = 0;
    for (const k of Object.keys(localStorage)) {
      // SecureStorage writes under `sec:speakup-*`; legacy plaintext too.
      if (k.startsWith("speakup") || k.startsWith("sec:speakup")) {
        total += (k + (localStorage.getItem(k) ?? "")).length * 2;
      }
    }
    setStorageBytes(total);
  };

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    // Defer the initial read out of the synchronous effect body.
    const t = setTimeout(() => {
      setOnline(navigator.onLine);
      refreshStorage();
    }, 0);
    return () => {
      clearTimeout(t);
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
     
  }, []);

  // Two-step destructive dialogs.
  const [resetStage, setResetStage] = useState<0 | 1 | 2>(0); // 0 closed, 1 arm, 2 final
  const [clearChatArmed, setClearChatArmed] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ---------- handlers ---------- */

  // Export reads the DECRYPTED values via SecureStorage so backups stay
  // portable, then re-imports through the same secure path (re-sealed).
  const exportProgress = () => {
    const data: Record<string, string> = {};
    for (const k of STORAGE_KEYS) {
      const v = secureGetItem(k);
      if (v) data[k] = v; // already JSON strings — keep as raw strings
    }
    const blob = new Blob(
      [JSON.stringify({ app: "speakup", version: 3, exportedAt: new Date().toISOString(), data }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `speakup-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    success();
  };

  const importProgress = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text());
      if (parsed?.app !== "speakup" || typeof parsed?.data !== "object") throw new Error("bad");
      Object.entries(parsed.data as Record<string, string>).forEach(([k, v]) => {
        if (STORAGE_KEYS.includes(k as never)) secureSetItem(k, String(v));
      });
      location.reload();
    } catch {
      alert("فایل پشتیبان معتبر نیست! ❌");
    }
  };

  const clearChats = () => {
    useChatStore.getState().resetSession();
    secureRemoveItem("speakup-chat");
    setClearChatArmed(false);
    refreshStorage();
    success();
  };

  const fullReset = () => {
    STORAGE_KEYS.forEach((k) => secureRemoveItem(k));
    location.reload();
  };

  const kb = (storageBytes / 1024).toFixed(1);

  /* ======================================================================== */
  return (
    <DashboardLayout>
      <header className="pt-10 pb-4">
        <h1 className="text-2xl font-bold">تنظیمات</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          هر تغییری همین لحظه روی کل اپلیکیشن اعمال می‌شه! ⚡
        </p>
      </header>

      {/* ============ ۱) صدا و هویت هوش مصنوعی ============ */}
      <Section icon={AudioLines} title="صدای هوش مصنوعی">
        {/* Gender */}
        <OptionRow label="جنسیت گوینده">
          <div className="flex gap-2">
            {(["female", "male"] as VoiceGender[]).map((g) => (
              <GlassPill
                key={g}
                active={s.voiceGender === g}
                onClick={() => {
                  tap();
                  s.setVoiceGender(g);
                }}
              >
                {g === "female" ? "👩 زن" : "👨 مرد"}
              </GlassPill>
            ))}
          </div>
        </OptionRow>

        {/* Accent */}
        <OptionRow label="لهجه پیش‌فرض">
          <div className="flex flex-wrap gap-2">
            {ACCENTS.map((a) => (
              <GlassPill
                key={a.value}
                active={s.accent === a.value}
                onClick={() => {
                  tap();
                  s.setAccent(a.value);
                }}
              >
                {a.flag} {a.label}
              </GlassPill>
            ))}
          </div>
        </OptionRow>

        {/* Speed */}
        <OptionRow label="سرعت خوانش (TTS)">
          <div className="flex gap-2">
            {TTS_PRESETS.map((v, i) => (
              <GlassPill
                key={v}
                active={Math.abs(s.ttsRate - v) < 0.01}
                onClick={() => {
                  tap();
                  s.setTtsRate(v);
                }}
              >
                <Gauge className="size-3.5" />
                {v.toFixed(2)}× {SPEED_LABELS[i]}
              </GlassPill>
            ))}
          </div>
        </OptionRow>

        {/* Live preview */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => preview.speak(PREVIEW_SENTENCE)}
          className={cn(
            "mt-1 flex min-h-11 w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors",
            preview.isSpeaking
              ? "bg-brand text-brand-foreground"
              : "bg-brand-muted/50 text-brand hover:bg-brand-muted"
          )}
        >
          <Volume2 className="size-4" />
          {preview.isSpeaking ? "در حال پخش نمونه..." : "پخش زنده‌ی نمونه صدا"}
        </motion.button>
      </Section>

      {/* ============ ۲) تجربه یادگیری ============ */}
      <Section icon={GraduationCap} title="تجربه‌ی یادگیری">
        <OptionRow label="سطح پیش‌فرض نمایش" hint="صفحه اصلی روی بخش انتخابی فوکوس می‌کنه">
          <div className="flex flex-wrap gap-2">
            {LEVEL_BANDS.map((b) => (
              <GlassPill
                key={b.value}
                active={s.defaultLevel === b.value}
                onClick={() => {
                  tap();
                  s.setDefaultLevel(b.value);
                }}
              >
                {b.label} <span dir="ltr" className="text-[10px] opacity-70">{b.range}</span>
              </GlassPill>
            ))}
          </div>
        </OptionRow>

        <ToggleRow
          label="افکت صوتی و لرزش"
          hint="صدای کلیک و موفقیت در آزمون‌ها + ویبره"
          checked={s.feedbackEnabled}
          onChange={(v) => {
            s.setFeedbackEnabled(v);
            if (v) success();
          }}
        />

        <ToggleRow
          label="نمایش خودکار ترجمه فارسی"
          hint="خاموش = حالت چالش؛ معنی فلش‌کارت‌ها با لمس باز می‌شه"
          checked={s.showPersianTranslation}
          onChange={(v) => {
            tap();
            s.setShowPersianTranslation(v);
          }}
        />
      </Section>

      {/* ============ ۳) ظاهر و جلوه‌ها ============ */}
      <Section icon={Palette} title="ظاهر و جلوه‌های بصری">
        <OptionRow label="شدت جلوه‌ی شیشه‌ای">
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { v: "liquid", t: "شیشه‌ای براق", e: "💧", d: "Liquid Glass" },
                { v: "minimal", t: "کلاسیک تخت", e: "⚡", d: "Minimal" },
              ] as { v: GlassStyle; t: string; e: string; d: string }[]
            ).map((o) => (
              <button
                key={o.v}
                onClick={() => {
                  tap();
                  s.setGlassStyle(o.v);
                }}
                className={cn(
                  "min-h-11 rounded-xl border p-3 text-center transition-all",
                  s.glassStyle === o.v
                    ? "border-brand bg-brand-muted/30"
                    : "border-border hover:border-brand/40"
                )}
              >
                <div className="text-xl">{o.e}</div>
                <div className="mt-1 text-xs font-semibold">{o.t}</div>
                <div className="text-[10px] text-muted-foreground" dir="ltr">{o.d}</div>
              </button>
            ))}
          </div>
        </OptionRow>

        <ToggleRow
          label="کاهش انیمیشن‌ها"
          hint="برای دستگاه‌های ضعیف — صحنه‌های سه‌بعدی و حرکت‌ها ساده می‌شن"
          checked={s.reduceMotion}
          onChange={(v) => {
            tap();
            s.setReduceMotion(v);
          }}
        />
      </Section>

      {/* ============ ۴) داده‌ها و پروفایل ============ */}
      <Section icon={Database} title="داده‌ها و پروفایل">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <ActionCard icon={Download} label="پشتیبان‌گیری پیشرفت" sub="دانلود فایل JSON" onClick={exportProgress} />
          <ActionCard
            icon={Upload}
            label="بازیابی پیشرفت"
            sub="بارگذاری فایل پشتیبان"
            onClick={() => fileRef.current?.click()}
            input={
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void importProgress(f);
                  e.target.value = "";
                }}
              />
            }
          />
        </div>

        {/* Clear chats (inline 2-step) */}
        <button
          onClick={() => (clearChatArmed ? clearChats() : setClearChatArmed(true))}
          onBlur={() => setClearChatArmed(false)}
          className={cn(
            "mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium transition-colors",
            clearChatArmed
              ? "border-orange-500 bg-orange-500/10 text-orange-500"
              : "border-border text-muted-foreground hover:bg-muted"
          )}
        >
          <MessageSquareOff className="size-4" />
          {clearChatArmed ? "مطمئنی؟ دوباره بزن تا پاک بشه" : "پاک کردن فقط تاریخچه چت‌ها"}
        </button>

        {/* Full reset — opens glass dialog */}
        <button
          onClick={() => {
            tap();
            setResetStage(1);
          }}
          className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-red-300/50 bg-red-50 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
        >
          <Trash2 className="size-4" />
          ریست کامل پیشرفت و شروع مجدد
        </button>

        {/* Info card */}
        <div className="mt-4 space-y-2 rounded-2xl bg-white/5 p-4 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>نسخه</span>
            <span dir="ltr" className="font-semibold text-foreground">{APP_VERSION}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>حافظه‌ی محلی</span>
            <span className="tabular-nums">{toPersianDigits(kb)} کیلوبایت</span>
          </div>
          <div className="flex items-center justify-between">
            <span>وضعیت اتصال</span>
            <span
              className={cn(
                "flex items-center gap-1 rounded-full px-2.5 py-0.5 font-semibold",
                online ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
              )}
            >
              {online ? <Wifi className="size-3" /> : <WifiOff className="size-3" />}
              {online ? "آنلاین" : "آفلاین"}
            </span>
          </div>
        </div>
      </Section>

      <p className="pb-6 pt-2 text-center text-[11px] text-muted-foreground">
        ساخته شده با ❤️ برای فارسی‌زبانان
      </p>

      {/* ============ Two-step full-reset dialog ============ */}
      <AnimatePresence>
        {resetStage > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setResetStage(0)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-white/20 bg-card/95 p-6 shadow-2xl backdrop-blur-2xl"
            >
              <div className="mb-3 flex items-center gap-2 text-red-500">
                <AlertTriangle className="size-5" />
                <h3 className="font-bold">
                  {resetStage === 1 ? "ریست کامل پیشرفت" : "تأیید نهایی"}
                </h3>
              </div>

              {resetStage === 1 ? (
                <>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    این کار <b className="text-foreground">تمام</b> آمار، استریک‌ها،
                    پیشرفت دروس، تاریخچه چت‌ها و تنظیمات رو برای همیشه پاک می‌کنه.
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <li>• ۱۳۲ درس و پیشرفت آن‌ها</li>
                    <li>• تاریخچه چت‌های هوش مصنوعی</li>
                    <li>• امتیازها، گواهی‌ها و تنظیمات</li>
                  </ul>
                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => setResetStage(0)}
                      className="min-h-11 flex-1 rounded-full border border-border py-2.5 text-sm font-medium"
                    >
                      انصراف
                    </button>
                    <button
                      onClick={() => setResetStage(2)}
                      className="min-h-11 flex-1 rounded-full border border-red-400/50 bg-red-500/10 py-2.5 text-sm font-bold text-red-500"
                    >
                      ادامه — مرحله ۱ از ۲
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    مطمئنی؟ این عمل <b className="text-red-500">قابل بازگشت نیست</b>.
                    قبلش یه پشتیبان JSON گرفتی؟
                  </p>
                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => setResetStage(0)}
                      className="min-h-11 flex-1 rounded-full border border-border py-2.5 text-sm font-medium"
                    >
                      نه، انصراف
                    </button>
                    <button
                      onClick={fullReset}
                      className="min-h-11 flex-1 rounded-full bg-red-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/30"
                    >
                      بله، همه‌چیز رو پاک کن
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

/* -------------------------------------------------------------------------- */
/*  Building blocks                                                            */
/* -------------------------------------------------------------------------- */

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof AudioLines;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-5"
    >
      <div className="mb-2 flex items-center gap-1.5 px-1 text-sm font-semibold">
        <Icon className="size-4 text-brand" />
        {title}
      </div>
      <GlassCard className="space-y-4 p-5">{children}</GlassCard>
    </motion.section>
  );
}

function OptionRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium">{label}</div>
      {hint && <p className="mb-2 text-[11px] text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function GlassPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-4 text-xs font-semibold transition-all",
        active
          ? "border-brand bg-brand-muted/40 text-brand shadow-sm"
          : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        {hint && <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      {/* 48px touch target with springy Framer Motion knob */}
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-8 w-14 shrink-0 rounded-full transition-colors",
          checked ? "bg-brand" : "bg-muted"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={cn(
            "absolute top-1 size-6 rounded-full bg-white shadow-md",
            checked ? "right-1" : "right-7"
          )}
        />
      </button>
    </div>
  );
}

function ActionCard({
  icon: Icon,
  label,
  sub,
  onClick,
  input,
}: {
  icon: typeof Download;
  label: string;
  sub: string;
  onClick: () => void;
  input?: React.ReactNode;
}) {
  return (
    <>
      <button
        onClick={onClick}
        className="flex min-h-11 items-center gap-3 rounded-2xl border border-border bg-white/5 p-4 text-right transition-colors hover:border-brand/40"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-muted/50 text-brand">
          <Icon className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">{label}</span>
          <span className="block text-[11px] text-muted-foreground">{sub}</span>
        </span>
      </button>
      {input}
    </>
  );
}
