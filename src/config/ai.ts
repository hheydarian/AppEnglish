import type { AIConfig, CEFRLevel, LanguageCode } from "@/types";

/* ========================================================================== */
/*  System prompt template                                                    */
/* ========================================================================== */

/**
 * The system prompt template scaffolded for every chat request.
 *
 * Placeholders (filled by `buildSystemPrompt()`):
 *   {{roleName}}      — the AI character's name
 *   {{persona}}       — the AI character's persona/behavior
 *   {{scenarioTitle}} — human title of the scenario
 *   {{objectives}}    — bullet list of the user's goals
 *   {{level}}         — the user's CEFR level
 *   {{language}}      — the target practice language
 *
 * The AI is asked to return a strict JSON object so the server can separate
 * the natural reply from the teaching feedback deterministically.
 */
export const SYSTEM_PROMPT_TEMPLATE = `You are "{{roleName}}", a character in a language-learning roleplay.

## Scenario
You are roleplaying: {{scenarioTitle}}.
Stay fully in character at all times.

## Your persona
{{persona}}

## Conversation goals the learner is trying to achieve
{{objectives}}

## Learner profile
- Practicing language: {{language}}
- Proficiency level: {{level}} (CEFR). Adjust your vocabulary and complexity to this level — challenging but understandable.

## Rules
1. Stay in character. Reply ONLY as {{roleName}}, in {{language}}, with natural conversational English.
2. Keep replies short (1–3 sentences) to keep the dialogue flowing.
3. If the learner's message has grammar, vocabulary, or phrasing issues, capture them in "feedback".
4. NEVER explain corrections inside the reply text — put all teaching in the "feedback" array.
5. Be warm and encouraging; never mock mistakes.

## Output format
Respond with STRICT JSON (no markdown, no code fences) in this exact shape:
{
  "reply": "<your in-character reply in {{language}}>",
  "feedback": [
    {
      "type": "grammar" | "vocabulary" | "pronunciation" | "idiom" | "style",
      "severity": "info" | "suggestion" | "correction",
      "original": "<the learner's problematic phrase, verbatim>",
      "suggestion": "<the corrected or better phrasing>",
      "explanation": "<short explanation in Persian (فارسی)>"
    }
  ]
}
Only include feedback items when there is a genuine, useful correction. Omit the array (or leave empty) when the learner's message is already correct.`;

/* ========================================================================== */
/*  Prompt builder                                                            */
/* ========================================================================== */

/**
 * Build the final system prompt by injecting scenario + learner details.
 * Runs on the server right before calling the model.
 */
export function buildSystemPrompt(params: {
  roleName: string;
  persona: string;
  scenarioTitle: string;
  objectives: string[];
  level: CEFRLevel;
  language: LanguageCode;
}): string {
  const objectivesBullets =
    params.objectives.map((o) => `- ${o}`).join("\n") || "- Hold a natural conversation.";

  return SYSTEM_PROMPT_TEMPLATE.replace("{{roleName}}", params.roleName)
    .replace("{{roleName}}", params.roleName)
    .replace("{{scenarioTitle}}", params.scenarioTitle)
    .replace("{{persona}}", params.persona)
    .replace("{{objectives}}", objectivesBullets)
    .replace(/{{level}}/g, params.level)
    .replace(/{{language}}/g, params.language);
}

/* ========================================================================== */
/*  Default AI configuration                                                  */
/* ========================================================================== */

/**
 * Default AI configuration.
 *
 * NOTE: `apiKey` is intentionally undefined here. The real key is read from
 * the server environment (`process.env`) inside `lib/ai/server.ts` and is
 * NEVER shipped to the client.
 */
export const DEFAULT_AI_CONFIG: AIConfig = {
  provider: "openai",
  model: "gpt-4o-mini",
  apiKey: undefined,
  temperature: 0.7,
  maxTokens: 512,
  systemPromptTemplate: SYSTEM_PROMPT_TEMPLATE,
  streaming: false,
  feedbackEnabled: true,
  targetLanguage: "en",
  userLevel: "B1",
};

