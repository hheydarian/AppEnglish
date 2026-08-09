import type { CEFRLevel, Feedback, LanguageCode } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Request (client -> server)                                                */
/* -------------------------------------------------------------------------- */

export interface ChatRequestMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequestBody {
  scenarioId: string;
  messages: ChatRequestMessage[];
  level: CEFRLevel;
  language: LanguageCode;
  /**
   * Optional personal OpenAI API key. When provided, the server prefers it
   * over the default environment key. Sent from the client's own settings
   * (local-only) to OUR OWN endpoint — never to a third party.
   */
  userApiKey?: string;
}

/* -------------------------------------------------------------------------- */
/*  Response (server -> client)                                               */
/* -------------------------------------------------------------------------- */

export interface ChatResponseData {
  /** The AI character's in-character reply (English). */
  reply: string;
  /** Inline teaching notes about the learner's last message. */
  feedback: Feedback[];
  /** True when the reply came from the deterministic mock, not a real model. */
  mock?: boolean;
}

export interface ChatResponse {
  ok: boolean;
  data?: ChatResponseData;
  error?: string;
}
