"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps
  extends Omit<HTMLMotionProps<"div">, "children" | "onMouseMove"> {
  children?: ReactNode;
  /** Disable the cursor-follow spotlight (default: on). */
  noSpotlight?: boolean;
  /** Lift intensity in px on hover. */
  lift?: number;
  /** Trigger an entrance animation when scrolled into view. */
  inView?: boolean;
}

/**
 * GlassCard — the workspace's default surface.
 *
 * Combines: frosted glass + layered shadow + cursor-follow spotlight +
 * Framer Motion hover lift. This is the "floating 3D card" primitive that
 * every modern screen in SpeakUp builds on (per the 3d-modern-ui-expert skill).
 */
export function GlassCard({
  className,
  children,
  noSpotlight = false,
  lift = 4,
  inView = false,
  ...props
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noSpotlight) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ y: -lift }}
      initial={inView ? { opacity: 0, y: 16 } : false}
      whileInView={inView ? { opacity: 1, y: 0 } : undefined}
      viewport={inView ? { once: true, margin: "-60px" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] transition-shadow duration-300",
        "hover:shadow-[0_24px_70px_-16px_rgba(0,0,0,0.65)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className
      )}
      {...props}
    >
      {/* cursor-follow spotlight */}
      {!noSpotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(200px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.12), transparent 60%)",
          }}
        />
      )}
      {/* inset top highlight (simulated key light) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
