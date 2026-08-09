import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor configuration for packaging the Next.js static export into an
 * Android (APK) / iOS app.
 *
 * Quick start (Android):
 *   1. npm run build:cap      # static export → ./out
 *   2. npx cap sync android   # copy ./out into the native project
 *   3. npx cap open android   # open in Android Studio → Build > Build APK
 *
 * The `webDir` points to Next.js's static export output folder ("out").
 */
const config: CapacitorConfig = {
  appId: "com.speakup.app",
  appName: "SpeakUp",
  webDir: "out",
  android: {
    // Allow mixed content so the WebView can reach the OpenAI API over https
    // even when the bundled assets are served from file://.
    allowMixedContent: true,
  },
  server: {
    // Force the WebView to load the bundled static assets (offline-first).
    androidScheme: "https",
  },
};

export default config;
