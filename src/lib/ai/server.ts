import "server-only";
import type {
  CEFRLevel,
  Feedback,
  LanguageCode,
  Scenario,
} from "@/types";
import { buildSystemPrompt } from "@/config/ai";
import { getScenarioById } from "@/data/scenarios";
import { uid } from "@/lib/utils";
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
  const scenario = getScenarioById(body.scenarioId);
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

  return mockReply(scenario, lastUserMsg?.content ?? "");
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
 * A lightweight, scenario-aware mock so the full chat experience works
 * without an API key. It picks a contextual reply and synthesizes one or two
 * believable feedback items based on the learner's input.
 *
 * This is NOT a language model — it's a deterministic stand-in for demos.
 */
function mockReply(scenario: Scenario, userText: string): ChatResponseData {
  const reply = pickMockReply(scenario, userText);
  const feedback = synthesizeMockFeedback(userText);
  return { reply, feedback, mock: true };
}

const MOCK_REPLIES: Record<string, string[]> = {
  "cafe-ordering": [
    "Great choice! What size would you like — small, medium, or large?",
    "Sure thing! Is that to stay or to go?",
    "Awesome. Would you like to add a pastry with that?",
    "That'll be four dollars fifty, please. How would you like to pay?",
  ],
  "job-interview": [
    "Thanks for sharing. Can you tell me about a challenge you faced and how you handled it?",
    "Interesting. Why do you want to work for our company specifically?",
    "Good. Where do you see yourself in five years?",
    "Thank you. Do you have any questions for me about the role?",
  ],
  "airport-check-in": [
    "Great. How many bags are you checking in today?",
    "Perfect. Would you prefer a window seat or an aisle seat?",
    "All set. Your gate is B12, and boarding starts at 3:40 PM.",
    "You're welcome! Have a safe flight.",
  ],
  "casual-chat": [
    "Oh nice! I love that too. How long have you been into it?",
    "That sounds really fun. What did you enjoy most about it?",
    "Cool! Do you have any plans for next weekend then?",
    "Haha, totally! We should definitely do that sometime.",
  ],
};

function pickMockReply(scenario: Scenario, userText: string): string {
  const pool = MOCK_REPLIES[scenario.id] ?? [
    "That's interesting — tell me more!",
    "I see. Could you go into a bit more detail?",
  ];
  // Deterministic index based on the user text length so it feels varied yet stable.
  const idx = userText.length % pool.length;
  return pool[idx];
}

/**
 * Detect a few common learner errors and synthesize feedback items.
 * Kept intentionally small — this is only a mock.
 */
function synthesizeMockFeedback(userText: string): Feedback[] {
  const feedback: Feedback[] = [];
  const lower = userText.toLowerCase();

  const checks: Array<{
    test: boolean;
    original: string;
    suggestion: string;
    explanation: string;
    type: Feedback["type"];
    severity: Feedback["severity"];
  }> = [
    {
      test: /\bi\s+want\b/.test(lower),
      original: "I want",
      suggestion: "I'd like",
      explanation:
        "برای سفارش دادن، «I'd like» مؤدبانه‌تر و طبیعی‌تر از «I want» است.",
      type: "style",
      severity: "suggestion",
    },
    {
      test: /\bhow much it\b|\bhow much it cost\b/.test(lower),
      original: "how much it cost",
      suggestion: "how much does it cost",
      explanation:
        "برای سوال از فعل اصلی، به کمکی «does» نیاز داریم: «how much does it cost?»",
      type: "grammar",
      severity: "correction",
    },
    {
      test: /\bi\b/.test(userText) && !/\bI\b/.test(userText),
      original: "i",
      suggestion: "I",
      explanation: "ضمیر «I» (من) در انگلیسی همیشه بزرگ نوشته می‌شود.",
      type: "grammar",
      severity: "correction",
    },
  ];

  for (const c of checks) {
    if (c.test) {
      feedback.push({
        original: c.original,
        suggestion: c.suggestion,
        explanation: c.explanation,
        type: c.type,
        severity: c.severity,
        id: uid("fb"),
      });
    }
  }

  return feedback;
}
