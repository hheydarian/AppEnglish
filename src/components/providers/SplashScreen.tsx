"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

/**
 * SplashScreen — a 2-second branded opening.
 *
 * Shows the ZabanYar logo with brand-colored light halos, a progress shimmer,
 * and the app name, then fades out revealing the app. Rendered on top of the
 * real page (which loads underneath), so navigation is instant after the fade.
 */
export function SplashScreen({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
            aria-hidden
          >
            {/* Brand-colored light halos */}
            <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 left-1/2 size-64 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

            {/* Logo with glow pulse */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 rounded-full bg-brand/30 blur-xl"
              />
              <div className="relative size-28 overflow-hidden rounded-[2rem] shadow-2xl shadow-brand/40 ring-1 ring-white/20">
                <Image
                  src="/logo.jpg"
                  alt="ZabanYar"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* App name */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-gradient-brand"
            >
              ZabanYar
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-2 text-sm text-muted-foreground"
            >
              زبان‌یار هوشمند شما — از صفر تا تسلط 🚀
            </motion.p>

            {/* Loading shimmer bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 h-1 w-40 overflow-hidden rounded-full bg-muted"
            >
              <motion.div
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-brand to-cyan-400"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
