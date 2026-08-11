---
name: 3d-modern-ui-expert
description: Best practices for creating ultra-modern, interactive, 3D-infused, and responsive web applications using Three.js / React Three Fiber, Lucide, Tailwind CSS v4, Framer Motion, and Glassmorphism. Use whenever the user asks to build or restyle a page, dashboard, landing section, card list, button, hero, or any UI component — and especially when they mention "modern", "stunning", "3D", "glass", "interactive", "wow", "responsive", "dashboard", or want to improve the look and feel of an existing screen. Default to this skill's standards for ALL UI work in this workspace.
---

# 3D Modern UI Expert

You design and build ultra-modern, interactive, 3D-infused, responsive web UIs in this Next.js + Tailwind v4 + Framer Motion workspace. Every screen should feel alive, premium, and tactile — never flat.

## Stack (already installed in this workspace — reuse, don't reinstall)

- **Next.js 16** (App Router, TypeScript, `src/`)
- **Tailwind CSS v4** (CSS-first config via `src/app/globals.css`; brand tokens `--brand`, `--brand-muted`, `--brand-foreground` already defined; RTL enabled, `dir="rtl"`, `lang="fa"`)
- **Framer Motion** — motion, gestures, layout animations
- **lucide-react** — all icons
- **Zustand** — state (`useChatStore`, `useUserStore`, `useSettingsStore`)
- **shadcn/ui primitives** under `src/components/ui/` (button, card, input, badge, avatar, scroll-area, separator, sonner)
- **Web Speech API** hooks (`useSpeechRecognition`, `useTTS`)
- **Capacitor-ready** (`output: "export"` under `CAPACITOR_BUILD=1`)

For full R3F/Three.js/shader/animation patterns, this skill composes with the global **`immersive-ui`** skill — read its `references/` when you actually need 3D, shaders, GSAP, or advanced motion. This file focuses on the workspace-specific standards below.

---

## 1. NEVER flat / stretched mobile-on-desktop. Always responsive.

The cardinal rule. A phone-width column stretched across a 1440px desktop is a failure.

- **Desktop (lg and up):** build **split layouts** (sidebar + content, two-column dashboards, 2×N card grids) or a **centered glassmorphism phone container** (max-w-md, framed, with ambient depth behind it). Use the full width intentionally.
- **Mobile:** the app's natural `app-container` (max-w-md) column.
- Never `w-full` an app shell on desktop without an inner max-width or a grid.

Desktop split-dashboard skeleton:

```tsx
<div className="mx-auto grid min-h-dvh w-full max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
  {/* Sidebar — desktop only */}
  <aside className="hidden lg:flex">{/* nav, stats, 3D accent */}</aside>
  {/* Main */}
  <main className="app-container lg:max-w-none">{/* centered on mobile, full on desktop */}</main>
</div>
```

Centered glass phone frame (when the design is genuinely mobile-shaped):

```tsx
<div className="relative flex min-h-dvh items-center justify-center bg-[radial-gradient(circle_at_30%_20%,var(--brand-muted),transparent_55%)] p-6">
  {/* ambient 3D / particles behind, aria-hidden */}
  <div aria-hidden className="pointer-events-none absolute inset-0">{/* <Scene/> or particles */}</div>
  <div className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-white/15 bg-white/5 p-6 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
    {/* the mobile UI, now framed like a premium device */}
  </div>
</div>
```

If you are unsure which the user wants, prefer the **split dashboard** for tool/dashboard/list screens and the **centered glass frame** for single-task/focused screens.

## 2. 3D, gradients, floating cards, micro-interactions — always.

Every meaningful screen blends at least three of these depth layers:

- **Ambient gradient background** (cheapest, always include): a soft radial/linear wash tied to brand tokens.
  ```tsx
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,var(--brand-muted),transparent_70%)]" />
  ```
- **Floating cards:** use Framer Motion `whileHover` lift + tilt, layered shadows, inset highlights.
- **3D / Spline / Three canvas:** for hero moments and key screens. Keep it `aria-hidden` if decorative; provide an accessible HTML path for anything essential. Gate heavy canvases behind `dynamic(() => import(...), { ssr:false })` and a `<Suspense>`/`<Loader>` fallback.
- **3D-feeling icons:** Lucide icons inside a tilted/gradient tile with a spotlight glow on hover.
- **Micro-interactions:** `whileHover`, `whileTap`, `layout`/`layoutId`, staggered `whileInView` list reveals.

The lift/tilt/spotlight card (your default card):

```tsx
"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {/* cursor spotlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
           style={{ background: "radial-gradient(180px circle at var(--mx) var(--my), rgba(255,255,255,0.10), transparent 60%)" }} />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
```

## 3. Every interactive element must actually work.

No dead UI. Every card, button, list item, icon-button:

- has a real `onClick` (or is a `<Link>` / `<button>`),
- has `cursor-pointer`,
- has a visible **hover lift + active press** (Framer Motion `whileHover={{ y: -3 }}`, `whileTap={{ scale: 0.97 }}`),
- has a **visible focus ring** (`focus-visible:ring-2 focus-visible:ring-brand`),
- **navigates** to a real route when it represents navigation (use `next/link` for internal routes — `/scenarios`, `/chat/[id]`, `/stats`, `/settings`, `/`).

If an item is genuinely non-interactive, it must NOT look interactive — no `cursor-pointer`, no hover lift. Visually interactive = functionally interactive.

## 4. Micro-copy: human, motivating, never robotic.

Write like a warm, encouraging coach — not a manual. In this workspace the UI is bilingual: **Persian (fa, RTL)** for the interface and **English (en)** for the learned-language content.

Do:
- Talk to the user directly: «بیا شروع کنیم», «عالی بود!», "Let's keep the streak alive."
- Use short, punchy, motivating phrases. Emojis where they fit naturally (🔥 ⭐ 🚀).
- Vary tone by context: celebratory for stats, calm for settings, playful for scenarios.
- Persian micro-copy should be natural idiomatic Persian, not translation-stiff. Use half-spaces correctly.

Don't:
- Use robotic/AI-sounding text: "Please select an option from the list below", "Your request has been processed successfully", "Click here to view more information".
- Stuff keywords. Use the most natural human phrasing.

| ❌ Robotic | ✅ Human |
|---|---|
| "Please choose a scenario to begin" | «یک ماجرا انتخاب کن و برو تو!» |
| "Your session was completed successfully" | «تمرین تموم شد — خورده‌شو اینجا ببین 🔥» |
| "Loading…" | «یک ثانیه…» |
| "No data available" | «هنوز دیتایی نیست — اولین تمرینت رو شروع کن!» |
| "Error occurred" | «ای بابا، یه مشکلی پیش اومد. دوباره امتحان کن.» |

---

## Checklist before you finish any UI

- [ ] Desktop shows a split dashboard or a centered glass frame — never a stretched phone column.
- [ ] At least 3 depth layers present (ambient gradient + floating card + 3D/micro-interaction).
- [ ] Every interactive element has `onClick`/route, `cursor-pointer`, hover lift, focus ring.
- [ ] No robotic copy — micro-copy is warm, motivating, natural Persian/English.
- [ ] 3D canvases are lazy-loaded (`ssr:false`), wrapped in `<Suspense>`, and `aria-hidden` if decorative.
- [ ] Brand tokens used (not hard-coded colors); RTL preserved; `min-h-dvh` not `min-h-screen`.
- [ ] Existing workspace conventions matched (imports from `@/...`, Zustand stores, shadcn primitives).
