import type { NextConfig } from "next";

/**
 * SECURITY: strip console output from production bundles.
 * Keeps `error` and `warn` for diagnosability; removes log/debug/info so no
 * internal state leaks into shipped JS (OWASP MASVS-RESILIENCE).
 *
 * When building for Capacitor (APK), we produce a fully static export.
 * Trigger with: CAPACITOR_BUILD=1 npm run build
 */
const isCapacitorBuild = process.env.CAPACITOR_BUILD === "1";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: isProd
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // Security headers for the web build. In the Capacitor static export the
  // native WebView shell enforces the same policy via the CSP <meta> tag in
  // src/app/layout.tsx, so the two surfaces stay aligned.
  async headers() {
    if (!isProd) return [];
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://api.openai.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "microphone=(self), camera=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },

  // Enable static export only for the Capacitor (APK) build.
  ...(isCapacitorBuild
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
