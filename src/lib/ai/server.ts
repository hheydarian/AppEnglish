import "server-only";
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
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Generate the AI character's reply for a single conversation turn.
 *
 * Flow:
 *   1. Resolve the scenario + build the system prompt.
 *   2. If an API key exists in the environment → call the real provider.
 *   3. Otherwise → fall back to a deterministic in-character mock that still
 *      returns structured feedback, so the whole app is usable in dev / demos
 *      without an API key.
 */
export async function generateReply(
  body: ChatRequestBody
): Promise<ChatResponseData> {
  // Resolve BOTH base scenarios (cafe-ordering, ...) AND lesson-specific A0
  // chats (a0-2-2, ...) so the AI gets the right persona per lesson.
  const scenario = resolveChatScenario(body.scenarioId) ?? getScenarioById(body.scenarioId);
  if (!scenario) {
    throw new Error(`Unknown scenario: ${body.scenarioId}`);
  }

  const lastUserMsg = [...body.messages]
    .reverse()
    .find((m) => m.role === "user");

  // Prefer the user's own API key (if provided) over the server default.
  const apiKey = body.userApiKey || process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      return await callProvider({
        apiKey,
        scenario,
        history: body.messages,
        level: body.level,
        language: body.language,
      });
    } catch (err) {
      console.error("[ai] provider call failed, falling back to mock:", err);
    }
  }

  return buildSmartReply({
    scenario,
    history: body.messages,
    userText: lastUserMsg?.content ?? "",
  });
}

/* -------------------------------------------------------------------------- */
/*  Real provider call                                                        */
/* -------------------------------------------------------------------------- */

interface ProviderArgs {
  apiKey: string;
  scenario: Scenario;
  history: ChatRequestMessage[];
  level: CEFRLevel;
  language: LanguageCode;
}

/**
 * Calls the OpenAI-compatible Chat Completions endpoint.
 * The response is expected to be the strict JSON object described in the
 * system prompt; we defensively parse and fall back on parse errors.
 */
async function callProvider({
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
    // Provider ignored JSON mode → treat the whole thing as a plain reply.
    return { reply: raw.trim(), feedback: [] };
  }
}

/* -------------------------------------------------------------------------- */
/*  Deterministic mock (dev / no-key demo)                                    */
/* -------------------------------------------------------------------------- */

/**
 * The content-aware mock lives in ./smart-reply and is shared between the
 * server (web build) and the client (Capacitor build) so the behavior stays
 * identical in both runtimes.
 */

