import type { CurriculumStage, Lesson } from "@/types";
import { A0_LESSON_CONTENT } from "./a0-content";
import { A1_LESSON_CONTENT } from "./a1-content";

/**
 * The SpeakUp Learning Tree — a complete path from absolute zero (A0) to
 * mastery (C2). A0 is built out in full (4 units × 3 lessons, each with a
 * 4-step interactive flow). Higher levels reuse the simpler flat structure
 * until they get the same treatment.
 *
 * Tone rule: every description is warm, human, and encouraging — never robotic.
 */

/* ====================================================================== */
/*  A0 — Absolute Beginner (FULL: 4 units × 3 lessons)                    */
/* ====================================================================== */

const a0_lessons: Lesson[] = [
  /* ----- Unit 1: Alphabet, Sounds & Greetings ----- */
  {
    id: "a0-1-1",
    title: "حروف و صداهای الفبا",
    description: "با ۲۶ حرف آشنا شو و صدای هرکدوم رو بشنو. پایه‌ی همه‌چیز!",
    type: "alphabet",
    level: "A0",
    icon: "Type",
    estimatedMinutes: 8,
  },
  {
    id: "a0-1-2",
    title: "سلام و احوالپرسی",
    description: "اولین سلام‌ودرود روزمره رو یاد بگیر و با اعتماد‌به‌نفس بگو!",
    type: "phrase",
    level: "A0",
    icon: "Hand",
    estimatedMinutes: 7,
  },
  {
    id: "a0-1-3",
    title: "مکالمه: سلام و احوالپرسی",
    description: "بریم توی یک گفتگوی واقعی — خودت رو معرفی کن و سلام بده!",
    type: "roleplay",
    level: "A0",
    icon: "MessagesSquare",
    scenarioId: "casual-chat",
    estimatedMinutes: 6,
  },

  /* ----- Unit 2: Self-Introduction & Numbers ----- */
  {
    id: "a0-2-1",
    title: "اعداد ۱ تا ۲۰",
    description: "از یک تا بیست بشمار و سن‌ت رو بگو. خیلی راحت و سرگرم‌کننده!",
    type: "vocab",
    level: "A0",
    icon: "Hash",
    estimatedMinutes: 8,
  },
  {
    id: "a0-2-2",
    title: "معرفی خودت",
    description: "بگو اسم‌ت چیه، کی هستی و کجا زندگی می‌کنی. ساده و قدرتمند!",
    type: "grammar",
    level: "A0",
    icon: "UserRound",
    estimatedMinutes: 10,
  },
  {
    id: "a0-2-3",
    title: "مکالمه: معرفی به دوست جدید",
    description: "با یک دوست جدید آشنا شو و خودت رو کامل معرفی کن.",
    type: "roleplay",
    level: "A0",
    icon: "UserPlus",
    scenarioId: "casual-chat",
    estimatedMinutes: 6,
  },

  /* ----- Unit 3: Objects, Colors & Basic Commands ----- */
  {
    id: "a0-3-1",
    title: "رنگ‌ها و اشیاء",
    description: "در، صندلی، قرمز، آبی... دنیای اطرافت رو به انگلیسی بشناس!",
    type: "vocab",
    level: "A0",
    icon: "Palette",
    estimatedMinutes: 9,
  },
  {
    id: "a0-3-2",
    title: "این، آن، این‌ها، آن‌ها",
    description: "با This/That/These/Those به اشیاء اشاره کن. خیلی کاربردی!",
    type: "grammar",
    level: "A0",
    icon: "Pointer",
    estimatedMinutes: 10,
  },
  {
    id: "a0-3-3",
    title: "تمرین تعاملی: اشاره‌ها",
    description: "با یه تمرین صوتی و متنی همه‌چی رو تثبیت کن!",
    type: "challenge",
    level: "A0",
    icon: "Sparkles",
    estimatedMinutes: 8,
  },

  /* ----- Unit 4: Basic Needs & Café ----- */
  {
    id: "a0-4-1",
    title: "غذا و نوشیدنی",
    description: "آب، قهوه، لطفاً، ممنون... کلمات ضروری زندگی روزمره!",
    type: "vocab",
    level: "A0",
    icon: "Coffee",
    estimatedMinutes: 8,
  },
  {
    id: "a0-4-2",
    title: "درخواست‌های ساده",
    description: "«I'd like...» و «Can I have...» رو یاد بگیر و چیزی بخواه!",
    type: "grammar",
    level: "A0",
    icon: "HandHelping",
    estimatedMinutes: 10,
  },
  {
    id: "a0-4-3",
    title: "مکالمه: سفارش در کافه",
    description: "وای، رسیدیم به ماجرای واقعی! تو یه کافه قهوه سفارش بده. ☕",
    type: "roleplay",
    level: "A0",
    icon: "Coffee",
    scenarioId: "cafe-ordering",
    estimatedMinutes: 7,
  },
];

export const CURRICULUM: CurriculumStage[] = [
  {
    level: "A0",
    label: "صفر مطلق",
    subtitle: "از همینجا شروع کن — خیلی ساده و قدم‌به‌قدم.",
    icon: "Sparkles",
    accent: "sky",
    lessons: a0_lessons,
    units: [
      {
        id: "a0-u1",
        title: "الفبا، صداها و سلام‌ودرود",
        subtitle: "اولین قدم: آشنا شدن با زبان انگلیسی",
        icon: "Type",
        lessons: a0_lessons.slice(0, 3),
      },
      {
        id: "a0-u2",
        title: "معرفی خود و اعداد",
        subtitle: "بگو کی هستی و بشمار!",
        icon: "UserRound",
        lessons: a0_lessons.slice(3, 6),
      },
      {
        id: "a0-u3",
        title: "اشیاء، رنگ‌ها و اشاره‌ها",
        subtitle: "دنیای اطرافت رو به انگلیسی بشناس",
        icon: "Palette",
        lessons: a0_lessons.slice(6, 9),
      },
      {
        id: "a0-u4",
        title: "نیازهای اولیه و کافه",
        subtitle: "یاد بگیر چیزی بخواه و سفارش بده",
        icon: "Coffee",
        lessons: a0_lessons.slice(9, 12),
      },
    ],
  },

  /* ==================================================================== */
  /*  A1+ — placeholders (full build-out in later milestones)             */
  /* ==================================================================== */
  /*  A1 — Elementary (FULL: 4 units × 3 lessons)                         */
  /* ==================================================================== */
  {
    level: "A1",
    label: "مقدماتی",
    subtitle: "کارهای روزمره، خانواده، گذشته و خرید — حسابی جنبیده‌ای!",
    icon: "Sprout",
    accent: "emerald",
    lessons: [
      // Unit 1: Daily routines & present simple
      {
        id: "a1-1-1",
        title: "کلمات روزمره (۵۰ کلمه)",
        description: "از بیدار شدن تا خواب — تمام افعال پرکاربرد روزمره!",
        type: "vocab",
        level: "A1",
        icon: "BookOpen",
        estimatedMinutes: 15,
      },
      {
        id: "a1-1-2",
        title: "زمان حال ساده",
        description: "I work / He works / Do you...? / don't — قلب انگلیسی!",
        type: "grammar",
        level: "A1",
        icon: "Repeat",
        estimatedMinutes: 12,
      },
      {
        id: "a1-1-3",
        title: "مکالمه: کارهای روزمره",
        description: "با یه دوست درباره‌ی روتین روزانه‌ت حرف بزن.",
        type: "roleplay",
        level: "A1",
        icon: "MessagesSquare",
        estimatedMinutes: 8,
      },
      // Unit 2: Family, jobs & descriptions
      {
        id: "a1-2-1",
        title: "خانواده و مشاغل",
        description: "اعضای خانواده + ۱۵ شغل اصلی — از doctor تا engineer.",
        type: "vocab",
        level: "A1",
        icon: "Users",
        estimatedMinutes: 12,
      },
      {
        id: "a1-2-2",
        title: "صفات ملکی و توصیفی",
        description: "my/your/his/her + tall, kind, busy — توصیف کن!",
        type: "grammar",
        level: "A1",
        icon: "Heart",
        estimatedMinutes: 12,
      },
      {
        id: "a1-2-3",
        title: "مکالمه: خانواده و شغل",
        description: "خانواده و شغلت رو به یه دوست جدید معرفی کن.",
        type: "roleplay",
        level: "A1",
        icon: "UserRound",
        estimatedMinutes: 8,
      },
      // Unit 3: Past simple & vacations
      {
        id: "a1-3-1",
        title: "افعال گذشته",
        description: "باقاعده (played) و بی‌قاعده (went, saw, ate) — کامل!",
        type: "vocab",
        level: "A1",
        icon: "History",
        estimatedMinutes: 12,
      },
      {
        id: "a1-3-2",
        title: "گذشته + کلمات زمانی",
        description: "yesterday, last week, ago — خاطراتت رو تعریف کن.",
        type: "grammar",
        level: "A1",
        icon: "Clock",
        estimatedMinutes: 12,
      },
      {
        id: "a1-3-3",
        title: "مکالمه: آخرین تعطیلات",
        description: "خاطره‌ی آخرین سفر یا آخر هفته‌ات رو تعریف کن.",
        type: "roleplay",
        level: "A1",
        icon: "Plane",
        estimatedMinutes: 8,
      },
      // Unit 4: Directions, shopping & prices
      {
        id: "a1-4-1",
        title: "خرید و قیمت‌ها",
        description: "لباس‌ها، مغازه‌ها، How much و حراج — خرید حرفه‌ای!",
        type: "vocab",
        level: "A1",
        icon: "ShoppingBag",
        estimatedMinutes: 12,
      },
      {
        id: "a1-4-2",
        title: "آدرس‌دهی و مکان",
        description: "next to, turn left, go straight — تو شهر گم نشو!",
        type: "grammar",
        level: "A1",
        icon: "Navigation",
        estimatedMinutes: 12,
      },
      {
        id: "a1-4-3",
        title: "مکالمه: خرید و آدرس",
        description: "لباس بخر و آدرس بپرس — مثل یه بومی‌تبار!",
        type: "roleplay",
        level: "A1",
        icon: "MapPin",
        estimatedMinutes: 8,
      },
    ],
    units: [
      {
        id: "a1-u1",
        title: "کارهای روزمره و حال ساده",
        subtitle: "از صبح تا شب — به انگلیسی بگو چه می‌کنی",
        icon: "Repeat",
        lessons: [],
      },
      {
        id: "a1-u2",
        title: "خانواده و مشاغل",
        subtitle: "آشنایانت رو معرفی کن",
        icon: "Users",
        lessons: [],
      },
      {
        id: "a1-u3",
        title: "گذشته و تعطیلات",
        subtitle: "خاطراتت رو تعریف کن",
        icon: "History",
        lessons: [],
      },
      {
        id: "a1-u4",
        title: "خرید و آدرس‌دهی",
        subtitle: "تو شهر و مغازه راه برو",
        icon: "ShoppingBag",
        lessons: [],
      },
    ],
  },

  {
    level: "A2",
    label: "پایه",
    subtitle: "حرف می‌زنی! حالا وقتشه واقعاً تو موقعیت‌ها قرار بگیری.",
    icon: "Leaf",
    accent: "emerald",
    lessons: [
      {
        id: "a2-food",
        title: "سفارش غذا",
        description: "منوی رستوران، غذاها و پرداخت — با اعتماد‌به‌نفس.",
        type: "roleplay",
        level: "A2",
        icon: "UtensilsCrossed",
        scenarioId: "cafe-ordering",
        estimatedMinutes: 8,
        locked: true,
      },
      {
        id: "a2-past-tense",
        title: "زمان گذشته ساده",
        description: "تعطیلات آخر هفته‌ات رو تعریف کن. yesterday, last week...",
        type: "grammar",
        level: "A2",
        icon: "Clock",
        estimatedMinutes: 14,
        locked: true,
      },
      {
        id: "a2-chat",
        title: "چت دوستانه",
        description: "با یه دوست جدید آشنا شو و راجع به علایقت حرف بزن.",
        type: "roleplay",
        level: "A2",
        icon: "MessagesSquare",
        scenarioId: "casual-chat",
        estimatedMinutes: 8,
        locked: true,
      },
    ],
  },

  {
    level: "B1",
    label: "متوسط",
    subtitle: "دیگه راحت حرف می‌زنی — بیا عمیق‌تر بشیم.",
    icon: "Plane",
    accent: "amber",
    lessons: [
      {
        id: "b1-airport",
        title: "چک‌این فرودگاه",
        description: "پاسپورت، بلیط، صندلی و چمدان — مثل یه مسافر حرفه‌ای.",
        type: "roleplay",
        level: "B1",
        icon: "Plane",
        scenarioId: "airport-check-in",
        estimatedMinutes: 7,
        locked: true,
      },
      {
        id: "b1-interview",
        title: "مصاحبه شغلی",
        description: "خودت رو معرفی کن، تجربه‌ات رو بگو و سوال هوشمند بپرس.",
        type: "roleplay",
        level: "B1",
        icon: "Briefcase",
        scenarioId: "job-interview",
        estimatedMinutes: 12,
        locked: true,
      },
    ],
  },

  {
    level: "C2",
    label: "تسلط کامل",
    subtitle: "استاد زبان! اینجا بحث‌های عمیق و ادبی در انتظارته.",
    icon: "Crown",
    accent: "rose",
    lessons: [
      {
        id: "c2-master",
        title: "گفتگوی استاد",
        description: "آخرین چالش: یه مکالمه‌ی کاملاً آزاد و عمیق.",
        type: "challenge",
        level: "C2",
        icon: "Trophy",
        estimatedMinutes: 30,
        locked: true,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Flat list of every lesson, in order. */
export const ALL_LESSONS: Lesson[] = CURRICULUM.flatMap((s) => s.lessons);

/** Look up a single lesson by id. */
export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

/** A given level's stage. */
export function getStageByLevel(level: CurriculumStage["level"]) {
  return CURRICULUM.find((s) => s.level === level);
}

/** Total lesson count across the whole curriculum. */
export const TOTAL_LESSONS = ALL_LESSONS.length;

/**
 * Get the interactive content (4-step flow) for a lesson.
 * Falls back to undefined for roleplay-only lessons (they go straight to chat).
 */
export function getLessonContent(
  lessonId: string
): import("@/types").LessonContent | undefined {
  const all: Record<string, import("@/types").LessonContent> = {
    ...A0_LESSON_CONTENT,
    ...A1_LESSON_CONTENT,
  };
  return all[lessonId];
}
