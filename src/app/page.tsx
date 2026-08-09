import { AppShell } from "@/components/layout";
import { Sparkles } from "lucide-react";
import { SCENARIOS } from "@/data/scenarios";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <AppShell>
      {/* Header */}
      <header className="flex items-center justify-between pt-10 pb-6">
        <div>
          <p className="text-sm text-muted-foreground">سلام! 👋</p>
          <h1 className="text-2xl font-bold text-gradient-brand">SpeakUp</h1>
        </div>
        <div className="flex size-10 items-center justify-center rounded-full bg-brand-muted text-brand">
          <Sparkles className="size-5" />
        </div>
      </header>

      {/* Hero card */}
      <section className="rounded-3xl bg-gradient-to-br from-brand to-cyan-600 p-5 text-white shadow-lg">
        <h2 className="text-lg font-bold">بیا با هوش مصنوعی صحبت کنیم!</h2>
        <p className="mt-1 text-sm text-white/85">
          یک سناریو انتخاب کن و مکالمه واقعی رو تمرین کن. اصلاحات لحظه‌ای گرامر و
          تلفظ کنارته.
        </p>
      </section>

      {/* Scenario preview */}
      <section className="mt-8">
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
          سناریوهای آماده ({SCENARIOS.length})
        </h3>
        <ul className="space-y-2">
          {SCENARIOS.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{s.role.avatar}</span>
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.role.name}
                  </p>
                </div>
              </div>
              <Badge variant="secondary">{s.difficulty}</Badge>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          فاز ۲ تکمیل شد — ساختار و اسکلت آماده است ✅
        </p>
      </section>
    </AppShell>
  );
}
