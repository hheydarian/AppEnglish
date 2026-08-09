/**
 * Unified entry point for generating AI replies from the client.
 *
 * - In the web/server build → POSTs to our own secure `/api/chat` route.
 * - In the Capacitor (APK) static build → calls the browser-side client
 *   directly (lib/ai/client.ts), since there's no Node server in the WebView.
 *
 * Detecting the static build: Next sets `output: "export"` only for the APK
 * build, which means there is no server runtime. We detect this at runtime by
 * checking for a global flag injected by the Capacitor bridge, with a
 * build-time compile toggle as a fast path.
 */
import type { ChatRequestBody, ChatResponseData } from "./types";

/** True when the app is running inside a Capacitor WebView (static export). */
export function isCapacitor(): boolean {
  if (typeof window === "undefined") return false;
  return !!(window as unknown as { Capacitor?: unknown }).Capacitor;
}

/**
 * Generate a reply using whichever transport is appropriate for the current
 * runtime (server route vs. direct browser call).
 */
export async function generateReplySafe(
  body: ChatRequestBody
): Promise<ChatResponseData> {
  if (isCapacitor()) {
    const { generateReplyClient } = await import("./client");
    return generateReplyClient(body);
  }

  // Web build → call our own API route (keeps the key server-side by default).
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = (await res.json()) as {
    ok: boolean;
    data?: ChatResponseData;
    error?: string;
  };

  if (!res.ok || !json.ok || !json.data) {
    throw new Error(json.error ?? `Request failed (${res.status})`);
  }
  return json.data;
}
