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
    case "a1-1-1": // Daily vocab practice
      return [
        "Great! Now can you use 'wake up' in a sentence?",
        "Nice! What do you do after you 'get dressed'?",
        "Good one! Do you 'take a shower' in the morning or evening?",
        "Awesome! Tell me — what do you 'eat' for breakfast?",
      ];
    case "a1-1-2": // Present simple grammar
      return [
        "Good! Now, does your best friend drink coffee too?",
        "Nice try! Remember: he/she/it + s. Can you say 'She ___ (work) here'?",
        "Great! Let's make it negative — 'I ___ (don't) like tea.'",
        "Perfect! Ask me a 'Do you...?' question now!",
      ];
    case "a1-2-1": // Family + jobs
      return [
        "That's nice! What does your father do?",
        "Cool! Do you have any brothers or sisters? What do they do?",
        "Great! What's your dream job?",
        "Wonderful! Is your mother a teacher or a doctor?",
      ];
    case "a1-2-2": // Possessives + adjectives
      return [
        "Lovely! Is your brother tall or short?",
        "Nice! Is your mother kind? Tell me about her!",
        "Great! Describe your best friend — is he funny?",
        "Awesome! Use 'my' to tell me about your family.",
      ];
    case "a1-3-1": // Past verbs
      return [
        "Exciting! Where did you go?",
        "Cool! What did you eat there?",
        "Nice! Who did you meet?",
        "Great! Did you play any sports?",
      ];
    case "a1-3-2": // Past + time words
      return [
        "Interesting! What did you do yesterday?",
        "Nice! Did you see any friends last week?",
        "Cool! Where did you go two days ago?",
        "Great! What did you eat this morning?",
      ];
    case "a1-4-1": // Shopping vocab
      return [
        "Sure! What size do you wear?",
        "Of course! How about this blue shirt? It's only 15 dollars.",
        "Great choice! Do you also need shoes?",
        "It's on sale today! Is that okay?",
      ];
    case "a1-4-2": // Directions
      return [
        "Sure! The bank is next to the cafe. Turn left and go straight.",
        "No problem! The hotel is opposite the park. It's on the corner.",
        "Of course! Go past the shop, then turn right. It's in front of you.",
        "The station? It's between the bank and the school. Walk straight ahead!",
      ];
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

    /* ----- A2 lesson pools ----- */
    case "a2-1-1": // Irregular past verbs
      return [
        "Wow! Where did you go? Tell me more!",
        "That sounds fun! What did you see there?",
        "Nice! Did you eat anything special?",
        "Great! Did you buy anything interesting?",
      ];
    case "a2-1-2": // Past neg/questions
      return [
        "Interesting! Did you go anywhere last weekend?",
        "Cool! What didn't you like about it?",
        "Tell me — was the weather good yesterday?",
        "Did you meet any friends last night? What did you talk about?",
      ];
    case "a2-1-3": // Vacation chat
      return [
        "That sounds amazing! Where exactly did you go?",
        "So exciting! What did you do on the first day?",
        "Yum! What local food did you try?",
        "Wonderful! Would you go back again? Why?",
      ];
    case "a2-2-1": // Travel & future plans
      return [
        "Great choice! Have you booked a hotel yet?",
        "Good! Are you going to pack light or take a big suitcase?",
        "Nice! Do you have your passport ready?",
        "Exciting! What are you going to do first when you arrive?",
      ];
    case "a2-2-2": // Comparatives
      return [
        "Interesting! Which one do you think is bigger?",
        "Good point! Is it more expensive too?",
        "Nice! So which is the best in your opinion?",
        "Great! Can you use 'the most' to describe it?",
      ];
    case "a2-2-3": // Trip planning
      return [
        "Love it! Where are we going to stay?",
        "Great! Are we going to fly or drive?",
        "Perfect! What are we going to pack first?",
        "Exciting! Which hotel is cheaper — this one or that one?",
      ];
    case "a2-3-1": // Health vocab
      return [
        "Oh no! Do you have a fever too?",
        "I see. Is your throat sore?",
        "How long have you had this cough?",
        "Have you taken any medicine yet?",
      ];
    case "a2-3-2": // Should/shouldn't advice
      return [
        "You should drink lots of water and get some rest.",
        "I think you shouldn't go to work today.",
        "You should see a doctor if it doesn't get better.",
        "You shouldn't eat heavy food. Try some soup!",
      ];
    case "a2-3-3": // Doctor visit
      return [
        "I see. How long have you had this headache?",
        "Let me check your temperature. Do you feel hot?",
        "You should take this medicine three times a day.",
        "You should rest for two days. Don't worry, you'll feel better soon!",
      ];
    case "a2-4-1": // Life experiences
      return [
        "Wow, that's incredible! When did you do that?",
        "Amazing! Have you ever tried something even more exciting?",
        "So cool! What was the scariest part?",
        "Great! Would you recommend it to others?",
      ];
    case "a2-4-2": // Have you ever...?
      return [
        "Interesting! Have you ever been to Japan?",
        "Cool! Have you ever eaten frog legs?",
        "Wow! Have you ever met someone famous?",
        "Great question! Have you ever tried bungee jumping?",
      ];
    case "a2-4-3": // Experiences chat
      return [
        "That's fascinating! What did you learn from it?",
        "Wow! Have you done anything like that since?",
        "Incredible! How did it change you?",
        "So inspiring! What's your next big goal?",
      ];

    case "exam-oral": // The Chief Examiner — acknowledge, then probe deeper
      return [
        "Noted — you described that clearly. Now analyze it: why do you think that decision had such an impact?",
        "A fair attempt, though somewhat general. Could you substantiate that with a concrete example?",
        "Interesting reasoning. Let us weigh the other side — what would a critic of your position say?",
        "You have touched on causes; now synthesize: what broader conclusion follows from your analysis?",
      ];

    default: {
      // C2 lessons get a witty, native-mastery pool.
      if (scenario.difficulty === "C2") {
        return [
          "Sharp. Though I'd warrant there's a nuance you're circling but not quite landing — care to try?",
          "Fair point, well made. Now flip it — argue the other side with equal conviction.",
          "Now that's the kind of turn of phrase I'd expect from a native. Where did you pick that up?",
          "I'll concede that. But you've dodged the rather elephantine question in the room, haven't you?",
        ];
      }
      // C1 lessons get a rigorous, academically challenging pool.
      if (scenario.difficulty === "C1") {
        return [
          "That's a compelling argument. On what evidence do you base that claim?",
          "Interesting — though I'd challenge you: is that inference or interpretation?",
          "A nuanced position. How would you rebut the strongest counterargument?",
          "I see the thrust of your reasoning. Could you substantiate that with an example?",
        ];
      }
      // B2 lessons get a more analytical, upper-intermediate pool.
      if (scenario.difficulty === "B2") {
        return [
          "That's a thoughtful perspective. What led you to that conclusion?",
          "Interesting! Can you elaborate on that with an example?",
          "I see your point. How might someone counter that argument?",
          "Fascinating. How do you think this will develop in the future?",
        ];
      }
      // B1 lessons fall through here — use a generic B1 pool keyed by level.
      if (scenario.difficulty === "B1") {
        return [
          "That's interesting! Can you tell me more about that?",
          "Good point! What do you think about it?",
          "I see! Could you give me an example?",
          "Really? Why do you think so?",
        ];
      }
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
