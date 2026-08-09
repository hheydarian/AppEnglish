import type { Scenario, ScenarioCategory } from "@/types";

/**
 * Seed scenarios for the roleplay app.
 *
 * Each scenario is a self-contained, realistic situation the user roleplays
 * through with the AI. The `role.persona` text is injected into the system
 * prompt at request time (see `lib/ai`), so keep it addressed to the AI.
 *
 * NOTE: the user converses in English (`language: "en"`); titles, descriptions
 * and objectives are localized to Persian for the UI.
 */

export const SCENARIOS: Scenario[] = [
  /* ----------------------------------------------------------------------- */
  {
    id: "cafe-ordering",
    title: "سفارش در کافه",
    description:
      " وارد کافه می‌شوی، یک نوشیدنی سفارش می‌دهی و با باریستا درباره منو و پیشنهادها صحبت می‌کنی.",
    category: "daily",
    icon: "Coffee",
    difficulty: "A2",
    language: "en",
    tags: ["food", "polite-requests", "beginner"],
    role: {
      name: "Barista",
      persona:
        "You are a friendly, upbeat barista at a cozy coffee shop. Greet the customer warmly, offer the menu, suggest popular drinks, and ask follow-up questions (size, milk type, dine-in or takeaway). Keep your language simple and natural (A2 level). If the learner makes a mistake, stay encouraging and respond naturally — do not interrupt the flow.",
      avatar: "☕",
    },
    opening: "Hi there! Welcome! What can I get for you today?",
    objectives: [
      "سفارش یک نوشیدنی کامل (نوع، سایز، نوع شیر)",
      "پرسیدن پیشنهاد از باریستا",
      "پرداخت و تشکر کردن",
    ],
    vocabulary: [
      { term: "latte", meaning: "لاته", example: "I'd like a latte, please." },
      {
        term: "to go / for here",
        meaning: "بیرون‌بر / اینجا",
        example: "Is that for here or to go?",
      },
      {
        term: "oat milk",
        meaning: "شیر جو دوسر",
        example: "Can I get that with oat milk?",
      },
    ],
    estimatedMinutes: 5,
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "job-interview",
    title: "مصاحبه شغلی",
    description:
      "در یک مصاحبه شغلی شرکت می‌کنی. باید خودت را معرفی کنی، درباره تجربه‌ها پاسخ دهی و سوالات حرفه‌ای بپرسی.",
    category: "work",
    icon: "Briefcase",
    difficulty: "B2",
    language: "en",
    tags: ["professional", "career", "formal"],
    role: {
      name: "Job Interviewer",
      persona:
        "You are a professional but approachable hiring manager interviewing the learner for a mid-level position. Ask common interview questions (tell me about yourself, strengths/weaknesses, past experience, why this company). Probe gently when answers are vague. Use B2-level professional English. Wait for full answers and give the candidate space to speak.",
      avatar: "👔",
    },
    opening:
      "Good morning, thanks for coming in. To start, could you tell me a little about yourself?",
    objectives: [
      "ارائه یک معرفی شخصی (elevator pitch) روان",
      "توضیح یک نقطه ضعف و نقطه قوت",
      "پرسیدن حداقل یک سوال هوشمندانه درباره شرکت یا نقش",
    ],
    vocabulary: [
      {
        term: "strengths and weaknesses",
        meaning: "نقاط قوت و ضعف",
        example: "What would you say are your main strengths and weaknesses?",
      },
      {
        term: "track record",
        meaning: "سابقه موفق",
        example: "I have a proven track record in project management.",
      },
      {
        term: "fit for the role",
        meaning: "مناسب برای این موقعیت",
        example: "I believe I'd be a great fit for the role.",
      },
    ],
    estimatedMinutes: 12,
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "airport-check-in",
    title: "چک‌این فرودگاه",
    description:
      "به میز چک‌این فرودگاه می‌رسی، بلیت می‌دهی، درباره صندلی و چمدان سوال می‌کنی و از گیت سوال می‌پرسی.",
    category: "travel",
    icon: "Plane",
    difficulty: "B1",
    language: "en",
    tags: ["travel", "airport", "polite-requests"],
    role: {
      name: "Airport Check-in Agent",
      persona:
        "You are an efficient, polite airport check-in agent. Ask for the traveller's passport and destination, confirm the flight, ask about baggage and seating preference (window/aisle), and give the gate and boarding time. Use clear B1-level English suitable for announcements. Help if the traveller seems confused.",
      avatar: "✈️",
    },
    opening:
      "Good day! May I have your passport, please? Where are you flying today?",
    objectives: [
      "تحویل پاسپورت و تأیید پرواز",
      "درخواست صندلی دلخواه (پنجره/راهرو)",
      "پرسیدن شماره گیت و زمان بوردینگ",
    ],
    vocabulary: [
      {
        term: "boarding pass",
        meaning: "کارت سوار شدن",
        example: "Here is your boarding pass.",
      },
      {
        term: "window / aisle seat",
        meaning: "صندلی کنار پنجره / راهرو",
        example: "I'd prefer a window seat.",
      },
      {
        term: "carry-on",
        meaning: "چمدان دستی",
        example: "Do you have any carry-on luggage?",
      },
    ],
    estimatedMinutes: 7,
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "casual-chat",
    title: "چت دوستانه",
    description:
      "با یک دوست جدید درباره علایق، آخر هفته و برنامه‌ها صحبت می‌کنی — یک گفتگوی طبیعی و روزمره.",
    category: "social",
    icon: "MessagesSquare",
    difficulty: "A2",
    language: "en",
    tags: ["social", "small-talk", "beginner", "free-talk"],
    role: {
      name: "New Friend",
      persona:
        "You are a friendly new acquaintance making small talk. Chat naturally about hobbies, the weekend, movies, music, food, and plans. Ask open-ended follow-up questions to keep the conversation flowing. Use casual, everyday A2-level English. Mirror the learner's energy and be warm and curious.",
      avatar: "🙂",
    },
    opening: "Hey! Nice to meet you. So, what do you usually do on weekends?",
    objectives: [
      "صحبت درباره حداقل دو علاقه شخصی",
      "پرسیدن یک سوال دنبال‌دار از دوست",
      "برنامه‌ریزی برای یک فعالیت مشترک",
    ],
    vocabulary: [
      {
        term: "hang out",
        meaning: "وقت گذراندن",
        example: "Let's hang out this weekend.",
      },
      {
        term: "into (something)",
        meaning: "علاقه‌مند به",
        example: "I'm really into indie music.",
      },
      {
        term: "sounds good",
        meaning: "به نظر خوبه",
        example: "That sounds good to me!",
      },
    ],
    estimatedMinutes: 8,
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Look up a single scenario by id. */
export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

/** Filter scenarios by category. */
export function getScenariosByCategory(category: ScenarioCategory): Scenario[] {
  return SCENARIOS.filter((s) => s.category === category);
}

/** All distinct categories present in the seed data. */
export const SCENARIO_CATEGORIES: ScenarioCategory[] = [
  "daily",
  "work",
  "travel",
  "social",
];
