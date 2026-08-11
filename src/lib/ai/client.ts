import "client-only";
import type {
  CEFRLevel,
  Feedback,
  LanguageCode,
  Scenario,
} from "@/types";
import { buildSystemPrompt } from "@/config/ai";
import { getScenarioById } from "@/data/scenarios";
import { resolveChatScenario } from "@/data/lesson-scenarios";
import { uid } from "@/lib/utils";
import { buildSmartReply } from "./smart-reply";
import type {
  ChatRequestBody,
  ChatRequestMessage,
  ChatResponseData,
} from "./types";

/* -------------------------------------------------------------------------- */
/*  Public API (browser-side)                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Browser-side counterpart of `lib/ai/server.ts`, used in the Capacitor / APK
 * build where there is no Node server to host /api/chat.
 *
 * - If the user provided a personal OpenAI key (Settings), calls the API
 *   directly from the browser using `response_format: json_object`.
 * - Otherwise falls back to the same deterministic mock used on the server,
 *   so the app remains fully usable in demo mode.
 */
export async function generateReplyClient(
  body: ChatRequestBody
): Promise<ChatResponseData> {
  // Resolve BOTH base scenarios AND lesson-specific A0 chats.
  const scenario = resolveChatScenario(body.scenarioId) ?? getScenarioById(body.scenarioId);
  if (!scenario) {
    throw new Error(`Unknown scenario: ${body.scenarioId}`);
  }

  const lastUserMsg = [...body.messages]
    .reverse()
    .find((m) => m.role === "user");

  if (body.userApiKey) {
    try {
      return await callProviderClient({
        apiKey: body.userApiKey,
        scenario,
        history: body.messages,
        level: body.level,
        language: body.language,
      });
    } catch (err) {
      console.error("[ai/client] provider call failed, using mock:", err);
    }
  }

  return buildSmartReply({
    scenario,
    history: body.messages,
    userText: lastUserMsg?.content ?? "",
  });
}

/* -------------------------------------------------------------------------- */
/*  Direct browser → OpenAI call                                              */
/* -------------------------------------------------------------------------- */

interface ProviderArgs {
  apiKey: string;
  scenario: Scenario;
  history: ChatRequestMessage[];
  level: CEFRLevel;
  language: LanguageCode;
}

async function callProviderClient({
  apiKey,
  scenario,
  history,
  level,
  language,
}: ProviderArgs): Promise<ChatResponseData> {
  const systemPrompt = buildSystemPrompt({
    roleName: scenario.role.name,
    persona: scenario.role.persona,
    scenarioTitle: scenario.title,
    objectives: scenario.objectives,
    level,
    language,
  });

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "assistant", content: scenario.opening },
    ...history.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 512,
      response_format: { type: "json_object" },
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${text}`);
  }

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const raw = json.choices?.[0]?.message?.content ?? "";
  return parseProviderJson(raw);
}

/** Robustly parse the provider's strict-JSON response. */
function parseProviderJson(raw: string): ChatResponseData {
  try {
    const parsed = JSON.parse(raw) as {
      reply?: string;
      feedback?: Omit<Feedback, "id">[];
    };
    const feedback: Feedback[] = (parsed.feedback ?? []).map((f) => ({
      ...f,
      id: uid("fb"),
    }));
    return {
      reply: (parsed.reply ?? "").trim() || "Sorry, could you say that again?",
      feedback,
    };
  } catch {
    return { reply: raw.trim(), feedback: [] };
  }
}

/* -------------------------------------------------------------------------- */
/*  Content-aware mock lives in ./smart-reply (shared with the server build)  */
/* -------------------------------------------------------------------------- */

