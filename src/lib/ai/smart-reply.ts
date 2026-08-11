import type { Feedback, Scenario } from "@/types";
import type { ChatRequestMessage } from "./types";
import { uid } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Content-aware mock replies                                                */
/* -------------------------------------------------------------------------- */

/**
 * A content-aware mock reply generator.
 *
 * Instead of picking a reply purely from a fixed pool by scenario id, this
 * inspects the learner's actual message and the conversation history to
 * produce a contextual, non-repetitive reply. It also:
 *  - Avoids repeating the last assistant line.
 *  - Returns a polite fallback when the user's message is gibberish / empty-ish.
 *  - Still synthesizes realistic grammar feedback (e.g. "I want" → "I'd like").
 *
 * Shared by both lib/ai/server.ts (web) and lib/ai/client.ts (Capacitor).
 */
export function buildSmartReply(params: {
  scenario: Scenario;
  history: ChatRequestMessage[];
  userText: string;
}): { reply: string; feedback: Feedback[]; mock: true } {
  const { scenario, history, userText } = params;
  const trimmed = userText.trim();
  const lower = trimmed.toLowerCase();

  // 1) Polite fallback when the message is empty / too short / gibberish.
  if (trimmed.length < 2 || !/[a-z\u0600-\u06FF]/i.test(trimmed)) {
    return {
      reply:
        "Sorry, I didn't quite catch that. Could you say it again, please?",
      feedback: [],
      mock: true,
    };
  }

  // 2) Build a pool of contextual replies, then filter out whatever the
  //    assistant already said recently (avoid repetition).
  const lastAssistant = [...history]
    .reverse()
    .find((m) => m.role === "assistant")?.content;

  const pool = contextualPool(scenario, lower);
  const fresh = pool.filter((r) => r !== lastAssistant);
  const reply = (fresh.length > 0 ? fresh : pool)[
    // deterministic-but-varied index based on message length
    Math.abs(hashCode(trimmed)) % (fresh.length > 0 ? fresh.length : pool.length)
  ];

  const feedback = synthesizeFeedback(lower, trimmed);
  return { reply, feedback, mock: true };
}

/* -------------------------------------------------------------------------- */
/*  Contextual pools                                                          */
/* -------------------------------------------------------------------------- */

function contextualPool(
  scenario: Scenario,
  lower: string
): string[] {
  // Greeting detection — works across all scenarios.
  if (/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(lower)) {
    return [
      "Hello! It's great to talk with you. How are you doing today?",
      "Hi there! Lovely to meet you. How are you?",
      "Hey! Welcome back. How are you feeling today?",
    ];
  }

  // "How are you" returned at the user.
  if (/how are you|how're you|hru/.test(lower)) {
    return [
      "I'm great, thank you for asking! And you?",
      "I'm doing well, thanks! How about you?",
    ];
  }

  // Topic-specific pools keyed by scenario id / category.
  switch (scenario.id) {
    case "a0-1-1": // Alphabet
      return [
        "Nice! Now can you say the next letter for me?",
        "Great job! Can you spell the word 'cat' for me? C-A-...?",
        "Awesome! Which letter comes after 'M'?",
        "Perfect! Can you think of a word that starts with 'B'?",
      ];

    case "a0-1-2": // Greetings
      return [
        "That's perfect! And what do you say in the evening?",
        "Lovely! Now — how do you answer when someone asks 'How are you?'",
        "Well done! How do you say goodbye to a friend?",
        "Great! Can you wish me a nice day?",
      ];

    case "a0-2-1": // Numbers
      return [
        "Perfect! Now let's count — can you say the numbers from one to five?",
        "Great! How many fingers do you have on one hand?",
        "Awesome! Can you tell me a number between ten and twenty?",
        "Well done! What number comes after 'fourteen'?",
      ];

    case "a0-2-2": // Self-introduction
      return [
        "That's a lovely name! Where are you from?",
        "Nice to meet you! How old are you?",
        "Wonderful! Which city do you live in?",
        "Great! It's so nice to meet you. Nice to meet you!",
      ];

    case "a0-3-1": // Colors & objects
      return [
        "Yes! And what color is the sky?",
        "Good! Can you name something that is green?",
        "Nice! What color is a banana?",
        "Perfect! Now — what is this we sit on? (a chair!)",
      ];

    case "a0-3-2": // Demonstratives
      return [
        "Yes! Now point at something far — how do you say it? '____ is a car.'",
        "Great! And what about plural things near you? '____ are books.'",
        "Perfect! Is this near or far? 'That is a house.' — near or far?",
        "Well done! Can you make 'This is a pen' plural?",
      ];

    case "a0-4-1": // Food
      return [
        "Good choice! And what would you like to eat?",
        "Yum! Would you like water or juice to drink?",
        "Lovely! Don't forget to say 'please'. 🙂",
        "Great! How do you say 'ممنون' in English?",
      ];

    case "a0-4-2": // Polite requests / café
      return [
        "Sure! That'll be three dollars. How would you like to pay?",
        "Of course! Anything else with that?",
        "Coming right up! Is that for here or to go?",
        "Great! Here you go. Enjoy!",
      ];

    /* ----- A1 lesson roleplays ----- */
    case "a1-1-3": // Daily routines
      return [
        "Wow, that's early! What do you do after you wake up?",
        "Nice! And what do you have for breakfast?",
        "Sounds busy! What time do you go to work or school?",
        "Great routine! What do you do in the evening?",
      ];

    case "a1-2-3": // Family & jobs
      return [
        "That's lovely! What does your father do?",
        "Nice! Do you have any brothers or sisters?",
        "Cool! And what's your job?",
        "Your family sounds wonderful! Is your mom kind?",
      ];

    case "a1-3-3": // Past simple & vacations
      return [
        "That sounds amazing! Where did you go?",
        "Cool! What did you do there?",
        "Yum! What did you eat on your trip?",
        "Wow! Who did you go with?",
      ];

    case "a1-4-3": // Shopping & directions
      return [
        "Sure! What size do you wear?",
        "Of course! How about this blue one?",
        "It's only 20 dollars! Is that okay?",
        "No problem! The shop is next to the bank. Turn left and go straight.",
      ];

    default: {
      // Generic fallback for the four base scenarios (cafe, interview, ...).
      if (scenario.category === "work") {
        return [
          "Thanks for sharing. Could you tell me a bit more about your experience?",
          "Interesting. Why are you interested in this role?",
          "Good. Where do you see yourself in five years?",
          "Thank you. Do you have any questions for me?",
        ];
      }
      if (scenario.category === "travel") {
        return [
          "Great. How many bags are you checking in today?",
          "Perfect. Would you prefer a window seat or an aisle seat?",
          "All set. Your gate is B12, and boarding starts soon.",
          "You're welcome! Have a safe flight.",
        ];
      }
      if (scenario.category === "daily") {
        return [
          "Great choice! What size would you like?",
          "Sure thing! Is that to stay or to go?",
          "Awesome. Would you like anything else with that?",
          "That'll be four dollars fifty, please.",
        ];
      }
      // social / default
      return [
        "Oh, nice! Tell me more about that.",
        "That sounds really fun. What did you enjoy most?",
        "Cool! Do you have any plans for the weekend?",
        "Haha, I love that! What else do you like?",
      ];
    }
  }
}

/* -------------------------------------------------------------------------- */
/*  Feedback synthesis (shared with the old mock)                             */
/* -------------------------------------------------------------------------- */

function synthesizeFeedback(lower: string, original: string): Feedback[] {
  const feedback: Feedback[] = [];

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
      test: /\bi\b/.test(original) && !/\bI\b/.test(original),
      original: "i",
      suggestion: "I",
      explanation: "ضمیر «I» (من) در انگلیسی همیشه بزرگ نوشته می‌شود.",
      type: "grammar",
      severity: "correction",
    },
    {
      test: /\bim\s+\w/.test(lower.replace("'", "")),
      original: "im",
      suggestion: "I'm",
      explanation: "شکل صحیح کوتاه‌شده: I'm (با آپوستروف).",
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

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function hashCode(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}
