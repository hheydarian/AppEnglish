"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Gauge,
  Globe,
  KeyRound,
  Volume2,
  Play,
  Trash2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, toPersianDigits } from "@/lib/utils";
import {
  useSettingsStore,
  ACCENT_TO_LOCALE,
  type Accent,
  type ProficiencyLevel,
} from "@/store/settingsStore";
import { useUserStore } from "@/store/userStore";
import { useTTS } from "@/hooks/useTTS";

const PROFICIENCY_OPTIONS: { value: ProficiencyLevel; label: string; desc: string }[] = [
  { value: "Beginner", label: "مبتدی", desc: "A1–A2" },
  { value: "Intermediate", label: "متوسط", desc: "B1–B2" },
  { value: "Advanced", label: "پیشرفته", desc: "C1–C2" },
];

const ACCENT_OPTIONS: { value: Accent; label: string; flag: string }[] = [
  { value: "us", label: "آمریکایی", flag: "🇺🇸" },
  { value: "uk", label: "بریتانیایی", flag: "🇬🇧" },
];

const SAMPLE_TEXT = "Hi there! I'm so glad to practice English with you today.";

export default function SettingsPage() {
  const settings = useSettingsStore();
  const resetStats = useUserStore((s) => s.resetStats);

  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // TTS preview, driven by current settings.
  const tts = useTTS({
    lang: ACCENT_TO_LOCALE[settings.accent],
    rate: settings.ttsRate,
  });

  return (
    <DashboardLayout>
      <header className="pt-10 pb-4">
        <h1 className="text-2xl font-bold">تنظیمات</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          تجربه یادگیری‌ات رو شخصی‌سازی کن.
        </p>
      </header>

      {/* ---- Proficiency level ---- */}
      <Section icon={GraduationCap} title="سطح زبان">
        <div className="grid grid-cols-3 gap-2">
          {PROFICIENCY_OPTIONS.map((opt) => {
            const active = mounted && settings.proficiency === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => settings.setProficiency(opt.value)}
                className={cn(
                  "rounded-xl border p-3 text-center transition-all",
                  active
                    ? "border-brand bg-brand-muted text-brand"
                    : "border-border bg-card hover:border-brand/40"
                )}
              >
                <p className="text-sm font-semibold">{opt.label}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </Section>

      {/* ---- Accent ---- */}
      <Section icon={Globe} title="لهجه">
        <div className="grid grid-cols-2 gap-2">
          {ACCENT_OPTIONS.map((opt) => {
            const active = mounted && settings.accent === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => settings.setAccent(opt.value)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border p-3 transition-all",
                  active
                    ? "border-brand bg-brand-muted"
                    : "border-border bg-card hover:border-brand/40"
                )}
              >
                <span className="text-xl">{opt.flag}</span>
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* ---- TTS rate ---- */}
      <Section icon={Gauge} title="سرعت پخش صدا">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">آرام</span>
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.05}
            value={mounted ? settings.ttsRate : 0.95}
            onChange={(e) => settings.setTtsRate(Number(e.target.value))}
            className="flex-1 accent-brand"
            dir="ltr"
          />
          <span className="text-xs text-muted-foreground">سریع</span>
          <Badge variant="secondary" className="tabular-nums">
            {toPersianDigits((mounted ? settings.ttsRate : 0.95).toFixed(2))}×
          </Badge>
        </div>
        <button
          onClick={() => tts.speak(SAMPLE_TEXT)}
          disabled={!tts.isSupported}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-muted py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand-muted/70 disabled:opacity-40"
        >
          <Play className="size-4" />
          پخش نمونه صدا
        </button>
      </Section>

      {/* ---- Personal API key ---- */}
      <Section icon={KeyRound} title="کلید API شخصی (اختیاری)">
        <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
          برای استفاده از هوش مصنوعی واقعی، کلید OpenAI خودت رو وارد کن. کلید فقط
          روی دستگاه شما ذخیره می‌شه و به سرور خودمون ارسال می‌شه.
        </p>
        <div className="flex items-center gap-2">
          <input
            type="password"
            value={mounted ? settings.apiKey : ""}
            onChange={(e) => settings.setApiKey(e.target.value)}
            placeholder="sk-..."
            dir="ltr"
            className="flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
          {mounted && settings.apiKey && (
            <button
              onClick={() => settings.setApiKey("")}
              className="rounded-xl border border-border p-2.5 text-muted-foreground hover:text-foreground"
              aria-label="پاک کردن کلید"
            >
              <Trash2 className="size-4" />
            </button>
          )}
        </div>
        {mounted && settings.apiKey ? (
          <Badge className="mt-2 bg-emerald-100 text-emerald-700">فعال ✓</Badge>
        ) : (
          <p className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
            <Volume2 className="size-3" />
            بدون کلید از حالت دمو (Mock) استفاده می‌شه.
          </p>
        )}
      </Section>

      {/* ---- Danger zone ---- */}
      <Section icon={Trash2} title="بازنشانی داده‌ها">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (
              confirm(
                "تمام آمار و پیشرفت شما پاک خواهد شد. آیا مطمئن هستید؟"
              )
            ) {
              resetStats();
            }
          }}
          className="w-full rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
        >
          پاک کردن آمار و پیشرفت
        </motion.button>
      </Section>

      <p className="pb-4 pt-2 text-center text-[11px] text-muted-foreground">
        SpeakUp — نسخه ۰.۱
      </p>
    </DashboardLayout>
  );
}

/* ---- small section wrapper ---- */
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof GraduationCap;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      <div className="mb-2 flex items-center gap-1.5 px-1 text-sm font-semibold">
        <Icon className="size-4 text-brand" />
        {title}
      </div>
      <Card className="p-4">{children}</Card>
    </motion.section>
  );
}
