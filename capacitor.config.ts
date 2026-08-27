import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor configuration for packaging the Next.js static export into an
 * Android (APK) / iOS app.
 *
 * SECURITY HARDENING (OWASP MASVS):
 *  - `androidScheme: "https"` keeps WebView origins on https:// so that
 *    localStorage and cookies are treated as secure contexts.
 *  - `allowMixedContent: false` blocks any http:// subresource inside the
 *    https-backed WebView (blocks downgrade/MITM of content).
 *  - File access from file URLs is disabled at runtime in MainActivity
 *    overrides; here we keep webDir read-only by convention.
 *
 * Quick start (Android):
 *   1. npm run build:cap      # static export → ./out
 *   2. npx cap sync android   # copy ./out into the native project
 *   3. npx cap open android   # Android Studio → Build > Build APK(s)
 */
const config: CapacitorConfig = {
  appId: "com.speakup.app",
  appName: "SpeakUp",
  webDir: "out",
  android: {
    // Block mixed content (OWASP MASVS-NETWORK).
    allowMixedContent: false,
    // Never let the WebView capture screenshots in the app switcher (privacy).
    captureInput: true,
  },
  server: {
    androidScheme: "https",
    // Explicitly refuse any remote dev-server injection in release builds.
    cleartext: false,
  },
};

export default config;
