import "client-only";
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
  const scenario = getScenarioById(body.scenarioId);
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

  return mockReply(scenario, lastUserMsg?.content ?? "");
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
/*  Deterministic mock (kept in sync with lib/ai/server.ts)                   */
/* -------------------------------------------------------------------------- */

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
  const idx = userText.length % pool.length;
  return pool[idx];
}

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
