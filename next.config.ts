import type { NextConfig } from "next";

/**
 * When building for Capacitor (APK), we produce a fully static export.
 * Trigger with: CAPACITOR_BUILD=1 npm run build
 *
 * Notes:
 *  - Static export can't ship a server route handler, so in Capacitor mode
 *    the client talks to a browser-side AI client (lib/ai/client.ts) that
 *    calls the OpenAI API directly using the user's personal key (set in
 *    Settings), with the deterministic mock as a fallback.
 *  - The /api/chat route is still available in normal (non-export) dev/preview.
 */
const isCapacitorBuild = process.env.CAPACITOR_BUILD === "1";

const nextConfig: NextConfig = {
  // Enable static export only for the Capacitor (APK) build.
  ...(isCapacitorBuild
    ? {
        output: "export" as const,
        // Dynamic routes need an exhaustive list of params; for the chat page
        // we generate one page per scenario.
        images: { unoptimized: true },
        // trailing slash helps WebView resolve local file URLs reliably.
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
