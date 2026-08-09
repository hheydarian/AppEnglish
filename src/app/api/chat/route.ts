import { NextResponse } from "next/server";
import type { CEFRLevel, LanguageCode } from "@/types";
import { generateReply } from "@/lib/ai/server";
import type { ChatRequestBody, ChatResponse } from "@/lib/ai/types";

// Always run on the Node.js runtime (we use `server-only` AI code + secrets).
export const runtime = "nodejs";
// Never cache AI replies. (Note: in the Capacitor static-export build this
// route is simply not used — the WebView client calls lib/ai/client.ts directly.)

/* -------------------------------------------------------------------------- */
/*  POST /api/chat                                                            */
/* -------------------------------------------------------------------------- */

export async function POST(req: Request) {
  let body: ChatRequestBody;

  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json<ChatResponse>(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  /* ---- validate ---- */
  const { scenarioId, messages, level, language } = body;
  const validationError = validateInput({ scenarioId, messages, level, language });
  if (validationError) {
    return NextResponse.json<ChatResponse>(
      { ok: false, error: validationError },
      { status: 400 }
    );
  }

  /* ---- generate ---- */
  try {
    const data = await generateReply({ scenarioId, messages, level, language });
    return NextResponse.json<ChatResponse>({ ok: true, data });
  } catch (err) {
    console.error("[api/chat] generation failed:", err);
    const message =
      err instanceof Error ? err.message : "Failed to generate reply.";
    return NextResponse.json<ChatResponse>(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*  Validation helpers                                                        */
/* -------------------------------------------------------------------------- */

function validateInput(input: {
  scenarioId: unknown;
  messages: unknown;
  level: unknown;
  language: unknown;
}): string | null {
  if (typeof input.scenarioId !== "string" || !input.scenarioId.trim()) {
    return "scenarioId is required.";
  }
  if (!Array.isArray(input.messages) || input.messages.length === 0) {
    return "messages must be a non-empty array.";
  }
  for (const m of input.messages) {
    if (
      typeof m !== "object" ||
      m === null ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string"
    ) {
      return "Each message must be { role: 'user'|'assistant', content: string }.";
    }
  }
  if (
    typeof input.level !== "string" ||
    !/^[ABC][12]$/.test(input.level as string)
  ) {
    return "level must be a valid CEFR level (A1–C2).";
  }
  if (input.language !== "en" && input.language !== "fa") {
    return "language must be 'en' or 'fa'.";
  }
  return null;
}

// Re-export the inferred types so callers keep them in sync.
export type { ChatRequestBody, ChatResponse, CEFRLevel, LanguageCode };
